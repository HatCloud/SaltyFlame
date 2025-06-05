/**
 * 投掷一个指定面数的骰子
 */
export const rollDice = (sides: number): number =>
  Math.floor(Math.random() * sides) + 1

/**
 * 解析单个骰子表达式（如 "1D6", "2D4"）并返回投骰结果。
 */
function parseSingleDiceExpression(expression: string): number {
  const diceRegex = /^(-?\d+)D(\d+)$/i
  const match = expression.match(diceRegex)

  if (!match) {
    // 如果不是骰子表达式，尝试解析为纯数字
    if (!isNaN(Number(expression))) {
      return Number(expression)
    }
    console.warn(`无效的骰子表达式: ${expression}`)
    return 0
  }

  const numDice = parseInt(match[1], 10)
  const numSides = parseInt(match[2], 10)
  const isNegative = numDice < 0

  if (numSides <= 0) {
    console.warn(`无效的骰子面数: ${expression}`)
    return 0
  }

  let totalRoll = 0
  for (let i = 0; i < Math.abs(numDice); i++) {
    totalRoll += rollDice(numSides)
  }

  return isNegative ? -totalRoll : totalRoll
}

/**
 * 解析骰子表达式字符串并返回投骰结果。
 * 支持:
 * - 纯数字（如 "5", "-3"）
 * - 标准骰子表达式（如 "1D6", "2D4", "-1D3"）
 * - 复合骰子表达式（如 "1D6+2D4", "3D5+1D3+1", "-2D6+1D4-1"）
 * 如果格式无效，则打印警告并返回0。
 */
export function parseDiceString(diceString: string): number {
  // 移除所有空格
  const normalizedString = diceString.replace(/\s+/g, '')

  // 将表达式分割成单独的部分
  const parts = normalizedString.match(/([+-]?\d+D\d+|[+-]?\d+)/gi)

  if (!parts) {
    console.warn(`无效的骰子字符串格式: ${diceString}`)
    return 0
  }

  let total = 0
  for (let part of parts) {
    // 如果部分以+开头，移除+号（因为加法是默认的）
    if (part.startsWith('+')) {
      part = part.substring(1)
    }
    total += parseSingleDiceExpression(part)
  }

  return total
}
