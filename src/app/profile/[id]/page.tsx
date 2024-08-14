'use client'
import React from 'react'

const page = ({params}:any) => {    
  return (
    <div>
      dynamic routing <br/>
      {params.id}
    </div>
  )
}

export default page
