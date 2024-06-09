import { Car } from './car';

const render = () => {
  const queueContainer = document.createElement('div');
  queueContainer.classList.add('queue');
  const header = document.createElement('h2');
  header.textContent = 'Текущая очередь:';
  header.classList.add('queue__header');

  const queueList = document.createElement('ol');
  queueList.classList.add('queue__list');

  queueContainer.append(header, queueList);
  queueContainer.list = queueList;

  return queueContainer;
};

class PetrolQueue {
  #queue = [];
  #layout;

  constructor() {
    this.#layout = render();
  }

  add(car) {
    if (!(car instanceof Car)) {
      throw Error('Unknown object to add in queue', car);
    }

    this.#queue.push(car);
    this.#layout.list.append(car.getLayout());
  }

  dequeue(petrolCondition) {
    for (let i = 0; i < this.#queue.length; i++) {
      if (this.#queue[i].getPetrolType() === petrolCondition) {
        return this.#queue.splice(i, 1)[0];
      }
    }

    return null;
  }

  isEmpty() {
    return this.#queue.length === 0;
  }

  getLayout() {
    return this.#layout;
  }
}

export const petrolQueue = new PetrolQueue();
