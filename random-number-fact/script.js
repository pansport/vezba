const url = "https://random-data-api.com/api/v2/users?response_type=json";
const input = document.querySelector("#number");
const btn = document.querySelector(".fact");
const randomBtn = document.querySelector(".random-fact");
const h1 = document.querySelector(".h1");
const p = document.querySelector(".p");

btn.addEventListener("click", () => {
  const inputValue = +input.value;

  fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
});
