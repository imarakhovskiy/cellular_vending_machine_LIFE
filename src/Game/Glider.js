import {createSquareMatrix, getRandomInt} from './helpers'
import { GLIDER_SIZE, GLIDER_STATES } from "./constants";

export  default class Glider {

  constructor() {
    this.sizes = GLIDER_SIZE;
    this.figureShape = createSquareMatrix(GLIDER_SIZE)
  }

  generateGlider() {
    this.state = getRandomInt(3)
    this.figureShape = GLIDER_STATES[this.state]
  }

  get size() {
    return this.sizes
  }
  
  get shape() {
    return this.figureShape
  }
  
  set shape(stateNumber) {
    this.figureShape = GLIDER_STATES[stateNumber]
  }
}
