import Glider from './Glider'
import Field from './Field'
import { getRandomInt } from './helpers'
import { FIELD_SIZE } from './constants'

export default function main() {
  let gameArea = new Field(FIELD_SIZE)
  let glider = new Glider()
  gameArea.createGameAreaInDOM()

  glider.generateGlider()
  let startPoint = calcStartPoint(glider.size, FIELD_SIZE)
  gameArea.initGlider(glider, startPoint)
  gameArea.updateGameAreaOnPage()

  let timedId = setTimeout(function update() {
    if (!gameArea.gameFieldConfigurations.has(gameArea.nextAreaState)) {
      gameArea.updateGameArea()
      gameArea.updateGameAreaOnPage()
      setTimeout(update, 10)
    } else {
      clearInterval(timedId)
      gameArea.showGameEndMessage()
    }
  }, 0)
}

function calcStartPoint(gliderSize, fieldSize) {
  const maxStartPoint = fieldSize - gliderSize
  const startX = getRandomInt(maxStartPoint)
  const startY = getRandomInt(maxStartPoint)
  return { x: startX, y: startY }
}
