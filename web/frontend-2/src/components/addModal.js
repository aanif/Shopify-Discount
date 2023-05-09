import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddOffer(props) {
  const { setPriceRuleAltered } = props;
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('')
    const [preReqProd, setPreReqProd] = React.useState(8144954130711);
    const [entitledProd, setEntitledProd] = React.useState(8144954589463);
    const [startTime, setStartTime] = React.useState('');
    const [endTime, setEndTime] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTitle('')
        setStartTime('');
        setEndTime('');
    };

    const resetForm = () => {
        setTitle('')
        setStartTime('');
        setEndTime('');
    }

    const handleSave = async () => {
        await axios.post("http://127.0.0.1:8000/api/priceRule", {
          title: title,
          prerequisite_product_ids: [preReqProd],
          entitled_product_ids: [entitledProd],
          starts_at : startTime,
          ends_at: endTime,
        }).then((response)=>{
          console.log("response is: ", response);
          setPriceRuleAltered('C');
          resetForm();
        });
        handleClose();
    };

    return (
        <div>
            <Button color="primary" onClick={handleClickOpen}>
                Add offer
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: "relative" }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography
                            sx={{ ml: 2, flex: 1 }}
                            variant="h6"
                            component="div"
                        >
                            Create Offer
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleSave}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <List sx={{ p: 2 }}>
                    <ListItem>
                        <ListItemText primary="Title Product" />
                        <input
                            type="text"
                            onChange={(e) => {
                              setTitle(e.target.value);
                            }}
                        />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Start date and time" />
                        <input
                            type="datetime-local"
                            onChange={(e) => {
                              setStartTime(e.target.value);
                            }}
                        />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="End date and time" />
                        <input
                            type="datetime-local"
                            onChange={(e) => {
                                setEndTime(e.target.value);
                            }}
                        />
                    </ListItem>
                    <Divider />
                </List>
            </Dialog>
        </div>
    );
}
