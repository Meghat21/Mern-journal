import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "./index.css"
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard'
import Project from './Pages/Projects'
import Heade from './Pages/Heade'
import FooterCom from './Components/Footer'
import PrivateRoute from './Components/PrivateRoute'
import OnlyAdminRoute from './Components/OnlyAdminRoute'
import CreatePost from './Pages/CreatePost'
import UpdatePost from './Pages/UpdatePage'
import PostPage from './Pages/PostPage'
import ScrollToTop from './Components/ScrollToTop'

function App() {

  return (
    <>
      <BrowserRouter>
      <ScrollToTop/>
        
        <Heade/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/sign-in' element={<Signin/>}/>
          <Route path='/sign-up' element={<Signup/>} />
          <Route element={<PrivateRoute/>}>
            <Route path='/dashboard' element={<Dashboard/>} />
          </Route>
          <Route element={<OnlyAdminRoute/>}>
            <Route path='/create-post' element={<CreatePost/>} />
            <Route path='/update-post/:postId' element={<UpdatePost/>} />
          </Route>
          <Route path='/project' element={<Project/>}/>
          <Route path='/post/:postSlug' element={<PostPage/>} />
        </Routes>
      <FooterCom/>
      </BrowserRouter>
    </>
  )
}

export default App
