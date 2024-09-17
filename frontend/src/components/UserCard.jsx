import React from 'react'
import { useTheme } from '../hook/ThemeContext';
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditModal from './EditModal';
import { BASE_URL } from '../App';
import toast from 'react-hot-toast';


const UserCard = ({user , setUser}) => {
    const { theme } = useTheme();

    const cardBg = theme === "dark" ? "bg-gray-700" : "";
    const textCol = theme === "dark" ? "text-white" : "";

    const handleDeleteUser =async(e)=>{
     try {
        const res = await fetch (BASE_URL + "/friends/"+user.id ,
           { method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error);
        }

        setUser = ((prevUsers) => (prevUsers.filter((u)=>u.id != user.id)));
        toast.success("Friend deleted successfully.")
     } catch (error) {
        toast.error(error.message)
     }
    }
    return (
        <div>
            <div className={`card bg-base-100 w-full m-3 ${cardBg} shadow-xl`}>
                <div className="card-body p-5">
                    <div className='flex justify-between'>
                        <div className='flex justify-center gap-4'>
                            <div className="avatar">
                                <div className="w-12 rounded-full">
                                    <img src={user.imgUrl} />
                                </div>
                            </div>
                            <div className=' flex flex-col justify-center '>
                                <p className={`card-title text-base font-bold ${textCol}`}>{user.name}</p>
                                <p className={` text-sm ${textCol}`}>{user.role}</p>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                           <EditModal user ={user} setUser ={setUser}/>
                            <button className='w-6 h-6 rounded hover:bg-gray-400 transition-colors flex items-center justify-center'
                            onClick={handleDeleteUser}>
                                <RiDeleteBin6Line className='w-4 h-4 text-red-300 ' />
                            </button>
                        </div>
                    </div>
                    <p className={`mt-5 text-sm ${textCol}`}>{user.description}</p>

                </div>
            </div>

        </div>
    )
}

export default UserCard
