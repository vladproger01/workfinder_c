import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import signInImage from "assets/img/signInImage.png";
import { ApiService } from "api/ApiRequests";
import { useHistory } from "react-router-dom";
import { handleError } from "utils";

export default function AddStudentInfo() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [course, setCourse] = useState(1);
  const [skills, setSkills] = useState("");
  const [averageMark, setAverageMark] = useState("");
  const [factoryLink, setFactoryLink] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    console.log(localStorage.getItem("token"))
    fetchData();
  }, []);

  const fetchData = () => {
    ApiService.getStudentInfo().then((response) => {
      setName(response.data.name);
      setSurname(response.data.surname);
      setSkills(response.data.skills);
      setCourse(response.data.course);
      setAverageMark(response.data.average_mark ===null? 'не выставлен':response.data.average_mark)
      console.log(response.data);
    });
  };

  function validateForm() {
    return name.length > 0 && surname.length > 0 && skills.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    let data = { name: name, surname: surname, course: course, skills: skills };
    console.log(data);
    ApiService.patchStudentInfo(data)
      .then((response) => {
        history.push("/student/company-positions");
      })
      .catch((error) => {
        handleError(error, setShowError, setErrorMessage);
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
              Информация о студенте
            </Text>

            <FormLabel ms="4px" fontSize="sm" fontWeight="normal" 
              mb="22px">
              Средний балл {averageMark}
            </FormLabel>

            <FormControl isRequired>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Имя
              </FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                ms="4px"
                type="text"
                placeholder="Иван"
                mb="24px"
                size="lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Фамилия
              </FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                ms="4px"
                type="text"
                placeholder="Иванов"
                mb="24px"
                size="lg"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Навыки
              </FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                ms="4px"
                type="text"
                placeholder="SQL, Java, C++ ..."
                mb="24px"
                size="lg"
                value={skills}
                required="true"
                onChange={(e) => setSkills(e.target.value)}
              />

              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Курс
              </FormLabel>
              <NumberInput
                step={1}
                defaultValue={11}
                min={1}
                max={5}
                fontSize="sm"
                ms="4px"
                mb="24px"
                size="lg"
                value={course}
                onChange={(e) => setCourse(e)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
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
