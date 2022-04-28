import { Button, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { useState } from 'react'

const Card = ({ isSignup, handleSubmit }) => {

    const [data, setData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((old) => { return { ...old, [name]: value } })
    }

    return (
        <Flex width="100%" height="100vh" flexDir={"column"} justify="center" alignItems="center">
            <Flex flexDir="column" alignItems="center" width="50%" bgColor="GrayText" p="3" color="white" borderRadius={"md"}>
                <FormControl my="2">
                    <FormLabel htmlFor='email'>Email address</FormLabel>
                    <Input placeholder='Email' id="email" type="email" value={data.email} name="email" onChange={handleChange} />
                </FormControl>
                <FormControl my="2">
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <Input placeholder='Password' id="password" type="password" value={data.password} name="password" onChange={handleChange} />
                </FormControl>
                {isSignup && (

                    <FormControl my="2">
                        <FormLabel htmlFor='confirm'>Confirm Password</FormLabel>
                        <Input placeholder='Confirm Password' id="confirm" type="password" value={data.confirmPassword} name="confirmPassword" onChange={handleChange} />
                    </FormControl>
                )}
                <Button onClick={() => handleSubmit(data)} colorScheme='blue'> {isSignup ? "Sign Up" : "Login"}</Button>
            </Flex>
        </Flex>
    )
}

export default Card