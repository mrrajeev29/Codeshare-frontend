import react ,{useEffect,useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "./code.css"
import axios from 'axios'
window.onresize=function()
{
    document.getElementById("i4").style.width=window.innerWidth+"px";
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
}


const ReadMore = ({ children }) => {
	const text = children;
	const [isReadMore, setIsReadMore] = useState(true);
	const toggleReadMore = () => {
		setIsReadMore(!isReadMore);
	};
	return (
		<h1 className="text">
			{isReadMore ? text.slice(0, 325) : text}
			<span
				onClick={toggleReadMore}
				className="read-or-hide"
				style={{ color: "red" }}
			>
				{isReadMore ? "...read more" : " show less"}
			</span>
		</h1>
	);
};


const Code=()=>{

    const [search,setSearch]=useState('');

    var username=localStorage.getItem('username');


    const [codes,setCodes]=useState([]);
    const getUserCodes=async()=>{
        try{
            const id=localStorage.getItem('userId');
            const {data}= await axios.get(`https://project-backend-t955.onrender.com/api/v1/code/user-code/${id}`);
            if(data?.success){
                setCodes(data?.userCode.codes);
            }
        }catch(error)
        {
            console.log(error);
        }
    }

    useEffect(()=>{
        getUserCodes();
    });





    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }, []);

    const navigate=new useNavigate();
    function handleUpdate(id){
        navigate(`/updatecode/${id}`)
        //alert(id);
       // return true;

    }

    function displayCode(id){
        navigate(`/showcode/${id}`)
        //alert(id);
       // return true;

    }

    const handleDelete=async(id)=>{
        if(window.confirm("Do you want to delete?")){
        try{
            const {data}=await axios.delete(`https://project-backend-t955.onrender.com/api/v1/code/delete-code/${id}`);
            if(data?.success){
                toast("Question Deleted Successfully.");
                //navigate()
            }
        }catch(error){
            console.log(error);
        }
    }
    }

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
                    <Link id="LO"><h4 onClick={handleLogout}>log out&emsp;</h4></Link>
                </div>
                <div  id="mobNav">
                    <i id="mNav1" onClick={showIcon} class="fa fa-navicon"></i>
                    <i id="mNav2"  onClick={hideIcon}  style={{display:"none"}} class="fa fa-times"></i>
                </div>
            </div>




            <div id="parent">
            <ToastContainer/>

                <div id="i4">
                    <Link to="/page"><div><i class="fa fa-home"></i></div></Link>
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

                        <Link><i class="fa fa-code"></i></Link>
                        <Link onClick={() => {window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}}><i class="fa fa-arrow-up"></i></Link>
                        <Link to="/addnew"><i class="fa fa-plus"></i></Link>
                        <Link ><i onClick={handleLogout} class="fa fa-sign-out"></i></Link>
                    </div>
                </div>


                <div id="Pchild1">
                    <h1 id="tit">Your Codes</h1>
                    {codes && codes.length>0? (
                        codes.filter((code)=>{
                            return search.toLowerCase()===''? code :code?.question.toLowerCase().includes(search.toLowerCase()) 
                            || search.toLowerCase()===''? code :code?.language.toLowerCase().includes(search.toLowerCase())

                        }).map((code)=>(
                            <div id="ansDiv">
                                <ReadMore>{code?.question}</ReadMore>
                                
                                <div id="Qbtn">
                                    <button onClick={()=>(displayCode(code?._id))}><i class="fa fa-code"></i>&emsp;code</button><br/>
                                    {/*</div><button><i class="fa fa-commenting-o"></i>&emsp;Add Comment.</button><br/></Link>*/}
                                    <button onClick={()=>(handleUpdate(code?._id))}><i class="fa fa-file-text-o"></i>&emsp;Update</button><br/>
                                    <button onClick={()=>(handleDelete(code?._id))}><i class="fa fa-trash-o"></i>&emsp;Delete</button><br/>
                                </div>
                                <p >language : {code?.language}</p>
                            </div>
                        ))
                            ):(<h1 id="post">You have not posted yet.</h1>) 
                    }
                </div>





                <div id="Pchild2">
                    <div id="rChild">
                        <div id="sBar">
                            <input type="text" id="sInp" placeholder="Search" onChange={(e)=>setSearch(e.target.value)}/>
                            <i id="sIcon" class="fa fa-search"></i>
                        </div>
                        <Link to="/profile"><button id="Pbtn"><i class="fa fa-user-o"></i>&emsp;profile</button></Link><br/>
                        <Link to="/page"><button id="Pbtn"><i class="fa fa-home"></i>&emsp;Go to home</button></Link><br/>
                        <button id="Pbtn" onClick={() => {window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}}><i class="fa fa-arrow-up"></i>&emsp;Go to Top</button><br/>
                        <Link to="/addnew"><button id="Pbtn"><i class="fa fa-plus">&emsp;</i>Add new code</button><br/></Link>
                        <Link to="/AskCode"><img style={{width:"4.5rem",height:"4.5rem",cursor:"pointer"}} src="https://img.icons8.com/?size=100&id=102660&format=png&color=000000"/></Link>

                    </div>
                </div>
            </div>






        </div>
        </>
    )
}
export default Code

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
