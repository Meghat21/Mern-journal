import {useDispatch,useSelector} from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'



export default function OnlyAdminRoute(){
    const {currentUser}=useSelector((state)=>state.user)
    return currentUser.isAdmin ? <Outlet/> : <Navigate to='/sign-in'/>
}