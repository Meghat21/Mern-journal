import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import DashSidebar from '../Components/DashSidebar'
import DashProfile from '../Components/DashProfile'
import DashPost from '../Components/DashPost'

function Dashboard() {
  const loaction=useLocation()
  const[tab,setTab]=useState('')
  
  useEffect(()=>{
    const urlParams=new URLSearchParams(loaction.search);
    const tabFromUrl=urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[loaction.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className="md:w-56" id='sidebar'>
        <DashSidebar/>
      </div>
        {tab === 'profile' && <DashProfile/>}

        {/* post */}
        {tab === 'posts' && <DashPost/>}

    </div>
  )
}

export default Dashboard
