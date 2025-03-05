import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import YouTubeSEOAnalyzer from './YouTubeSEOAnalyzer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <YouTubeSEOAnalyzer/>
    </>
  )
}

export default App
