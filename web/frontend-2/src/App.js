import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import FullScreenDialog from "./components/modal.js";
import AddOffer from "./components/addModal.js";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from '@mui/icons-material/Edit';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

function App() {
    const [offers, setOffers] = useState([]);
    const [isModal, setIsModal] = useState(false);
    const handleOpen = () => setIsModal(true);
    const handleClose = () => setIsModal(false);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/priceRule").then((response) => {
            setOffers(response.data.price_rules);
        });
    }, []);

    const deleteOffer = (offer) => {
        console.log(offer); //implement logic to remove offer from the table
    };

    const openModal = async () => {
        handleOpen();
    };
    return (
        <div className="App container">
            {offers.length > 0 && (
                <div>
                    <table border="1">
                        <tbody>
                            <tr>
                                <th>Title</th>
                                <th>starts at</th>
                                <th>ends at</th>
                            </tr>
                            {offers.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.title}</td>
                                    <td>{item.starts_at}</td>
                                    <td>{item.ends_at}</td>
                                    <Button
                                        onClick={() => {
                                            setIsModal(true);
                                        }}
                                    >
                                        {" "}
                                        CHECK OFFER{" "}
                                    </Button>
                                    <td
                                        className="delete"
                                        onClick={() => deleteOffer(item)}
                                    >
                                        Delete
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {isModal && (
                        <Modal
                            open={isModal}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
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
                                        <IconButton
                                            edge="end"
                                            color="inherit"
                                            onClick={handleClose}
                                            aria-label="close"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Toolbar>
                                </AppBar>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Product</TableCell>
                                            <TableCell>Price</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Product A</TableCell>
                                            <TableCell>$$$</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Product B</TableCell>
                                            <TableCell>$$$</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Product C</TableCell>
                                            <TableCell>$$$</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Modal>
                    )}

                    <div>
                        <AddOffer />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
