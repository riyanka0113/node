import React, { useEffect, useState } from "react";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getContact } from "../config";

const ContactList = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        getContact()
            .then((res) => setData(res.data.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <Flex p="5" flexDir={"column"}>
            <Button
                colorScheme={"blue"}
                onClick={() => navigate("/create")}
                width="20%"
                alignSelf={"flex-end"}
            >
                ADD Contact
            </Button>
            {data.map((item) => (
                <Flex
                    key={item._id}
                    shadow="lg"
                    borderRadius={"lg"}
                    w="100%"
                    my="3"
                    p="5"
                    gap="10"
                    alignItems={"center"}
                >
                    <Image src={item.image ? item.image : ""} alt="image" boxSize={"150px"} />
                    <Flex flexDir={"column"}>
                        <Text textTransform={"capitalize"}> {item.name}</Text>
                        <Text>{item.mobile}</Text>
                        <Text>{item.email}</Text>
                    </Flex>
                </Flex>
            ))}
        </Flex>
    );
};

export default ContactList;
