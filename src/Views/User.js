import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const User = () => {
    const navigate = useNavigate(); 
    const {email,func} = useParams();
    const[deleted,setDeleted]=useState(false)
    const [isEditing,setIsEditing]= useState(false)
    const [user, setUser] = useState(null);
    const [updatedUser, setUpdatedUser] = useState({}); // State to hold the updated user data

  
   
    const handleChange=(e)=>{
        setUpdatedUser({...updatedUser, [e.target.name]: e.target.value,}); // Update the specific field 
    }

    const handleSave = async () => {
        try {
          let res = await axios.put(`/users/edit/${email}`,updatedUser); // Make an API call to update the user
          console.log(res.data.updatedUser)
          setUser(res.updatedUser); // Update the displayed user info
          setIsEditing(false); // Turn off edit mode
          console.log("User updated successfully", res.data.user);
        } catch (error) {
          console.error("Error updating user", error);
        }
      };

      const handleDelete =async() => {
        try{
          let  res = await axios.delete(`/users/delete/${email}`);
          if(res){
            setDeleted(true)
          }
        }catch(error){
            
        }
      }

    useEffect(()=> {
      if (func === "edit") {
        setIsEditing(true);
        console.log(email,func,"////true")
      } else {
        setIsEditing(false);
        console.log(email,func,"////false")
        console.log(func)
      }
        const fetchUser = async () => {
        try{
            let res = await axios.get(`/users/${email}`);
            console.log(res.data.user)
            setUser(res.data.user);
            setUpdatedUser(res.data.user); // Set initial values for editing
        } catch(error){
            console.error("there is an error",error)
        }
        }
        fetchUser();
    },[])

    return(
           <>
           {user && (
            <>
            {isEditing?(
            <div>
            <p>
                Email: <input type="email" name="email" value={updatedUser.email} onChange={handleChange} />
              </p>

              <p>
                First Name: <input type="text" name="first_name" value={updatedUser.first_name} onChange={handleChange} />
              </p>
              <p>
                Last Name: <input type="text" name="last_name" value={updatedUser.last_name} onChange={handleChange} />
              </p>
              <p>
                Password: <input type="password" name="password" value={updatedUser.password} onChange={handleChange} />
              </p>
              <p>
                Confirm-Password: <input type="password" name="password_confirmation" value={updatedUser.password_confirmation} onChange={handleChange} />
              </p>
              <button onClick={handleSave}>Save</button>
            </div>):(

           <div>
            {/* {!isEditing &&<button onClick={()=>{handleDelete}}>Confirm-Delete</button>} */}
            <p>Email: {user.email}</p>
            <p>First Name: {user.first_name}</p>
            <p>Last Name: {user.last_name}</p>
           </div>
            )

            }
           </>

           )
        }
           </> 
    )

}

export default User;