import React, { useState, useRef } from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import FlashCardSchema from '../components/validation/schema/CardSchema'
import { nanoid } from 'nanoid'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline'
import { useDispatch } from 'react-redux'
import { setFlashCard } from '../features/flashcard/flashCardSlice'

const CreateFlashCard = () => {
  const dispatch = useDispatch()
  const filePickerRef = useRef(null)
  const editRef = useRef(null)
  const [groupImg, setGroupImg] = useState('')

  // Function to handle adding a new flashcard group
  const addFlashCard = (values, actions) => {
    dispatch(setFlashCard(values))
    actions.resetForm()
    setGroupImg('')
  }

  return (
    <div className="container mx-auto px-4">
      <Formik
        initialValues={{
          groupid: nanoid(),
          groupname: '',
          groupdescription: '',
          groupimg: null,
          cards: [
            {
              cardid: nanoid(),
              cardname: '',
              carddescription: '',
            },
          ],
          createOn: new Date(Date.now()).toLocaleString(),
        }}
        validationSchema={FlashCardSchema}
        onSubmit={addFlashCard}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form className="w-full space-y-5 text-slate-500 font-medium">
            {/* Group Information Section */}
            <div className="flex flex-col space-y-4 bg-white drop-shadow-lg rounded-md p-5">
              <div className="flex flex-col sm:w-full sm:space-y-4">
                {/* Group Name Section */}
                <div className="flex flex-col">
                  <h2 className="mb-2">Create Group</h2>
                  <Field
                    type="text"
                    name="groupname"
                    className="border-slate-300 w-full border-2 rounded-sm focus:ring-slate-400 focus:border focus:border-slate-400"
                  />
                  <span className="absolute right-2 top-2 text-lg font-medium">
                    *
                  </span>
                  <ErrorMessage
                    component={'div'}
                    className="text-sm text-red-500"
                    name="groupname"
                  />
                </div>

                {/* Upload Image Section */}
                <div className="flex flex-col sm:w-full">
                  {groupImg ? (
                    <img
                      src={groupImg}
                      alt="groupImg"
                      className="w-28 h-28 object-contain mt-4 mx-auto"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => filePickerRef.current.click()}
                      className="flex items-center justify-center px-4 py-2 bg-white border-2 border-slate-300 active:border-blue-600 text-blue-700 font-semibold rounded-sm w-full mt-4 mx-auto"
                    >
                      <UploadOutlined />
                      <span className="ml-4">Upload Image</span>
                      <input
                        type="file"
                        ref={filePickerRef}
                        onChange={(e) => {
                          const file = e.target.files[0]
                          const reader = new FileReader()
                          reader.readAsDataURL(file)

                          reader.onload = () => {
                            setFieldValue('groupimg', reader.result)
                            setGroupImg(reader.result)
                          }
                        }}
                        hidden
                      />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-col w-full">
                <h2 className="mb-2">Add Description</h2>
                <Field
                  as="textarea"
                  name="groupdescription"
                  rows={3}
                  placeholder="Describe the roles, responsibilities, skills required for the job and help candidate understand the role better"
                  className="resize-none border-slate-300 w-full border-2 rounded-sm placeholder:opacity-40 focus:ring-slate-400 focus:border focus:border-slate-400"
                />
                <ErrorMessage
                  component={'div'}
                  className="text-sm text-red-500"
                  name="groupdescription"
                />
              </div>
            </div>

            {/* Cards Section */}
            <div className="text-black drop-shadow-lg rounded-lg">
              <FieldArray name="cards">
                {(arrayHelper) => {
                  const cards = values.cards
                  return (
                    <div className="space-y-4">
                      {cards && cards.length > 0
                        ? cards.map((card, index) => (
                            <div
                              className="flex flex-col space-y-4 bg-white px-4 py-4 sm:flex-row sm:items-center sm:space-x-6"
                              key={index}
                            >
                              <div className="p-2 w-10 h-10 flex items-center justify-center bg-red-600 text-white text-md font-semibold rounded-full">
                                {index + 1}
                              </div>
                              <div className="flex flex-col w-full space-y-3">
                                <div className="relative">
                                  <h2 className="mb-2">Enter Term</h2>
                                  <Field
                                    type="text"
                                    name={`cards.${index}.cardname`}
                                    className="border-slate-300 w-full border-2 rounded-sm focus:ring-slate-400 focus:border focus:border-slate-400"
                                    innerRef={editRef}
                                  />
                                  <ErrorMessage
                                    component={'div'}
                                    className="text-sm text-red-500"
                                    name={`cards.${index}.cardname`}
                                  />
                                </div>
                                <div className="relative">
                                  <h2 className="mb-2">Enter Definition</h2>
                                  <Field
                                    as="textarea"
                                    name={`cards.${index}.carddescription`}
                                    className="resize-none border-slate-300 w-full border-2 rounded-sm placeholder:opacity-40 focus:ring-slate-400 focus:border focus:border-slate-400"
                                  />
                                  <ErrorMessage
                                    component={'div'}
                                    className="text-sm text-red-500"
                                    name={`cards.${index}.carddescription`}
                                  />
                                </div>
                              </div>
                              <div className="flex justify-end space-x-2">
                                <button
                                  type="button"
                                  onClick={() => arrayHelper.remove(index)}
                                >
                                  <TrashIcon className="h-6 text-slate-500" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => editRef.current.focus()}
                                >
                                  <PencilAltIcon className="h-6 text-blue-600" />
                                </button>
                              </div>
                            </div>
                          ))
                        : null}
                      <button
                        type="button"
                        onClick={() =>
                          arrayHelper.push({
                            cardid: nanoid(),
                            cardname: '',
                            carddescription: '',
                          })
                        }
                        className="flex items-center space-x-2 text-blue-600 font-medium text-sm bg-white w-full px-5 py-2 rounded-md"
                      >
                        <PlusOutlined />
                        <span>Add More</span>
                      </button>
                      <div className="flex justify-center w-full">
                        <button
                          disabled={isSubmitting}
                          type="submit"
                          className="py-2 px-6 bg-red-600 text-white rounded-md"
                        >
                          Create
                        </button>
                      </div>
                    </div>
                  )
                }}
              </FieldArray>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CreateFlashCard
