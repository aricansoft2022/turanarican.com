#!/usr/bin/env python3
"""
R2'deki lessons/media/ ile local assets/lessons/media/ karsilastirir.
Sadece LISTELER (List = ucretsiz sinira yakin, Class B). Hicbir sey
SILMEZ; .part copleri bulursa ayri bir --delete-part-files calistirmani
ister, boylece hicbir islem senin onayin olmadan gerceklesmez.
"""
import argparse
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MEDIA_DIR = ROOT / "assets" / "lessons" / "media"
BUCKET = os.environ.get("R2_BUCKET", "turanarican-media")
PREFIX = "lessons/media/"


def r2_client():
    import boto3
    from botocore.config import Config

    account_id = os.environ["R2_ACCOUNT_ID"]
    return boto3.client(
        "s3",
        endpoint_url=f"https://{account_id}.r2.cloudflarestorage.com",
        aws_access_key_id=os.environ["R2_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["R2_SECRET_ACCESS_KEY"],
        config=Config(signature_version="s3v4"),
        region_name="auto",
    )


def list_bucket_keys(client) -> set[str]:
    keys = set()
    paginator = client.get_paginator("list_objects_v2")
    for page in paginator.paginate(Bucket=BUCKET, Prefix=PREFIX):
        for obj in page.get("Contents", []):
            keys.add(obj["Key"][len(PREFIX):])
    return keys


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--delete-part-files", action="store_true",
                         help="Bucket'ta bulunan .part uzantili copleri sil (az sayida beklenir)")
    args = parser.parse_args()

    client = r2_client()
    print("Bucket listeleniyor (List islemi, ucretsiz sinira yakin)...")
    bucket_keys = list_bucket_keys(client)
    local_files = {p.name for p in MEDIA_DIR.iterdir() if p.is_file()}

    part_files = {k for k in bucket_keys if k.endswith(".part")}
    bucket_only = bucket_keys - local_files - part_files
    local_only = local_files - bucket_keys

    print(f"\nBucket'ta toplam:     {len(bucket_keys)} key")
    print(f"Local'de toplam:      {len(local_files)} dosya")
    print(f".part copleri:        {len(part_files)}")
    print(f"Sadece bucket'ta olan (.part disinda): {len(bucket_only)}")
    print(f"Sadece local'de olan (henuz yuklenmemis): {len(local_only)}")

    if part_files:
        print("\n.part dosyalari (ornek, ilk 10):")
        for key in sorted(part_files)[:10]:
            print(f"  {PREFIX}{key}")

    if bucket_only:
        print("\nSadece bucket'ta olan, local'de karsiligi olmayan (ornek, ilk 10):")
        for key in sorted(bucket_only)[:10]:
            print(f"  {PREFIX}{key}")
        print("(Bunlar otomatik silinmiyor — eski/farkli bir checkout'tan kalmis olabilir, elle kontrol et.)")

    if local_only:
        print("\nHenuz yuklenmemis (ornek, ilk 10):")
        for key in sorted(local_only)[:10]:
            print(f"  {key}")
        print("-> python3 tools/build_lessons.py --no-download calistirip upload asamasini tamamlat.")

    if args.delete_part_files and part_files:
        print(f"\n{len(part_files)} .part dosyasi siliniyor...")
        # DeleteObjects tek cagrida en fazla 1000 key alir
        keys = sorted(part_files)
        for i in range(0, len(keys), 1000):
            batch = keys[i:i + 1000]
            client.delete_objects(
                Bucket=BUCKET,
                Delete={"Objects": [{"Key": f"{PREFIX}{k}"} for k in batch]},
            )
        print("Silindi.")
    elif part_files:
        print("\nSilmek icin: python3 tools/check_r2_sync.py --delete-part-files")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())