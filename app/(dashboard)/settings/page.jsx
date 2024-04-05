'use client'

import { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useSettingsStore } from '@/app/_zustand/settings.zustand'
import { getUserByEmail, updateUserByEmail } from '@/actions/users'
import Input from '@/app/_components/Input'
import Button from '@/app/_components/Button'


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
    if (status === 'authenticated') {
      if (session?.user?.email) {
        fetchProfileData()
      }
    }
  }, [status, session])

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
            <Input
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
          <Input
            name='username'
            label='Username'
            placeholder='Username'
            value={profile?.username}
            onChange={(e) => updateProfileValue('username', e.target.value)}
          />
        </div>

        <div className='col-span-4'>
          <Input
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
          color='hover:bg-neutral-300 text-black'
          onClick={fetchProfileData}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          color='bg-slate-950 hover:bg-slate-700 text-white'
          onClick={saveProfileData}
          disabled={loading}
        >
          Save Profile
        </Button>
      </div>


      <h2 className='w-full text-2xl font-semibold border-b border-solid border-neutral-300'>Account</h2>

      <div>
        <Button
          color='bg-red-700 hover:bg-red-800 text-white'
          onClick={signOut}
          disabled={loading}
        >
          Sign Out
        </Button>
      </div>

    </main>
  )
}

export default Page