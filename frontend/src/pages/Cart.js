import React, { useEffect } from 'react'
import { Badge, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import CardComponent from '../components/Card'
import { getCart } from '../redux/cartSlice'

const Cart = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])


  return (
    <Container>
      <h1>Total Price : <Badge bg="secondary">RS.{cart.reduce((prev, item) => prev + item.price, 0)}</Badge></h1>
      <Container className='d-flex flex-wrap justify-content-center mt-5' style={{ gap: "2.5rem" }}>
        {
          cart.map(item =>
            <CardComponent item={{ _id: item._id, name: item.product[0].name, description: item.product[0].description, price: item.price, quantity: item.product[0].quantity, count: item.count, image: item.product[0].image }} isCart={true} key={item._id} />
          )
        }
      </Container>
    </Container>
  )
}

export default Cart