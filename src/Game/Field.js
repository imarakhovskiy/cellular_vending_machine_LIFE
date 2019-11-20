import { createSquareMatrix, aliveNeighboursCount, getRandomInt } from './helpers'
import CustomSet from './Set'

export default class Field {
  constructor(size) {
    this.sizes = size
    this.gameField = createSquareMatrix(size)
    this.gameFieldConfigurations = new CustomSet([this.gameField])
    this.domNode = document.getElementById('game_area')
  }

  get currentState() {
    return this.gameField
  }

  set newState(newState) {
    this.gameField = newState
  }

  get size() {
    return this.sizes
  }

  get nextAreaState() {
    return this.gameField.map((row, i, field) =>
      row.map((value, j) => {
        let neighboursCount = aliveNeighboursCount(i, j, field)
        return value ? neighboursCount === 2 || neighboursCount === 3 : neighboursCount === 3
      })
    )
  }

  initGlider(glider, startPoint) {
    let oldField = this.gameField
    let linesWithGlider = oldField
      .slice(startPoint.y, startPoint.y + glider.size)
      .map((line, i) => [
        ...line.slice(0, startPoint.x),
        ...glider.shape[i],
        ...line.slice(startPoint.x + glider.size)
      ])
    this.gameField = [
      ...oldField.slice(0, startPoint.y),
      ...linesWithGlider,
      ...oldField.slice(startPoint.y + glider.size)
    ]
    this.gameFieldConfigurations.add(this.gameField)
  }
  
  initRandomField = () => {
    this.gameField = this.gameField.map(row => row.map(() => Boolean(getRandomInt(1))))
    this.gameFieldConfigurations.add(this.gameField)
  }

  createGameAreaInDOM() {
    this.gameField.forEach(row => {
      let tr = document.createElement('tr')
      row.forEach(() => {
        let td = document.createElement('td')
        td.style.cssText = 'background-color: #df1453;'
        td.classList.add('point')
        tr.append(td)
      })
      this.domNode.append(tr)
    })
  }

  updateGameArea() {
    this.gameField = this.nextAreaState
    this.gameFieldConfigurations.add(this.gameField)
  }

  updateGameAreaOnPage() {
    this.gameField.forEach((row, i) => {
      row.forEach((val, j) => {
        this.domNode.children[i].children[j].style.backgroundColor = val ? 'white' : '#df1453'
      })
    })
  }
  
  showMessage(message) {
    let gameEndMessageWrapper = document.createElement('div')
    let gameEndMessage = document.createElement('h2')
    let gameEndMessageText = document.createTextNode(message)
    
    gameEndMessage.classList.add("gameEndMessage")
    gameEndMessageWrapper.classList.add('gameEndMessageWrapper')
  
    gameEndMessage.append(gameEndMessageText)
    gameEndMessageWrapper.append(gameEndMessage)
    
    this.domNode.prepend(gameEndMessageWrapper)
  }
}
