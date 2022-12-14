import React, { useState } from 'react';
import { Route, Link, json  } from 'react-router-dom';
import Home from './frontend/home/Home';
import Login from './frontend/login/Login';
import Info from './frontend/information/Information';
import DashBoard from './frontend/dashboard/DashBoard';
import Account from './frontend/dashboard/Account';
import Deposit from './frontend/dashboard/Deposit';
import Withdrawal from './frontend/dashboard/Withdrawal';
import Transaction from './frontend/dashboard/Transaction';
import Logout from './frontend/dashboard/Logout';
import SignUp from './frontend/signup/SignUp';
import ForgotPassword from './frontend/login/ForgotPassword';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
import copyright from './loader/saraswatr.gif'
import './App.css'
export default function App() {
  const history = useHistory();
  const [copyr, setCopyR] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setCopyR(false);
    }, 2500);
  })
  const [formValues, setFormValues] = useState({
    id: "",
    email: "",
    password: "",
  });

  
  const [formValue, setFormValue] = useState({
    _id:"",
    user_name:"",
    user_email: "",
    user_password:"",
    get_code: "",
    accountN: "",
    status: "",
    loginstatus:"",
    accountB: "",
    transactions:[],
    
    createDate: "",
    updatedDate: "",
    createdBy: "",
    updatedBy: "",
  });

  const [checkLogin, setCheckLogin] = useState(false);
  

  const [user, setUser] = useState();
  const [_id, setId] = useState();
  let result = {};
  useEffect(async () => {
    result = await axios.get(`http://localhost:3000/signs`);
  },[])


  window.onload = function(){  
    let dataofuser = localStorage.getItem("loginuser");
    setFormValue(JSON.parse(dataofuser));
  }

  const checkUser = async () => {
  
    try {
        result = await axios.get(`http://localhost:3000/signs`);
        const result1 = result.data.find(({ user_email }) => user_email === formValues.email);
      
      if (formValues.password === result1.user_password && formValues.email === result1.user_email) {

        localStorage.setItem("loginuser",JSON.stringify(result1));
        let dataofuser = localStorage.getItem("loginuser");
       
        setFormValue(JSON.parse(dataofuser));
        setUser(result1.user_email);
        setId(result1._id);
        setCheckLogin(true);
        history.push('/users/account');
      } else {
          console.log("invalid");
      }
    } catch (error) {
      console.log(error);
    }  

  }
  
  
return (
    // <div>
    //   <Route exact path="/" component={Info}/>
    //   <Route exact path="/signin" render={() => <Login formValues={formValues} setFormValues={setFormValues} checkUser={checkUser} /> } />
    //   <Route exact path="/signUp" component={SignUp} />
    //   <Route exact path={`/users/${user}/${_id}`} render={() => <DashBoard formValue={formValue} setFormValue={setFormValue} user={user} _id={_id} /> }/>
    //   <Route exact path={`/users/${user}/${_id}/account`} render={() => <Account formValue={formValue} setFormValue={setFormValue} user={user} _id={_id} /> } />
    //   <Route exact path={`/users/${user}/${_id}/deposit`} render={() => <Deposit formValue={formValue} setFormValue={setFormValue} user={user} _id={_id} /> }/>
    //   <Route exact path={`/users/${user}/${_id}/withdrawal`} render={() => <Withdrawal formValue={formValue} setFormValue={setFormValue} user={user} _id={_id} /> }/>
    //   <Route exact path={`/users/${user}/${_id}/balance`} render={() => <Balance formValue={formValue} setFormValue={setFormValue} user={user} _id={_id} /> }/>
    //   <Route exact path={`/users/${user}/${_id}/transaction`} render={() => <Transaction formValue={formValue} setFormValue={setFormValue} user={user} _id={_id} /> }/>
    //   <Route exact path={`/users/${user}/${_id}/logout`} render={() => <Logout formValue={formValue} setFormValue={setFormValue} user={user} _id={_id} /> } />
    // </div>
  <div>
    {copyr ? (
      <>
      <div className='mycopy'><img src={copyright} alt="copyright" /></div>
      </>
    ) : (
      <>
      <Route exact path="/" component={Info}/>
      <Route exact path="/signin" render={() => <Login formValues={formValues} setFormValues={setFormValues} checkUser={checkUser} />} />
      <Route exact path="/forgotPassword" render={() => <ForgotPassword formValues={formValues} setFormValues={setFormValues} checkUser={checkUser} /> } />
      <Route exact path="/signUp" component={SignUp} />
      <Route exact path="/users/account" render={() => <Account formValue={formValue} setFormValue={setFormValue} user={user} _id={_id} /> } />
      <Route exact path="/users/deposit" render={() => <Deposit formValue={formValue} setFormValue={setFormValue} user={user} _id={_id} /> }/>
      <Route exact path="/users/withdrawal" render={() => <Withdrawal formValue={formValue} setFormValue={setFormValue} user={user} _id={_id} /> }/>
      <Route exact path="/users/transaction" render={() => <Transaction formValue={formValue} setFormValue={setFormValue} user={user} _id={_id} /> }/>
        <Route exact path="/users/logout" render={() => <Logout formValue={formValue} setFormValue={setFormValue} user={user} _id={_id} checkLogin={checkLogin} setCheckLogin={setCheckLogin} />} />
      </>
    )}
   
  </div>
  );
}