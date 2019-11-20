import { NEIGHBOURS, FIELD_SIZE } from './constants'

export function getRandomInt(max, min = 0) {
  return (
    Math.floor(Math.random() * Math.floor(min)) +
    Math.floor(Math.random() * Math.floor(max - min + 1))
  )
}

export function createSquareMatrix(size, fillValue = false) {
  return new Array(size).fill(0).map(() => new Array(size).fill(fillValue))
}

export function isPositive(num) {
  return num >= 0
}

export function getValid(num) {
  return !isNaN(num) && isPositive(num) ? +num : 0
}

export function calcNeighbourCoordinate(coordinate) {
  return isPositive(coordinate)
    ? coordinate < FIELD_SIZE
      ? coordinate
      : FIELD_SIZE - coordinate
    : FIELD_SIZE + coordinate
}

export function aliveNeighboursCount(yCoordinate, xCoordinate, field) {
  return NEIGHBOURS.reduce((accum, neighbour) => {
    const neighX = calcNeighbourCoordinate(xCoordinate + neighbour.x)
    const neighY = calcNeighbourCoordinate(yCoordinate + neighbour.y)
    return field[neighY][neighX] ? accum + 1 : accum
  }, 0)
}

export function calcStartPoint(gliderSize, fieldSize) {
  const maxStartPoint = fieldSize - gliderSize
  const startX = getRandomInt(maxStartPoint)
  const startY = getRandomInt(maxStartPoint)
  return { x: startX, y: startY }
}
