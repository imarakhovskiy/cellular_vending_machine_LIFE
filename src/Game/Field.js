import { createSquareMatrix, aliveNeighboursCount } from './helpers'

export default class Field {
  constructor(size) {
    this.sizes = size
    this.gameField = createSquareMatrix(size)
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
  }

  createGameAreaInDOM() {
    this.gameField.forEach(row => {
      let tr = document.createElement('tr')
      row.forEach(() => {
        let td = document.createElement('td')
        td.style.cssText = 'background-color: white;'
        td.classList.add('point')
        tr.append(td)
      })
      this.domNode.append(tr)
    })
  }

  updateGameArea() {
    this.gameField = this.gameField.map((row, i, field) =>
      row.map((value, j) => {
        let neighboursCount = aliveNeighboursCount(i, j, field)
        return value
          ? neighboursCount === 2 || neighboursCount === 3
          : neighboursCount === 3
      })
    )
  }

  updateGameAreaOnPage() {
    this.gameField.forEach((row, i) => {
      row.forEach((val, j) => {
        this.domNode.children[i].children[j].style.backgroundColor = val ? 'black' : 'white'
      })
    })
  }
}
