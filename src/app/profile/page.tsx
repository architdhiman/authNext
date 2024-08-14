'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

const page = () => {
  const router = useRouter()
  const[user,setUser] = useState("")

  const logout = async() =>{
    try {
    await axios.get("/api/users/logout")      
    router.push('/login')
    } catch (error) {
      console.log(error)  
    }
  }
  const getUserDetails = async() =>{
    try {
      const res = await axios.post("/api/users/profile")      
      setUser(res.data.user)    
    } catch (error) {
      console.log(error) 
    }
  }
  
  useEffect(()=>{
    getUserDetails()
  },[])

  return (
    <>
      Profile page <br/>
      {user._id} <br/>
      <button style={{border:"2px solid green"}}> <Link href={`/profile/${user._id}`}>CLICK TO VISIT PROFILE</Link></button>  
      <button style={{border:"2px solid red"}} onClick={logout}>LOGOUT</button>
    </>
  )
}

export default page
