import React, { useEffect, useState } from 'react'

import UserCard from './UserCard';

const UserGrid = () => {

 

  return (
    <>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-[1200px] mx-2 p-10 gap-4 item-center'>
     <UserCard/>
     <UserCard/>
     <UserCard/>
     <UserCard/>
      </div>
    </>
  )
}

export default UserGrid
