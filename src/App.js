import React from 'react'
import './App.css'

import { Routes, Route } from 'react-router-dom'

import CreateFlashCard from './pages/CreateFlashCard'
import MyFlashCard from './pages/MyFlashCard'
import FlashCardDetails from './pages/FlashCardDetails'
import HomePage from './pages/Home'

function App() {
  return (
    <div className="w-full min-h-screen bg-[#f8f4ef] font-Montserrat">
      <div className="px-5 xl:px-32 container mx-auto">
        <HomePage />
        <Routes>
          <Route path="/" element={<CreateFlashCard />} />
          <Route path="/myflashcard" element={<MyFlashCard />} />
          <Route
            path="/flashcarddetails/:groupId"
            element={<FlashCardDetails />}
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
