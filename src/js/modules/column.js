import { PETROL_TYPES } from '../const';

const images = require.context('../../assets/img', false, /\.svg$/);

const getImagePath = (type) => {
  return images(`./petrol_${type}.svg`);
};

/**
 * @param {Column} column
 */
const render = (column) => {
  const el = document.createElement('li');
  el.classList.add('column__item');
  const imageEl = document.createElement('img');
  imageEl.classList.add('column__img');
  const imagePath = getImagePath(column.getType());
  imageEl.src = imagePath;
  const currentCarEl = document.createElement('div');
  currentCarEl.classList.add('column__car');

  el.carPlace = currentCarEl;
  el.model = column;
  el.append(imageEl, currentCarEl);

  return el;
};

export class Column {
  #type;
  #speed;
  #layout;

  /** @type {Car} */
  #car = null;

  getType() {
    return this.#type;
  }

  constructor({ type, speed = 5 }) {
    if (!PETROL_TYPES.includes(type)) {
      throw new Error('Invalid column type: ' + type);
    }
    if (+speed <= 0) {
      throw new Error('Invalid column speed: ' + speed);
    }

    this.#type = type;
    this.#speed = +speed;
    this.#layout = render(this);
  }

  getLayout() {
    return this.#layout;
  }

  hasCar() {
    return !!this.#car;
  }

  attachCar(car) {
    if (this.#car) {
      throw new Error('Car already attached');
    }

    this.#car = car;
    this.getLayout().carPlace.append(car.getLayout());
  }

  releaseCar() {
    this.#car = null;
    this.getLayout().carPlace.replaceChildren();
  }

  process() {
    if (!this.hasCar()) {
      return;
    }
    if (this.#car.getPetrolType() !== this.#type) {
      throw new Error('Car has wrong petrol type', this.#car);
    }

    if (this.#car.getNeededPetrol() > 0) {
      this.#car.fillTank(this.#speed);
      return;
    }

    this.releaseCar();
  }
}
