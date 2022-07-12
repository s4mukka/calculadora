import { render, screen } from '@testing-library/react'

import { Display } from './Display'

type MakeSutType = {
  value?: string
  loading?: boolean
  error?: boolean
}

const makeSut = ({
  value = 'any-value',
  loading = false,
  error = false
}: MakeSutType) => {
  render(
    <Display value={value} loading={loading} error={error} />
  )
}

describe('Display Component', () => {
  it('Deve mostrar o valor passado', () => {
    const value = 'any-value'
    makeSut({ value })
    const display = screen.getByTestId('display')
    expect(display.textContent).toBe(value)
  })

  it('Deve mostrar o valor "0" caso o valor passado seja vazio', () => {
    const value = ''
    makeSut({ value })
    const display = screen.getByTestId('display')
    expect(display.textContent).toBe('0')
  })

  it('Deve mostrar "..." caso esteja carregando', () => {
    makeSut({ loading: true })
    const display = screen.getByTestId('display')
    expect(display.textContent).toBe('...')
  })

  it('Deve mostrar "ERR" caso tenha algum erro', () => {
    makeSut({ error: true })
    const display = screen.getByTestId('display')
    expect(display.textContent).toBe('ERR')
  })

  it('Erro deve ter prioridade', () => {
    makeSut({ error: true, loading: true })
    const display = screen.getByTestId('display')
    expect(display.textContent).toBe('ERR')
  })
})
