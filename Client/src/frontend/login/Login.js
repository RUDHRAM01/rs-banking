import React, { useState } from 'react'
import './login.css'
import Logo from '../img/logo.png'
import Rudhram from '../img/rs.jpeg'
import NavBar from '../navbar/NavBar'
import axios from 'axios'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'


 function Login({formValues, setFormValues, checkUser}) {

    const defaultValue = {
        id: "",
        email: "",
        password: "",
      }
      


    const handleInputChange = (e) => {
        console.log(e.target);
        
        const { name, value } = e.target;
        console.log(name);
        setFormValues({
          ...formValues,
          [name]: value,
        });
      };

    
    return (
        <>
           <NavBar className="mynav"/>
            <div className='mainsign'>
                <div className='main-contant'>
                    <div><h3 className='mysiginhead'>SignIn</h3> <img className='Rudhram' src={Rudhram} alt="" /></div>
                    <form action="" className='myform'>
                        <div>
                            <div> <label className='mylable'>Email : </label></div>
                            <input required type='email' name='email' placeholder='Email' value={formValues.email} onChange={handleInputChange}></input>
                         </div>
                        <div >
                            <div><label className='mylable'>Password : </label></div>
                             <input required type='password' name='password' placeholder='Password' value={formValues.password} onChange={handleInputChange}></input>
                         </div>
                        <div className='mysigninbutton'><Button id='mybutt' onClick={checkUser}>Sign in</Button></div> 
                        <hr />
                        <Link to="/signUp"><p className='myque'>Don't have an account?</p></Link>
                        <Link to="/forgotPassword"><p className='myque'>Forgot password.</p></Link>
                     </form>        
                </div>
            </div>
        </>
       
    )
}

export default Login