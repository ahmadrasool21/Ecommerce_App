import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
// const navigate = useNavigate();
import { setCurrentUser } from '../Features/UserSlice'; //// getting the setCurrentUser reducer from userSlice /// 




const Navbar = () => {

const dispatch = useDispatch();
const currentUser = useSelector((state)=> state.user.current_User);


const handleLogout = () => {
    localStorage.removeItem('someToken');
    dispatch(setCurrentUser(null))
    // navigate('/sign');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to="/">MyApp</Link>
        </div>
        <div className="space-x-4">
        { currentUser ?( 
            <>
          <Link to="/Home" className="text-gray-300 hover:text-white">Home</Link>
          <Link to="/Products" className="text-gray-300 hover:text-white">Products</Link>
          <Link to="/api/Addproduct" className="text-gray-300 hover:text-white">Product Upload</Link>
          <Link to="/users" className="text-gray-300 hover:text-white">Users</Link>
          <Link to="/sign" onClick={handleLogout} className="text-gray-300 hover:text-white">Logout</Link>
          </>
        ):(
            <>
          <Link to="/sign" className="text-gray-300 hover:text-white">Login</Link>
          <Link to="/signup" className="text-gray-300 hover:text-white">Signup</Link>
          </>
        )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
