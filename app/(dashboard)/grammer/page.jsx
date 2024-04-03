'use client'

import { useState, Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import TextArea from '@/app/_components/TextArea'
import { ChevronsUpDown, Check } from 'lucide-react'

const Page = () => {

  const [data, setData] = useState({
    textContent: '',
    tone: 'NORMAL',
  })

  const TONE_OPTIONS = [
    'Casual',
    'Formal',
    'Professional',
    'Friendly',
    'Informative',
    'Persuasive',
    'Keep Original Tone Intact',
  ]

  const updateData = (key, value) => {
    setData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <main className='w-full h-full max-h-screen bg-white flex flex-col justify-start gap-4 p-8 select-none overflow-hidden'>

      {/* Heading */}
      <h1 className='w-full text-3xl font-semibold'>Grammer AI</h1>

      {/* Text Box */}
      <div className='w-full flex flex-col gap-2'>
        <label className='text-lg font-semibold'>Text Context</label>
        <TextArea
          type='text'
          rows={10}
          placeholder='Enter Text Context'
          value={data?.textContent}
          onChange={e => updateData('textContent', e.target.value)}
        />
      </div>

      {/* Tone Selecter */}
      <div className='w-[26ch] relative'>
        <Listbox
          as={Fragment}
          value={data?.tone}
          onChange={value => updateData('tone', value)}
        >
          <Listbox.Button
            className='w-full whitespace-nowrap text-md font-medium bg-slate-950 text-white flex justify-between items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white cursor-pointer mb-1'
          >
            {data?.tone}
            <ChevronsUpDown size={24} strokeWidth={1.25} className='text-white' />
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className='relative max-h-[40vh] overflow-auto flex flex-col justify-start rounded-md bg-slate-100 py-2'>
              {TONE_OPTIONS.map((option, index) => (
                <Listbox.Option
                  key={index}
                  value={option}
                  className={`hover:bg-slate-300 text-black font-medium flex justify-between items-center px-3 py-2`}
                >
                  {option}
                  {data?.tone === option && <Check size={24} strokeWidth={1.25} className='text-black' />}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>

        </Listbox>
      </div>

    </main>
  )
}

export default Page