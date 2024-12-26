import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  flashcards: localStorage.getItem('flashcards')
    ? JSON.parse(localStorage.getItem('flashcards'))
    : [],
}

export const flashcardSlice = createSlice({
  name: 'flashcard',
  initialState,
  reducers: {
    setFlashCard(state, action) {
      const newFlashCard = action.payload
      newFlashCard.cards = newFlashCard.cards || []

      state.flashcards.push(newFlashCard)
      localStorage.setItem('flashcards', JSON.stringify(state.flashcards))
    },
    addCardToFlashCard(state, action) {
      const { groupId, card } = action.payload
      const flashcard = state.flashcards.find((f) => f.groupid === groupId)
      if (flashcard) {
        flashcard.cards.push(card)
        localStorage.setItem('flashcards', JSON.stringify(state.flashcards))
      }
    },

    removeFlashCard(state, action) {
      const { groupId } = action.payload
      state.flashcards = state.flashcards.filter(
        (flashcard) => flashcard.groupid !== groupId
      )
      localStorage.setItem('flashcards', JSON.stringify(state.flashcards))
    },
  },
})

export const { setFlashCard, addCardToFlashCard, removeFlashCard } =
  flashcardSlice.actions

export const cardById = (state, groupId) =>
  state.flashcard.flashcards.find((c) => c.groupid === groupId)

export default flashcardSlice.reducer
