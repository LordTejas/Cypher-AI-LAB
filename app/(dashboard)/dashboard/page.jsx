'use client'

import React from 'react'
import { motion } from "framer-motion"
import { BookA, NotebookPen, GraduationCap } from 'lucide-react'
import Link from 'next/link'

const Page = () => {


  const cards = [
    {
      title: 'Quiz AI',
      description: 'Start generating quizzes for your study material with the help of AI',
      url: '/quiz',
      icon: GraduationCap,
      color: 'text-purple-500',
      initial: { opacity: 0, x: -80 },
      animate: { opacity: 1, x: 0 }
    },
    {
      title: 'Summarize AI',
      description: 'Summarize your study material with the help of AI',
      url: '/summarize',
      icon: NotebookPen,
      color: 'text-amber-700',
      initial: { opacity: 0, x: 80 },
      animate: { opacity: 1, x: 0 }
    },
    {
      title: 'Grammer AI',
      description: 'Check your grammar with the help of AI',
      url: '/grammer',
      icon: BookA,
      color: 'text-yellow-500',
      initial: { opacity: 0, x: -80 },
      animate: { opacity: 1, x: 0 }
    }
  ]

  return (
    <main className='w-full h-full max-h-screen bg-white flex flex-col justify-start items-start gap-6 p-8 select-none overflow-hidden'>

      {/* Heading */}
      <motion.div
        className='w-full flex flex-col justify-start items-start'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className='text-[3rem] font-bold bg-gradient-to-r from-red-700 via-amber-600 to-orange-500 bg-clip-text text-transparent'>Cypher AI Lab</h1>
        <p className='text-lg font-normal px-1 text-black'>Welcome to experience the power of AI in the field of Natural Language Processing</p>
      </motion.div>

      <div className='w-full flex flex-col justify-start items-start gap-3 mt-4'>
        {cards.map((card, index) => (
          <Link key={index} href={card.url}>
            <motion.div
              key={index}
              className='w-[40ch] flex justify-center items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white py-2 rounded-lg shadow-lg'
              initial={card.initial}
              animate={card.animate}
            >
              <card.icon size={24} strokeWidth={1.25} className={card.color} />
              <h2 className='w-[14ch] text-xl font-medium'>{card.title}</h2>
            </motion.div>
          </Link>
        ))}
      </div>

      <motion.div
        className='w-full flex flex-col justify-start items-start gap-3 mt-4'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className='text-lg text-black'>Hope you enjoy the experience!</p>
      </motion.div>

    </main>
  )
}

export default Page