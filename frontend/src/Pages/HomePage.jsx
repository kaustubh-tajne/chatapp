import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Login, Signup } from './index'
import { useNavigate } from "react-router-dom";

const HomePage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
        navigate('/chats');
    }
  }, [])

  return (
    <Container maxW={"xl"} centerContent border={"1px solid red"}>
      <Box
        d="flex"
        justifyContent="center"
        alignItems={"center"}
        w="100%"
        m={"40px 0 15px 0"}
        p={3}
        bg={"white"}
        border={"1px solid red"}
        borderRadius={"1px"}
        borderWidth={"1px"}
      >
        <Text textAlign={"center"} fontSize={"4xl"}>
          Talk-A-Tive
        </Text>
      </Box>

      <Box
        bg={"white"}
        w={"100%"}
        p={4}
        borderRadius={"lg"}
        borderWidth={"1px"}
        border={"1px solid red"}
      >
        <Tabs variant="soft-rounded">
          <TabList mb={"1em"}>
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
