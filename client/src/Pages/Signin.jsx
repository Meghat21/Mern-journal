import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Button, Label, TextInput ,Alert} from 'flowbite-react'
import {signInFailure,signInStart,signInSuccess} from '../redux/User/userSlice'
import {useDispatch,useSelector} from 'react-redux'
import OAuth from '../Components/OAuth'

function Signin() {
  const dispatch=useDispatch()
  const navigate=useNavigate();
  const[form,setForm]=useState({});
  const{loading,error:errorMessage}=useSelector(state=>state.user)

  const handleChange=(e)=>{
    setForm({...form,[e.target.id]:e.target.value.trim()})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if (!form.email || !form.password) {
      return dispatch(signInFailure("Please fill all the fields"))
    }
    try {
      dispatch(signInStart())
      const res=await fetch('/app/v1/auth/sign-in',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(form)
      });
      const data=await res.json()
      if (data.success === false) {
        dispatch(signInFailure(data.message))
      }
      if(res.ok){
        dispatch(signInSuccess(data))
        navigate('/')
      }
    } catch (error) {
        dispatch(signInFailure(error.message))
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
                placeholder='*******'
                id='password'
              />
            </div>

            <Button disabled={loading} gradientDuoTone='purpleToPink' type='submit' outline>{loading ? 'Loading...Please wait' : 'Sign In'}</Button>

            <OAuth/>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Dont have an account ?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign up
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

export default Signin
