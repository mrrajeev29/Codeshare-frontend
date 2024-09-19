import react,{useState,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
//import {useSelector} from 'react-redux';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "./signup.css"
 

const Signup=()=>{
    const navigate=useNavigate();
    //const isLogin=useSelector(state=>state.isLogin);

    const [inputs,setInputs] = useState({
        email:"",
        name:'',
        password:''
    })

    const handleChange=(e)=>{
        setInputs(prevState=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    const handleSubmit=async(e)=>{

       // e.preventDefault();
        //console.log(inputs);
        toast("Trying to sign up...")
        try{
            const {data}=await axios.post('https://project-backend-t955.onrender.com/api/v1/user/register',{username:inputs.name,email:inputs.email,password:inputs.password});
            if(data.success){
                alert("User Register Successfully. You can now login.");
                navigate("/");
                localStorage.clear();
            }
            else{
                toast("email already registered")
            }
        }catch(error)
        {
            //alert("email already registered")
            document.getElementById("showEmail").style.display="flex";
            console.log(error);
        }
    }
    const SignupVerify=(ey)=>
    {
        ey.preventDefault();
        let otp=document.getElementById("otp").value;
        let val=localStorage.getItem("otp");
       // alert(val);
        document.getElementById("showEmail").style.display="none";
        if(otp==val)
        {
            handleSubmit();
        }
        else{
            toast("Invalid Otp. Please enter correct otp.")
        }

    }

  /*  const config ={
        SecureToken:'5eae3760-99ad-44cf-b6a9-4f1fb6c98d6a',
        To : email,
        From : "you@isp.com",
        Subject : "This is the subject",
        Body : emailbody,
    }; */

    



    return(
        <> 

        <div id="parents"> 
        <ToastContainer/>
            <div id="child">
                <div>
                    <div id="schild">
                        <h1 className="s0">Sign up</h1>
                        <div id="signup" className="s1">
                            <i class="fa fa-envelope"></i>
                            <input name="email" id="emailval" value={inputs.email} onChange={handleChange} type="email" placeholder="Enter Your Gmail" required />
                        </div>
                        <div id="signup" className="s2">
                            <i class="fa fa-user"></i>
                            <input type="text" name="name" id="nameval" value={inputs.name} onChange={handleChange}  placeholder="Enter Your Name" required/>
                        </div>
                        <div id="signup" className="s3">
                            <i class="fa fa-lock"></i>
                            <input type="password" name="password"  value={inputs.password} onChange={handleChange} id="pass" placeholder="Enter password" required/>
                            <i class="fa fa-eye-slash" id="eyebtn" onClick={hidePass} style={{display:"none"}}></i>
                            <i class="fa fa-eye" id="close-eyebtn" onClick={showPass}  ></i>
                        </div>

                        <h1 className="s4" style={{display:"none"}}>Enter Otp</h1>
                        <p className="s5" style={{display:"none"}}>Please make sure you have registered valid email.</p>
                        <div id="signup" className="s6" style={{display:"none"}}>
                        <i class="fa fa-user-secret" aria-hidden="true"></i>

                            <input type="number" id="otp" placeholder="Enter otp here."/>
                        </div>
                    </div>
                    
                    <div id="schild" className="s8">
                        <button id="Sbtn" className="Sotp" onClick={otpShow}  >Send Otp</button>
                        <p style={{color:"red",display:"none"}} id="field">All fields are required.</p>
                       {/*} <p id="showEmail" style={{display:"none",color:"red"}}>Email Already Registered.</p>
                        <p>Already Registered?&emsp;&emsp;<Link to="/" id="llogin">login</Link></p> */}
                    </div>
                    <div id="schild" >
                        <button id="Sbtn" onClick={SignupVerify}  style={{display:"none"}} className="s7"><p style={{color:"white"}}>Sign up</p></button>
                        <p id="showEmail" style={{display:"none",color:"red"}}>Email Already Registered.</p>
                        <p>Already Registered?&emsp;&emsp;<Link to="/" id="llogin">login</Link></p>
                        <p>Forget Password?&emsp;&emsp;<Link id="slink" to="/forget-password">forget it</Link></p>

                        <p id="rev" onClick={Display} style={{display:"none",color:"brown",cursor:"pointer"}}>Go back</p>
                    </div>

                    
                </div>
            </div>
        </div>
        </>
    )
}
export default Signup 



var otp_code;
//var a=[];
//alert(otp_code)
function otpShow(e) {
   // alert("ok")
    e.preventDefault();
    let email=document.getElementById("emailval").value;
    let name=document.getElementById("nameval").value;
    let pass=document.getElementById("pass").value;

   // alert(email+name+pass)
    if(email.length>0 && name.length>0 && pass.length>0)
    {

        document.getElementById("showEmail").style.display="none";
        document.getElementById("rev").style.display="flex";



        if (window.Email) {
           // alert(window.Email)
           // alert("call");
            otp_code = Math.floor(Math.random() * 10000);
            localStorage.setItem("otp",otp_code);
           // a.push(otp_code)

            let emailbody = `<pre>Thank you for signing up with codeshare.
            To complete the registration process and verify your email address, 
            please use the following one-time password (OTP):

            <h4>OTP: ${otp_code} <h4>
            
            Please enter this OTP on our website to confirm your email address. 
            If you didn't sign up for an account with us, you can safely ignore this email.
            
            If you have any questions or need assistance, 
            feel free to contact our support team at codeshare.code@gmail.com.
            
            Best regards,
            Rajeev Ranjan,
            creator,
            codeshare.
            </pre>`;
           // alert(email); // Ensure that email variable is defined
            window.Email.send({/*
                SecureToken: "77c92dc-6c83-4a54-a047-2fff5dab859c",
                To: email, // Ensure that email variable is defined and contains the recipient's email address
                From: "ag8244932@gmail.com",
                Subject: "This is the subject",
                Body: emailbody*/
                Host : "smtp.elasticemail.com",
                Username : "pg2523414@gmail.com",
                Password : "254B32E04BF1717B58DE7E25F23DB4D7FF5E",
                To : email,
                From : "ag8244932@gmail.com",
                Subject : "Otp for codeshare",
                Body : emailbody
            }).then(message => {
                if (message === 'OK') {
                    toast("Otp sent to email. Please Check spam section also.");
                }
               // alert(message);
            }).catch(error => {
                console.error("Error sending email:", error);
            });
        } else {
            console.error("Email service not available.");
        }



        




        var elements = document.getElementsByClassName("s1");
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.display = "none";
            }

            elements = document.getElementsByClassName("s2");
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.display = "none";
            }

            elements = document.getElementsByClassName("s3");
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.display = "none";
            }
            var elements = document.getElementsByClassName("s4");
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.display = "flex";
            }

            elements = document.getElementsByClassName("s5");
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.display = "flex";
            }

            elements = document.getElementsByClassName("s6");
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.display = "flex";
            }
            var elements = document.getElementsByClassName("s7");
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.display = "grid";
            }

            elements = document.getElementsByClassName("s8");
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.display = "none";
            }
            elements = document.getElementsByClassName("s0");
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.display = "none";
            }
        }
        else
        {
            //alert("fill all field")
            document.getElementById("field").style.display="flex";
        }
}

//console.log(a[0])


function Display(e) {
    e.preventDefault();
    document.getElementById("rev").style.display="none";
    document.getElementById("field").style.display="none";
    document.getElementById("showEmail").style.display="none";
    //alert(otp_code)


    var elements = document.getElementsByClassName("s1");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "flex";
    }


    elements = document.getElementsByClassName("s2");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "flex";
    }

    elements = document.getElementsByClassName("s3");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "flex";
    }
    var elements = document.getElementsByClassName("s4");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }

    elements = document.getElementsByClassName("s5");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }

    elements = document.getElementsByClassName("s6");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
    var elements = document.getElementsByClassName("s7");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }

    elements = document.getElementsByClassName("s8");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "grid";
    }
    elements = document.getElementsByClassName("s0");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "flex";
    }
}


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