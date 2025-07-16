document.addEventListener("DOMContentLoaded", () => {
  const triggers = document.querySelectorAll(".accordion-trigger");

  triggers.forEach((trigger) => {
    const icon = document.createElement("i");
    icon.classList.add("fa", "fa-chevron-down", "chevron-icon");
    icon.style.marginLeft = "10px";
    trigger.appendChild(icon);

    trigger.addEventListener("click", () => {
      const currentContent = trigger.nextElementSibling;

      document.querySelectorAll(".accordion-content").forEach((content) => {
        if (content !== currentContent) {
          content.style.maxHeight = null;
          content.classList.remove("open");
        }
      });

      document.querySelectorAll(".chevron-icon").forEach((chevron) => {
        if (chevron !== icon) chevron.classList.remove("rotated");
      });

      if (currentContent.classList.contains("open")) {
        currentContent.style.maxHeight = null;
        currentContent.classList.remove("open");
        icon.classList.remove("rotated");
      } else {
        currentContent.style.maxHeight = currentContent.scrollHeight + "px";
        currentContent.classList.add("open");
        icon.classList.add("rotated");
      }
    });
  });
});