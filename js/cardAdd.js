//Get dom elements
const cardForm = document.querySelector("[data-js=card-add-form]");
const mainContainer = document.querySelector("[data-js=main-container]");

//Create the new card html
const createCard = cardInputs => {
  const newCard = document.createElement("section");
  newCard.classList.add("card");
  newCard.innerHTML = `
        <button
          aria-label="Bookmark"
          class="card__bookmark_button"
          data-js="bookmark-icon"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#006400"
            stroke="#006400"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-bookmark-icon lucide-bookmark"
          >
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
          </svg>
        </button>
        <h2 class="card__question_heading">Question</h2>
        <p class="card__question">${cardInputs.textarea_question}</p>
        <button class="card__show_answer">Show Answer</button>
        <h3 hidden class="card__answer">${cardInputs.textarea_answer}</h3>
        <aside class="card__tag_container">
          <span class="card__tag">${cardInputs.input_tags}</span>
        </aside>
      `;

  //This code grabs the newly create html elements needed
  //listens to the bookmark icon being clicked and toggles
  //between on and off.
  newCard
    .querySelector("[data-js=bookmark-icon]")
    .addEventListener("click", event => {
      const svg = event.target.closest("svg");
      const currentFill = svg.getAttribute("fill");
      svg.setAttribute("fill", currentFill === "none" ? "#006400" : "none");
    });

  //This code does the same as the above but for
  //the show hide button
  const answerButton = newCard.querySelector(".card__show_answer");
  const answerElement = newCard.querySelector(".card__answer");

  answerButton.addEventListener("click", event => {
    const isHidden = answerElement.hidden;
    answerElement.hidden = !isHidden;
    event.target.textContent = isHidden ? "Hide Answer" : "Show Answer";
  });

  mainContainer.append(newCard);
};

cardForm.addEventListener("submit", event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const cardInputs = Object.fromEntries(formData);
  createCard(cardInputs);
  cardForm.reset();
});
