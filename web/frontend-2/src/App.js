import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import AddOffer from "./components/addModal.js";
import {
    Button,
    Radio,
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
import EditIcon from "@mui/icons-material/Edit";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflow: "auto",
};

function App() {
    const [offers, setOffers] = useState([]);
    const [isModal, setIsModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const handleOpen = () => setIsModal(true);
    const handleClose = () => {
        setIsModal(false);
        setSelectedProductId(null);
    };

    useEffect(() => {
        axios.get("http://127.0.0.1:8001/api/priceRule").then((response) => {
            setOffers(response.data.price_rules);
        });
    }, []);

    useEffect(() => {
        // if (isModal == true) {
        axios.get("http://127.0.0.1:8001/api/product").then((response) => {
            setProducts(response.data.products);
        });
        // }
    }, []);

    const deleteOffer = (offer) => {
        console.log(offer); //implement logic to remove offer from the table
    };

    const openModal = async () => {
        handleOpen();
    };

    const productsInTheOffer = (item) => {
        let any = [];
        if (Array.isArray(item.prerequisite_product_ids) && item.prerequisite_product_ids.length > 0) {
          const prereqProduct = products.filter((product) => product.id === item?.prerequisite_product_ids[0]);
          console.log("prereq ", prereqProduct);
          any = [...filteredProducts, prereqProduct[0]];
        }
      
        if (Array.isArray(item.entitled_product_ids) && item.entitled_product_ids.length > 0) {
          const entitledProduct = products.filter((product) => product.id === item?.entitled_product_ids[0]);
          console.log("entite ", entitledProduct);
          setFilteredProducts([...any, entitledProduct[0]]);
        }
      
        console.log("filtered", products, item, filteredProducts);
        setIsModal(true);
      };
      

    console.log(filteredProducts, "filteredProducts");

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
                                    <td>
                                        <Button
                                            onClick={() => {
                                                console.log("items", item);
                                                productsInTheOffer(item);
                                            }}
                                        >
                                            {" "}
                                            CHECK OFFER{" "}
                                        </Button>
                                    </td>
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
                                            onClick={() => {
                                                handleClose();
                                                setFilteredProducts([]);
                                            }}
                                            aria-label="close"
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            color="inherit"
                                            onClick={() => {
                                                handleClose();
                                                setFilteredProducts([]);
                                            }}
                                            aria-label="close"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Toolbar>
                                </AppBar>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Product</TableCell>
                                            <TableCell>Tag</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Select Product</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredProducts.map((product) => (
                                            <TableRow key={product.id}>
                                                <TableCell>
                                                    {product.id}
                                                </TableCell>
                                                <TableCell>
                                                    {product.title}
                                                </TableCell>
                                                <TableCell>
                                                    {product.tags}
                                                </TableCell>
                                                <TableCell>
                                                    {product.status}
                                                </TableCell>
                                                <TableCell>
                                                    <Radio
                                                        // checked={
                                                        //     product.id ===
                                                        //     selectedProductId
                                                        // }
                                                        onChange={() =>
                                                            setSelectedProductId(
                                                                product.id
                                                            )
                                                        }
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
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
