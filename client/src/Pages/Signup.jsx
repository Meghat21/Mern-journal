import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Button, Label, TextInput ,Alert} from 'flowbite-react'
import OAuth from '../Components/OAuth';

function Signup() {
  const navigate=useNavigate();
  const[form,setForm]=useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange=(e)=>{
    setForm({...form,[e.target.id]:e.target.value.trim()})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if (!form.username || !form.email || !form.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res=await fetch('/app/v1/auth/sign-up',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(form)
      });
      const data=await res.json()
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/sign-in')
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }
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
          <form className='flex flex-col gap-7' onSubmit={handleSubmit}>
            <div>
              <Label value='your username'/>
              <TextInput
                onChange={handleChange}
                type='text'
                placeholder='Username'
                id='username'
              />
            </div>
            <div>
              <Label value='your email'/>
              <TextInput
                onChange={handleChange}
                type='text'
                placeholder='email@company.com'
                id='email'
              />
            </div>
            <div>
              <Label value='your password'/>
              <TextInput
                onChange={handleChange}
                type='text'
                placeholder='password'
                id='password'
              />
            </div>

            <Button disabled={loading} gradientDuoTone='purpleToPink' type='submit' outline>{loading ? 'Loading...Please wait' : 'Sign Up'}</Button>
            <OAuth/>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account ?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign in
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}  
        </div>
      </div>
    </div>
  )
}

export default Signup
