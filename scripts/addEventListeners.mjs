import { canvas } from './canvas.mjs'
import { GAME } from './index.mjs'
import { customer2Canvas, floatUp, healthUp } from './customers.mjs'

const distance = ({ x: x1, y: y1 }, { x: x2, y: y2 }) =>
  Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))

const clickedCustomer = click => {
  for (let customer of GAME.customers) {
    const circle = customer2Canvas(customer)
    if (distance(circle, click) <= circle.R) {
      if (GAME.isHealPressed || GAME.isMaxHealPressed) {
        return healthUp(customer)
      } else {
        return floatUp(customer)
      }
    }
  }
}

const HEAL_KEYS = ['g', 'G']

const MAX_HEAL_KEYS = ['r', 'R']

const eq = target => k => k === target

document.addEventListener('keydown', ({ key }) => {
  if (GAME.canHeal) {
    if (HEAL_KEYS.find(eq(key))) {
      GAME.isHealPressed = true
    } else if (MAX_HEAL_KEYS.find(eq(key))) {
      GAME.isMaxHealPressed = true
    }
  }
})

document.addEventListener('keyup', ({ key }) => {
  if (HEAL_KEYS.find(eq(key))) {
    GAME.isHealPressed = false
  }
  if (MAX_HEAL_KEYS.find(eq(key))) {
    GAME.isMaxHealPressed = false
  }
})

canvas.addEventListener('mousedown', ({ offsetX: x, offsetY: y }) => clickedCustomer({ x, y }))

const startGameCallback = () => {
  GAME.startGame()
  document.getElementById('game').style.display = 'block'
  document.getElementById('instructions').style.display = 'none'
  document.getElementById('game-over').style.display = 'none'
}

;['start', 'restart'].map(id =>
  document.getElementById(id).addEventListener('click', startGameCallback)
)
