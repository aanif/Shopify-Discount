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
    const [endTime, setEndTime] = useState("");
    const [startTime, setStartTime] = useState("");
    const [edit, setEdit] = useState(false);
    const [preRequisiteProductId, setPreRequisiteProductId] = useState([]);
    const [entitledProductId, setEntitledProductId] = useState([]);
    const [priceRuleId, setPriceRuleId] = useState(null);
    const [priceRuleAltered, setPriceRuleAltered] = useState(""); // on every CRUD operation data would be fetched and string would change to whatever ran last e.g for creation, 'C' ; for editing, 'U'....

    const handleClose = (event, reason) => {
        if (reason && reason == "backdropClick"){
            return;
        }else{
            setIsModal(false);
            setPriceRuleId(null);
            setEdit(false);
        }
    };

    useEffect(() => {
        axios.get("http://127.0.0.1:8001/api/priceRule").then((response) => {
            setOffers(response.data.price_rules);
        });
    }, [priceRuleAltered]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8001/api/product").then((response) => {
            setProducts(response.data.products);
        });
    }, []);

    const deleteOffer = (offer) => {
        axios
            .delete(`http://127.0.0.1:8001/api/priceRule/${offer.id}`)
            .then((response) => {
                if (priceRuleAltered == "D") {
                    setPriceRuleAltered("d");
                } else {
                    setPriceRuleAltered("D");
                }
            });
    };

    const productsInTheOffer = (item) => {
        let filteredProductIds = new Set();
      
        if (Array.isArray(item.prerequisite_product_ids) && item.prerequisite_product_ids.length > 0) {
          item.prerequisite_product_ids.forEach((id) => {
            const productsWithPrereq = products.filter((product) => product.id === id);
            productsWithPrereq.forEach((product) => filteredProductIds.add(product.id));
          });
        }
      
        if (Array.isArray(item.entitled_product_ids) && item.entitled_product_ids.length > 0) {
          item.entitled_product_ids.forEach((id) => {
            const productsWithEntitlement = products.filter((product) => product.id === id);
            productsWithEntitlement.forEach((product) => filteredProductIds.add(product.id));
          });
        }
      
        const filteredProducts = products.filter((product) => filteredProductIds.has(product.id));
        setFilteredProducts(filteredProducts);
      
        setIsModal(true);
      };      

    const saveEdit = async () => {
        await axios
            .put(`http://127.0.0.1:8000/api/priceRule/${priceRuleId}`, {
                title: "edited_offer",
                prerequisite_product_ids: [preRequisiteProductId],
                entitled_product_ids: [entitledProductId],
                starts_at: startTime,
                ends_at: endTime,
            })
            .then((response) => {
                if (priceRuleAltered == "U") {
                    setPriceRuleAltered("u");
                } else {
                    setPriceRuleAltered("U");
                }

                setStartTime("");
                setEndTime("");
                setIsModal(false);
            });
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
                                    <td>
                                        <Button
                                            onClick={() => {
                                                productsInTheOffer(item);
                                                setPriceRuleId(item.id);
                                                setPreRequisiteProductId(item.prerequisite_product_ids);
                                                setEntitledProductId(item.entitled_product_ids);
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
                                    {!edit ? (
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
                                                title="edit"
                                                edge="end"
                                                color="inherit"
                                                onClick={() => {
                                                    setEdit(true);
                                                }}
                                                aria-label="edit"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Toolbar>
                                    ) : (
                                        <Toolbar
                                            sx={{
                                                justifyContent: "space-between",
                                            }}
                                        >
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
                                                title="save"
                                                edge="end"
                                                color="inherit"
                                                onClick={() => {
                                                    saveEdit();
                                                }}
                                                aria-label="save"
                                            >
                                                Save
                                            </IconButton>
                                        </Toolbar>
                                    )}
                                </AppBar>
                                <Table>
                                    {!edit ? (
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>ID</TableCell>
                                                <TableCell>Product</TableCell>
                                                <TableCell>Tag</TableCell>
                                                <TableCell>Status</TableCell>
                                                <TableCell>Discounted</TableCell>

                                            </TableRow>
                                        </TableHead>
                                    ) : (
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Product</TableCell>
                                                <TableCell>Tag</TableCell>
                                                <TableCell>Status</TableCell>
                                            </TableRow>
                                        </TableHead>
                                    )}
                                    {!edit ? (
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
                                                    <TableCell>{entitledProductId.includes(product.id) ? <div>Yes</div> : <div>No</div>}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    ) : (
                                        <TableBody>
                                            {filteredProducts.map((product) => (
                                                <TableRow key={product.id}>
                                                    <TableCell>
                                                        {product.title}
                                                    </TableCell>
                                                    <TableCell>
                                                        {product.tags}
                                                    </TableCell>
                                                    <TableCell>
                                                        {product.status}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                            <TableRow>
                                                <TableCell>
                                                    Start Time:{" "}
                                                    <input
                                                        type="datetime-local"
                                                        onChange={(e) => {
                                                            setStartTime(
                                                                e.target.value
                                                            );
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    End Time:{" "}
                                                    <input
                                                        type="datetime-local"
                                                        onChange={(e) => {
                                                            setEndTime(
                                                                e.target.value
                                                            );
                                                        }}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    )}
                                </Table>
                            </Box>
                        </Modal>
                    )}
                    <div>
                        <AddOffer
                            setPriceRuleAltered={setPriceRuleAltered}
                            priceRuleAltered={priceRuleAltered}
                            products={products}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
