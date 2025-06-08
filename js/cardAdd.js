//Get dom elements
const cardForm = document.querySelector("[data-js=card-add-form]");
const mainContainer = document.querySelector("[data-js=main-container]");

const textarea1 = document.querySelector("[data-js=card-add__textarea1]");
const textarea2 = document.querySelector("[data-js=card-add__textarea2]");
const maxCount1 = document.querySelector("[data-js=card-add__maxCount1]");
const maxCount2 = document.querySelector("[data-js=card-add__maxCount2]");
const counter1 = document.querySelector("[data-js=card-add__counter1]");
const counter2 = document.querySelector("[data-js=card-add__counter2]");

const addTagsButton = document.querySelector("[data-js=add-button__tags]");

//Counter function

//Grab the max length and display
const maxLength = textarea1.maxLength;
maxCount1.textContent = maxLength;
maxCount2.textContent = maxLength;

counter1.textContent = maxLength + "/";
counter2.textContent = maxLength + "/";

//Listen to questions textarea inputs
//Display maxLength - character count
textarea1.addEventListener("input", event => {
  counter1.textContent = maxLength - event.target.value.length + "/";
});

//Listen to answers textarea inputs`
//Display maxLength - character count
textarea2.addEventListener("input", event => {
  counter2.textContent = maxLength - event.target.value.length + "/";
});

const createExtraTags = () => {
  const input = document.createElement("input");
  input.classList.add("card-add__input_tags");
  input.setAttribute("required", "true");
  input.setAttribute("placeholder", "Please enter a tag");
  input.setAttribute("aria-label", "input_tags");
  input.setAttribute("name", "input_tags");
  input.setAttribute("id", "card-add__tags");
  input.setAttribute("data-js", "card-add__input_tags");
  input.setAttribute("type", "text");
  input.setAttribute("maxlength", "6");
  cardForm.append(input);
};

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
            fill="none"
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

//Listen to the form. Get all input fields and create a new card.
cardForm.addEventListener("submit", event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const cardInputs = Object.fromEntries(formData);
  createCard(cardInputs);
  cardForm.reset();
});

//Listen to the add extra tags button and create new input field
addTagsButton.addEventListener("click", event => {
  event.preventDefault();
  createExtraTags();
});
