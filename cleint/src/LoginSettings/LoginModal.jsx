import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Buttona from '../Components/Button.jsx'
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { DialogContent } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import SimpleSnackbar from '../Components/SnackBar.jsx'
import {saveThings, commonData, toStart} from '../Pages/HomePage/Logics.jsx'
import {collection, onSnapshot, doc, setDoc} from 'firebase/firestore';
import {db} from '../Firebase/config.jsx'
const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open, setSnackOpen, snackOpen } = props;
  // const [snackOpen, setSnackOpen] = useState(false)
  const [messageSnack, setMessageSnack] = React.useState('')
  const [snackId, setSnackId] = React.useState('')
  const [dataId, setDataId] = React.useState('')

  // const snackBar = SimpleSnackbar()

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const [login, setLogin] = React.useState(false)

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const navigate = useNavigate()
  const [user, setUser] = React.useState({
      name: '',
      lastName: '',
      email: '',
      password: '',
  })

  const handleChange = e => {
      const {name, value} = e.target
      setUser({
          ...user,
          [name]: value 
      })
  }

  // const setLoginUser = (data) => {
  //   setSnackOpen(data)
  // }

  const loginHandler = () =>{
      axios.post("http://localhost:9002/login", user)
      .then(res => {
          (res.data.id === 'success') && localStorage.setItem('auth', JSON.stringify(true))
          setSnackOpen(true)
          setSnackId(res.data.id)
          setMessageSnack(res.data.message)
          setUser({...user, name: '', lastName: '', email: '', password: ''})
          onClose(false)
          navigate('/')
      })
  }

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const handleChangeRegister = e => {
    const {name, value} = e.target
    setUser({
        ...user,
        [name]: value 
    })
}
React.useEffect(()=>{
  (dataId === 'success') && (localStorage.setItem('auth', JSON.stringify(true)));
},[dataId])

const register = () => {
    const {name, lastName, email, password} = user
    saveThings(user)
    if(name && lastName && email && password){
        axios.post("http://localhost:9002/register", user)
        .then(res => {
          setDataId(res.data.id)
          setSnackOpen(true)
          setSnackId(res.data.id)
          setMessageSnack(res.data.message)
          setUser({...user, name: '', lastName: '', email: '', password: ''})
          onClose(false)
          navigate('/')
        }
            )
    } else {
        alert('invalid post')
    }
}



  return (
      <> 
      <SimpleSnackbar snackOpen={snackOpen} messageSnack={messageSnack} setSnackOpen={setSnackOpen} snackId={snackId} />
    <Dialog onClose={handleClose} open={open} maxWidth="400px" >
      { login ? <DialogContent>
                <DialogTitle style={{textAlign: 'center'}}>Регистрация</DialogTitle>
            <DialogContent style={{width: '400px'}}>
            <List sx={{ pt: 0 }} >
                <TextField
                    autoFocus
                    value={ user.name} 
                    name="name"
                    onChange={handleChangeRegister}
                    // margin="dense"
                    id="FirstName"
                    label="First Name"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    value={ user.lastName} 
                    name="lastName"
                    onChange={handleChangeRegister}
                    // margin="dense"
                    id="lastName"
                    label="Last Name"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    // margin="dense"
                    value={ user.email} 
                    name="email"
                    onChange={handleChangeRegister}
                    id="Email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    // margin="dense"
                    name="password"
                    value={ user.password } 
                    onChange={handleChangeRegister}
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                />
            </List>
            <List style={{marginTop: '10px'}}>
                <div onClick={register}>
                    <Buttona titleName={'Зарегистрироваться'} bgColor="#51267D" textColor="#fff" />
                </div>
            </List>
            <List style={{textAlign: 'center'}}>
                У вас есть аккаунт?
                <DialogTitle onClick={()=> setLogin(false)} style={{display:'inline', cursor: 'pointer', fontSize: '16px', color: "#51267D"}}>
                    Войти
                </DialogTitle>
            </List>
            
            </DialogContent>
        </DialogContent> :
        <DialogContent>
            <DialogTitle style={{textAlign: 'center'}}>Вход на сайт</DialogTitle>
            <DialogContent style={{textAlign: 'center'}}>Войдите с вашей электронной почты</DialogContent>
            <List>
            <TextField
                    autoFocus
                    margin="dense"
                    value={user.email}
                    name="email"
                    id="Email"
                    label="Email Address"
                    onChange={handleChange}
                    type="email"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    value={user.password}
                    name="password"
                    onChange={handleChange}
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                />
            </List>
            <List style={{marginTop: '10px'}} >
                <div onClick={loginHandler}>
                    <Buttona titleName={'Войти'} bgColor="#51267D" textColor="#fff" />
                </div>
            </List>
            <List style={{textAlign: 'center'}}>
                У вас нет аккаунта? 
                <DialogTitle onClick={()=> setLogin(true)} style={{display:'inline', cursor: 'pointer', fontSize: '16px', color: "#51267D"}}>
                    Регистрация
                </DialogTitle>
            </List>
        </DialogContent>}
    </Dialog> 

    </>

  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function LoginModal({open, setOpen, setSnackOpen, snackOpen}) {

  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <SimpleDialog
      snackOpen={snackOpen}
      setSnackOpen={setSnackOpen}
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
