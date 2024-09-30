import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  let moveTo = useNavigate();

  const handleUser= (email,func) => {
    console.log(email,func)
    moveTo(`/users/${func}/${email}`)
    
  }
 useEffect( () => {
      const fetchUsers = async ()=> {         /// fetching all the users from the database ////
        try{
            let res = await axios.get("/users/all");
            console.log(res)
            const allUsers=res.data
            console.log(allUsers)
            setUsers(allUsers);
        } catch (error){  
            console.error(error)
        }
      };
      fetchUsers();

    },[])

return(
  <>
<div>All Users</div>
<ul>
{users.map((user,index)=>(
  <li key={index}>
     <div onClick={()=>handleUser()}>{user.first_name} {user.last_name} - {user.email}</div>
     <div><button onClick={()=>handleUser(user.email,"edit")}>edit</button> <button onClick={()=>handleUser(user.email,"delete")} >delete</button></div>
     </li>
))
}
</ul>
  </>
  
)

}

export default Users;