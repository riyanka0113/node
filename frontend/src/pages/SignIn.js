import { useToast } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import { login } from '../config'

const SignIn = () => {
    const toast = useToast()
    const navigate = useNavigate()

    const handleSubmit = (data) => {
        if (!(/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(data.email))) {
            toast({
                description: "Please Enter Valid email address",
                isClosable: true,
                status: "error",
                duration: 3000
            })
            return;
        }

        login({ email: data.email, password: data.password }).then((res) => {
            toast({
                description: "You Are Successfully Logged In",
                isClosable: true,
                status: "success",
                duration: 3000
            })
            localStorage.setItem("Access", res.data.data.accessToken)
            navigate("/home")

        }).catch(err => {
            console.log(err);
            toast({
                description: { err },
                isClosable: true,
                status: "error",
                duration: 3000
            })
        })

    }
    return (
        <Card isSignup={false} handleSubmit={handleSubmit} />
    )
}

export default SignIn