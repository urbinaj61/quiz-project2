//Get dom elements
const cardForm = document.querySelector("[data-js=card-add__form]");
const mainContainer = document.querySelector("[data-js=main-container]");
const textarea1 = document.querySelector("[data-js=card-add__textarea1]");
const textarea2 = document.querySelector("[data-js=card-add__textarea2]");
const maxCount1 = document.querySelector("[data-js=card-add__maxCount1]");
const maxCount2 = document.querySelector("[data-js=card-add__maxCount2]");
const counter1 = document.querySelector("[data-js=card-add__counter1]");
const counter2 = document.querySelector("[data-js=card-add__counter2]");
const add_tags_button_svg = document.querySelector(
  "[data-js=add-button__tags_svg]"
);
const addTagsButtonsContainer = document.querySelector(
  "[data-js=card-add__input_ul_container]"
);
const addTagsButton = document.querySelector("[data-js=add-button__tags]");
const addTagsButtonText = document.querySelector(
  "[data-js=add-tag-button__text]"
);

//Limit add-tags functionality
const max_tags_limit = 2;
let tags_counter = 0;

//Setup our localStorage array
const cardDataArray = [];

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

//Create extra tags, limit of add_tags_limit
const createExtraTags = () => {
  tags_counter++;

  if (tags_counter <= max_tags_limit) {
    const li = document.createElement("li");
    li.classList.add("card-add__input_li_container");
    const input = document.createElement("input");
    input.classList.add("card-add__input_tags");
    input.setAttribute("required", "true");
    input.setAttribute("placeholder", "Please enter a tag");
    input.setAttribute("aria-label", "input_tags");
    input.setAttribute("name", `input_tags${tags_counter}`);
    input.setAttribute("id", "card-add__tags");
    input.setAttribute("data-js", "card-add__input_tags");
    input.setAttribute("type", "text");
    input.setAttribute("maxlength", "6");
    li.append(input);
    addTagsButtonsContainer.append(li);
    input.focus();
  } else {
    add_tags_button_svg.style.fill = "var(--add-tags-button-limit-reached)";
    addTagsButtonText.textContent = `Don't be greedy now. Limit Reached`;
  }
};

const createTagsFromInputs = event => {
  let tag1 = event.target[2].value;
  let tag2 = "";
  let tag3 = "";
  if (event.target[3]) tag2 = event.target[3].value;
  if (event.target[4]) tag3 = event.target[4].value;

  const tagsArray = [tag1, tag2, tag3];

  //Create our dynamic spans to insert into the innerHtml
  let spans = ``;

  for (let i = 0; i <= tagsArray.length - 1; i++) {
    if (tagsArray[i].length > 0)
      spans += `<span class="card__tag">${tagsArray[i]}</span>`;
  }

  const tagsObj = { tagsArray, spans };

  return tagsObj;
};

//Create the new card html
const createCard = (cardInputs, event) => {
  const tagsObj = createTagsFromInputs(event);
  //--------------------------------------------------------------------------
  //  Add all collected data to localStorage as objects inside of an array.
  //  This will be collected by the main page creating innerHtml with the stored
  //  data.
  //  cardDataArray.push(cardData)
  //  localStorage.setItem("CardDataArray", CardDataArray)
  //  On the main page we would get the stored array with::::
  //  const storedArray = localStorage.getItem("CardDataArray")
  //----------------------------------------------------------------------------
  const cardDataObj = {
    question: cardInputs.textarea_question,
    answer: cardInputs.textarea_answer,
    tags: tagsObj.tagsArray,
  };
  cardDataArray.push(JSON.stringify(cardDataObj));
  localStorage.setItem("cardDataArray", cardDataArray);
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
          ${tagsObj.spans}
        </aside>
      `;

  //This code grabs the newly created html elements needed
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
//This function removes the extra tags if created once submitted
const removeExtraTagInputs = event => {
  if (event.target.children[7].children.length > 1) {
    for (let i = 1; i <= event.target.children[7].children.length; i++) {
      let counter = 1;
      event.target.children[7].children[counter].remove();
    }
    tags_counter = 0;
    add_tags_button_svg.style.fill = "var(--body-bg)";
    addTagsButtonText.textContent = `Add extra tags(max three)`;
  }
};

//Listen to the form. Get all input fields and create a new card.
cardForm.addEventListener("submit", event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const cardInputs = Object.fromEntries(formData);
  createCard(cardInputs, event);

  //Remove extra tag inputs if any
  removeExtraTagInputs(event);

  textarea1.focus();
  cardForm.reset();
});

//Listen to the add extra tags button and create new input field
addTagsButton.addEventListener("click", event => {
  event.preventDefault();
  createExtraTags();
});
