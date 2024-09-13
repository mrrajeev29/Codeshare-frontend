import react,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import "./login.css"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const Login=()=>{

    //const isLogin=useSelector(state=>state.isLogin);


    const navigate=useNavigate();
  //  const dispatch = useDispatch();

    const [inputs,setInputs] = useState({
        email:"",
        password:''
    })

    const handleChange=(e)=>{
        setInputs(prevState=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    } 

    const handleSubmit=async(e)=>{
        e.preventDefault();
        document.getElementById("showload").style.display="flex";
        document.getElementById("showMsgError").style.display="none";
        document.getElementById("showError").style.display="none";



        //console.log(inputs);
        try{
            toast("Trying to Log in...");

            const {data}=await axios.post('https://project-backend-t955.onrender.com/api/v1/user/login',{email:inputs.email,password:inputs.password});
            if(data.success){
                toast('Login Successful..')
                localStorage.setItem('userId',data?.user._id);
                localStorage.setItem('username',data?.user.username);
                localStorage.setItem('email',data?.user.email);
               // alert(localStorage.getItem('email'));
               // dispatch(authActions.login());
                navigate("/page");
            }
            else
            {
                toast("Email is wrong or not registered...");
                document.getElementById("showError").style.display="flex";
                document.getElementById("showMsgError").style.display="none";
                document.getElementById("showload").style.display="none"
            }
        }catch(error)
        {
            toast('Wrong Password...')
            console.log(error);
           // if(document.getElementById("showError").style.display!="flex")
            //{
                document.getElementById("showMsgError").style.display="flex";
                document.getElementById("showError").style.display="none";
                document.getElementById("showload").style.display="none"

            //}
        }
    }

    return(
        <>
        <div id="parents"> 
        <ToastContainer/>

            <div id="child">
                <form onSubmit={handleSubmit}>
                    <div id="schild">
                        <h1>Login</h1>
                        <div id="login">
                            <i class="fa fa-envelope"></i>
                            <input type="email" name="email" onChange={handleChange} placeholder="Enter Registered Gmail" required/>
                        </div>
                        <div id="login">
                            <i class="fa fa-lock"></i>
                            <input type="password" id="pass" name="password" onChange={handleChange} placeholder="Enter password" required/>
                            <i class="fa fa-eye-slash" id="eyebtn" onClick={hidePass} style={{display:"none"}}></i>
                            <i class="fa fa-eye" id="close-eyebtn" onClick={showPass}></i> 
                        </div>
                        
                    </div>
                    <div id="schild">
                        <button id="Sbtn">Log in</button>
                        <p style={{display:"none",color:"red"}} id="showError">Entered email is wrong or not registered</p>
                        <p style={{display:"none",color:"red"}} id="showMsgError">Wrong Password.</p>
                        <p style={{display:"none",color:"red"}} id="showload">Loading...</p>
                        <p>New User?&emsp;&emsp;<Link id="slink" to="/signup">sign up</Link></p>
                    </div>
                </form>
            </div>
        </div>

        </>
    )}
export default Login 
 
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