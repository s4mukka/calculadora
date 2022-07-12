import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { CalculateSpy } from '../../__test__/mocks'
import { Calculator } from './Calculator'

const makeSut = () => {
  const calculateSpy = new CalculateSpy()

  render(
    <Calculator calculate={calculateSpy}/>
  )

  return {
    calculateSpy
  }
}

describe('Calculator View', () => {
  it('Deve renderizar com os valores corretos', () => {
    makeSut()

    expect(screen.getByTestId('display').textContent).toBe('0')

    expect(screen.getByTestId('button-c'))
      .toHaveAttribute('style', 'grid-area: clear; height: 3.5rem;')
    expect(screen.getByTestId('button-1'))
      .toHaveAttribute('style', 'grid-area: one; height: auto;')
    expect(screen.getByTestId('button-2'))
      .toHaveAttribute('style', 'grid-area: two; height: auto;')
    expect(screen.getByTestId('button-3'))
      .toHaveAttribute('style', 'grid-area: three; height: auto;')
    expect(screen.getByTestId('button-4'))
      .toHaveAttribute('style', 'grid-area: four; height: auto;')
    expect(screen.getByTestId('button-5'))
      .toHaveAttribute('style', 'grid-area: five; height: auto;')
    expect(screen.getByTestId('button-6'))
      .toHaveAttribute('style', 'grid-area: six; height: auto;')
    expect(screen.getByTestId('button-7'))
      .toHaveAttribute('style', 'grid-area: seven; height: auto;')
    expect(screen.getByTestId('button-8'))
      .toHaveAttribute('style', 'grid-area: eight; height: auto;')
    expect(screen.getByTestId('button-9'))
      .toHaveAttribute('style', 'grid-area: nine; height: auto;')
    expect(screen.getByTestId('button-0'))
      .toHaveAttribute('style', 'grid-area: zero; height: auto;')
    expect(screen.getByTestId('button-+'))
      .toHaveAttribute('style', 'grid-area: add; height: auto;')
    expect(screen.getByTestId('button--'))
      .toHaveAttribute('style', 'grid-area: sub; height: auto;')
    expect(screen.getByTestId('button-*'))
      .toHaveAttribute('style', 'grid-area: mul; height: auto;')
    expect(screen.getByTestId('button-/'))
      .toHaveAttribute('style', 'grid-area: div; height: auto;')
    expect(screen.getByTestId('button-='))
      .toHaveAttribute('style', 'grid-area: eq; height: auto;')
  })

  it('Deve adicionar os valores no display corretamente', () => {
    makeSut()

    fireEvent.click(screen.getByTestId('button-1'))
    fireEvent.click(screen.getByTestId('button-2'))

    const display = screen.getByTestId('display')

    expect(display.textContent).toBe('12')
  })

  it('Deve resetar o display caso um operador seja apertado', () => {
    makeSut()

    fireEvent.click(screen.getByTestId('button-1'))
    fireEvent.click(screen.getByTestId('button-2'))

    fireEvent.click(screen.getByTestId('button-+'))

    const display = screen.getByTestId('display')

    expect(display.textContent).toBe('0')
  })

  it('Não deve adicionar 0s caso o valor já seja 0', () => {
    makeSut()

    fireEvent.click(screen.getByTestId('button-0'))

    const display = screen.getByTestId('display')

    expect(display.textContent).toBe('0')

    fireEvent.click(screen.getByTestId('button-1'))
    fireEvent.click(screen.getByTestId('button-+'))
    fireEvent.click(screen.getByTestId('button-0'))

    expect(display.textContent).toBe('0')
  })

  it('Deve limpar corretamento no botao "c"', () => {
    makeSut()

    fireEvent.click(screen.getByTestId('button-1'))
    fireEvent.click(screen.getByTestId('button-2'))

    fireEvent.click(screen.getByTestId('button-c'))

    const display = screen.getByTestId('display')

    expect(display.textContent).toBe('0')
  })

  it('Deve chamar o caso de uso com os valores corretos ao clicar em "="', async () => {
    const { calculateSpy } = makeSut()

    fireEvent.click(screen.getByTestId('button-1'))
    fireEvent.click(screen.getByTestId('button-2'))
    fireEvent.click(screen.getByTestId('button-+'))
    fireEvent.click(screen.getByTestId('button-3'))
    fireEvent.click(screen.getByTestId('button-='))

    expect(calculateSpy.operatingA).toBe(12)
    expect(calculateSpy.operatingB).toBe(3)
    expect(calculateSpy.operator).toBe('+')

    const display = screen.getByTestId('display')

    expect(display.textContent).toBe('...')
  })

  it('Deve mostrar um erro caso o método falhe', async () => {
    const { calculateSpy } = makeSut()

    jest.spyOn(calculateSpy, 'handle').mockRejectedValueOnce(new Error())

    fireEvent.click(screen.getByTestId('button-1'))
    fireEvent.click(screen.getByTestId('button-2'))
    fireEvent.click(screen.getByTestId('button-+'))
    fireEvent.click(screen.getByTestId('button-3'))
    fireEvent.click(screen.getByTestId('button-='))

    const display = screen.getByTestId('display')

    expect(display.textContent).toBe('...')

    await waitFor(() => expect(display.textContent).not.toBe('...'))

    expect(display.textContent).toBe('ERR')
  })

  it('Deve resetar após um erro quando digitar', async () => {
    const { calculateSpy } = makeSut()

    jest.spyOn(calculateSpy, 'handle').mockRejectedValueOnce(new Error())

    fireEvent.click(screen.getByTestId('button-1'))
    fireEvent.click(screen.getByTestId('button-+'))
    fireEvent.click(screen.getByTestId('button-3'))
    fireEvent.click(screen.getByTestId('button-='))

    const display = screen.getByTestId('display')

    await waitFor(() => expect(display.textContent).toBe('ERR'))

    fireEvent.click(screen.getByTestId('button-2'))

    expect(display.textContent).toBe('2')
  })

  it('Deve fazer nada caso tenha um erro e tente clicar em um operador', async () => {
    const { calculateSpy } = makeSut()

    jest.spyOn(calculateSpy, 'handle').mockRejectedValueOnce(new Error())

    fireEvent.click(screen.getByTestId('button-1'))
    fireEvent.click(screen.getByTestId('button-+'))
    fireEvent.click(screen.getByTestId('button-3'))
    fireEvent.click(screen.getByTestId('button-='))

    const display = screen.getByTestId('display')

    await waitFor(() => expect(display.textContent).toBe('ERR'))

    fireEvent.click(screen.getByTestId('button-+'))

    expect(display.textContent).toBe('ERR')
  })

  it('Deve fazer nada caso tente calcular o resultado sem um operando ou operador', async () => {
    const { calculateSpy } = makeSut()

    jest.spyOn(calculateSpy, 'handle').mockRejectedValueOnce(new Error())

    const display = screen.getByTestId('display')

    fireEvent.click(screen.getByTestId('button-1'))
    fireEvent.click(screen.getByTestId('button-='))

    expect(display.textContent).toBe('1')

    fireEvent.click(screen.getByTestId('button-+'))
    fireEvent.click(screen.getByTestId('button-='))

    expect(display.textContent).toBe('0')
  })

  it('Deve parar de adicionar valores caso ultrapasse 6 caracteres', async () => {
    const { calculateSpy } = makeSut()

    jest.spyOn(calculateSpy, 'handle').mockRejectedValueOnce(new Error())

    const display = screen.getByTestId('display')

    fireEvent.click(screen.getByTestId('button-1'))
    fireEvent.click(screen.getByTestId('button-1'))
    fireEvent.click(screen.getByTestId('button-1'))
    fireEvent.click(screen.getByTestId('button-1'))
    fireEvent.click(screen.getByTestId('button-1'))
    fireEvent.click(screen.getByTestId('button-1'))
    fireEvent.click(screen.getByTestId('button-1'))
    fireEvent.click(screen.getByTestId('button-1'))

    expect(display.textContent).toBe('1111111')

    fireEvent.click(screen.getByTestId('button-+'))

    fireEvent.click(screen.getByTestId('button-2'))
    fireEvent.click(screen.getByTestId('button-2'))
    fireEvent.click(screen.getByTestId('button-2'))
    fireEvent.click(screen.getByTestId('button-2'))
    fireEvent.click(screen.getByTestId('button-2'))
    fireEvent.click(screen.getByTestId('button-2'))
    fireEvent.click(screen.getByTestId('button-2'))
    fireEvent.click(screen.getByTestId('button-2'))

    expect(display.textContent).toBe('2222222')
  })

  it('Deve somar corretamente', async () => {
    makeSut()

    fireEvent.click(screen.getByTestId('button-1'))
    fireEvent.click(screen.getByTestId('button-2'))
    fireEvent.click(screen.getByTestId('button-+'))
    fireEvent.click(screen.getByTestId('button-3'))
    fireEvent.click(screen.getByTestId('button-='))

    const display = screen.getByTestId('display')

    await waitFor(() => expect(display.textContent).not.toBe('...'))

    expect(display.textContent).toBe('15')
  })

  it('Deve subtrair corretamente', async () => {
    makeSut()

    fireEvent.click(screen.getByTestId('button-1'))
    fireEvent.click(screen.getByTestId('button-2'))
    fireEvent.click(screen.getByTestId('button--'))
    fireEvent.click(screen.getByTestId('button-3'))
    fireEvent.click(screen.getByTestId('button-='))

    const display = screen.getByTestId('display')

    await waitFor(() => expect(display.textContent).not.toBe('...'))

    expect(display.textContent).toBe('9')
  })

  it('Deve multiplicar corretamente', async () => {
    makeSut()

    fireEvent.click(screen.getByTestId('button-1'))
    fireEvent.click(screen.getByTestId('button-2'))
    fireEvent.click(screen.getByTestId('button-*'))
    fireEvent.click(screen.getByTestId('button-3'))
    fireEvent.click(screen.getByTestId('button-='))

    const display = screen.getByTestId('display')

    await waitFor(() => expect(display.textContent).not.toBe('...'))

    expect(display.textContent).toBe('36')
  })

  it('Deve dividir corretamente', async () => {
    makeSut()

    fireEvent.click(screen.getByTestId('button-1'))
    fireEvent.click(screen.getByTestId('button-2'))
    fireEvent.click(screen.getByTestId('button-/'))
    fireEvent.click(screen.getByTestId('button-3'))
    fireEvent.click(screen.getByTestId('button-='))

    const display = screen.getByTestId('display')

    await waitFor(() => expect(display.textContent).not.toBe('...'))

    expect(display.textContent).toBe('4')
  })
})
