import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  Textarea,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import signInImage from "assets/img/signInImage.png";
import { ApiService } from "api/ApiRequests";
import { useHistory } from "react-router-dom";
import { handleError } from "utils";


export default function AddCompanyInfo() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    ApiService.getCompanyInfo().then((response) => {
      setName(response.data.name);
      setDescription(response.data.description);
    });
  };

  function validateForm() {
    return name.length> 0 && description.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    let data = { name: name, description: description };
    console.log(data);
    ApiService.patchCompanyInfo(data)
      .then((response) => {
        history.push("/company/company-positions");
      })
      .catch((error) => {
        handleError(error, setShowError, setErrorMessage)
      });
  }
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgForm = useColorModeValue("white", "navy.800");
  return (
    <Flex position="relative" mb="40px">
      <Flex
        minH={{ md: "1000px" }}
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ md: "0px" }}
      >
        <Flex
          w="100%"
          h="100%"
          alignItems="center"
          justifyContent="center"
          mb="60px"
          mt={{ base: "50px", md: "20px" }}
        >
          <Flex
            zIndex="2"
            direction="column"
            w="445px"
            background="transparent"
            borderRadius="15px"
            p="40px"
            mx={{ base: "100px" }}
            m={{ base: "20px", md: "auto" }}
            bg={bgForm}
            boxShadow={useColorModeValue(
              "0px 5px 14px rgba(0, 0, 0, 0.05)",
              "unset"
            )}
          >
            <Text
              fontSize="xl"
              color={textColor}
              fontWeight="bold"
              textAlign="center"
              mb="22px"
            >
              Информация о компании
            </Text>
            <FormControl isRequired>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Название
              </FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                ms="4px"
                type="text"
                placeholder="Название компании"
                mb="24px"
                size="lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Описание
              </FormLabel>
              <Textarea
                // variant="auth"
                fontSize="sm"
                ms="4px"
                type="text"
                placeholder="Описание компании"
                mb="24px"
                size="lg"
                value={description}
                required="true"
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button
                onClick={handleSubmit}
                disabled={!validateForm()}
                fontSize="10px"
                variant="dark"
                fontWeight="bold"
                w="100%"
                h="45"
                mb="24px"
              >
                ОТПРАВИТЬ
              </Button>

              <Alert
                variant="subtle"
                status="error"
                style={{ display: showError ? "flex" : "none" }}
              >
                <AlertIcon />
                {errorMessage}
              </Alert>
            </FormControl>
          </Flex>
        </Flex>
        <Box
          overflowX="hidden"
          h="100%"
          w="100%"
          left="0px"
          position="absolute"
          bgImage={signInImage}
        >
          <Box
            w="100%"
            h="100%"
            bgSize="cover"
            bg="blue.500"
            opacity="0.8"
          ></Box>
        </Box>
      </Flex>
    </Flex>
  );
}