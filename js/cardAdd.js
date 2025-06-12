import { headerCreate } from "../components/header.js";
headerCreate();

//Get dom elements
const mainContainer = document.querySelector("[data-js=main-container]");
const cardForm = document.querySelector("[data-js=card-add__form]");
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

//Tags array
let tagsArray = [];

//Limit add-tags functionality
const max_tags_limit = 2;
let tags_counter = 0;
let id_counter = 0;

//Create the newly created cards section
const newCardSection = document.createElement("section");
newCardSection.classList.add("new-card__container");
const newCardHeadingContainer = document.createElement("aside");
newCardHeadingContainer.classList.add("new-card__heading_container");
const heading = document.createElement("h3");
heading.classList.add("new-card__heading");
heading.textContent = "New Cards added";

const newCardSpanContainer = document.createElement("aside");
newCardSpanContainer.classList.add("new-card__span_container");

newCardHeadingContainer.append(heading);
newCardSection.append(newCardHeadingContainer);

newCardSection.append(newCardSpanContainer);
mainContainer.append(newCardSection);

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
  tagsArray = [];
  let tag1 = event.target[2].value;
  tagsArray.push(tag1);
  let tag2 = "";
  let tag3 = "";

  if (event.target[3].value) {
    tag2 = event.target[3].value;
    tagsArray.push(tag2);
  }

  if (event.target[4].value) {
    tag3 = event.target[4].value;
    tagsArray.push(tag3);
  }

  //Create our dynamic spans to insert into the innerHtml
  let spans = ``;

  for (let i = 0; i <= tagsArray.length - 1; i++) {
    if (tagsArray[i].length > 0)
      spans += `<span class="card__tag">${tagsArray[i]}</span>`;
  }

  const tagsObj = { tagsArray, spans };

  return tagsObj;
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

const newlyCreatedCards = () => {
  const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#006400" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-text-icon lucide-book-text"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><path d="M8 11h8"/><path d="M8 7h6"/></svg>
`;

  const newCardImageContainer = document.createElement("span");
  newCardImageContainer.classList.add("new-card__image_container");

  newCardSpanContainer.append(newCardImageContainer);
  newCardImageContainer.innerHTML = svgCode;
};

//Setup our localStorage array
const cardDataArray = [];

const grabLocalStorage = () => {
  const storedData = JSON.parse(localStorage.getItem("cardDataArray"));

  if (storedData) {
    cardDataArray.push(...storedData);
    id_counter = storedData.length;
  }
};

grabLocalStorage();

//Function to handle retrieval and new additions to localStorage
const handleLocalStorageFunctionality = (cardInputs, tagsObj, id_counter) => {
  const cardDataObj = {
    id: id_counter++,
    tags: tagsObj.tagsArray,
    question: cardInputs.textarea_question,
    answer: cardInputs.textarea_answer,
  };
  cardDataArray.push(cardDataObj);
  localStorage.setItem("cardDataArray", JSON.stringify(cardDataArray));

  //Call our little function to let the user know how many cards have been created.
  newlyCreatedCards();
};

//Listen to the form. Get all input fields and add to localStorage
cardForm.addEventListener("submit", event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const cardInputs = Object.fromEntries(formData);
  const tagsObj = createTagsFromInputs(event);

  //Function to handle retrieval and new additions to localStorage
  handleLocalStorageFunctionality(cardInputs, tagsObj);

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
