document
  .querySelectorAll("[data-js=bookmark-icon]")
  .forEach((iconButton, index) => {
    iconButton.addEventListener("click", event => {
      if (event.target.closest("svg").getAttribute("fill") === "none") {
        event.target.closest("svg").setAttribute("fill", "#006400");
      } else {
        event.target.closest("svg").setAttribute("fill", "none");
      }
    });
  });
