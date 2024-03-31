import React from 'react';
import { register } from '@/actions/register';


export default function RegisterPage() {
  return (
    <div className='w-full h-full bg-white shadow-sm rounded-xl p-6 flex flex-col justify-start gap-[12px]'>

      <h1 className='text-3xl font-semibold text-start'>Register</h1>

      <form className='flex flex-col gap-4' action={register}>

        <div className='w-full flex flex-col justify-start gap-2'>
          <label htmlFor="email">Email</label>
          <input name='email' type='email' className='border border-solid border-slate-900 rounded-xl px-3 py-2' />
        </div>

        <div className='w-full flex flex-col justify-start gap-2'>
          <label htmlFor="password">Password</label>
          <input name='password' type='password' className='border border-solid border-slate-900 rounded-xl px-3 py-2' />
        </div>

        <div className='w-full flex flex-col justify-start gap-2'>
          <label htmlFor="cnfPassword">Confirm Password</label>
          <input name='cnfPassword' type='password' className='border border-solid border-slate-900 rounded-xl px-3 py-2' />
        </div>

        <button className='bg-slate-900 text-white rounded-lg py-2 hover:scale-[1.02] active:scale-[0.98] transition-all'>Register</button>

        <div>
          Already have an account? <a href='/auth/login' className='text-slate-900 hover:underline'>Login</a>
        </div>
      </form>

    </div>
  );
}
