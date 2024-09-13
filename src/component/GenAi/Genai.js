
//export default Genai;
import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Link, useNavigate } from "react-router-dom";
import "./genai.css"
window.onresize=function()
{
    document.getElementById("i4").style.width=window.innerWidth+"px";
   // document.getElementById("Pchild2").style.height=window.innerHeight+"px";

    if(window.innerWidth>900)
    {
        document.getElementById("i4").style.display="none";
        document.getElementById("i5").style.display="none";
        document.getElementById("Pchild1").style.marginTop="5rem";

    }
    if(window.innerWidth<=900)
    {
       document.getElementById("mNav1").style.display="flex";
        document.getElementById("mNav2").style.display="none";
        document.getElementById("i4").style.display="none";
        document.getElementById("i5").style.display="none";

        document.getElementById("Pchild1").style.marginTop="5rem";
    }
    if(window.innerHeight<=500)
    {
        document.getElementById("i5").style.display="flex";
    }
}
const Genai = () => {
    const [search,setSearch]=useState('');
    const [text,setText]=useState({prompt:""});

    const navigate=useNavigate();

  const [responseText, setResponseText] = useState('Your Answer will be here...');
  const handleLogout=()=>{
    try{
       // dispatch(authActions.logout());
       // alert('Logout Successfully');
       localStorage.removeItem("userId");
    localStorage.removeItem('username');
    localStorage.removeItem("email")
        navigate('/')
    }catch(error){
        console.log(error)
    }
}
var username=localStorage.getItem('username');
const apiKey = process.env.REACT_APP_API_KEY;


useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

    const fetchGenerativeContent = async (e) => {
        e.preventDefault();
      try {
        const genAi = new GoogleGenerativeAI(apiKey);
        const model = genAi.getGenerativeModel({ model: "gemini-1.5-pro" });
        setResponseText('Please Wait, Bot is trying best to give the answer ...')
        const r = await model.generateContent(text.prompt);
        setResponseText(r.response.text);
        
      } catch (error) {
        console.error("Error fetching generative content: ", error);
        setResponseText("Failed to load content");
      }
    };
    const handleChange = ({ currentTarget: input }) => {
        setText({ ...text, [input.name]: input.value });
        console.log(text)
      };

//alert(apiKey)
  

  return (
    <>
    <div id="Pparents">        
        <div id="i1">
            <div id="i2">
                <h2>Code Share</h2>
            </div>             
            <div id="i3">            
                <h4>Welcome, {username}&emsp;&emsp;</h4>
                <Link id="LO"><h4 onClick={handleLogout}>log out&emsp;</h4></Link>
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
                    <input type="text" id="sInp" placeholder="Search" onChange={(e)=>setSearch(e.target.value)} />
                    <i id="sIcon" class="fa fa-search"></i>
                </div>
                <div id="pBar">
                    <Link to="/profile"><i class="fa fa-user-o"></i></Link>

                    <Link to="/yourcode"><i class="fa fa-code"></i></Link>
                    <Link onClick={() => {window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}}><i class="fa fa-arrow-up"></i></Link>
                    <Link to="/addnew"><i class="fa fa-plus"></i></Link>
                    <Link to="/"><i class="fa fa-sign-out" onClick={handleLogout}></i></Link>
                </div>
            </div>
            </div>
            

            <form id="Pchild1">
                <h1>Ask To Ai</h1>
                <input
                    placeholder="Type something here...."
                    class="inputGen"
                    name="prompt"
                    value={text.prompt}
                    type="text"
                    onChange={handleChange}
                    required
                    />
                    <br/>

                <button class="btnGen" onClick={fetchGenerativeContent}> Ask To Ai</button>
                <br/>
                <div className="containerGen">

                <pre>{responseText}</pre>
                </div>
            </form>



            <div id="Pchild2">
                <div id="rChild">
                    <div id="sBar">
                        <input type="text" id="sInp" placeholder="Search" onChange={(e)=>setSearch(e.target.value)} />
                        <i id="sIcon" class="fa fa-search"></i>
                    </div>
                    <Link to="/profile"><button id="Pbtn"><i class="fa fa-user-o"></i>&emsp;profile</button></Link>
                    <Link to="/yourcode"><button id="Pbtn"><i class="fa fa-code"></i>&emsp;Your Code</button></Link>
                    <Link to="/page"><button id="Pbtn"><i class="fa fa-home"></i>&emsp;Go to Home</button><br/></Link>
                    <Link to="/addnew"><button id="Pbtn"><i class="fa fa-plus">&emsp;</i>Add new code</button></Link>
                    
                </div>
            </div>
        </div>
    </>
  );
};
export default Genai;
function showIcon()
{
    document.getElementById("mNav1").style.display="none";
    document.getElementById("mNav2").style.display="flex";
    document.getElementById("i4").style.display="flex";
    
    document.getElementById("Pchild1").style.marginTop="10rem";
}


function hideIcon()
{
    document.getElementById("i5").style.display="none";
    document.getElementById("mNav2").style.display="none";
    document.getElementById("mNav1").style.display="flex";
    document.getElementById("i4").style.display="none";
    document.getElementById("Pchild1").style.marginTop="5rem";
}





function hideNavSearch()
{
    if(document.getElementById("i5").style.display=="flex" & document.getElementById("sBar").style.display=="flex")
    {
        document.getElementById("i5").style.display="none";
        document.getElementById("Pchild1").style.marginTop="10rem";

    }
    else{
        document.getElementById("i5").style.marginTop="10rem";
        document.getElementById("i5").style.display="flex";
        document.getElementById("sBar").style.display="flex";
        document.getElementById("pBar").style.display="none";
        document.getElementById("Pchild1").style.marginTop="15rem";

    }

    
}


function hideNavProfile()
{

    if(document.getElementById("i5").style.display=="flex" & document.getElementById("pBar").style.display=="flex" )
    {
        document.getElementById("i5").style.display="none";
        document.getElementById("Pchild1").style.marginTop="10rem";

    }
    else
    {
        document.getElementById("i5").style.marginTop="10rem";
        document.getElementById("i5").style.display="flex";
        document.getElementById("pBar").style.display="flex";
        document.getElementById("sBar").style.display="none";
        document.getElementById("Pchild1").style.marginTop="15rem";

    }


    
}
