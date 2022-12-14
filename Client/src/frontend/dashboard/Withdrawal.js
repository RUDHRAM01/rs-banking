import * as React from 'react';
import {useRef} from 'react'
import { styled, useTheme } from '@mui/material/styles';
import { useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NavBar from '../navbar/NavBar';
import { Link } from 'react-router-dom';
import { MdAccountBox } from 'react-icons/md'
import { AiOutlineLogout } from 'react-icons/ai'
import { BiTransfer } from 'react-icons/bi'
import { MdOutlineAccountBalanceWallet } from 'react-icons/md'
import { MdOutlineTransferWithinAStation } from 'react-icons/md'
import { RiLuggageDepositLine } from 'react-icons/ri'
import { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css'
import Logo from '../img/withdrawal.png'
import { useHistory } from "react-router-dom";
import { Paper } from '@mui/material';
import Alert from '@mui/material/Alert';
import { addTransaction } from '../transactionSlice';
import email from '@emailjs/browser';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft({ formValue,setFormValue,_id }) {
  const history = useHistory();
  const dispatch = useDispatch();

  
  const [success, SetSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMe, setErrorMe] = useState("insufficient balance");
  
  const handleSubmit = async (e)  =>  {

    if (formValue.amount > formValue.accountB) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 4000);
      return;
    } else if (formValue.amount < 0) {
      setError(true);
      setErrorMe("Can't Accept Negative Value!");
      setTimeout(() => {
        setError(false);
        setErrorMe("insufficient balance");
      }, 4000);
      return;
    } else {
      // send mail to user  (rudhram service)
      e.preventDefault();
      email.sendForm('service_ralkwne', 'template_5dh3jns', form.current, 'mbrmhVVwl5JP_U-H3')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

      var today = new Date(),
      datenow = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      const data = {accountB : formValue.accountB - formValue.amount};
      const res = await axios.put(`http://localhost:3000/sign/${formValue._id}`, data);

      const resultok = await axios.get(`http://localhost:3000/signs`);
      let newdata = [];
      var i = 0;
      for ( i = 0; i < resultok.data.length; i++){
        if (resultok.data[i]._id === formValue._id) {
          newdata = resultok.data[i].transactions;
          break;
        }
      }

      newdata.push({ transaction: "withdrawal", date: datenow, amount: formValue.amount });
      const dd = { transactions : newdata };
      const k = await axios.put(`http://localhost:3000/sign/${formValue._id}`, dd);
      const resultokok = await axios.get(`http://localhost:3000/signs`);

      var i = 0;
      for ( i = 0; i < resultokok.data.length; i++){
        if (resultokok.data[i]._id === formValue._id) {
          setFormValue(resultok.data[i]);
          localStorage.setItem("updateuser", JSON.stringify(resultok.data[i]));
          break;
        }
      }

      SetSuccess(true);
      setTimeout(() => {
        SetSuccess(false);
        window.location = "/users/withdrawal"
      }, 4000);
    }

  }

  window.onload = function(){  
    let dataofuser = localStorage.getItem("updateuser");
    setFormValue(JSON.parse(dataofuser));
  }

  const handleInputChange = (e) => {
    
    const { name, value } = e.target;
    console.log(name, value);
    setFormValue({
      ...formValue, [name]: value,
    });
  };


  const theme = useTheme();


  const [open, setOpen] = React.useState(false);
  const form = useRef();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


    return (
        <>
            
    <Box sx={{ display: 'flex' }} >
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar id="mytop">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <NavBar />
        </Toolbar>
      </AppBar>
          <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader id="listhead">
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List id="list">
          {[<Link to="/users/account" ><button className='mybutton'>Account</button></Link>,<Link to="/users/deposit" ><button className='mybutton'>Deposit</button></Link>,<Link to="/users/withdrawal"><button className='mybutton'>Withdrawal</button></Link>,<Link to="/users/transaction"><button className='mybutton'>Transaction</button></Link>,<Link to="/users/logout"><button className='mybutton'>Logout</button></Link>].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {(index === 0) ? <MdAccountBox className='myicon'/> : (index === 1) ? <RiLuggageDepositLine className='myicon'/> : (index === 2) ? <MdOutlineTransferWithinAStation className='myicon'/> : (index === 3) ? <MdOutlineAccountBalanceWallet className='myicon'/> : (index === 4) ? <BiTransfer className='myicon'/> : <AiOutlineLogout className='myicon'/>}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
            <Typography paragraph>
              <div className='accountframewith'>
              <h1>Withdrawal</h1>
              <hr/>
              <div className='myaccounthead'>
              <div className='child-1-3-parent-myaccounthead'></div>
                <img className='myaccountlogo' src={Logo} alt="no img" />
                <div className='child-1-3-parent-myaccounthead'></div>
                </div>
                
                <div className='accountframe1' >
                {error ? (
                  <Alert severity="error">This is an error alert — {errorMe}</Alert>
                ) : (
                    <h1></h1>
                  )}
                   {success ? (
                  <Alert severity="success">Transaction completed! We will inform you via a mail.</Alert>
                ) : (
                    <h1></h1>
                  )}
                <form ref={form}>
              <div className='myaccountbase'>
                <div className='myaccountbase-child1'><label>Account No. </label></div>
                <div className='myaccountbase-child2'><input required type='text' name='accountN' placeholder='enter' readOnly value={formValue.accountN}></input></div>
              </div>
              
              <div className='myaccountbase'>
                <div className='myaccountbase-child1'> <label>Balance : </label></div>
                <div className='myaccountbase-child2'><input required type='number' name='accountB' placeholder='accountB' value={formValue.accountB} readOnly></input></div>
                  </div>
                    <div className='myaccountbase'>
                <div className='myaccountbase-child1'><label>Enter Amount </label></div>
                <div className='myaccountbase-child2'><input required type='number' name='amount' placeholder='enter'  value={formValue.amount} onChange={handleInputChange}></input></div>
                    </div>
                    <input type='email' name='user_email' value={formValue.user_email} className="hideemail"></input>
                    <div className='mywithbu'><button onClick={handleSubmit}>Enter</button></div>
                </form>
                </div>
              </div>
              
        </Typography>
        <Typography paragraph>
         
        </Typography>
      </Main>
    </Box>
        </>
    
  );
}