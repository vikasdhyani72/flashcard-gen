import React from 'react'
import { useNavigate } from 'react-router-dom'
import DemoImg from '../assets/gray.jpg'
import { TrashIcon } from '@heroicons/react/outline'
import { useDispatch } from 'react-redux'
import { removeFlashCard } from '../features/flashcard/flashCardSlice'

const MySingleFlashCard = ({ flashcard }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  if (!flashcard) {
    return <div className="text-red-500">No flashcard data available</div>
  }

  const handleDelete = () => {
    dispatch(removeFlashCard({ groupId: flashcard.groupid }))
  }

  return (
    <div
      key={flashcard.groupid}
      className="p-4 m-6 mx-auto flex flex-col space-y-3 items-center justify-center bg-white rounded-md text-black w-[23rem] h-[16rem] relative border-2 border-slate-200"
    >
      <div className="absolute -top-5">
        {flashcard.groupimg ? (
          <img
            className="rounded-full w-14 h-16 object-contain aspect-square"
            src={flashcard.groupimg}
            alt={flashcard.groupname}
          />
        ) : (
          <img
            className="rounded-full w-16 h-16 object-cover aspect-square"
            src={DemoImg}
            alt={flashcard.groupname}
          />
        )}
      </div>
      <h2 className="font-bold text-lg pt-6">{flashcard.groupname}</h2>
      <p className="text-center font-medium text-sm text-slate-600 line-clamp-2">
        {flashcard.groupdescription}
      </p>
      <p className="font-medium text-sm text-slate-700">
        {flashcard.cards ? flashcard.cards.length : 0} Cards
      </p>
      <button
        onClick={() => navigate(`/flashcarddetails/${flashcard.groupid}`)}
        className="py-1 px-16 text-green-600 font-bold rounded-sm border-green-600 ring-2 ring-green-600 hover:bg-green-600 hover:text-white"
      >
        View Cards
      </button>

      <button
        onClick={handleDelete}
        className="text-red-600 py-1 px-20 border-2 font-bold border-red-600 rounded-md hover:bg-red-600 hover:text-white"
      >
        <TrashIcon className="h-5 " />
        <span>Delete</span>
      </button>
    </div>
  )
}

export default MySingleFlashCard
