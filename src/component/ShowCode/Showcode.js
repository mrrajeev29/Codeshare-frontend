import react ,{useEffect,useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./showcode.css"
import axios from 'axios';
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

 
window.onresize=function()
{
    document.getElementById("i4").style.width=window.innerWidth+"px";
   // document.getElementById("Pchild2").style.height=window.innerHeight+"px";

    if(window.innerWidth>900)
    {
        document.getElementById("i4").style.display="none";
        document.getElementById("i5").style.display="none";
        document.getElementById("ShowParent").style.marginTop="6rem";

    }
    if(window.innerWidth<=900)
    {
       document.getElementById("mNav1").style.display="flex";
        document.getElementById("mNav2").style.display="none";
        document.getElementById("i4").style.display="none";
        document.getElementById("i5").style.display="none";

        document.getElementById("ShowParent").style.marginTop="6rem";
    }
}



const Showcode=()=>{
    var username=localStorage.getItem('username');
    const [code,setCode]=useState({});
    const [loading, setLoading] = useState(false);




    const [copySuccess, setCopySuccess] = useState('');






 //   const [inputs,setInputs]=useState({})

    const blog_id=useParams().id;
    const getCodeDetail=async()=>{
        setLoading(true);
        try{
            const {data}=await axios.get(`https://project-backend-t955.onrender.com/api/v1/code/get-code/${blog_id}`);
            if(data?.success){
                setCode(data?.code);
            }
            

        }catch(error){
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(()=>{
        getCodeDetail();
    },[blog_id]);
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }, []);
    // alert(code.question)
    //  alert(code?.question)
    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            toast("copied to clipboard.")
            setCopySuccess('Copied!');
        } catch (err) {
            console.error('Failed to copy: ', err);
            setCopySuccess('Failed to copy!');
        }
    };
    const navigate=useNavigate();
const handleLogout=()=>{
    try{
       localStorage.removeItem("userId");
    localStorage.removeItem('username');
    localStorage.removeItem("email")
        navigate('/')
    }catch(error){
        console.log(error)
    }
}



      
    return(
        <>
        <div id="Pparents">
            
            <div id="i1">
                <div id="i2">
                    <h2>Code Share</h2>
                </div>
                
                <div id="i3">
                    <h4>Welcome, {username}&emsp;&emsp;</h4>
                    <Link id="LO"><h4 onClick={handleLogout} >log out&emsp;</h4></Link>
                </div>
                <div  id="mobNav">
                    <i id="mNav1" onClick={showIcon} class="fa fa-navicon"></i>
                    <i id="mNav2"  onClick={hideIcon}  style={{display:"none"}} class="fa fa-times"></i>
                </div>
            </div>




            <div id="parent">

                <div id="i4">
                    <div><Link to="/page"><i class="fa fa-home"></i></Link></div>
                    <div><Link to="/AskCode"><i class="fa fa-weixin"></i></Link></div>

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
                        <Link onClick={() => {window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}}><i class="fa fa-arrow-up"></i></Link>
                        <Link to="/addnew"><i class="fa fa-plus"></i></Link>
                        <Link ><i onClick={handleLogout} class="fa fa-sign-out"></i></Link>
                    </div>
                </div>



                {loading?(
                        <h1>Loading....</h1>
                    ) :(
                <div id="ShowParent"> 
                <ToastContainer/>
                    <div id="ShowParent1">
                        <div id="Qshow">
                            <h1>Question</h1>
                            <p>{code.question}</p>
                        </div>
                    </div><br/>
                    <div id="ShowParent1">
                        <div id="Ashow">
                            <div id="copy">
                                <h1></h1>
                                <h1>Code</h1>
                                <button onClick={()=>copyToClipboard(code.answer)}><i class="fa fa-clipboard"></i>&ensp;Copy</button>
                            </div>
                            <p>{code.language}</p>
                            <pre>{code.answer}</pre>
                        </div>
                    </div><br/>
                    <div id="ShowParent1">
                        <div id="Ashow">
                            <h1>Caption</h1>
                            <p>{code.comment}</p>
                        </div>
                    </div><br/>




                   {/*} <div id="ShowParent1">
                        <div id="Ashow">
                            <h1>Comments.</h1>
                            <div id="CmntDiv">
                                <p>User_id1</p>
                                <p>Please provide code in cpp.</p>
                            </div>
                            <div id="CmntDiv">
                                <p>User_id2</p>
                                <p>Please provide comment in code to understand properly. </p>
                            </div>
                        </div>
                    </div><br/>
                    <div id="Cshow">
                        <div id="CmntBox">
                            <textarea required></textarea><br/>
                            <button><i class="fa fa-commenting-o"></i>&emsp;Add Comment</button><br/>
                        </div><br/>
    </div>*/}


                </div>)}






                <div id="Pchild2">
                    <div id="rChild">
                        <div id="sBar">
                            <input type="text" id="sInp" placeholder="Search" />
                            <i id="sIcon" class="fa fa-search"></i>
                        </div>
                        <Link to="/page"><button id="Pbtn"><i class="fa fa-home"></i>&emsp;Go to home</button></Link>
                        <Link to="/yourcode"><button id="Pbtn"><i class="fa fa-code"></i>&emsp;Your Code</button></Link>
                        <button id="Pbtn" onClick={() => {window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}}><i class="fa fa-arrow-up"></i>&emsp;Go to Top</button>
                        <Link to="/addnew"><button id="Pbtn"><i class="fa fa-plus">&emsp;</i>Add new code</button></Link>
                        <Link to="/AskCode"><img style={{width:"4.5rem",height:"4.5rem",cursor:"pointer"}} src="https://img.icons8.com/?size=100&id=102660&format=png&color=000000"/></Link>

                    </div>
                </div>
            </div>






        </div>
        </>
    )
}
export default Showcode

function showIcon()
{
    document.getElementById("mNav1").style.display="none";
    document.getElementById("mNav2").style.display="flex";
    document.getElementById("i4").style.display="flex";
    document.getElementById("ShowParent").style.marginTop="11rem";
}


function hideIcon()
{
    document.getElementById("i5").style.display="none";
    document.getElementById("mNav2").style.display="none";
    document.getElementById("mNav1").style.display="flex";
    document.getElementById("i4").style.display="none";
    document.getElementById("ShowParent").style.marginTop="6rem";
}





function hideNavSearch()
{
    if(document.getElementById("i5").style.display=="flex" & document.getElementById("sBar").style.display=="flex")
    {
        document.getElementById("i5").style.display="none";
        document.getElementById("ShowParent").style.marginTop="11rem";

    }
    else{
        document.getElementById("i5").style.marginTop="10rem";
        document.getElementById("i5").style.display="flex";
        document.getElementById("sBar").style.display="flex";
        document.getElementById("pBar").style.display="none";
        document.getElementById("ShowParent").style.marginTop="16rem";

    }

    
}


function hideNavProfile()
{

    if(document.getElementById("i5").style.display=="flex" & document.getElementById("pBar").style.display=="flex" )
    {
        document.getElementById("i5").style.display="none";
        document.getElementById("ShowParent").style.marginTop="11rem";

    }
    else
    {
        document.getElementById("i5").style.marginTop="10rem";
        document.getElementById("i5").style.display="flex";
        document.getElementById("pBar").style.display="flex";
        document.getElementById("sBar").style.display="none";
        document.getElementById("ShowParent").style.marginTop="16rem";

    }


    
}
