import react ,{useEffect,useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import { useParams } from "react-router-dom";

window.onresize=function()
{
    document.getElementById("i4").style.width=window.innerWidth+"px";
    if(window.innerWidth>900)
    {
        document.getElementById("i4").style.display="none";
        document.getElementById("i5").style.display="none";
        document.getElementById("PchildAdd").style.marginTop="5rem";

    }
    if(window.innerWidth<=900)
    {
       document.getElementById("mNav1").style.display="flex";
        document.getElementById("mNav2").style.display="none";
        document.getElementById("i4").style.display="none";
        document.getElementById("i5").style.display="none";

        document.getElementById("PchildAdd").style.marginTop="5rem";
    }
}

const Updatecode=()=>{

    const [code,setCode]=useState({});
    const [inputs,setInputs]=useState({})
    

    var username=localStorage.getItem('username');
    const id=localStorage.getItem('userId');
    const blog_id=useParams().id;
    //alert(blog_id);
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


    const getCodeDetail=async()=>{
        try{
            const {data}=await axios.get(`https://project-backend-t955.onrender.com/api/v1/code/get-code/${blog_id}`);
            if(data?.success){
                setCode(data?.code);
                setInputs({
                    question:data?.code.question,
                    language:data?.code.language,
                    answer:data?.code.answer,
                    comment:data?.code.comment,

                })
            }
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        getCodeDetail();
    },[blog_id]);
    //console.log(code);

    const handleChange=(e)=>{
        setInputs(prevState=>({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        //console.log(inputs);
        try{
            const {data}=await axios.put(`https://project-backend-t955.onrender.com/api/v1/code/update-code/${blog_id}`,{
                question:inputs.question,
                language:inputs.language,
                answer:inputs.answer,
                comment:inputs.comment,
                user:id,
            })
            if(data?.success){
                alert('Question Updated.');
                navigate('/yourcode');
            }
        }catch(error){
            console.log(error);
        }

    }



    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }, []);


      //const [rows, setRows] = useState([{ id: 1, answer: '' }]);

     // const addRow = (id) => {
       // document.getElementById("Adiv").style.marginBottom="20rem";

       // setRows([...rows, { id: rows.length + 1, answer: '' }]);
        //if(id>1){
        //document.getElementById("Adiv").style.marginBottom="20rem";
        //}
     // };

    
     /* const removeRow = (id) => {
        if(id==1)
        {
            alert("You can not delete this answer box provide your code in this box first.");
        }
        else{
        setRows(rows.filter((row) => row.id !== id));
        alert("Deleted.")
        }
      };
    
      const handleInputChange = (id, field, value) => {
        setRows((prevRows) =>
          prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
        );
      };
*/

      
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
                    <Link to="/page"><div><i class="fa fa-home"></i></div></Link>
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





                <form id="PchildAdd" onSubmit={handleSubmit} >
                <h1>Update Question</h1>
                    <div id="Qdiv">
                        <h2>Question : </h2>
                        <textarea name="question" value={inputs.question} onChange={handleChange} required></textarea>
                    </div>
                    <div id="Adiv">
                        <h2>Code : </h2>
                        <select name="language" value={inputs.language} onChange={handleChange} required>
                            <option value="Not specified">--select--</option>
                            <option value="Python">Python</option>
                            <option value="CPP">CPP</option>
                            <option value="C">C</option>
                            <option value="Java">Java</option>
                            <option value="JavaScript">JavaScript</option>
                            <option value="Php">Php</option>
                            <option value="Kotlin">Kotlin</option>
                        </select><br/><br/>
                        <textarea name="answer" value={inputs.answer} onChange={handleChange}  required></textarea><br/><br/>
                        <h2>caption : </h2>
                        <textarea name="comment" value={inputs.comment} onChange={handleChange}></textarea><br/><br/>
                        <button><i class="fa fa-file-code-o">&emsp;</i>Update</button><br/><br/>
                    </div>
                </form>
               


                <div id="Pchild2">
                    <div id="rChild">
                        <div id="sBar">
                            <input type="text" id="sInp" placeholder="Search" />
                            <i id="sIcon" class="fa fa-search"></i>
                        </div>
                        <Link to="/profile"><button id="Pbtn"><i class="fa fa-user-o"></i>&emsp;profile</button></Link><br/>
                        <Link to="/yourcode"><button id="Pbtn"><i class="fa fa-code"></i>&emsp;Your Code</button></Link><br/>
                        <button id="Pbtn" onClick={() => {window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}}><i class="fa fa-arrow-up"></i>&emsp;Go to Top</button><br/>
                        <Link to="/page"><button id="Pbtn"><i class="fa fa-home">&emsp;</i>Go to home</button><br/></Link>
                        <Link to="/AskCode"><img style={{width:"4.5rem",height:"4.5rem",cursor:"pointer"}} src="https://img.icons8.com/?size=100&id=102660&format=png&color=000000"/></Link>

                    </div>
                </div>
            </div>






        </div>
        </>
    )
}
export default Updatecode

function showIcon()
{
    document.getElementById("mNav1").style.display="none";
    document.getElementById("mNav2").style.display="flex";
    document.getElementById("i4").style.display="flex";
    document.getElementById("PchildAdd").style.marginTop="10rem";
}


function hideIcon()
{
    document.getElementById("i5").style.display="none";
    document.getElementById("mNav2").style.display="none";
    document.getElementById("mNav1").style.display="flex";
    document.getElementById("i4").style.display="none";
    document.getElementById("PchildAdd").style.marginTop="5rem";
}





function hideNavSearch()
{
    if(document.getElementById("i5").style.display=="flex" & document.getElementById("sBar").style.display=="flex")
    {
        document.getElementById("i5").style.display="none";
        document.getElementById("PchildAdd").style.marginTop="10rem";

    }
    else{
        document.getElementById("i5").style.marginTop="10rem";
        document.getElementById("i5").style.display="flex";
        document.getElementById("sBar").style.display="flex";
        document.getElementById("pBar").style.display="none";
        document.getElementById("PchildAdd").style.marginTop="15rem";

    }

    
}


function hideNavProfile()
{

    if(document.getElementById("i5").style.display=="flex" & document.getElementById("pBar").style.display=="flex" )
    {
        document.getElementById("i5").style.display="none";
        document.getElementById("PchildAdd").style.marginTop="10rem";

    }
    else
    {
        document.getElementById("i5").style.marginTop="10rem";
        document.getElementById("i5").style.display="flex";
        document.getElementById("pBar").style.display="flex";
        document.getElementById("sBar").style.display="none";
        document.getElementById("PchildAdd").style.marginTop="15rem";

    }


    
}
