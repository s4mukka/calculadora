import axios from 'axios'

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.get.mockClear().mockResolvedValue({ data: 8 })
  return mockedAxios
}
