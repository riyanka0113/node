import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Cart from '../pages/Cart'
import CreateProduct from '../pages/CreateProduct'
import Product from "../pages/Product"

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Product />} />
            <Route path="/product" element={<CreateProduct />} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
    )
}

export default Router