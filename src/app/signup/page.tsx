'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast/headless'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const page = () => {
  const[user,setUser] = useState({username:"",email:"",password:""})
  const[buttonDisabled,setButtonDisabled] = useState(false)
  const[loading,setLoading] = useState(false)
  const router = useRouter()

  const onSignup = async() => {
    try {
      setLoading(true)
      const response = await axios.post(`/api/users/signup`,user)
      console.log("signup success ",response.data)
      router.push('/login')
    } catch (error:any) {
      console.log("signup failed",error)
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    if(user.username.length > 0 && user.email.length > 0 && user.password.length > 0)
      {
        setButtonDisabled(false)
      } 
      else{
        setButtonDisabled(true)
      }
  },[user])
  
  return (
    <div>
      <h2>{loading ? "processing..." : "Sign Up Page"}</h2>
      <div>
        <div>
          email : <input type="email" style={{color:"black"}} value={user.email} onChange={(e)=> setUser({...user, email:e.target.value })}  /> <br/>
          username : <input type="name" style={{color:"black"}} value={user.username} onChange={(e)=> setUser({...user, username:e.target.value })} /><br/>
          password : <input type="password" style={{color:"black"}} value={user.password} onChange={(e)=> setUser({...user, password:e.target.value })} /><br/>
        </div>
        <button onClick={onSignup} style={{border:"2px solid red"}}>{buttonDisabled ? "Write fields" : "Signup"}</button> <br />
        <Link href='/login'>Go onto Login page</Link>
      </div>
    </div>
  )
}

export default page
