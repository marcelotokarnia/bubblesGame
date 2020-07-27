import { CANVAS_DIMENSIONS } from './constants.mjs'
import { customer2Canvas } from './customers.mjs'
import { GAME } from './index.mjs'

export const canvas = document.querySelector('canvas')
canvas.width = CANVAS_DIMENSIONS.width
canvas.height = CANVAS_DIMENSIONS.height
const canvasCtx = canvas.getContext('2d')

export const drawBoard = () => {
  clearCanvas()
  GAME.customers.forEach(customer => !customer.churn && drawCircle(customer2Canvas(customer)))
}

export const clearCanvas = () =>
  canvasCtx.clearRect(0, 0, CANVAS_DIMENSIONS.width, CANVAS_DIMENSIONS.height)

const changeColor = color => (canvasCtx.strokeStyle = color)

export const drawCircle = ({ x, y, R, color }) => {
  changeColor(color)
  draw(() => canvasCtx.arc(x, y, R, 0, 2 * Math.PI))
}

const draw = fn => {
  canvasCtx.beginPath()
  fn()
  canvasCtx.stroke()
}
