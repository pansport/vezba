"use strict";

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputDestination = document.querySelector(".form__input--destination");
const inputFrom = document.querySelector(".form__input--from");
const inputTo = document.querySelector(".form__input--to");
const inputScore = document.querySelector(".form__input--score");
const inputOverall = document.querySelector(".form__input--overall");
const inputMoney = document.querySelector(".form__input--money");
const inputEnergy = document.querySelector(".form__input--energy");

class Travel {
  id = (Date.now() + "").slice(-10);

  constructor(coords, destination, from, to, score, overall, money, energy) {
    this.coords = coords;
    this.destination = destination;
    this.from = from;
    this.to = to;
    this.score = score;
    this.overall = overall;
    this.money = money;
    this.energy = energy;
  }
}

// const travel1 = new Travel(
//   [39, -12],
//   "Portugal",
//   "July 22",
//   "August 02",
//   "medium",
//   70,
//   80,
//   40
// );
// console.log(travel1);

class App {
  #map;
  #mapEvent;
  #travels = [];

  constructor() {
    this._loadMap();

    form.addEventListener("submit", this._newTravel.bind(this));

    this.#map.on("click", this._showForm.bind(this));
  }

  _loadMap() {
    const coords = [34.016241889667036, -10.472965921075785];
    this.#map = L.map("map").setView(coords, 3);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove("hidden");
    inputDestination.focus();
  }

  _newTravel(event) {
    const validInputs = (...inputs) =>
      inputs.every((input) => Number.isFinite(input));

    const allPositive = (...inputs) =>
      inputs.every((input) => input >= 0 && input <= 100);

    event.preventDefault();

    // get data from form
    const score = inputScore.value;
    const destination = inputDestination.value;
    const from = inputFrom.value;
    const to = inputTo.value;
    const money = +inputMoney.value;
    const energy = +inputEnergy.value;
    const overall = +inputOverall.value;
    const { lat, lng } = this.#mapEvent.latlng;

    // check if data is valid
    if (!validInputs(money, energy, overall) || !allPositive(energy, overall))
      return alert(
        "Money, energy and overall values are in points, so they must be numbers between 0 and 100"
      );

    // create travel object

    const travel = new Travel(
      [lat, lng],
      destination,
      from,
      to,
      score,
      overall,
      money,
      energy
    );

    // add new object to travels array
    this.#travels.push(travel);
    console.log(travel);

    // render travel on map as marker
    this._renderTravelMarker(travel);

    // render workout on list
    this._renderTravel(travel);

    // clear input fields + hide form
    this._hideForm();
  }

  _renderTravelMarker(travel) {
    L.marker(travel.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${travel.score}-popup`,
        })
      )
      .setPopupContent(travel.destination)
      .openPopup();
  }

  _renderTravel(travel) {
    const html = `
    <li class="travel travel--${travel.score}" data-id="${travel.id}">
      <h2 class="travel__title">${travel.destination}</h2>
      <h4 class="travel__description">from ${travel.from} to ${travel.to}</h4>
      <div class="workout__details">
        <span class="workout__icon">⭐</span>
        <span class="workout__value">${travel.overall}</span>
        <span class="workout__unit">points</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">💶</span>
        <span class="workout__value">${travel.money}</span>
        <span class="workout__unit">spent</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${travel.energy}</span>
        <span class="workout__unit">points</span>
      </div>
    </li>
    `;

    form.insertAdjacentHTML("afterend", html);
  }

  _hideForm() {
    inputOverall.value =
      inputEnergy.value =
      inputMoney.value =
      inputDestination.value =
      inputFrom.value =
      inputTo.value =
        "";

    form.style.display = "none";
    form.classList.add("hidden");
    setTimeout(() => {
      form.style.display = "grid";
    }, 1000);
  }
}

const app = new App();
