import React, { useState } from "react";
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import signInImage from "assets/img/signInImage.png";
import { ApiService } from "api/ApiRequests";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { validateEmail } from "utils";
import { handleError } from "utils";


export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  function validateForm() {
    return validateEmail(email) && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    let data = { email: email, password: password };
    console.log(data);
    ApiService.login(data)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("logged_in", true);
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("is_student", response.data.user.is_student);
        localStorage.setItem("is_company", response.data.user.is_company);
        localStorage.setItem("is_superuser", response.data.user.is_superuser);
        localStorage.setItem("related_id", response.data.user.related_id);
        axios.defaults.headers["Authorization"] = `Token ${response.data.token}`;


        if (response.data.user.is_student) {
          history.push("/student/add-student-info")
        } else if (response.data.user.is_company){
          history.push("/company/add-company-info")
        } else {
          console.log(response.data)
        }
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
              Войти
            </Text>
            <FormControl isRequired>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Почта
              </FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                ms="4px"
                type="email"
                placeholder="example@mail.com"
                mb="24px"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Пароль
              </FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                ms="4px"
                type="password"
                placeholder="Ваш пароль"
                mb="24px"
                size="lg"
                value={password}
                required="true"
                onChange={(e) => setPassword(e.target.value)}
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
                ВОЙТИ
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
