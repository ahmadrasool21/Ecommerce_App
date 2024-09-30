// importing views///
import SignIn from './Views/SignIn';
import Home from './Views/Home';
import Signup from "./Views/Signup";
import ProductUpload from "./Views/ProductUpload"
import ProductDetails from './Views/ProductDetails';
import Checkout from './Views/Checkout';
import ItemCart from "./Views/ItemCart"
import Users from "./Views/Users"
import User from "./Views/User"
import Navbar from "./Views/Navbar"
import ProductAdd from "./Views/ProductAdd"
import ProductEdit from "./Views/ProductEdit"
import Products from "./Views/Products"

// importing hooks//

import { useEffect } from 'react';
import axios from 'axios';

// importing dependencies
// import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from './Features/ProductSlice';  //// getting the setproduct reducer from redux toolkit slice ////             
import { setCurrentUser } from './Features/UserSlice'; //// getting the setCurrentUser reducer from userSlice /// 




function App() {
  const dispatch = useDispatch();
  // const moveTo= useNavigate();
  // const currentUser = useSelector((state)=> state.user.current_User);   /// getting current-user from the redux...

  const useFetchData =(apiUrl,setterfunction) => {       /// function for fetching products through API...
    useEffect(()=>{

      const fetchData= async()=>{
      try {
        const res = await axios.get(apiUrl);
        dispatch(setterfunction(res.data));  /// dispatching response and update the product state...
      }
        catch(error){
          console.error("error in fetching data: ", error)
        }
      }
      fetchData();
    },[]);
}

const apiUrl="/api/products"        /// local api to get data from the backend mongodb ///..
useFetchData(apiUrl,setProducts)   /// calling the api function and thus useEffect will be called ///..



let token = localStorage.getItem("someToken")     /// this is the token stored in local storage ///..
useEffect(()=>{                 ///  this is to check the validity of token  ///..
  axios.post("/check-Token",{token}).then((resp)=>{
    // in above line i sent the token to the backend url and then getting a response object from a backend ////
      console.log(resp.data.success)
      if (resp.data.success == false){         /// if error returns with status code 401 ///... 
        localStorage.removeItem("someToken")
        dispatch(setCurrentUser(null))
        alert('Token Invalid')
        // moveTo('sign/')
      }
      else{
        console.log("my app token")
        console.log(resp)   /// this is the response object ////
        dispatch(setCurrentUser(resp.data.c_user))    /// setting the current user in redux store ///...
      }
  })
},[token])   /// if token changes or removed from localstorage then useEffect run again///...


  return (
    <Router>
      {/* {!currentUser && <Navigate to="/signin"/>} */}
      <Navbar/>
      <Routes>
        <Route path="/productupload" element={<ProductUpload/>}></Route>

        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/sign' element={<SignIn/>}></Route>
                    {/* ///////////// */}
        <Route path='/users' element={<Users/>}></Route>  
        <Route path='/users/:func/:email' element={<User/>}></Route>
                      {/*///////////// */}
        <Route path='/Home' element={<Home/>}></Route>
        <Route path='/api/Addproduct' element={<ProductAdd/>}></Route>
        <Route path='/Product/:ItemId' element={<ProductDetails/>}></Route>
        <Route path='/Product/edit/:_id' element={<ProductEdit/>}></Route>

        <Route path="/Checkout" element={<Checkout/>}></Route>
      </Routes>
    </Router>
  
  );
}

export default App;
