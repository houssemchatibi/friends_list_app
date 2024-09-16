import React, { useEffect, useState } from 'react'

import UserCard from './UserCard';

const UserGrid = ({ users, setUsers }) => {

  const [loading, setLoading] = useState(true)

  useEffect(() => {


    const getUsers = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/friends");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error)
        }

        setUsers(data)

      } catch (error) {

        console.error(error);

      } finally {
        setLoading(false);
      }
    }
    getUsers();
  }, [setUsers])
  console.log("users", users);

  return (
    <>
     
     {loading ? (
      <p>Loading...</p>
    ) : (
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-[1200px] mx-2 p-10 gap-4 item-center'>
        
         { users.map((user) => <UserCard key={user.id} user={user} />)
        }
      </div>
    )}
     
    </>
  )
}

export default UserGrid
