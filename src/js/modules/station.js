import { Column } from './column';
import { petrolQueue } from './petrol_queue';

const render = () => {
  const stationContainer = document.createElement('div');
  stationContainer.classList.add('container', 'station');

  return stationContainer;
};

export class Station {
  /** @type {Column[]} */
  #columns = [];

  constructor(columns = [{ type: 'petrol' }], appSelector = '.app') {
    const app = document.querySelector(appSelector);

    const stationContainer = render();

    const queueContainer = petrolQueue.getLayout();
    const columnsContainer = document.createElement('div');
    columnsContainer.classList.add('column');

    const columnList = document.createElement('ul');
    columnList.classList.add('column__list');
    stationContainer.list = columnList;

    columnsContainer.append(columnList);
    stationContainer.append(queueContainer, columnsContainer);

    columns.forEach((columnConfig) => {
      const column = new Column(columnConfig);
      stationContainer.list.append(column.getLayout());

      this.#columns.push(column);
      console.log(`Создана колонка ${column.getType()}`);
    });

    app.append(stationContainer);
    setInterval(() => this.process(), 1000);
  }

  process() {
    for (let i = 0; i < this.#columns.length; i++) {
      const currColumn = this.#columns[i];
      if (currColumn.hasCar()) {
        currColumn.process();
        continue;
      }

      const queuedCar = petrolQueue.dequeue(currColumn.getType());
      if (queuedCar) {
        currColumn.attachCar(queuedCar);
      }
    }
  }

  addToQueue(car) {
    petrolQueue.add(car);
  }
}
