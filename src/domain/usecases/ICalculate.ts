export type CalculateHandleParams = {
  operatingA: number,
  operatingB: number,
  operator: '+' | '-' | '*' | '/'
}

export interface ICalculate {
  handle: (params: CalculateHandleParams) => Promise<number>
}
