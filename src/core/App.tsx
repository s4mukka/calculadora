import '../styles/global.css'

import { Calculate } from '../usecases'
import { Calculator } from '../views'

const App = () => {
  return (
    <Calculator calculate={new Calculate()}/>
  )
}

export default App
