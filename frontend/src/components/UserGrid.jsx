import React, { useEffect, useState } from 'react'

import UserCard from './UserCard';
import { BASE_URL } from '../App';

const UserGrid = ({ users, setUsers }) => {

  const [loading, setLoading] = useState(true)

  const [selectedUser, setSelectedUser] = useState(null); // State to track selected user for editing

  const handleEditClick = (user) => {
    setSelectedUser(user); // Set the clicked user as the selected user
    console.log("selected user id",user)
  };

  useEffect(() => {


    const getUsers = async () => {
      try {
        const res = await fetch(BASE_URL + "/friends");
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
  

  return (
    <>
     
     {loading ? (
      <p>Loading...</p>
    ) : (
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-[1200px] mx-2 p-10 gap-4 item-center'>
        {users.map((user) => (
					<UserCard key={user.id} user={user} setUsers={setUsers}  onEditClick={() => handleEditClick(user)}/>
				))}
      </div>
    )}
     
    </>
  )
}

export default UserGrid
