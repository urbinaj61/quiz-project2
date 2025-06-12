import { headerCreate } from "./components/header.js";
headerCreate();

//Dark mode logic
const body = document.querySelector("body");
const checkBoxSwitch = document.querySelector("[data-js=settings__checkbox]");

checkBoxSwitch.addEventListener("click", event => {
  event.target.checked
    ? body.classList.add("body-dark_mode")
    : body.classList.remove("body-dark_mode");
});
