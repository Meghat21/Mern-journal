import React from 'react'
import {Link} from 'react-router-dom'
import {Button, Label, TextInput} from 'flowbite-react'

function Signup() {
  return (
    <div className="min-h-screen  mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className='flex-1' id='left'>
          <Link
          to='/'
          className='font-bold dark:text-white text-4xl'
        >
          <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
            Spill The Truth
          </span>
        </Link>
        <p className='text-sm mt-5'>
          Dear Diary, <br/>
          why just for humans .let's write down everyday about my dog . How harsh the truth is we all know they got short span of life.<br/>
          So why not remember every small moment through  this platform? Share your thoughts and feelings with others.
        </p>
        </div>
        <div className="flex-1" id='right'>
          <form className='flex flex-col gap-7'>
            <div>
              <Label value='your username'/>
              <TextInput
                type='text'
                placeholder='Username'
                id='username'
              />
            </div>
            <div>
              <Label value='your email'/>
              <TextInput
                type='text'
                placeholder='email@company.com'
                id='email'
              />
            </div>
            <div>
              <Label value='your password'/>
              <TextInput
                type='text'
                placeholder='password'
                id='password'
              />
            </div>

            <Button gradientDuoTone='purpleToPink' type='submit' outline>Sign Up</Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account ?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
