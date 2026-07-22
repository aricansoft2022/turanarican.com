(() => {
  const body = document.body;
  const locale = body.dataset.locale || document.documentElement.lang || "tr";
  const rootPath = body.dataset.siteRoot || ".";
  const rootUrl = new URL(rootPath.endsWith("/") ? rootPath : `${rootPath}/`, document.baseURI);
  const assetUrl = (path) => new URL(String(path).replace(/^\/+/, ""), rootUrl).href;

  const getValue = (source, path) => path.split(".").reduce((value, key) => value?.[key], source);

  const loadJson = async (path) => {
    const response = await fetch(assetUrl(path));
    if (!response.ok) throw new Error(`${path}: ${response.status}`);
    return response.json();
  };

  const applySettings = (settings) => {
    const brandColor = getValue(settings, "brand.logoBackground");
    const footerColor = getValue(settings, "brand.footerBackground");
    if (brandColor) document.documentElement.style.setProperty("--brand-color", brandColor);
    if (footerColor) document.documentElement.style.setProperty("--footer-blue", footerColor);

    document.querySelectorAll("[data-setting-text]").forEach((element) => {
      const value = getValue(settings, element.dataset.settingText);
      if (typeof value === "string" || typeof value === "number") element.textContent = value;
    });

    document.querySelectorAll("[data-setting-src]").forEach((element) => {
      const value = getValue(settings, element.dataset.settingSrc);
      if (typeof value === "string" && value) element.src = assetUrl(value);
    });

    document.querySelectorAll("[data-setting-href]").forEach((element) => {
      const value = getValue(settings, element.dataset.settingHref);
      if (typeof value === "string" && value) element.href = value;
    });

    const youtubeUrl = getValue(settings, "youtube.url");
    if (youtubeUrl) {
      document.querySelectorAll("[data-youtube-link]").forEach((element) => {
        element.href = youtubeUrl;
      });
    }

    const email = getValue(settings, "footer.email");
    if (email) {
      document.querySelectorAll("[data-contact-link]").forEach((element) => {
        element.href = `mailto:${email}`;
      });
    }
  };

  let interfaceLabels = locale === "en"
    ? { video: "videos", preparing: "in preparation", noCourses: "There are no published courses at this time.", settingsError: "Course settings could not be loaded." }
    : { video: "video", preparing: "hazırlanıyor", noCourses: "Şu anda yayımlanmış bir ders bulunmuyor.", settingsError: "Ders ayarları yüklenemedi." };

  const cardStatus = (course) => {
    const videoCount = Number(course.videos);
    return course.videos !== null && course.videos !== "" && Number.isFinite(videoCount)
      ? `${videoCount} ${interfaceLabels.video}`
      : interfaceLabels.preparing;
  };

  const makeCourseCard = (course) => {
    const hasLink = typeof course.href === "string" && course.href.trim() !== "";
    const card = document.createElement(hasLink ? "a" : "div");
    card.className = "course-card";
    card.dataset.courseId = course.id || "";
    if (hasLink) {
      card.href = assetUrl(course.href);
      card.setAttribute("aria-label", `${course.title}: ${cardStatus(course)}`);
    } else {
      card.setAttribute("aria-disabled", "true");
    }
    if (course.cover) card.style.backgroundImage = `url("${assetUrl(course.cover)}")`;

    const title = document.createElement("span");
    title.className = "course-card__title";
    title.textContent = course.title;
    const status = document.createElement("span");
    status.className = "course-card__status";
    status.textContent = cardStatus(course);
    const header = document.createElement("span");
    header.className = "course-card__header";
    header.append(title, status);
    const dot = document.createElement("span");
    dot.className = "course-card__dot";
    dot.setAttribute("aria-hidden", "true");
    card.append(header, dot);
    return card;
  };

  const sortedCourses = (data) => (Array.isArray(data?.courses) ? data.courses : [])
    .filter((course) => course && course.enabled !== false && course.title)
    .sort((left, right) => Number(left.order || 0) - Number(right.order || 0));

  const renderCourseGrid = (data) => {
    const grid = document.querySelector("[data-course-grid]");
    if (!grid) return;
    const courses = sortedCourses(data);
    grid.replaceChildren();
    if (!courses.length) {
      const message = document.createElement("p");
      message.className = "course-grid__message";
      message.textContent = interfaceLabels.noCourses;
      grid.append(message);
      return;
    }
    courses.forEach((course) => grid.append(makeCourseCard(course)));
  };

  const renderCoursePreviews = (data) => {
    const courses = sortedCourses(data);
    document.querySelectorAll("[data-course-preview]").forEach((preview) => {
      const course = courses.find((item) => item.id === preview.dataset.coursePreview);
      if (!course) return;
      preview.replaceChildren(makeCourseCard(course));
    });
  };

  const initializeSettings = async () => {
    const bookId = body.dataset.bookId;
    const [siteResult, coursesResult, bookResult] = await Promise.allSettled([
      loadJson(`settings/site.${locale}.json`),
      loadJson(`settings/courses.${locale}.json`),
      bookId ? loadJson(`settings/books/${bookId}.${locale}.json`) : Promise.resolve(null),
    ]);

    const siteSettings = siteResult.status === "fulfilled" ? siteResult.value : {};
    if (siteSettings.ui) interfaceLabels = { ...interfaceLabels, ...siteSettings.ui };
    const bookSettings = bookResult.status === "fulfilled" && bookResult.value
      ? { book: bookResult.value }
      : {};
    applySettings({ ...siteSettings, ...bookSettings });

    if (coursesResult.status === "fulfilled") {
      renderCourseGrid(coursesResult.value);
      renderCoursePreviews(coursesResult.value);
    } else {
      document.querySelectorAll("[data-course-grid] .course-grid__loading").forEach((element) => {
        element.textContent = interfaceLabels.settingsError;
      });
    }
  };

  initializeSettings();

  const homeToggle = document.querySelector(".site-menu-toggle");
  const homeNav = document.querySelector(".home-nav");
  if (homeToggle && homeNav) {
    const closeHomeNav = () => {
      homeToggle.setAttribute("aria-expanded", "false");
      homeNav.classList.remove("is-open");
    };
    homeToggle.addEventListener("click", () => {
      const isOpen = homeToggle.getAttribute("aria-expanded") === "true";
      homeToggle.setAttribute("aria-expanded", String(!isOpen));
      homeNav.classList.toggle("is-open", !isOpen);
    });
    homeNav.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeHomeNav();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeHomeNav();
    });
  }

  const lessonToggle = document.querySelector(".lesson-menu-button");
  const lessonSidebar = document.querySelector(".lesson-sidebar");
  if (lessonToggle && lessonSidebar) {
    const closeLessonNav = () => {
      lessonToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("lesson-nav-open");
    };
    lessonToggle.addEventListener("click", () => {
      const isOpen = lessonToggle.getAttribute("aria-expanded") === "true";
      lessonToggle.setAttribute("aria-expanded", String(!isOpen));
      document.body.classList.toggle("lesson-nav-open", !isOpen);
    });
    lessonSidebar.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeLessonNav();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeLessonNav();
    });
  }
})();
