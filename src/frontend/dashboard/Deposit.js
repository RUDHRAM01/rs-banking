import * as React from 'react';
import {useRef} from 'react'
import { styled, useTheme } from '@mui/material/styles';
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
import { VscAccount } from 'react-icons/vsc'
import { AiOutlineLogout } from 'react-icons/ai'
import { BiTransfer } from 'react-icons/bi'
import { MdOutlineAccountBalanceWallet } from 'react-icons/md'
import { MdOutlineTransferWithinAStation } from 'react-icons/md'
import { RiLuggageDepositLine } from 'react-icons/ri'
import { useState , useEffect} from 'react';
import './dashboard.css'
import Logo from '../img/depositmoney.png'
import { Paper } from '@mui/material';
import axios from 'axios';
import email from '@emailjs/browser';
import Alert from '@mui/material/Alert';
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

export default function PersistentDrawerLeft({formValue,setFormValue,_id}) {

  const theme = useTheme();
  const form = useRef();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const updateStatus = async () => {
    const data = { status: "pending" };
    const res = await axios.put(`http://localhost:3000/sign/${formValue._id}`, data);
    
    
    const resultokok = await axios.get(`http://localhost:3000/signs`);

    var i = 0;
    for ( i = 0; i < resultokok.data.length; i++){
      if (resultokok.data[i]._id === formValue._id) {
        setFormValue(resultokok.data[i]);
        localStorage.setItem("updatestatus", JSON.stringify(resultokok.data[i]));
        console.log(resultokok.data[i]);
        break;
      }
    }

    // setTimeout(() => {
    //   window.location = "./deposit";
    // }, 1500);
  }

  window.onload = function(){  
    let dataofuser = localStorage.getItem("updatestatus");
    setFormValue(JSON.parse(dataofuser));
  }


  const [success, SetSuccess] = useState(false);

  function sendEmail(e) {
    e.preventDefault();
      email.sendForm('service_3bw0bgl', 'template_92zx0am', form.current, '9XxTjzieZLyjIsbLa')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    
    updateStatus();
    
  }
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
                  {(index === 0) ? <VscAccount className='myicon'/> : (index === 1) ? <RiLuggageDepositLine className='myicon'/> : (index === 2) ? <MdOutlineTransferWithinAStation className='myicon'/> : (index === 3) ? <MdOutlineAccountBalanceWallet className='myicon'/> : (index === 4) ? <BiTransfer className='myicon'/> : <AiOutlineLogout className='myicon'/>}
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
              <div className='maindeposit'>
              <div className='accountframe'>
              <h1>Deposit</h1>
              <hr className='myhr'/>
              <div className='myaccounthead'>
              <div className='child-1-3-parent-myaccounthead'></div>
                <img className='myaccountlogo' src={Logo} alt="no img" />
                <div className='child-1-3-parent-myaccounthead'></div>
                  </div>
    
                  <div className='depositframe1' >

                    <div className='mydepositbase'>
                    <p>Would you want to add R to your account?</p>
                      <p>If yes then contact to the owner.</p>
                      <label for="method">Choose a method </label>
                      <a href="#connect"><button className='mydepositbutt'>connect</button></a>    
                      </div>
                  
                    </div>

              </div>
                <div className='myconnect' id='connect'>
                  <div id='myheading'><h1>Connect</h1></div>
                  <hr className='myhr' />
                  {success ? (
                  <Alert severity="success">Request received! Status pending</Alert>
                ) : (
                    <h1></h1>
                  )}
                  <Paper id='mypaper'>

                    <div className='papermain'>
                  <form ref={form} onSubmit={sendEmail}>
                      <div>
                        <div><label>Your Name</label></div>
                        <div><input type="text" name="user_fname" placeholder='name' readonly value={formValue.user_name}/></div>
                      </div>
                      <div>
                        <div><label>Your Email</label></div>
                        <div><input type="email" name="user_email" placeholder='email' value={formValue.user_email} readonly/></div>
                      </div>
                      <div>
                        <div><label>Your Account Number</label></div>
                        <div><input type="number" name="accountN" placeholder='account number' value={formValue.accountN} readonly/></div>
                      </div>
                      <div>
                        <div><label>Message</label></div>
                        <div><textarea required placeholder='message'></textarea></div>
                      </div>
                      <div>
                          <div>{formValue.status === "NA" ? (<><button className='connnetdeposit' type="submit" value="Send">Connect</button></>) : (<><button className='connnetdeposit' onClick={() => { SetSuccess(true); setTimeout(() => { SetSuccess(false) },2000)}}>Connect</button></>)}</div>
                    </div>
                      </form>
                      </div>
                </Paper>
                </div>
                <div className='mystatus'>
                  <div><h3>Status</h3></div>
                  <hr className='myhr'/>
                    <div><input type="text" placeholder='status' readOnly value={formValue.status}/></div>
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