  document.addEventListener("DOMContentLoaded", () => {
    const triggers = document.querySelectorAll(".accordion-trigger");

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const currentContent = trigger.nextElementSibling;

        // Cierra otros abiertos
        document.querySelectorAll(".accordion-content").forEach((content) => {
          if (content !== currentContent) {
            content.style.maxHeight = null;
            content.classList.remove("open");
          }
        });

        // Alternar actual
        if (currentContent.classList.contains("open")) {
          currentContent.style.maxHeight = null;
          currentContent.classList.remove("open");
        } else {
          currentContent.style.maxHeight = currentContent.scrollHeight + "px";
          currentContent.classList.add("open");
        }
      });
    });
  });
