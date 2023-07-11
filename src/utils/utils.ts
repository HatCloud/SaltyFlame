import {Dice} from '../data/Character'

/**
 * 投掷 count 次 dice 面的骰子
 */
export const rollDice = (count: number, dice: Dice): number => {
  let result = 0
  for (let i = 0; i < count; i++) {
    result += Math.floor(Math.random() * dice) + 1
  }
  return result
}
