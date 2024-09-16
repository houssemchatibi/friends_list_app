import React, { useEffect, useState } from 'react'
import { TiUserAddOutline } from "react-icons/ti";
import toast from 'react-hot-toast';

const CreateUserModal = ({setUsers}) => {

  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    role: "",
    description: "",
    gender: "",
  })

const handleCreateUser =async(e) =>{
  e.preventDefault();
  setLoading(true);
  try {
    const res = await fetch ("http://127.0.0.1:5000/api/friends",
      {
        method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputs),
      }
    )
    const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error);
			}

    toast.success("Friend created successfully.")
    document.getElementById("my_modal_2").close();
    setUsers((prevUsers) => [...prevUsers, data]);
    setInputs({
      name: "",
      role: "",
      description: "",
      gender: "",
    });

  } catch (error) {
    toast.error(`${error.message}`)
    
  } finally {
     setLoading(false)
  }
  

}

  return (
    <div>
      <button className=' bg-gray-400 rounded-full h-10 w-10 m-1 flex items-center justify-center'
        onClick={() => document.getElementById('my_modal_2').showModal()}>
        <TiUserAddOutline className='h-6 w-6' />
      </button>
      <dialog id="my_modal_2" className="modal flex items-start justify-center mt-20">
        <div className="modal-box">
          <form method="dialog">

            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg mb-5">My New Friend ❤️</h3>
          <form className="max-w-sm mx-auto">

            <div className='flex justify-between '>
              <div className=" w-[48%] mb-5">
                <label className="block mb-2 text-sm font-medium ">Full Name</label>
                <input type="text" placeholder="Your Name" className="input input-bordered w-full  max-w-xs" required
                onChange={(e) => setInputs({ ...inputs, name: e.target.value })} />
              </div>
              <div className="w-[48%] mb-5">
                <label className="block mb-2 text-sm font-medium">Your Role</label>
                <input type="text" placeholder="Your Role" className="input input-bordered w-full  max-w-xs" required 
                onChange={(e) => setInputs({ ...inputs, role: e.target.value })}/>
              </div>
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium">Description</label>
              <textarea type="text" placeholder="Type here" rows="4" className="input input-bordered input-lg w-full text-sm focus:ring-blue-500 focus:border-blue-500 "
              onChange={(e) => setInputs({ ...inputs, description: e.target.value })} />
            </div>

            <div className="flex mb-5">

              <div className="flex items-center mx-3 ">
                <input type="radio" name="radio-1" className="radio" value ="male" 
										onChange={(e) => setInputs({ ...inputs, gender: e.target.value })} />
                <label htmlFor="inline-radio" className="ms-2 text-sm font-medium">Male</label>
              </div>
              <div className="flex items-center mx-3">
                <input type="radio" name="radio-1" className="radio" value="female"
                onChange={(e) => setInputs({ ...inputs, gender: e.target.value })} />
                <label htmlFor="inline-2-radio" className="ms-2 text-sm font-medium">Female</label>
              </div>
            </div>
            <div className='flex justify-end space-x-2'>

              <button type="button" className="btn bg-blue-500" onClick ={handleCreateUser}>Confirm</button>

              {/* if there is a button in form, it will close the modal */}
              <button className="btn" onClick={() => document.getElementById("my_modal_2").close()}>Close</button>

            </div>
          </form>


        </div>
      </dialog>
    </div>
  )
}

export default CreateUserModal
