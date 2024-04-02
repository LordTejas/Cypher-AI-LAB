import React from 'react'
import Link from 'next/link'
import { Zap } from 'lucide-react'

const PlanCard = () => {

  const credits = 0
  const totalCredits = 5

  return (
    <div className='w-full h-fit bg-white/10 flex flex-col justify-start items-center gap-4 px-6 py-4 rounded-lg'>
      <p className='text-md text-white'>Credits Used {`${credits} / ${totalCredits}`}</p>

      {/* Progress bar */}
      <div className='w-full h-3 bg-white/20 rounded-lg'>
        <div className='h-full bg-white rounded-lg' style={{ width: `${(credits / totalCredits) * 100}%` }} />
      </div>

      <Link href='#' draggable={false}>
        <button type='button' className='w-full text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center gap-1 px-10 py-3 rounded-lg focus:outline-none duration-200 ease-in-out'>
          <span>Upgrade</span>
          <Zap size={24} strokeWidth={1.25} className='fill-white' />
        </button>
      </Link>

    </div>
  )
}

export default PlanCard