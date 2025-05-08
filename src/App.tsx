import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/dashboard/DashboardPage'
import LandingPage from './pages/home/LandingPage'
import { FrameDataProvider } from './context/ProductContext'

const App :React.FC= () => {
  return (
    <>
         <FrameDataProvider>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
      </Routes>
        </FrameDataProvider>
    </>
  )
}

export default App
