import { Station } from './modules/station';

import {
  PETROL_TYPE_DIESEL,
  PETROL_TYPE_GAS,
  PETROL_TYPE_GASOLINE,
} from './const';
import { Car } from './modules/car';

const columns = [
  {
    type: PETROL_TYPE_GAS,
    speed: 5,
  },
  {
    type: PETROL_TYPE_GASOLINE,
    speed: 10,
  },
  {
    type: PETROL_TYPE_DIESEL,
    speed: 7,
  },
];

const cars = [
  ['Opel', 'Crossland', 45],
  ['Opel', 'Grandland X', 53],
  ['Mazda', 'cx-5', 55],
  ['BMW', 'M5', 68, PETROL_TYPE_GAS],
  ['BMW', 'X5', 80],
  ['BMW', 'X5d', 80, PETROL_TYPE_DIESEL],
  ['BMW', 'X3', 65],
  ['BMW', '5', 66, PETROL_TYPE_GAS],
];

const station = new Station(columns, '.app');

cars.forEach((carData) => {
  const car = new Car(...carData);
  station.addToQueue(car);
});
