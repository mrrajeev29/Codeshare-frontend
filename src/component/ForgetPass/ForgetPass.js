import react,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const ForgetPass=()=>{



    const navigate=useNavigate();

    const [pass,setPass] = useState({
        email:"",
        password:''
    })
    const handleChange = ({ currentTarget: input }) => {
        setPass({ ...pass, [input.name]: input.value });
      };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        document.getElementById("showload").style.display="flex";
        document.getElementById("showMsgError").style.display="none";
        document.getElementById("showError").style.display="none";
        try {
            toast("Trying to change the password.")
          const url = `https://project-backend-t955.onrender.com/api/v1/user/change-password/${pass.email}`;
          const { data: res } = await axios.put(url, pass);
    
          console.log(res.message);
          alert('Password updated Successful.');
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      };


    return(
        <>
        <div id="parents"> 
        <ToastContainer/>

            <div id="child">
                <form onSubmit={handleSubmit}>
                    <div id="schild">
                        <h1>Forget Password</h1>
                        <div id="login">
                            <i class="fa fa-envelope"></i>
                            <input type="email" name="email" onChange={handleChange} placeholder="Enter Registered Gmail" required/>
                        </div>
                        <div id="login">
                            <i class="fa fa-lock"></i>
                            <input type="password" id="pass" name="password" onChange={handleChange} placeholder="Enter new password" required/>
                            <i class="fa fa-eye-slash" id="eyebtn" onClick={hidePass} style={{display:"none"}}></i>
                            <i class="fa fa-eye" id="close-eyebtn" onClick={showPass}></i> 
                        </div>
                        
                    </div>
                    <div id="schild">
                        <button id="Sbtn">Forget</button>
                        <p style={{display:"none",color:"red"}} id="showError">Entered email is wrong or not registered</p>
                        <p style={{display:"none",color:"red"}} id="showMsgError">Wrong Password.</p>
                        <p style={{display:"none",color:"red"}} id="showload">Loading...</p>
                        <p>New User?&emsp;&emsp;<Link id="slink" to="/signup">sign up</Link></p>
                        <p>Already Registered?&emsp;&emsp;<Link id="slink" to="/">login</Link></p>
                    </div>
                </form>
            </div>
        </div>

        </>
    )}
export default ForgetPass;
 
function showPass()
{
    document.getElementById("close-eyebtn").style.display="none";
    document.getElementById("eyebtn").style.display="flex";
    document.getElementById("pass").type="text";
}
function hidePass()
{
    document.getElementById("close-eyebtn").style.display="flex";
    document.getElementById("eyebtn").style.display="none";
    document.getElementById("pass").type="password";
}