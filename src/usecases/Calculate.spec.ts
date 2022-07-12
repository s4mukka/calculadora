import { mockAxios } from '../__test__/mocks/axios'
import { Calculate } from './Calculate'

jest.mock('axios')

const makeSut = () => {
  const sut = new Calculate('http://fake-url/')
  const mockedAxios = mockAxios()

  return {
    sut,
    mockedAxios
  }
}

describe('Calculate UseCase', () => {
  describe('handle()', () => {
    it('Deve chamar a api com os valores corretos', async () => {
      const { sut, mockedAxios } = makeSut()

      await sut.handle({ operatingA: 3, operatingB: 5, operator: '+' })

      expect(mockedAxios.get).toBeCalledWith(
        'http://fake-url/',
        {
          params: {
            expr: '3+5'
          }
        }
      )
    })

    it('Deve lançar um erro caso a api falhe', async () => {
      const { sut, mockedAxios } = makeSut()
      mockedAxios.get.mockImplementation(() => Promise.reject(new Error()))

      const promise = sut.handle({ operatingA: 3, operatingB: 5, operator: '+' })

      await expect(promise).rejects.toThrow()
    })
  })
})
