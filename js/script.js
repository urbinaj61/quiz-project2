//Logic to toggle bookmarks on and off
//Grab all the icons on all the cards
//Loop through them and add a listener for each
//of them. Check if the svg has a fill color or not.
//Change accordingly
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
//Grab all the answers on each page.
//Then grab all the sh0w/hide buttons.
//As we now have two node lists(sort of arrays)
//We can access the answers with the index of
//the buttons node list. As we click on a
//particular button we now know the index
//which we can use to access the correct answer.
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
