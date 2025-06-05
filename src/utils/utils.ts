/**
 * 投掷一个指定面数的骰子
 */
export const rollDice = (sides: number): number =>
  Math.floor(Math.random() * sides) + 1

/**
 * 解析骰子表达式字符串（如 "1D6", "2D4+1"）并返回投骰结果。
 * 如果输入的是纯数字字符串，则直接转换为数字。
 * 如果格式无效，则打印警告并返回0。
 */
export function parseDiceString(diceString: string): number {
  // 检查是否为纯数字
  if (!isNaN(Number(diceString))) {
    return Number(diceString)
  }

  // 匹配骰子表达式，例如 "1d6", "2D4+1", "1d10-2"
  const diceRegex = /^(\d+)D(\d+)?([+-]\d+)?$/i
  const match = diceString.match(diceRegex)

  if (match) {
    const numDice = parseInt(match[1], 10)
    const numSides = match[2] ? parseInt(match[2], 10) : 0
    const modifier = match[3] ? parseInt(match[3], 10) : 0

    if (numSides <= 0) {
      console.warn(`无效的骰子面数: ${diceString}`)
      return 0
    }

    let totalRoll = 0
    for (let i = 0; i < numDice; i++) {
      totalRoll += rollDice(numSides)
    }
    return totalRoll + modifier
  }

  console.warn(`无效的骰子字符串格式: ${diceString}`)
  return 0
}
