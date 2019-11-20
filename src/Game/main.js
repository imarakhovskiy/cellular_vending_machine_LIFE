import Field from './Field'
import { getValid } from './helpers'
import { FIELD_SIZE, DEFAULT_TIMEOUT_VALUE } from './constants'

export default function main() {
  const input = document.getElementById('timeout_input')
  
  let timeout = DEFAULT_TIMEOUT_VALUE
  let gameTimerId

  let gameArea = new Field(FIELD_SIZE)
  gameArea.createGameAreaInDOM()
  
  gameArea.initRandomField()
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
