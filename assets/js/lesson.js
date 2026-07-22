(() => {
  const content = document.querySelector(".lesson-content");
  if (!content) return;

  content.querySelectorAll("table").forEach((table) => {
    if (table.parentElement?.classList.contains("table-scroll")) return;
    const wrapper = document.createElement("div");
    wrapper.className = "table-scroll";
    wrapper.setAttribute("tabindex", "0");
    wrapper.setAttribute("role", "region");
    wrapper.setAttribute("aria-label", "Yatay kaydırılabilir tablo");
    table.before(wrapper);
    wrapper.append(table);
  });

  content.querySelectorAll("div.bc-details").forEach((container) => {
    const details = document.createElement("details");
    details.className = container.className;
    const summarySource = container.querySelector(":scope > .bc-summary");
    const summary = document.createElement("summary");
    summary.textContent = summarySource?.textContent?.trim() || "Cevabı göster";
    details.append(summary);
    summarySource?.remove();
    while (container.firstChild) details.append(container.firstChild);
    container.replaceWith(details);
  });

  content.querySelectorAll("a[href]").forEach((link) => {
    try {
      const destination = new URL(link.href, window.location.href);
      if (destination.protocol.startsWith("http") && destination.hostname !== window.location.hostname) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
    } catch {
      // Preserve malformed source links instead of changing the translated content.
    }
  });

  const progress = document.createElement("div");
  progress.className = "reading-progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.append(progress);

  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0;
    progress.style.setProperty("--reading-progress", `${percentage}%`);
  };
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);

  const sectionLinks = [...document.querySelectorAll(".lesson-sections a[href^='#']")];
  const observedSections = sectionLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && observedSections.length) {
    const setCurrent = (id) => {
      sectionLinks.forEach((link) => {
        link.classList.toggle("is-current", link.getAttribute("href") === `#${id}`);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setCurrent(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );
    observedSections.forEach((section) => observer.observe(section));
  }
})();
