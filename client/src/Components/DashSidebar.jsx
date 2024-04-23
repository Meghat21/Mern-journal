import React from 'react'
import {Sidebar} from 'flowbite-react'
import {HiUser,HiArrowSmRight} from 'react-icons/hi'
import { useEffect, useState } from 'react'
import {Link, useLocation} from 'react-router-dom'


function DashSidebar() {
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
            <Sidebar.ItemGroup>
                <Link to='/dashboard?tab=profile'>
                <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={'User'} labelColor='dark' as='div'>
                    Profile
                </Sidebar.Item>
                </Link>
                <Sidebar.Item icon={HiArrowSmRight} classname='cursor-pointer'>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar
