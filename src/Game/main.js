import Glider from './Glider'
import Field from './Field'
import { getRandomInt, getValid } from './helpers'
import { FIELD_SIZE } from './constants'

export default function main() {
  const input = document.getElementById('timeout_input')
  
  let timeout = 300
  let gameTimerId

  let gameArea = new Field(FIELD_SIZE)
  let glider = new Glider()
  gameArea.createGameAreaInDOM()

  glider.generateGlider()
  const startPoint = calcStartPoint(glider.size, FIELD_SIZE)
  gameArea.initGlider(glider, startPoint)
  gameArea.updateGameAreaOnPage()

  addTimeoutChangeHandler()

  gameProcessing()
  
  ////////////////////////////////////////////////////////////////
  
  function gameProcessing() {
    gameTimerId = setInterval(function update() {
      if (gameArea.gameFieldConfigurations.has(gameArea.nextAreaState)) {
        clearTimeout(gameTimerId)
        gameArea.showMessage('Game over! Refresh page to restart')
        input.disabled = true
      } else {
        gameArea.updateGameArea()
        gameArea.updateGameAreaOnPage()
      }
    }, timeout)
  }
  
  function onTimeoutChange(e) {
    if (e.keyCode === 13) {
      clearInterval(gameTimerId)
      
      let oldTimeout = timeout
      
      timeout = getValid(input.value)
      input.value = timeout
      
      if (timeout === 0 && oldTimeout !== 0) {
        gameArea.showMessage('Game paused, enter timeout value greater than 0 to continue')
        return
      } else if (timeout !== 0 && oldTimeout === 0) {
        let game = document.getElementById('game_area')
        game.removeChild(game.childNodes[0])
      }
      
      if (timeout) {
        gameProcessing()
      }
    }
  }
  
  function addTimeoutChangeHandler() {
    input.addEventListener('keyup', onTimeoutChange)
  }
}

function calcStartPoint(gliderSize, fieldSize) {
  const maxStartPoint = fieldSize - gliderSize
  const startX = getRandomInt(maxStartPoint)
  const startY = getRandomInt(maxStartPoint)
  return { x: startX, y: startY }
}
