import react ,{useEffect,useState} from "react";
import { Link ,useNavigate} from "react-router-dom";
import "./page.css"
import axios from 'axios';
import toast,{Toaster} from "react-hot-toast"

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

const Page=()=>{
    const [loading, setLoading] = useState(false);
    const [search,setSearch]=useState('');
   // console.log(search)


  //  let isLogin=useSelector(state=>state.isLogin);
  //  isLogin=isLogin || localStorage.getItem("userId");
  //  const dispatch=useDispatch();
    const navigate=useNavigate();
    //console.log(isLogin);

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
    function displayCode(id){
        navigate(`/showcode/${id}`)
        //alert(id);
       // return true;

    }




    const [codes,setCodes]=useState([]);
    const getAllCodes=async()=>{
        setLoading(true);
        try{
            const {data}= await axios.get('https://project-backend-t955.onrender.com/api/v1/code/all-code');
            if(data?.success){
                setCodes(data?.codes);
            }
        }catch(error){
            console.log(error);
        }
        setLoading(false);
    }

    

    useEffect(()=>{
        getAllCodes();
    },[]);







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
                    <Link id="LO"><h4 onClick={handleLogout}>log out&emsp;</h4></Link>
                </div>
                <div  id="mobNav">
                    <i id="mNav1" onClick={showIcon} class="fa fa-navicon"></i>
                    <i id="mNav2"  onClick={hideIcon}  style={{display:"none"}} class="fa fa-times"></i>
                </div>
            </div>




            <div id="parent">

                <div id="i4">
                    <div><i class="fa fa-home"></i></div>
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

                <div id="Pchild1">
                    {loading?(
                        <h1>Loading....</h1>
                    ) :(codes && codes.filter((code)=>{
                        return search.toLowerCase()===''? code :code?.question.toLowerCase().includes(search.toLowerCase()) 
                         ||  search.toLowerCase()===''? code :code?.user?.username.toLowerCase().includes(search.toLowerCase())
                         || search.toLowerCase()===''? code :code?.language.toLowerCase().includes(search.toLowerCase())

                    }).map((code)=>(
                    <div id="ansDiv">
                        <ReadMore>
                            {code?.question}</ReadMore>
                        <div id="Qbtn">
                            <button onClick={()=>(displayCode(code?._id))}><i class="fa fa-code"></i>&emsp;code</button><br/>
                          {/*  <Link to="/showcode"><button><i class="fa fa-commenting-o"></i>&emsp;Add Comment.</button><br/></Link>*/}
                        </div>
                        <div>
                            {code?.user ? (
                                <p>Posted by: {code.user.username} &emsp;&emsp; language: {code?.language}</p>
                            ) : (
                                <p>Posted by: Anonymous &emsp;&emsp; language: {code?.language}</p>
                            )}
                            
                            </div>

                    </div>
                    )))}
                </div>
                
 




                <div id="Pchild2">
                    <div id="rChild">
                        <div id="sBar">
                            <input type="text" id="sInp" placeholder="Search" onChange={(e)=>setSearch(e.target.value)} />
                            <i id="sIcon" class="fa fa-search"></i>
                        </div>
                        <Link to="/profile"><button id="Pbtn"><i class="fa fa-user-o"></i>&emsp;profile</button></Link>
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
export default Page

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
