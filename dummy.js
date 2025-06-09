const mainContainer = document.querySelector("[data-js=main-container]");

//Setup our localStorage array
const cardDataArray = [];

const grabLocalStorage = () => {
  const storedData = JSON.parse(localStorage.getItem("cardDataArray"));

  if (storedData) cardDataArray.push(...storedData);
};

grabLocalStorage();

//Function to handle retrieval and new additions to localStorage
const handleLocalStorageFunctionality = (cardInputs, tagsObj) => {
  const cardDataObj = {
    tags: tagsObj.tagsArray,
    question: cardInputs.textarea_question,
    answer: cardInputs.textarea_answer,
  };
  cardDataArray.push(cardDataObj);
  localStorage.setItem("cardDataArray", JSON.stringify(cardDataArray));
};

//Create the new card html
const createCard = (cardInputs, event) => {
  const tagsObj = createTagsFromInputs(event);

  //--------------------------------------------------------------------------
  //  Add all collected data to localStorage as objects inside of an array.
  //  This will be collected by the main page creating innerHtml with the stored
  //  data.
  //  First we have to retrieve any already stored data.
  //  The retrieved objects have to be parsed so we can play with them. json.parse()
  //  All objects pushed into our array have to be stringified so we can store them. json.stringify()
  //  We push all retrieved objects into our array.
  //  Once the new care object is created and stringified we can push into our array.
  //  cardDataArray.push(cardData)
  //  localStorage.setItem("CardDataArray", CardDataArray)
  //  On the main page we would get the stored array with::::
  //  const storedArray = localStorage.getItem("CardDataArray")
  //----------------------------------------------------------------------------

  //Function to handle retrieval and new additions to localStorage
  handleLocalStorageFunctionality(cardInputs, tagsObj);

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

createCard(cardInputs, event);
