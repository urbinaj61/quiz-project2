//Logic to toggle bookmarks on and off
document.querySelectorAll("[data-js=bookmark-icon]").forEach(iconButton => {
  iconButton.addEventListener("click", event => {
    if (event.target.closest("svg").getAttribute("fill") === "none") {
      event.target.closest("svg").setAttribute("fill", "#006400");
    } else {
      event.target.closest("svg").setAttribute("fill", "none");
    }
  });
});

//Logic to toggle show and hide question/answer button
const answer = document.querySelectorAll("h3");

document.querySelectorAll(".card__show_answer").forEach((button, index) => {
  button.addEventListener("click", event => {
    if (event.target.textContent === "Show Answer") {
      event.target.textContent = "Hide Answer";
      answer[index].hidden = false;
    } else {
      event.target.textContent = "Show Answer";
      answer[index].hidden = true;
    }
  });
});
