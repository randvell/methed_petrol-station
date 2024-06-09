import { PETROL_TYPES, PETROL_TYPE_GASOLINE } from '../const';
import { rand } from '../helper';

/**
 * 
 * @param {Car} car 
 * @returns 
 */
const render = (car) => {
  const carContainer = document.createElement('div');
  carContainer.classList.add('car');
  const carNameEl = document.createElement('p');
  carNameEl.classList.add('car__name');
  carNameEl.textContent = car.getName();
  carContainer.append(carNameEl);
  carContainer.model = car;

  return carContainer;
};

export class Car {
  #brand;
  #model;
  #someHash;

  #petrolType;
  #petrolLevel;
  #maxTank;
  #layout;

  constructor(brand, model, maxTank, petrolType = PETROL_TYPE_GASOLINE) {
    if (!PETROL_TYPES.includes(petrolType)) {
      throw new Error('Invalid column type: ' + petrolType);
    }

    this.#brand = brand;
    this.#model = model;
    this.#someHash = '#' + rand(1000, 9999);
    this.#maxTank = maxTank;
    this.#petrolType = petrolType;
    this.#petrolLevel = rand(1, maxTank - 5);
    this.#layout = render(this);
  }

  getPetrolType() {
    return this.#petrolType;
  }

  getLayout() {
    return this.#layout;
  }

  getName() {
    return `${this.#brand} ${this.#model} (${this.#someHash})`;
  }

  getNeededPetrol() {
    return this.#maxTank - this.#petrolLevel;
  }

  fillTank(limit) {
    const toFill = Math.min(this.getNeededPetrol(), limit);
    this.#petrolLevel += toFill;

    console.log(`Автомобиль ${this.getName} заправлен на ${toFill}`);
    return toFill;
  }
}
