import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import CardComponent from '../components/Card'
import { getProduct } from '../redux/productSlice'

const Product = () => {
  const dispatch = useDispatch()
  const product = useSelector((state) => state.product)

  useEffect(() => {
    dispatch(getProduct())
  }, [dispatch])


  return (
    <Container className='d-flex flex-wrap justify-content-center' style={{ gap: "2.5rem" }}>
      {
        product.map(item =>
          <CardComponent item={item} isCart={false} key={item._id} />
        )
      }
    </Container>
  )
}

export default Product