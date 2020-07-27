import { RED, YELLOW, GREEN, GAME_DURATION } from './constants.mjs'
import { CANVAS_DIMENSIONS, RENEWAL, PAY, LAST_CONTACT, HEALTH } from './constants.mjs'
import { GAME } from './index.mjs'

const counters = document.getElementById('counters')
counters.style.width = `${CANVAS_DIMENSIONS.width}px`
const stats = document.getElementById('stats')
stats.style.width = `${CANVAS_DIMENSIONS.width}px`

export const customer2Canvas = ({ lastContact, daysToRenewal, payingAmount, health }) => ({
  x: Math.floor(((RENEWAL.MAX - daysToRenewal) / RENEWAL.MAX) * CANVAS_DIMENSIONS.width),
  y: Math.floor((lastContact / LAST_CONTACT.MAX) * CANVAS_DIMENSIONS.height),
  R: Math.floor(payingAmount),
  color: health < HEALTH.LOW ? RED : health < HEALTH.HIGH ? YELLOW : GREEN,
})

export const initCustomers = n => [...Array(n).keys()].map(generateRandomCustomer)

const generateRandomCustomer = () => ({
  lastContact: Math.floor(Math.random() * (LAST_CONTACT.MAX / 2)), // every customer starts on the top half
  daysToRenewal: Math.floor(Math.random() * RENEWAL.MAX),
  health: Math.random() * HEALTH.MAX,
  payingAmount: PAY.MIN + (PAY.MAX - PAY.MIN) * Math.random(),
})

const changeHealth = (customer, delta) => {
  customer.health += delta
  if (customer.health > HEALTH.MAX) {
    customer.health = HEALTH.MAX
    changePayingAmount(customer, Math.random())
  } else if (customer.health < HEALTH.MIN) {
    customer.health = HEALTH.MIN
    changePayingAmount(customer, -Math.random() * 0.1)
  }
}

const changePayingAmount = (customer, delta) => {
  customer.payingAmount += delta
  if (customer.payingAmount > PAY.MAX) {
    customer.payingAmount = PAY.MAX
  } else if (customer.payingAmount < PAY.MIN) {
    customer.payingAmount = PAY.MIN
  }
}

export const healthUp = customer => {
  if (customer.health > HEALTH.LOW && GAME.isHealPressed) {
    changeHealth(customer, HEALTH.INCREMENT)
  }
  if (customer.health <= HEALTH.LOW && GAME.isMaxHealPressed) {
    changeHealth(customer, HEALTH.INCREMENT)
  }
  GAME.waitUntilNextHeal()
  GAME.isHealPressed = false
  GAME.isMaxHealPressed = false
}

export const floatUp = customer => (customer.lastContact = LAST_CONTACT.MIN)

export const decrementDaysToRenewal = customer => {
  if (--customer.daysToRenewal === RENEWAL.MIN) {
    if (customer.health > HEALTH.LOW) {
      customer.daysToRenewal = RENEWAL.MAX
      if (customer.health > HEALTH.HIGH) {
        changePayingAmount(customer, Math.random() * 2)
      }
    } else {
      customer.churn = true
    }
  }
}

export const incrementLastContact = customer => {
  if (!(customer.health > HEALTH.HIGH && Math.random() > 0.6)) {
    customer.lastContact++
  }
  customer.churn = customer.lastContact === LAST_CONTACT.MAX
}

export const customersTick = () => {
  GAME.customers.forEach(customer => {
    if (!customer.churn) {
      GAME.score += customer.payingAmount
      changeHealth(customer, 0.06 * Math.random() - 0.05)
      decrementDaysToRenewal(customer)
      incrementLastContact(customer)
    }
  })
  GAME.activeCustomers = GAME.customers.filter(c => !c.churn).length
  if (!GAME.activeCustomers) {
    GAME.day = GAME_DURATION
  }
}
