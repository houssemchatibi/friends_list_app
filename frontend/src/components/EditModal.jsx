import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { LuPencilLine } from "react-icons/lu";
import { BASE_URL } from '../App';

const EditModal = ({ user, setUsers }) => {
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: user.name,
    role: user.role,
    description: user.description,
    gender: user.gender,
  });

  

  const handleEditUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(BASE_URL + "/friends/" + user.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setUsers((prevUsers) => prevUsers.map((u) => (u.id === user.id ? data : u)));
      toast.success("Friend updated successfully.");
      document.getElementById("my_modal_" + user.id).close();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
console.log("users",user)
  return (
    <>
      <button
        className='w-6 h-6 rounded hover:bg-gray-400 transition-colors flex items-center justify-center'
        onClick={() => document.getElementById('my_modal_' + user.id).showModal()}
      >
        <LuPencilLine className='w-4 h-4' />
      </button>
      <dialog id={"my_modal_" + user.id} className="modal flex items-start justify-center mt-20">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg mb-5">Edit Friend </h3>
          <form className="max-w-sm mx-auto" onSubmit={handleEditUser}>
            <div className='flex justify-between '>
              <div className="w-[48%] mb-5">
                <label className="block mb-2 text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered w-full max-w-xs"
                  required
                  onChange={(e) => setInputs((prev) => ({ ...prev, name: e.target.value }))}
                  value={inputs.name}
                />
              </div>
              <div className="w-[48%] mb-5">
                <label className="block mb-2 text-sm font-medium">Role</label>
                <input
                  type="text"
                  placeholder="Your Role"
                  className="input input-bordered w-full max-w-xs"
                  required
                  onChange={(e) => setInputs((prev) => ({ ...prev, role: e.target.value }))}
                  value={inputs.role}
                />
              </div>
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium">Description</label>
              <textarea
                placeholder="Type here"
                rows="4"
                className="input input-bordered input-lg w-full text-sm focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setInputs((prev) => ({ ...prev, description: e.target.value }))}
                value={inputs.description}
              />
            </div>
            <div className="flex mb-5">

              <div className="flex items-center mx-3 ">
                <input type="radio" name="gender" className="radio"  value="male" checked={inputs.gender === "male"} 
                   onChange={(e) => setInputs((prev) => ({ ...prev, gender: e.target.value }))} /> 
                <label htmlFor="inline-radio" className="ms-2 text-sm font-medium" >Male</label>
              </div>
              <div className="flex items-center mx-3">
                <input type="radio" name="gender" className="radio"  value="female" checked={inputs.gender === "female"}
                   onChange={(e) => setInputs((prev) => ({ ...prev, gender: e.target.value }))} />
                <label htmlFor="inline-2-radio" className="ms-2 text-sm font-medium">Female</label>
              </div>
            </div>
            <div className='flex justify-end space-x-2'>
              <button className="btn bg-blue-500" type="submit" disabled={loading}>
                {loading ? "Updating..." : "Confirm"}
              </button>
              <button className="btn" type="button" onClick={() => document.getElementById("my_modal_" + user.id).close()}>
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default EditModal;
