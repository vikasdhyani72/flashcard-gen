import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RiArrowGoBackLine } from 'react-icons/ri'
import { IoDownloadOutline, IoPrintOutline } from 'react-icons/io5'
import { BiArrowBack } from 'react-icons/bi'
import { useNavigate, useParams } from 'react-router-dom'
import ShareModal from '../components/ShareModal'
import TabHands from '../assets/hands-tab.jpg'

const Flashcard = () => {
  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)

  const { groupId } = useParams()
  const navigate = useNavigate()

  const flashcards = useSelector((state) => state.flashcard.flashcards)

  const [ourCard, setOurCard] = useState(null)
  const [singleCardDetail, setSingleCardDetail] = useState(null)

  const displayCard = (id) => {
    if (!ourCard || !ourCard.cards) return
    const showSingleCard = ourCard.cards.find((c) => c.cardid === id)
    setSingleCardDetail(showSingleCard)
  }

  useEffect(() => {
    if (!groupId || !flashcards) return

    const selectedCard = flashcards.find(
      (flashcard) => flashcard.groupid === groupId
    )
    if (selectedCard) {
      setOurCard(selectedCard)
      if (selectedCard.cards && selectedCard.cards.length > 0) {
        setSingleCardDetail(selectedCard.cards[0])
      }
    } else {
      console.error('No matching group found for groupId:', groupId)
    }
  }, [groupId, flashcards])

  if (!ourCard) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-slate-500">
        No Data Available
      </div>
    )
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    const fileContent =
      singleCardDetail?.carddescription || 'No description available'
    const blob = new Blob([fileContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    element.href = url
    element.download = `${singleCardDetail?.cardname || 'card'}.txt`
    element.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section className="flex flex-col text-slate-600">
      <header className="flex">
        <BiArrowBack
          className="text-3xl mr-6 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <div className="flex flex-col">
          <h2 className="text-xl text-black font-bold">{ourCard.groupname}</h2>
          {ourCard.groupdescription && (
            <p className="my-2">{ourCard.groupdescription}</p>
          )}
        </div>
      </header>
      <main className="mt-6 grid grid-rows-1 md:grid-cols-4">
        <aside className="col-span-1 bg-white w-[60vw] md:w-[10rem] xl:w-[17rem] m-5 px-1 py-2 h-fit rounded-md">
          <h2 className="p-2 ">Flashcards</h2>
          <hr />
          <hr className="mb-2" />
          {ourCard.cards &&
            ourCard.cards.map((card) => (
              <p
                key={card.cardid}
                className={`py-2 px-8 text-slate-700 font-medium hover:bg-slate-100 cursor-pointer ${
                  card.cardid === singleCardDetail?.cardid &&
                  '!text-red-500 !font-bold'
                }`}
                onClick={() => displayCard(card.cardid)}
              >
                {card.cardname}
              </p>
            ))}
        </aside>

        <section className="col-span-3 md:col-span-2 flex flex-col xl:flex-row items-center w-full bg-white shadow-lg rounded-lg">
          <img
            src={TabHands}
            alt="cardimage"
            className="object-contain w-[32rem] xl:w-[20vw] h-full p-6"
          />
          <p className="w-full p-6 py-10">
            {singleCardDetail?.carddescription || 'No description available'}
          </p>
        </section>
        <aside className="col-span-1 flex md:flex-col items-center space-y-5 md:space-y-3 gap-5 justify-center">
          <button
            type="button"
            onClick={openModal}
            className="flex items-center py-3 px-5 xl:w-60 space-x-5 bg-white rounded-md shadow-lg active:scale-100 transition-all duration-100 hover:scale-105"
          >
            <RiArrowGoBackLine className="scale-x-[-1]" />
            <span className="hidden xl:block">Share</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center py-3 px-5 xl:w-60 space-x-5 bg-white rounded-md shadow-lg active:scale-100 transition-all duration-100 hover:scale-105"
          >
            <IoDownloadOutline />
            <span className="hidden xl:block">Download</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center py-3 px-5 xl:w-60 space-x-5 bg-white rounded-md shadow-lg active:scale-100 transition-all duration-100 hover:scale-105"
          >
            <IoPrintOutline />
            <span className="hidden xl:block">Print</span>
          </button>
        </aside>
      </main>
      <ShareModal isOpen={isOpen} closeModal={closeModal} />
    </section>
  )
}

export default Flashcard
