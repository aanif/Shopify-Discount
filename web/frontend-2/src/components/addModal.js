import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddOffer() {
  const [open, setOpen] = React.useState(false);
  const [preReqProd, setPreReqProd] = React.useState('');
  const [entitledProd, setEntitleProd] = React.useState('');
  const [startTime, setStartTime] = React.useState('');
  const [endTime, setEndTime] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async ()=>{
    await axios.post('http://127.0.0.1:8000/api/priceRule',{preReqProd,entitledProd,startTime,endTime});
  }

  return (
    <div>
      <Button color='primary' onClick={handleClickOpen}>
        Add offer
      </Button>
      <Dialog
  fullScreen
  open={open}
  onClose={handleClose}
  TransitionComponent={Transition}
>
  <AppBar sx={{ position: 'relative' }}>
    <Toolbar>
      <IconButton
        edge="start"
        color="inherit"
        onClick={handleClose}
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>
      <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
        Create Offer
      </Typography>
      <Button autoFocus color="inherit" onClick={handleSave}>
        save
      </Button>
    </Toolbar>
  </AppBar>
  <List sx={{ p: 2 }}>
    <ListItem>
      <ListItemText primary="Pre-requisite product" />
      <input type="text" onChange={(e)=>{setPreReqProd()}}/>
    </ListItem>
    <Divider />
    <ListItem>
      <ListItemText primary="Entitled product" />
      <input type="text" onChange={(e)=>{setEntitleProd()}}/>
    </ListItem>
    <Divider />
    <ListItem>
      <ListItemText primary="Start date and time" />
      <input type="datetime-local" onChange={(e)=>{setStartTime()}}/>
    </ListItem>
    <Divider />
    <ListItem>
      <ListItemText primary="End date and time" />
      <input type="datetime-local" onChange={(e)=>{setEndTime()}}/>
    </ListItem>
    <Divider />
  </List>
</Dialog>

    </div>
  );
}
