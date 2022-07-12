import { fireEvent, render, screen } from '@testing-library/react'

import { Button } from './Button'

type MakeSutType = {
  content: string;
  area: string;
  category: 'number' | 'operator' | 'addition' | 'clear';
}

const makeSut = ({ content, area, category }: MakeSutType) => {
  const fn = jest.fn()
  render(
    <Button
      content={content}
      area={area}
      category={category}
      onClick={fn}
    />
  )

  return {
    fn
  }
}

describe('Button Component', () => {
  it('Deve iniciar com os valores corretos', () => {
    const content = 'any-content'
    const area = 'any-area'
    const category = 'addition'

    makeSut({ content, area, category })
    const btn = screen.getByTestId(`button-${content}`)
    expect(btn).toHaveAttribute('style', `grid-area: ${area}; height: auto;`)
    expect(btn.textContent).toBe(content)
  })

  it('Deve ter a altura como 3.5rem para categoria "clear"', () => {
    const content = 'any-content'
    const area = 'any-area'
    const category = 'clear'

    makeSut({ content, area, category })
    const btn = screen.getByTestId(`button-${content}`)
    expect(btn).toHaveAttribute('style', `grid-area: ${area}; height: 3.5rem;`)
  })

  it('Deve chamar uma função seja passada', () => {
    const content = 'any-content'
    const area = 'any-area'
    const category = 'clear'

    const { fn } = makeSut({ content, area, category })

    const btn = screen.getByTestId(`button-${content}`)
    fireEvent.click(btn)

    expect(fn).toHaveBeenCalled()
  })
})
