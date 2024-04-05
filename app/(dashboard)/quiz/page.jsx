'use client'

import { useState, useEffect } from 'react'
import TextArea from '@/app/_components/TextArea'
import Button from '@/app/_components/Button'
import { Tab } from '@headlessui/react'
import { useSnackbar } from 'notistack'

import { generateMcqQuiz } from '@/actions/quiz'

const Page = () => {

  const { enqueueSnackbar } = useSnackbar()
  const [data, setData] = useState({
    textInput: '',
    textOutput: '',
  })
  const [loading, setLoading] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0)

  const tabs = [
    'TEXT',
    'JSON'
  ]

  useEffect(() => {

    /**
     * Fetch previous result from local storage (keeps persisting data on page refresh)
     */
    const fetchPrevResult = () => {
      const quizTextInput = localStorage.getItem('quizTextInput')
      const quizTextOutput = localStorage.getItem('quizTextOutput')

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

  const OutputTab = ({ children, selected, onClick }) => {
    return (
      <Tab>
        <Button
          color={`${selected ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'hover:bg-neutral-200 text-black'}`}
          onClick={onClick}
        >
          {children}
        </Button>
      </Tab>
    )
  }

  const updateData = (key, value) => {
    setData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleGenerateQuiz = async () => {
    setLoading(true)
    try {
      const res = await generateMcqQuiz(data.textInput)
      updateData('textOutput', res)

      // Save result in local storage
      localStorage.setItem('quizTextInput', data.textInput)
      localStorage.setItem('quizTextOutput', res)

    } catch (error) {
      console.error(error)
      enqueueSnackbar('Something went wrong!', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const getTextOutput = (jsonText) => {
    const jsonOutput = JSON.parse(jsonText || '[]')

    let textOutput = ''
    jsonOutput?.forEach((question, index) => {
      textOutput += `${index + 1}: ${question?.question}\n`
      question?.options.forEach((option, i) => {
        textOutput += `- ${option}\n`
      })
      textOutput += `Answer: ${question?.answer}\n\n`
    })

    return textOutput
  }

  return (
    <main className='w-full h-full max-h-screen bg-white flex flex-col justify-start gap-4 p-8 select-none overflow-auto'>

      {/* Heading */}
      <h1 className='w-full text-3xl font-semibold'>Quiz AI</h1>

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

      <Tab.Group as='div' className='w-full'>

        <div className='w-full flex justify-between items-center mb-2'>

          <Tab.List className='w-full flex justify-start items-center gap-2'>
            {tabs.map((tab, index) => (
              <OutputTab key={index} selected={selectedTab === index} onClick={() => setSelectedTab(index)}>
                {tab}
              </OutputTab>
            ))}
          </Tab.List>

          <Button
            color='bg-purple-700 hover:bg-purple-800 text-white font-medium'
            onClick={handleGenerateQuiz}
            loading={loading}
          >
            Generate
          </Button>

        </div>

        <Tab.Panels>
          <Tab.Panel>
            <TextArea
              key={0}
              type='text'
              rows={15}
              placeholder='Text Output will be displayed here...'
              value={getTextOutput(data?.textOutput)}
              readOnly
            />
          </Tab.Panel>
          <Tab.Panel>
            <TextArea
              key={1}
              type='text'
              rows={15}
              placeholder='JSON Output will be displayed here...'
              value={data?.textOutput}
              readOnly
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>



    </main>
  )
}

export default Page