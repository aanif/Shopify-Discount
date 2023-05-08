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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const RadioButtonsGroup=()=> {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Choose Product</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="Product_id_A"
        name="radio-buttons-group"
      >
        <FormControlLabel value="Product_id_A" control={<Radio />} label="Product A" />
        <FormControlLabel value="Product_id_B" control={<Radio />} label="Product B" />
      </RadioGroup>
    </FormControl>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(offer) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color='primary' onClick={handleClickOpen}>
        check offer
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
              Offer A
            </Typography>
            <Button autoFocus color="inherit">
              edit
            </Button>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="product A" secondary="Titania" />
            <ListItemText primary="$$$" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="product B"
              secondary="Tethys"
            />
            <ListItemText primary="$$$" />
          </ListItem>
        </List>
        <div>
        {RadioButtonsGroup()}
        </div>
      </Dialog>
    </div>
  );
}
