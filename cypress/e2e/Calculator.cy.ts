const mathCalculate = (
  operatingA: number,
  operatingB: number,
  operator: '+' | '*' | '/' | '-'
): number => {
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

const mockOk = (
  operatingA: number,
  operatingB: number,
  operator: '+' | '*' | '/' | '-'
): void => {
  cy.intercept({
    method: 'GET'
  }, {
    statusCode: 200,
    body: mathCalculate(operatingA, operatingB, operator),
    delay: 500
  }).as('request')
}

const mockError = (): void => {
  cy.intercept({
    method: 'GET'
  }, {
    statusCode: 404,
    body: {
      error: 'any-error'
    }
  }).as('request')
}

describe('Calculator', () => {
  beforeEach(() => {
    cy.visit('')
  })

  it('Deve iniciar com o display zerado', () => {
    cy.getByTestId('display').should('have.text', '0')
  })

  it('Deve somar corretamente', () => {
    mockOk(5, 3, '+')
    cy.getByTestId('button-5').click()
    cy.getByTestId('button-\\+').click()
    cy.getByTestId('button-3').click()
    cy.getByTestId('button-\\=').click()
    cy.getByTestId('display').should('have.text', '...')
    cy.getByTestId('display').should('have.text', '8')
  })

  it('Deve subtrair corretamente', () => {
    mockOk(5, 3, '-')
    cy.getByTestId('button-5').click()
    cy.getByTestId('button-\\-').click()
    cy.getByTestId('button-3').click()
    cy.getByTestId('button-\\=').click()
    cy.getByTestId('display').should('have.text', '...')
    cy.getByTestId('display').should('have.text', '2')
  })

  it('Deve multiplicar corretamente', () => {
    mockOk(5, 3, '*')
    cy.getByTestId('button-5').click()
    cy.getByTestId('button-\\*').click()
    cy.getByTestId('button-3').click()
    cy.getByTestId('button-\\=').click()
    cy.getByTestId('display').should('have.text', '...')
    cy.getByTestId('display').should('have.text', '15')
  })

  it('Deve dividir corretamente', () => {
    mockOk(5, 3, '/')
    cy.getByTestId('button-5').click()
    cy.getByTestId('button-\\/').click()
    cy.getByTestId('button-3').click()
    cy.getByTestId('button-\\=').click()
    cy.getByTestId('display').should('have.text', '...')
    cy.getByTestId('display').should('have.text', '1')
  })

  it('Deve limpar corretamente', () => {
    cy.getByTestId('button-5').click()
    cy.getByTestId('button-c').click()
    cy.getByTestId('display').should('have.text', '0')
  })

  it('Deve mostrar erro', () => {
    mockError()
    cy.getByTestId('button-5').click()
    cy.getByTestId('button-\\+').click()
    cy.getByTestId('button-3').click()
    cy.getByTestId('button-\\=').click()
    cy.getByTestId('display').should('have.text', 'ERR')
  })
})
