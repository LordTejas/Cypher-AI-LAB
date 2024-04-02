'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useSettingsStore } from '@/app/_zustand/settings.zustand'
import { getUserByEmail, updateUserByEmail } from '@/actions/users'

const TextInput = ({ name, label, placeholder, value, onChange, required, readOnly }) => {
  return (
    <div className='w-full'>
      <label htmlFor={name} className="block ml-1 mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
      <input type="text" id={name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} value={value} onChange={onChange} required={required} readOnly={readOnly} disabled={readOnly} />
    </div>
  )
}

const Button  = ({ children, onClick, background, color, disabled }) => {
  return (
    <button
      type='button'
      className={`${background} hover:${background}/20 ${color} font-medium py-2 px-5 rounded-lg focus:outline-none hover:scale-[1.02] focus:scale-[0.98] transition-all`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )

}

const Page = () => {

  const [loading, setLoading] = useState(false)
  const { data: session, status } = useSession()

  const [
    profile,
    setProfile,
    updateProfileValue,
  ] = useSettingsStore(state => [
    state.profile,
    state.setProfile,
    state.updateProfileValue
  ])

  const fetchProfileData = async () => {
    setLoading(true)
    try {
      const user = await getUserByEmail(session?.user?.email)

      setProfile(user)

    } catch (error) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfileData()
  }, [])

  const saveProfileData = async () => {
    setLoading(true)
    try {
      
      const data = {
        username: profile?.username,
        image: profile?.image,
        email: profile?.email
      }

      const newUser = await updateUserByEmail(data)
      setProfile(newUser)
      alert('Profile updated successfully!')
    } catch (error) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className='w-full h-full bg-white flex flex-col justify-start gap-4 p-8 select-none'>

      {/* Heading */}
      <h1 className='w-full text-3xl font-semibold'>Settings</h1>

      {/* Profile Settings */}
      <h2 className='w-full text-2xl font-semibold border-b border-solid border-neutral-300'>Profile</h2>

      <div className='grid grid-cols-10 justify-start gap-5'>

        {/* Image Layout */}
        <div className='col-span-4 grid grid-cols-5 justify-start gap-5'>
          <div className='col-span-1 h-auto'>
            <img
              src={profile?.image || 'https://placehold.co/100x100'}
              alt=''
              width={100}
              height={100}
              className='w-full rounded-lg bg-neutral-300 border-none outline-none'
            />
          </div>

          <div className='col-span-4'>
            <TextInput
              name='image'
              label='Image'
              placeholder='https://placehold.co/100x100'
              value={profile?.image}
              onChange={(e) => updateProfileValue('image', e.target.value)}
            />
          </div>
        </div>

        {/* Skip Some Space */}
        <div className='col-span-4'></div>

        <div className='col-span-4'>
          <TextInput
            name='username'
            label='Username'
            placeholder='Username'
            value={profile?.username}
            onChange={(e) => updateProfileValue('username', e.target.value)}
          />
        </div>

        <div className='col-span-4'>
          <TextInput
            name='email'
            label='Email'
            placeholder='Email'
            value={profile?.email}
            readOnly
          />
        </div>
      </div>

      <div className='flex justify-start items-center gap-2'>
        <Button 
        background={'bg-neutral-300'}
        color={'text-neutral-900'}
        onClick={fetchProfileData}
        disabled={loading}
        >
          Cancel
          </Button>

        <Button 
        background={'bg-slate-950'} 
        color={'text-white'}
        onClick={saveProfileData}
        disabled={loading}
        >
          Save Profile
          </Button>
      </div>

    </main>
  )
}

export default Page