import react,{useEffect} from "react";
import { Link } from "react-router-dom";
import "./profile.css"
window.onresize=function()
{
    document.getElementById("i4").style.width=window.innerWidth+"px";
    if(window.innerWidth>900)
    {
        document.getElementById("i4").style.display="none";
        document.getElementById("i5").style.display="none";
        document.getElementById("ProfChild").style.marginTop="5rem";

    }
    if(window.innerWidth<=900)
    {
       document.getElementById("mNav1").style.display="flex";
        document.getElementById("mNav2").style.display="none";
        document.getElementById("i4").style.display="none";
        document.getElementById("i5").style.display="none";

        document.getElementById("ProfChild").style.marginTop="5rem";
    }
}

const Profile=()=>{
    var username=localStorage.getItem('username');
    var email=localStorage.getItem('email');
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }, []);
    return(
        
        <>
        <div id="Pparents">
            
            <div id="i1">
                <div id="i2">
                    <h2>Code Share</h2>
                </div>
                
                <div id="i3">
                    <h4>Welcome, {username}&emsp;&emsp;</h4>
                    <Link to="/" id="LO"><h4>log out&emsp;</h4></Link>
                </div>
                <div  id="mobNav">
                    <i id="mNav1" onClick={showIcon} class="fa fa-navicon"></i>
                    <i id="mNav2"  onClick={hideIcon}  style={{display:"none"}} class="fa fa-times"></i>
                </div>
            </div>




            <div id="parent">

                <div id="i4">
                    <div><Link to="/page"><i  class="fa fa-home"></i></Link></div>
                    <div><i id="searchIcon" onClick={()=>{hideNavSearch() }} class="fa fa-search"></i></div>
                    <div><i class="fa fa-user-circle-o" onClick={()=>{hideNavProfile();}}></i></div>
                </div>
                <div id="i5">
                    <div id="sBar" style={{marginTop:"0.75rem"}}>
                        <input type="text" id="sInp" placeholder="Search" />
                        <i id="sIcon" class="fa fa-search"></i>
                    </div>
 
                    <div id="pBar">
                        <Link to="/profile"><i class="fa fa-user-o"></i></Link>
                        <Link to="/yourcode"><i class="fa fa-code"></i></Link>
                        <Link><i class="fa fa-arrow-up" onClick={() => {window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}}></i></Link>
                        <Link to="/addnew"><i class="fa fa-plus"></i></Link>
                        <Link to="/"><i class="fa fa-sign-out"></i></Link>
                    </div>
                </div>

                <div id="ProfChild">
                    <h1>Your Profile Details</h1>
                    <div id="ProfSubChild">
                        <div>
                            <h2>Your Name : {username}</h2>
                            <h2>Your Gmail : {email}</h2>
                        </div>
                        <form onSubmit={()=>{alert("Password Changed.")}}>
                        <div id="CP">
                            <h1 >Change Password ?</h1>
                            <div id="signup">
                                <i class="fa fa-lock"></i>
                                <input type="password" id="pass1" placeholder="Enter New password" required/>
                                <i class="fa fa-eye-slash" onClick={hidePass1} id="eyebtn1" style={{display:"none"}}></i>
                                <i class="fa fa-eye" id="close-eyebtn1" onClick={showPass1}  ></i>
                            </div>
                            <div id="signup">
                                <i class="fa fa-lock"></i>
                                <input type="password" id="pass2" placeholder="confirm password" required/>
                                <i class="fa fa-eye-slash" id="eyebtn2" onClick={hidePass2} style={{display:"none"}}></i>
                                <i class="fa fa-eye" id="close-eyebtn2" onClick={showPass2}   ></i>
                            </div>
                            <div id="btnDiv" ><br/>
                            <button id="Ubtn" type="submit">Update Password</button>

                            </div>
                        </div>
                        </form>
                    </div>
                </div>

                <div id="Pchild2">
                    <div id="rChild">
                        <div id="sBar">
                            <input type="text" id="sInp" placeholder="Search" />
                            <i id="sIcon" class="fa fa-search"></i>
                        </div>
                        <Link to="/profile"><button id="Pbtn"><i class="fa fa-user-o"></i>&emsp;profile</button><br/></Link>
                        <Link to="/yourcode"><button id="Pbtn"><i class="fa fa-code"></i>&emsp;Your Code</button></Link><br/>
                        <Link to="/page"><button id="Pbtn"><i class="fa fa-home"></i>&emsp;Go to Home</button><br/></Link>
                        <Link to="/addnew"><button id="Pbtn"><i class="fa fa-plus">&emsp;</i>Add new code</button><br/></Link>
                    </div>
                </div>
            </div>






        </div>
        </>
    )
}
export default Profile

function showIcon()
{
    document.getElementById("mNav1").style.display="none";
    document.getElementById("mNav2").style.display="flex";
    document.getElementById("i4").style.display="flex";
    document.getElementById("ProfChild").style.marginTop="10rem";
}


function hideIcon()
{
    document.getElementById("i5").style.display="none";
    document.getElementById("mNav2").style.display="none";
    document.getElementById("mNav1").style.display="flex";
    document.getElementById("i4").style.display="none";
    document.getElementById("ProfChild").style.marginTop="5rem";
}





function hideNavSearch()
{
    if(document.getElementById("i5").style.display=="flex" & document.getElementById("sBar").style.display=="flex")
    {
        document.getElementById("i5").style.display="none";
        document.getElementById("ProfChild").style.marginTop="10rem";

    }
    else{
        document.getElementById("i5").style.marginTop="10rem";
        document.getElementById("i5").style.display="flex";
        document.getElementById("sBar").style.display="flex";
        document.getElementById("pBar").style.display="none";
        document.getElementById("ProfChild").style.marginTop="15rem";

    }

    
}


function hideNavProfile()
{

    if(document.getElementById("i5").style.display=="flex" & document.getElementById("pBar").style.display=="flex" )
    {
        document.getElementById("i5").style.display="none";
        document.getElementById("ProfChild").style.marginTop="10rem";

    }
    else
    {
        document.getElementById("i5").style.marginTop="10rem";
        document.getElementById("i5").style.display="flex";
        document.getElementById("pBar").style.display="flex";
        document.getElementById("sBar").style.display="none";
        document.getElementById("ProfChild").style.marginTop="15rem";

    }


    
}


function showPass1()
{
    document.getElementById("close-eyebtn1").style.display="none";
    document.getElementById("eyebtn1").style.display="flex";
    document.getElementById("pass1").type="text";
}
function hidePass1()
{
    document.getElementById("close-eyebtn1").style.display="flex";
    document.getElementById("eyebtn1").style.display="none";
    document.getElementById("pass1").type="password";
}

function showPass2()
{
    document.getElementById("close-eyebtn2").style.display="none";
    document.getElementById("eyebtn2").style.display="flex";
    document.getElementById("pass2").type="text";
}
function hidePass2()
{
    document.getElementById("close-eyebtn2").style.display="flex";
    document.getElementById("eyebtn2").style.display="none";
    document.getElementById("pass2").type="password";
}