import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
export default function Login() {
  let navigate=useNavigate();
  const [usercred,setusercred]=useState({email:"",password:""});
  const handlesubmit= async(e)=>{
    e.preventDefault();
    const response=await fetch('http://localhost:5000/api/loginuser',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({email:usercred.email,password:usercred.password})
    });
    const resp=await response.json();
    console.log(resp);
    if(!resp.success)
    alert("Enter valid credentials");
    if(resp.success){ 
      localStorage.setItem("UserEmail",usercred.email);
      localStorage.setItem("authToken",resp.AuthToken);
      console.log(localStorage.getItem("authToken"));
    navigate('/');
    }

}
const changehandler=(event)=>{
  setusercred({...usercred,[event.target.name]:event.target.value})
}
  return (
    <div className='container mt-10'>
       <form onSubmit={handlesubmit}>
    
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name='email' value={usercred.email} onChange={changehandler}/>

  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password'  value={usercred.password} onChange={changehandler}/>
  </div>
 
  <button type="submit" className="btn btn-success">Submit</button>
  <Link to='/createuser' className='m-3 btn btn-danger'>New User</Link>
</form>
    </div>
  )
}
