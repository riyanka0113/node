import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createContact } from "../config";

const CreateContact = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        mobile: "",
        file: ""
    });
    const navigate = useNavigate();
    const toast = useToast();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "image") {
            setData((old) => {
                return { ...old, file: e.target.files[0] };
            });
        } else
            setData((old) => {
                return { ...old, [name]: value };
            });
    };

    const handleSubmit = () => {
        if (!/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
            toast({
                description: "Please Enter Valid email address",
                isClosable: true,
                status: "error",
                duration: 3000,
            });
            return;
        }
        if (!data.mobile || data.mobile.trim().length !== 10) {
            toast({
                description: "Please Enter Valid Mobile Number",
                isClosable: true,
                status: "error",
                duration: 3000,
            });
            return;
        }
        const formData = new FormData()
        formData.append("file", data.file)
        formData.append("mobile", data.mobile)
        formData.append("name", data.name)
        formData.append("email", data.email)
        createContact(formData)
            .then((res) => {
                console.log(res);
                navigate("/");
            })
            .catch((err) => console.log(err));
    };

    return (
        <Flex
            width="100%"
            height="100vh"
            flexDir={"column"}
            justify="center"
            alignItems="center"
        >
            <Flex
                flexDir="column"
                alignItems="center"
                width="50%"
                bgColor="GrayText"
                p="3"
                color="white"
                borderRadius={"md"}
            >
                <FormControl my="2">
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                        placeholder="Name"
                        id="name"
                        type="text"
                        value={data.name}
                        name="name"
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl my="2">
                    <FormLabel htmlFor="email">Email address</FormLabel>
                    <Input
                        placeholder="Email"
                        id="email"
                        type="email"
                        value={data.email}
                        name="email"
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl my="2">
                    <FormLabel htmlFor="mobile">Mobile Number</FormLabel>
                    <Input
                        placeholder="Mobile Number"
                        id="mobile"
                        type="text"
                        value={data.mobile}
                        name="mobile"
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl my="2">
                    <FormLabel htmlFor="image">Mobile Number</FormLabel>
                    <Input
                        placeholder="Select image"
                        id="image"
                        type="file"
                        name="image"
                        onChange={handleChange}
                    />
                </FormControl>

                <Button onClick={() => handleSubmit()} colorScheme="blue">
                    {" "}
                    Add Contact
                </Button>
            </Flex>
        </Flex>
    );
};

export default CreateContact;
