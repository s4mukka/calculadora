import { useState } from 'react'
import { Display } from '../../components'
import { Button } from '../../components/Button/Button'
import { ICalculate } from '../../domain'
import './styles.css'

type CalculatorType = {
  calculate: ICalculate
}

const Calculator = ({ calculate }: CalculatorType) => {
  const [operationA, setOperationA] = useState('')
  const [operationB, setOperationB] = useState('')
  const [operator, setOperator] = useState<'+' | '-' | '*' | '/' | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const addDigit = (event: any) => {
    const content = event?.currentTarget?.textContent

    if (error) {
      setError(false)
    }

    if (!operator) {
      if (operationA === '' && content === '0') { return }

      if (operationA.length < 7) { setOperationA((old) => `${old}${content}`) }
    } else {
      if (operationB === '' && content === '0') { return }

      if (operationB.length < 7) { setOperationB((old) => `${old}${content}`) }
    }
  }

  const addOperator = (op: '+' | '-' | '*' | '/') => () => {
    if (error) {
      return
    }

    setOperator(op)
  }

  const clear = () => {
    setOperationA('')
    setOperationB('')
    setOperator(undefined)
    setLoading(false)
    setError(false)
  }

  const handleResult = async (event: any) => {
    event.preventDefault()

    if (!operationB || !operator) {
      return
    }

    setLoading(true)

    try {
      const result = await calculate.handle({
        operatingA: Number(operationA),
        operatingB: Number(operationB),
        operator
      })

      setOperationA(String(result))
      setOperationB('')
      setOperator(undefined)
    } catch (err) {
      clear()
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='calculator-wrap' data-testid="calculator">
      <div className='calculator'>
        <Display value={!operator ? operationA : operationB} loading={loading} error={error}/>
        <div className='calculator-buttons'>
          <Button content='c' area='clear' category='clear' onClick={clear}/>
          <Button content='1' area='one' category='number' onClick={addDigit}/>
          <Button content='2' area='two' category='number' onClick={addDigit}/>
          <Button content='3' area='three' category='number' onClick={addDigit}/>
          <Button content='4' area='four' category='number' onClick={addDigit}/>
          <Button content='5' area='five' category='number' onClick={addDigit}/>
          <Button content='6' area='six' category='number' onClick={addDigit}/>
          <Button content='7' area='seven' category='number' onClick={addDigit}/>
          <Button content='8' area='eight' category='number' onClick={addDigit}/>
          <Button content='9' area='nine' category='number' onClick={addDigit}/>
          <Button content='0' area='zero' category='number' onClick={addDigit}/>
          <Button content='-' area='sub' category='operator' onClick={addOperator('-')}/>
          <Button content='+' area='add' category='addition' onClick={addOperator('+')}/>
          <Button content='*' area='mul' category='operator' onClick={addOperator('*')}/>
          <Button content='/' area='div' category='operator' onClick={addOperator('/')}/>
          <Button content='=' area='eq' category='operator' onClick={handleResult}/>
        </div>
      </div>
    </div>
  )
}

export { Calculator }
