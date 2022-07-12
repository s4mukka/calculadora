import axios from 'axios'

import { CalculateHandleParams, ICalculate } from '../domain'

export class Calculate implements ICalculate {
  private url = process.env.REACT_APP_API_URL

  constructor (url?: string) {
    if (url) {
      this.url = url
    }
  }

  handle = async ({
    operatingA,
    operatingB,
    operator
  }: CalculateHandleParams) => {
    const { data } = await axios.get<number>(this.url, {
      params: {
        expr: `${operatingA}${operator}${operatingB}`
      }
    })

    return Math.floor(data)
  }
}
