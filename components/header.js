export const headerCreate = () => {
  const body = document.querySelector("body");
  const header = document.createElement("header");
  const h1 = document.createElement("h1");
  h1.textContent = "Quiz App";
  header.append(h1);
  body.append(header);
};
