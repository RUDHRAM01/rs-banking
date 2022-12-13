import * as React from 'react';
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
import { useState } from 'react';
import './dashboard.css'
import Logo from '../img/rs.jpeg'
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

export default function PersistentDrawerLeft({ formValue, setFormValue,user,_id}) {
  console.log(formValue);
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);

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
          {[<Link to="/users/account" ><button className='mybutton'>Account</button></Link>,<Link to="/users/deposit" ><button className='mybutton'>Deposit</button></Link>,<Link to="/users/withdrawal"><button className='mybutton'>Withdrawal</button></Link>, <Link to="/users/balance"><button className='mybutton'>Balance</button></Link>,<Link to="/users/transaction"><button className='mybutton'>Transaction</button></Link>,<Link to="/users/logout"><button className='mybutton'>Logout</button></Link>].map((text, index) => (
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
              <div className='accountframe'>
              <h1>Account</h1>
              <hr/>
              <div className='myaccounthead'>
              <div className='child-1-3-parent-myaccounthead'></div>
                <img className='myaccountlogo' src={Logo} alt="no img" />
                <div className='child-1-3-parent-myaccounthead'></div>
                </div>
                <div className='accountframe1' >
                <div className='myaccountbase'>
                <div className='myaccountbase-child1'><label>Name  </label></div>
                <div className='myaccountbase-child2'><input required type='text' name='user_name' placeholder='Name' readOnly value={formValue.user_name}></input></div>
                  </div>
                  <div className='myaccountbase'>
                <div className='myaccountbase-child1'><label>Account No. </label></div>
                <div className='myaccountbase-child2'><input required type='text' name='accountN' placeholder='AccountN' readOnly value={formValue.accountN}></input></div>
              </div>
                <div className='myaccountbase'>
                <div className='myaccountbase-child1'><label>Email  </label></div>
                <div className='myaccountbase-child2'><input required type='email' name='email' placeholder='Email' readOnly value={formValue.user_email}></input></div>
              </div>
              
              <div className='myaccountbase'>
                <div className='myaccountbase-child1'> <label>Password  </label></div>
                <div className='myaccountbase-child2'><input required type='password' name='password' placeholder='Password' value={formValue.user_password} readOnly></input></div>
                  </div>
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