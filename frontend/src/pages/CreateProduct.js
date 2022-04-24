import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { createProduct } from '../redux/productSlice';

const CreateProduct = () => {
    const [data, setData] = useState({
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        file: ""
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === "file") {
            setData((old) => { return { ...old, file: e.target.files[0] } })
        } else
            setData((old) => { return { ...old, [name]: value } })
    }

    const handleSubmit = () => {
        const form = new FormData()
        for (const [key, value] of Object.entries(data)) {
            form.append(key, value);

        }
        dispatch(createProduct(form)).then(() => {
            setData({
                name: "",
                description: "",
                price: 0,
                quantity: 0,
                file: ""
            })
        })
    }

    return (
        <Container>
            <Form>
                <Form.Group className="mb-3" controlId="ControlName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control type="text" value={data.name} placeholder="Product Name" name="name" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="ControlDescription">
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="product description" value={data.description} name="description" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="ControlPrice">
                    <Form.Label>Product Price</Form.Label>
                    <Form.Control type="number" placeholder="product price" value={data.price} name="price" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="ControlQuantity">
                    <Form.Label>Product Qunatity</Form.Label>
                    <Form.Control type="number" placeholder="product quantity" value={data.quantity} name="quantity" onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Product Image</Form.Label>
                    <Form.Control type="file" name="file" onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" onClick={() => handleSubmit()} >Submit</Button>
            </Form>
        </Container>
    )
}

export default CreateProduct