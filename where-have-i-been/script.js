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

class App {
  #map;
  #mapEvent;

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
    event.preventDefault();

    // clear input fields
    inputOverall.value =
      inputEnergy.value =
      inputMoney.value =
      inputDestination.value =
      inputFrom.value =
      inputTo.value =
        "";

    // display marker
    const { lat, lng } = this.#mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: "good-popup",
        })
      )
      .setPopupContent("Travel")
      .openPopup();
  }
}

const app = new App();
