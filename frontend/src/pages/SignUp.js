import { useToast } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { register } from '../config';

const SignUp = () => {


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

        if (data.password !== data.confirmPassword) {
            toast({
                description: "Please Enter Cofirm Password As Password",
                isClosable: true,
                status: "error",
                duration: 3000
            })
            return;
        }

        register({ email: data.email, password: data.password }).then(() => {
            toast({
                description: "You Are Successfully Registered",
                isClosable: true,
                status: "success",
                duration: 3000
            })
            navigate("/login")
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
        <Card isSignup={true} handleSubmit={handleSubmit} />
    )
}

export default SignUp