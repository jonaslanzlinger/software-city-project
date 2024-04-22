import { Controller } from './controller/Controller.js';
import { Model } from './model/Model.js';
import { View } from './view/View.js';

const app = new Controller(new Model(), new View());