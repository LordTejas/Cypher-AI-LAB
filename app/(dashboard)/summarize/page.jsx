'use client'

import { useState, useEffect } from 'react'
import TextArea from '@/app/_components/TextArea'
import Button from '@/app/_components/Button'
import { useSnackbar } from 'notistack'

import { generateSummary } from '@/actions/summary'

const Page = () => {

  const { enqueueSnackbar } = useSnackbar()
  const [data, setData] = useState({
    textInput: '',
    textOutput: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    /**
     * Fetch previous result from local storage (keeps persisting data on page refresh)
     */
    const fetchPrevResult = () => {
      const quizTextInput = localStorage.getItem('summaryTextInput')
      const quizTextOutput = localStorage.getItem('summaryTextOutput')

      if (quizTextInput && quizTextOutput) {
        setData({
          textInput: quizTextInput,
          textOutput: quizTextOutput
        })

        enqueueSnackbar('Previous result loaded!', { variant: 'info' })
      }
    }

    fetchPrevResult()
  }, [])

  const updateData = (key, value) => {
    setData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleGenerateQuiz = async () => {
    setLoading(true)
    try {
      const res = await generateSummary(data.textInput)
      updateData('textOutput', res)

      // Save result in local storage
      localStorage.setItem('summaryTextInput', data.textInput)
      localStorage.setItem('summaryTextOutput', res)

    } catch (error) {
      console.error(error)
      enqueueSnackbar('Something went wrong!', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }


  return (
    <main className='w-full h-full max-h-screen bg-white flex flex-col justify-start gap-4 p-8 select-none overflow-auto'>

      {/* Heading */}
      <h1 className='w-full text-3xl font-semibold'>Summary AI</h1>

      {/* Text Box */}
      <div className='w-full flex flex-col gap-2'>
        <label className='text-lg font-semibold'>Text Context</label>
        <TextArea
          type='text'
          rows={10}
          placeholder='Enter Text Context'
          value={data?.textInput}
          onChange={e => updateData('textInput', e.target.value)}
        />
      </div>

      <div className='flex justify-between items-center'>

        <Button
          color='bg-purple-700 hover:bg-purple-800 text-white font-medium'
          onClick={handleGenerateQuiz}
          loading={loading}
        >
          Generate
        </Button>
      </div>

      <TextArea
        key={1}
        type='text'
        rows={15}
        placeholder='Summary Output'
        value={data?.textOutput}
        readOnly
      />


    </main>
  )
}

export default Page