const filters = document.querySelectorAll("[data-filter]");
const artworks = document.querySelectorAll(".art-card");
const dialog = document.querySelector(".art-dialog");

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const category = filter.dataset.filter;
    filters.forEach((button) => {
      const active = button === filter;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    artworks.forEach((artwork) => {
      artwork.hidden = !(category === "all" || artwork.dataset.category === category);
    });
  });
});

if (dialog) {
  const closeButton = dialog.querySelector(".dialog-close");
  const preview = dialog.querySelector(".art-dialog__preview");
  const title = dialog.querySelector(".art-dialog__title");
  const description = dialog.querySelector(".art-dialog__description");

  artworks.forEach((artwork) => {
    artwork.addEventListener("click", () => {
      title.textContent = artwork.dataset.title || "Untitled";
      description.textContent = artwork.dataset.description || "";
      const visual = artwork.querySelector(".art-visual");
      preview.replaceChildren();
      if (visual) {
        const clone = visual.cloneNode(true);
        clone.style.width = "100%";
        clone.style.minHeight = "280px";
        preview.appendChild(clone);
      }
      dialog.showModal();
    });
  });

  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}
