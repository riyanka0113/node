import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createCart, update } from "../redux/cartSlice";

const arrayBufferToBase64 = (buffer) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
};

const CardComponent = ({ item, isCart }) => {
    const base64Flag = `data${item.image?.contentType};base64,`;
    const imageStr = arrayBufferToBase64(item.image?.data.data);
    const dispatch = useDispatch();
    const [count, setCount] = useState(!isCart ? 1 : item.count);

    const addCart = () => {
        const data = {
            id: item._id,
            quantity: count,
            price: item.price,
        };
        dispatch(createCart(data)).then(() => {
            toast.configure();
            toast.success("cart add successfully", { position: "bottom-center" });
        });
    };

    const updateCart = () => {
        const data = {
            id: item._id,
            count
        }
        dispatch(update(data)).then(() => {
            toast.configure();
            toast.success("cart update successfully", { position: "bottom-center" });
        });
    }

    return (
        <Card style={{ width: "30%" }}>
            <Card.Img variant="top" src={`${base64Flag}${imageStr}`} />
            <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text>Price : Rs.{item.price}</Card.Text>
                <Card.Text>Quantity: {item.quantity}</Card.Text>

                <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center " style={{ gap: "5px" }}>
                        <Button
                            className="px-2"
                            onClick={() => {
                                if (count <= 1) {
                                    toast.configure();
                                    toast.error("You can't Add less than one quantity", {
                                        position: "bottom-center",
                                        autoClose: 3000,
                                        hideProgressBar: true,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                    });
                                } else {
                                    setCount((old) => old - 1);
                                }
                            }}
                        >
                            -
                        </Button>
                        <span>{count}</span>
                        <Button
                            className="px-2"
                            onClick={() => {
                                if (count + 1 > item.quantity) {
                                    toast.configure();
                                    toast.error("You can't add more than product quantity", {
                                        position: "bottom-center",
                                        autoClose: 3000,
                                        hideProgressBar: true,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                    });
                                } else {
                                    setCount((old) => old + 1);
                                }
                            }}
                        >
                            +
                        </Button>
                    </div>
                    {!isCart ? (
                        <Button variant="primary" onClick={() => addCart()}>
                            Add To Cart
                        </Button>
                    ) : (
                        <Button variant="primary" onClick={() => updateCart()}>
                            Update Quantity
                        </Button>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default CardComponent;
