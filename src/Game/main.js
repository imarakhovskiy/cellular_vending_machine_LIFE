import Glider from './Glider'
import Field from './Field'
import { getRandomInt } from './helpers'
import { FIELD_SIZE } from './constants'

export default function main() {
  let gameArea = new Field(FIELD_SIZE)
  let glider = new Glider()
  gameArea.createGameAreaInDOM()

  const maxStartPoint = FIELD_SIZE - glider.size
  const startX = getRandomInt(maxStartPoint)
  const startY = getRandomInt(maxStartPoint)
  let startPoint = { x: startX, y: startY }

  glider.generateGlider()
  gameArea.initGlider(glider, startPoint)
  gameArea.updateGameAreaOnPage()
  
  setTimeout(function update() {
    gameArea.updateGameArea();
    gameArea.updateGameAreaOnPage()
    setTimeout(update, 300)
  }, 0)
}
