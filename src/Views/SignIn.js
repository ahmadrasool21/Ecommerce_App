import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../Features/UserSlice";
import axios from "axios";
import '../index.css'

const SignIn = () => {
    const dispatch = useDispatch();
    let { register, handleSubmit, setError, formState: { errors } } = useForm();
    let moveTo = useNavigate();


    const saveData = async(meraData) => {    // getting the user from backend ....///
        try {
            await axios.post("/signin", meraData).then((response) => {
                // {console.log(response.data)}
                if (response.data.user) {
                    let user = response.data.user;
                    localStorage.setItem("someToken",response.data.myToken);
                    dispatch(setCurrentUser(user))  // updating user state in redux store...////
                    moveTo("/Home");

                }
                else {
                    alert(response.data.msg)
                }
            })
        } catch (error) {
            console.log(error)

        }
    }

    return (

        <div className="flex justify-center items-center">
            <div className="BackdropReg"></div>

            <form className="form-container sss" onSubmit={handleSubmit(saveData)}>

                <h2>Sign In</h2>
                <div className="input-field">
                    <label className="label">Email</label>
                    <input {...register('email', { required: true, minLength: 3 })} type="email" className="field" placeholder="Enter Email" />
                    {errors.email && errors.email.type == "required" ? <div className="error">The field is required</div> : null}
                    {errors.email && errors.email.type == "minLength" ? <div className="error">At least three characters are required</div> : null}
                </div>
                <div className="input-field">
                    <label className="labels">Password</label>
                    <input
                        {...register("password", { required: true })}
                        type="password"
                        className="field"
                        placeholder="Type Password"
                    />
                    {errors.password ? <div className="error">The field is required</div> : null}
                    {errors.password && errors.password.type == "manual" ? <div className="error">Password or email is incorrect</div> : null}
                </div>

                <button type="submit" className="btn">
                    Continue
                </button>
            </form>
        </div>

    );

}

export default SignIn;