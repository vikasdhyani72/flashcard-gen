import { configureStore } from '@reduxjs/toolkit'
import flashcardReducer from '../features/flashcard/flashCardSlice'

export const store = configureStore({
  reducer: {
    flashcard: flashcardReducer,
  },
})
