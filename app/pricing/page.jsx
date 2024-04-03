'use client'

import React from 'react'
import Button from '@/app/_components/Button'
import Link from 'next/link'

const PricingCard = ({ name, price, features, color }) => {

  return (
    <div className={`w-[22rem] h-[26rem] flex flex-col justify-between items-start gap-2 p-[2rem] rounded-xl shadow-xl select-none ${color}`}>
      <h2 className="text-2xl font-semibold">{name}</h2>

      <p className="text-4xl font-semibold">${price}</p>

      <ul className="text-white mt-6 flex-1">
        {
          features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))
        }
      </ul>

      <Link href="/dashboard" className='w-full'>
        <Button
          text="Get Started"
          color="w-full bg-white text-black mt-12"
          className="mt-8"
        >
          Get Started
        </Button>
      </Link>

    </div>
  )
}

const Page = () => {

  const plans = [
    {
      name: 'Free',
      price: 0,
      features: [
        '5 credits per week',
        'Basic features',
        'Limited access',
        'Community support',
        'Ads'
      ],
      color: 'bg-gradient-to-r from-gray-700 to-black text-white'
    },
    {
      name: 'Pro',
      price: 9.99,
      features: [
        '100 credits per month',
        'All features',
        'Unlimited access',
        'Priority support',
        'No ads'
      ],
      color: 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white'
    },
  ]

  return (
    <main className="h-screen w-screen flex flex-col justify-center items-center gap-4">

      <h1 className="col-span-5 text-3xl font-semibold border-slate-950 text-center mt-8">Pricing</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plans.map((plan, index) => (
          <PricingCard
            key={index}
            name={plan.name}
            price={plan.price}
            features={plan.features}
            color={plan.color}
          />
        ))}
      </div>

    </main>
  )
}

export default Page