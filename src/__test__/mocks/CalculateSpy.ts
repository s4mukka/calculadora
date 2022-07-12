import { CalculateHandleParams, ICalculate } from '../../domain'

const sleep = (ms = 500) => new Promise((resolve, _reject) => setTimeout(resolve, ms))

export class CalculateSpy implements ICalculate {
  public operatingA?: number = undefined
  public operatingB?: number = undefined
  public operator?: '+' | '-' | '*' | '/' = undefined

  handle = async ({
    operatingA,
    operatingB,
    operator
  }: CalculateHandleParams) => {
    this.operatingA = operatingA
    this.operatingB = operatingB
    this.operator = operator
    await sleep()

    switch (operator) {
      case '+':
        return operatingA + operatingB
      case '-':
        return operatingA - operatingB
      case '*':
        return operatingA * operatingB
      default:
        return Math.floor(operatingA / operatingB)
    }
  }
}
