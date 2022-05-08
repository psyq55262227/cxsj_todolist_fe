import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'

function App() {
  return (
    <div className="h-full flex flex-col">
      <Header />
      <Outlet />
    </div>
  )
}

export default App
