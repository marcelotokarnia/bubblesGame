import './addEventListeners.mjs'
import { TICK, GAME_DURATION, TICKS_BETWEEN_HEAL, INITIAL_CUSTOMERS } from './constants.mjs'
import { drawBoard } from './canvas.mjs'
import { customersTick, initCustomers } from './customers.mjs'

const timeCounter = document.getElementById('time-counter')
const scoreCounter = document.getElementById('score-counter')
const customersCounter = document.getElementById('customers-counter')
const canHeal = document.getElementById('can-heal')
const isHealPressed = document.getElementById('is-heal-pressed')
const isMaxHealPressed = document.getElementById('is-max-heal-pressed')
const gameOver = document.getElementById('game-over')

export const GAME = {
  isHealPressed: false,
  isMaxHealPressed: false,
  canHeal: true,
  endGame: () => {
    gameOver.style.display = 'block'
  },
  startGame: () => {
    GAME.day = 0
    GAME.score = 0
    GAME.activeCustomers = INITIAL_CUSTOMERS
    GAME.customers = initCustomers(INITIAL_CUSTOMERS)

    const gameTicks = setInterval(() => {
      GAME.day++
      timeCounter.textContent = `Day ${GAME.day}`
      scoreCounter.textContent = `$core: ${GAME.score.toFixed(0)}`
      customersTick()
      customersCounter.textContent = `Active Customers: ${GAME.activeCustomers}`
      drawBoard()
      canHeal.style.display = GAME.canHeal ? 'block' : 'none'
      isHealPressed.style.display = GAME.isHealPressed ? 'block' : 'none'
      isMaxHealPressed.style.display = GAME.isMaxHealPressed ? 'block' : 'none'
      if (GAME.day === GAME_DURATION) {
        GAME.endGame()
        clearInterval(gameTicks)
      }
    }, TICK)
  },
  waitUntilNextHeal: () => {
    GAME.canHeal = false
    let ticksFromLastHeal = 0
    const healInterval = setInterval(() => {
      ticksFromLastHeal++
      if (ticksFromLastHeal === TICKS_BETWEEN_HEAL) {
        GAME.canHeal = true
        clearInterval(healInterval)
      }
    }, TICK)
  },
}
