import * as React from 'react';
import { useDispatch } from "react-redux";
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
import { MdAccountBox } from 'react-icons/md'
import { AiOutlineLogout } from 'react-icons/ai'
import { BiTransfer } from 'react-icons/bi'
import { MdOutlineAccountBalanceWallet } from 'react-icons/md'
import { MdOutlineTransferWithinAStation } from 'react-icons/md'
import { RiLuggageDepositLine } from 'react-icons/ri'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState , useEffect} from 'react';
import './dashboard.css'
import Logo from '../img/rs.jpeg'
import axios from 'axios';
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

export default function PersistentDrawerLeft({ formValue,_id }) {
  

  const [transactionValues, setTransactionValue] = useState([{
    transaction:"",
    date: "",
    amount:Number,
  }])

  console.log(_id);
  const assValue = (transactiondata) => {
  for (var i = 0; i < transactiondata.data.length; i++) {
    if (transactiondata.data[i]._id == _id) {
      setTransactionValue(transactiondata.data[i].transactions);
      return;
     }
  }
}

  try {
    useEffect(async ()  =>  {
      const transactiondata = await axios.get("http://localhost:3000/signs");
      assValue(transactiondata);
    },[])
  } catch (error) {
    console.log(error)
  }






  const theme = useTheme();
  
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  

function getData(item) {
  return (
    <StyledTableRow >
          <StyledTableCell component="th" scope="row">{item.transaction}</StyledTableCell>
          <StyledTableCell align="right">{item.amount}</StyledTableCell>
          <StyledTableCell align="right">{item.date}</StyledTableCell>
    </StyledTableRow>
  )
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
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Transaction </StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {(formValue.transactions).map(getData)}
        </TableBody>
      </Table>
    </TableContainer>

        </Typography>
        <Typography paragraph>
         
        </Typography>
      </Main>
    </Box>
        </>
    
  );
}