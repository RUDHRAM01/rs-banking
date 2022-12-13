import React, { useState , useRef ,useEffect} from 'react'
import './signup.css'
import Logo from '../img/logo.png'
import Rudhram from '../img/rs.jpeg'
import NavBar from '../navbar/NavBar'
import email from '@emailjs/browser';
import { useDispatch } from "react-redux";
import { addSign } from '../signSlice';
import { useHistory } from 'react-router-dom'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import Alert from '@mui/material/Alert';
import axios from 'axios'
export default function () {
    const history = useHistory();
    const form = useRef();
    const dispatch = useDispatch();
    const [switchnext, setSwitchNext] = useState(0);
    const [pass, setPass] = useState(true);
    const defaultValue = {
        user_name:"",
        user_email: "",
        user_password:"",
        get_code: "",
        accountN: "",
        status:"NA",
        accountB: 100,
        transactions: [],
        loginstatus: false,
    }
    const [num, setNum] = useState(4324);
    const [error, setError] = useState(false);
    const [errorMe, setErrorMe] = useState("Enter proper details!");
    function randomNumberInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    const randomClick = () => {
        setNum(randomNumberInRange(1565, 5546));
    };
    
    useEffect(() => {
        randomClick();
    }, []);
    
    const [accountN, setAccountN] = useState(156435);
    
    const accou = () => {
        setAccountN(randomNumberInRange(156434, 554643));
    };


    const sendEmail = async (e) => {
        if (formValues.user_name == "") {
            setErrorMe("please enter valid name");
            setError(true);
            setTimeout(() => {
                setError(false);
                setErrorMe("Enter proper details!");
            }, 2000);
            return;
        } else if (formValues.user_name == " ") {
            setErrorMe("please enter valid name");
            setError(true);
            setTimeout(() => {
                setError(false);
                setErrorMe("Enter proper details!");
            }, 2000);
            return;
        } else if (formValues.user_email.includes('@') == false || formValues.user_email.includes('.') == false) {
            setErrorMe("please enter valid email");
            setError(true);
            setTimeout(() => {
                setError(false);
                setErrorMe("Enter proper details!");
            }, 2000);
            return;
        }

        const result = await axios.get(`http://localhost:3000/signs`);
        const result1 = result.data.find(({ user_email }) => user_email === formValues.user_email);
        
        if (result1 !== undefined) {
            setErrorMe("Email Already Exist! try to SignIn");
            setError(true);
            setTimeout(() => {
                setError(false);
                setErrorMe("Enter proper details!");
            }, 2000);
            return;
        }

    e.preventDefault();
        email.sendForm('service_q2fx8ts', 'template_7grrsvi', form.current, 'v9HTUGcj9rJr_NFBd')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        setSwitchNext(1);
}
    const [formValues, setFormValues] = useState(defaultValue);


    const handleInputChange = (e) => {
        console.log(e.target);
        const { name, value } = e.target;
        console.log(name);
        setFormValues({
          ...formValues,
          [name]: value,
        });
    };
    
    const codeChecker = () => {
        if (num == formValues.get_code) {
            accou();
            formValues.accountN = accountN;
            setPass(false);
            
        } else {
            console.log(num);
            console.log(formValues.get_code);
            setErrorMe("Incorrect code! please check");
            setError(true);
            setTimeout(() => {
                setError(false);
                setErrorMe("Enter proper details!");
            }, 2000);
        }
    }

    const handleSubmit = (event) => {
        if (formValues.user_password == "" || formValues.user_password == " ") {
            return;
          }
        const { name, pass } = formValues;
        // checkUser(formValues);
          dispatch(addSign(formValues));
        history.push('/signin')
    };
    
    return (
        <>
            <NavBar />
            <div className='mainsignup'>

                <div className='main-contant'>
                {error ? (
                    <Alert severity="error">error — {errorMe}</Alert>
                            ) : (
                            <h1></h1>
                        )}  
                    <div><h3 className='mysiginhead'>SignUp</h3> <img className='Rudhram' src={Rudhram} alt="" /></div>
                    {pass ? (
                    <form ref={form} className='myform'>
                    {(switchnext === 0) ? (
                        <>
                        <div>       
                            <div> <label className='mylable'>Name : </label></div>
                            <input required type='text' name='user_name' placeholder='Name' onChange={handleInputChange} value={formValues.user_name}></input>
                         </div>
                        <div >
                            <div><label className='mylable'>Email : </label></div>
                            <input required type="email" name="user_email" placeholder='Email' onChange={handleInputChange} value={formValues.user_email}></input>
                         </div>
                                <div className='mysigninbutton'><Button id='mybutt' onClick={sendEmail}>Verify</Button></div> 
                                <input type="text" value={num} name="code" className="hide_Input" readOnly/> 
                            </>
                            ) : (
                                <>
                                <div><h3 className='myheading'>Verify Your Email</h3></div>
                                <div>
                                <div><label className='mylable'>Enter the code : </label></div>
                                
                                <input required type='password' name='get_code' placeholder='Code' onChange={handleInputChange} value={formValues.get_code}></input>
                                </div>
                                <div className='mysigninbutton'><Button id='mybutt' onClick={codeChecker}>Next</Button></div> 
                                </> 
                                 )}     
                        </form>  
                     ) : (
                        <>
                    <h3 className='myheading'>Create Password</h3>
                    <div >
                    <div><label className='mylable'>Password : </label></div>
                    
                    <input required className='child-1-2-1-2-parent-signin' aria-autocomplete='false' type='password' name='user_password' placeholder='Password' onChange={handleInputChange} value={formValues.user_password}></input>
                    </div>
                    <div className='mysigninbutton' ><Button id='mybutt' onClick={handleSubmit}>Create</Button></div> 
                    </>  
                    )}  
                    <hr />
                    <div className='already'><Link to="/signin"><p className='myque'>Already have an account?</p></Link></div>
                </div>
            </div>
        </>
       
    )
}