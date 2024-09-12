
import { useState } from "react"
import Navbar from "./components/Navbar"
import UserGrid from "./components/UserGrid"



function App() {

const [users,setUsers] = useState();
console.log(users)
  return (
    <div>
      <Navbar />
      <p className="text-3xl md:text-5xl text-center font-bold uppercase tracking-wide mb-8 
      bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
        My friends
      </p>
      <UserGrid users={users} setUsers={setUsers} />
    </div>
  )
}

export default App
