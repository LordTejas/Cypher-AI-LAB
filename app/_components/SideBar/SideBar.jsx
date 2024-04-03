import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Home, BookA, Settings } from 'lucide-react'

import PlanCard from './PlanCard'

const SideBar = () => {

  const pathname = usePathname()

  const menuList = [
    {
      name: 'Dashboard',
      icon: Home,
      path: '/dashboard',
      color: 'text-sky-500'
    },
    {
      name: 'Correct Grammer',
      icon: BookA,
      path: '#',
      color: 'text-yellow-500'
    },
    {
      name: 'Settings',
      icon: Settings,
      path: '/settings',
      color: 'text-white'
    }
  ]

  const headingMarkup = (
    <div className='flex items-center justify-start gap-4 h-12 text-white text-xl font-semibold'>
      <Image
        src="/images/CypherLogo.avif"
        alt='Cypher AI Lab'
        width={48}
        height={48}
        loading='eager'
        className='rounded-full object-cover scale-105'
        draggable={false}
      />

      <p>Cypher AI Lab</p>
    </div>
  )

  return (
    <nav className='w-full h-full bg-slate-950 flex flex-col justify-between gap-4 px-4 py-6 select-none'>

      {headingMarkup}

      <div className='h-full flex flex-col justify-start gap-3 mt-4'>
        {
          menuList.map((menu, index) => (
            <Link
              key={index}
              href={menu.path}
              draggable={false}
            >
              <div className={`w-full h-full flex justify-start items-center gap-2 px-[12px] py-[10px] rounded-lg hover:bg-white/10 hover:text-white ${pathname === menu.path ? 'bg-white/20' : 'bg-transparent'}`}>
                <menu.icon size={22} strokeWidth={1.25} className={menu.color} />
                <p className='text-md text-white'>{menu.name}</p>
              </div>
            </Link>
          ))
        }
      </div>

      <PlanCard />
      
    </nav>
  )
}

export default SideBar