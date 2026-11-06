import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import { HomePage } from './pages/Home/HomePage'

function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}>

        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
