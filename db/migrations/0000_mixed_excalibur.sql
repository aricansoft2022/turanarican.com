CREATE TABLE `books` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`subtitle` text,
	`source_url` text NOT NULL,
	`source_platform` text NOT NULL,
	`license_name` text NOT NULL,
	`license_url` text NOT NULL,
	`attribution_text` text NOT NULL,
	`language` text DEFAULT 'tr' NOT NULL,
	`numbering_policy` text NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `books_slug_idx` ON `books` (`slug`);--> statement-breakpoint
CREATE TABLE `chapters` (
	`id` text PRIMARY KEY NOT NULL,
	`book_id` text NOT NULL,
	`slug` text NOT NULL,
	`source_number` text NOT NULL,
	`display_number` text NOT NULL,
	`source_title` text NOT NULL,
	`display_title` text NOT NULL,
	`source_url` text NOT NULL,
	`sort_order` integer NOT NULL,
	FOREIGN KEY (`book_id`) REFERENCES `books`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `chapters_book_slug_idx` ON `chapters` (`book_id`,`slug`);--> statement-breakpoint
CREATE INDEX `chapters_sort_idx` ON `chapters` (`book_id`,`sort_order`);--> statement-breakpoint
CREATE TABLE `exercises` (
	`id` text PRIMARY KEY NOT NULL,
	`lesson_id` text NOT NULL,
	`section_id` text,
	`number` text NOT NULL,
	`prompt_json` text NOT NULL,
	`answer_json` text NOT NULL,
	`sort_order` integer NOT NULL,
	`difficulty` text,
	`tags_json` text,
	FOREIGN KEY (`lesson_id`) REFERENCES `lessons`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`section_id`) REFERENCES `lesson_sections`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `exercises_lesson_sort_idx` ON `exercises` (`lesson_id`,`sort_order`);--> statement-breakpoint
CREATE TABLE `lesson_sections` (
	`id` text PRIMARY KEY NOT NULL,
	`lesson_id` text NOT NULL,
	`heading` text NOT NULL,
	`slug` text NOT NULL,
	`level` integer NOT NULL,
	`sort_order` integer NOT NULL,
	`content_json` text NOT NULL,
	FOREIGN KEY (`lesson_id`) REFERENCES `lessons`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `lesson_sections_lesson_slug_idx` ON `lesson_sections` (`lesson_id`,`slug`);--> statement-breakpoint
CREATE TABLE `lessons` (
	`id` text PRIMARY KEY NOT NULL,
	`chapter_id` text NOT NULL,
	`slug` text NOT NULL,
	`source_number` text NOT NULL,
	`display_number` text NOT NULL,
	`source_title` text NOT NULL,
	`display_title` text NOT NULL,
	`summary` text NOT NULL,
	`source_url` text NOT NULL,
	`sort_order` integer NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`raw_hash` text,
	FOREIGN KEY (`chapter_id`) REFERENCES `chapters`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `lessons_chapter_slug_idx` ON `lessons` (`chapter_id`,`slug`);--> statement-breakpoint
CREATE INDEX `lessons_sort_idx` ON `lessons` (`chapter_id`,`sort_order`);--> statement-breakpoint
CREATE TABLE `source_assets` (
	`id` text PRIMARY KEY NOT NULL,
	`lesson_id` text,
	`source_snapshot_id` text,
	`source_url` text NOT NULL,
	`asset_type` text NOT NULL,
	`alt_text` text,
	`caption` text,
	`local_key` text NOT NULL,
	`r2_key` text NOT NULL,
	`content_hash` text,
	`preferred_treatment` text NOT NULL,
	`status` text DEFAULT 'discovered' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`lesson_id`) REFERENCES `lessons`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`source_snapshot_id`) REFERENCES `source_snapshots`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `source_assets_source_url_idx` ON `source_assets` (`source_url`);--> statement-breakpoint
CREATE INDEX `source_assets_lesson_asset_idx` ON `source_assets` (`lesson_id`,`asset_type`);--> statement-breakpoint
CREATE TABLE `source_snapshots` (
	`id` text PRIMARY KEY NOT NULL,
	`source_url` text NOT NULL,
	`fetched_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`http_status` integer NOT NULL,
	`content_hash` text NOT NULL,
	`raw_html_path` text,
	`parser_version` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `source_snapshots_source_hash_idx` ON `source_snapshots` (`source_url`,`content_hash`);