import { headerCreate } from "../components/header.js";
headerCreate();

const mainContainer = document.querySelector("[data-js=main-container]");

//Setup our localStorage array and grab it from the browser
const cardDataArray = [];

const grabLocalStorage = () => {
  const storedData = JSON.parse(localStorage.getItem("cardDataArray"));

  if (storedData) cardDataArray.push(...storedData);
};

//Run the function
grabLocalStorage();

const displayNoCardsMessage = () => {
  //Create elements
  const messageContainer = document.createElement("section");
  const message = document.createElement("h2");
  const takeActionMessage = document.createElement("p");

  //Add classes
  messageContainer.classList.add("message-container");
  message.classList.add("message");
  takeActionMessage.classList.add("take-action-message");

  //Add textContent
  message.textContent = "There are no cards in your App.";
  takeActionMessage.textContent = "Please add question cards";

  //Append elements to their parents
  messageContainer.append(message);
  messageContainer.append(takeActionMessage);
  mainContainer.append(messageContainer);
};

const buildCard = (dataQuestion, dataAnswer, newCardContainer) => {
  //Create elements
  const bookMarkButton = document.createElement("button");
  const questionHeading = document.createElement("h2");
  const mainQuestion = document.createElement("p");
  const showButton = document.createElement("button");
  const mainAnswer = document.createElement("h3");

  //Add Classes
  bookMarkButton.classList.add("card__bookmark_button");
  questionHeading.classList.add("card__question_heading");
  mainQuestion.classList.add("card__question");
  showButton.classList.add("card__show_answer");
  mainAnswer.classList.add("card__answer");

  //Add attributes
  bookMarkButton.setAttribute("aria-label", "Bookmark");
  bookMarkButton.setAttribute("data-js", "bookmark-icon");
  mainAnswer.hidden = true;

  //TextContent
  questionHeading.textContent = "Question";
  showButton.textContent = "Show Answer";
  mainQuestion.textContent = dataQuestion;
  mainAnswer.textContent = dataAnswer;

  //svg
  const svgCode = `<svg
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
`;

  //Append elements to their parents
  bookMarkButton.innerHTML = svgCode;
  newCardContainer.append(bookMarkButton);
  newCardContainer.append(questionHeading);
  newCardContainer.append(mainQuestion);
  newCardContainer.append(showButton);
  newCardContainer.append(mainAnswer);
};

//Let's check if there is any data in local storage
//If so build the cards and the tags.
if (cardDataArray.length) {
  for (let i = 0; i <= cardDataArray.length - 1; i++) {
    const newCardContainer = document.createElement("section");
    const cardTagContainer = document.createElement("aside");
    newCardContainer.classList.add("card");
    cardTagContainer.classList.add("card__tag_container");

    buildCard(
      cardDataArray[i].question,
      cardDataArray[i].answer,
      newCardContainer
    );

    for (let j = 0; j <= cardDataArray[i].tags.length - 1; j++) {
      const cardTag = document.createElement("span");
      cardTag.classList.add("card__tag");
      cardTag.textContent = cardDataArray[i].tags[j];
      cardTagContainer.append(cardTag);
      newCardContainer.append(cardTagContainer);
      mainContainer.append(newCardContainer);
    }
  }
} else {
  displayNoCardsMessage();
}

//Logic to toggle bookmarks on and off
//Grab all the icons on all the cards
//Loop through them and add a listener for each
//of them. Check if the svg has a fill color or not.
//Change accordingly
document.querySelectorAll("[data-js=bookmark-icon]").forEach(iconButton => {
  iconButton.addEventListener("click", event => {
    if (event.target.closest("svg").getAttribute("fill") === "none") {
      event.target.closest("svg").setAttribute("fill", "#006400");
      console.log(event);
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
