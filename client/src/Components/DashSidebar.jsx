import React from 'react'
import {Sidebar} from 'flowbite-react'
import {HiUser,HiArrowSmRight,HiDocumentText} from 'react-icons/hi'
import { useEffect, useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux'


function DashSidebar() {
    const {currentUser}=useSelector(state=>state.user)
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
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
                <Link to='/dashboard?tab=profile'>
                <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'} labelColor='dark' as='div'>
                    Profile
                </Sidebar.Item>
                </Link>
                {
                    currentUser.isAdmin && (
                <Link to='/dashboard?tab=posts'>
                <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} labelColor='dark' as='div'>
                    Post
                </Sidebar.Item>
                </Link>
                    )
                }
                <Sidebar.Item icon={HiArrowSmRight} classname='cursor-pointer'>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar
