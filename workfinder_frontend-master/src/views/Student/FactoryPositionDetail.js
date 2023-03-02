// Chakra imports
import {
  Th,
  Tr,
  Grid,
  Thead,
  Tbody,
  Table,
  Text,
  Button,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ApiService } from "api/ApiRequests";
import AppliedStudentsRow from "components/Tables/AppliedStudentsRow";

export default function FactoryPositionDetail() {
  const factoryPositionId = useParams().id;
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.700", "white");

  const [factoryPosition, setFactoryPosition] = useState([]);
  const [factory, setFactory] = useState([]);
  const [appliedStudents, setAppliedStudents] = useState([]);
  const [average_mark, setAverageMark] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    ApiService.getFactoryPositionDetail(factoryPositionId).then((response) => {
      console.log(response.data);
      setFactory(response.data.factory);
      setFactoryPosition(response.data);
    });
    ApiService.getFactoryPositionAppliedStudents(factoryPositionId).then(
      (response) => {
        console.log(response.data);
        setAppliedStudents(response.data);
      }
    );
    ApiService.getStudentInfo().then((response) => {
      setAverageMark(response.data.average_mark)
    });
  };

  const removeFactoryPosition = () => {
    ApiService.removeFactoryPosition()
    window.location.reload(false);
  };

  const addFactoryPosition = () => {
    ApiService.addFactoryPosition(factoryPositionId)
    window.location.reload(false);
  };


  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Grid templateColumns={{ sm: "1fr", xl: "repeat(3, 1fr)" }} gap="22px">
        <Card p="16px" my={{ sm: "24px", xl: "0px" }}>
          <CardHeader p="12px 5px" mb="12px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              ИНФОРМАЦИЯ О ПРЕДПРИЯТИИ
            </Text>
          </CardHeader>
          <CardBody px="5px">
            <Flex direction="column">
              <Text fontSize="lg" color={textColor} fontWeight="bold" mb="30px">
                {factory.name}
              </Text>
            </Flex>
            <Flex direction="column">
              <Text fontSize="md" color="gray.600" fontWeight="400" mb="30px">
                {factory.description}
              </Text>
            </Flex>
          </CardBody>
        </Card>

        <Card p="16px" my={{ sm: "24px", xl: "0px" }}>
          <CardHeader p="12px 5px" mb="12px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              ИНФОРМАЦИЯ О ВАКАНСИИ
            </Text>
          </CardHeader>
          <CardBody px="5px">
            <Flex direction="column">
              <Text fontSize="lg" color={textColor} fontWeight="bold" mb="30px">
                {factoryPosition.name}
              </Text>
            </Flex>
            <Flex direction="column">
              <Text fontSize="md" color="gray.600" fontWeight="400" mb="30px">
                Требуется {factoryPosition.students_number} работник(а)
              </Text>
            </Flex>
            <Flex direction="column">
              <Text fontSize="md" color="gray.600" fontWeight="400" mb="30px">
                <b>Описание:</b> {factoryPosition.description}
              </Text>
            </Flex>
            <Flex direction="column">
              <Text fontSize="md" color="gray.600" fontWeight="400" mb="30px">
                <b>Требуемые навыки:</b> {factoryPosition.skills}
              </Text>
            </Flex>
            <Flex direction="column" alignItems="center">
              <Text fontSize="md" color="gray.600" fontWeight="400" mb="30px">
              {factoryPosition.is_applied === true ? (
                <Button
                  bg="red.400"
                  color="#fff"
                  fontSize="xs"
                  variant="no-hover"
                  onClick={() => removeFactoryPosition()}
                  px="30px"
                  display={{
                    sm: "none",
                    lg: "flex",
                  }}
                >
                  ОТМЕНИТЬ ЗАЯВКУ
                </Button>
              ) : (
                <Button
                  bg="green.400"
                  color="#fff"
                  fontSize="xs"
                  variant="no-hover"
                  onClick={() => addFactoryPosition()}
                  disabled={!(factoryPosition.application_allowed) || average_mark === null}
                  px="30px"
                  display={{
                    sm: "none",
                    lg: "flex",
                  }}
                >
                  ПОДАТЬ ЗАЯВКУ
                </Button>
              )}
              </Text>
            </Flex>
          </CardBody>
        </Card>

        <Card p="16px">
          <CardHeader p="12px 5px" mb="12px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              СТУДЕНТЫ, ПОДАВШИЕ ЗАЯВКИ
            </Text>
          </CardHeader>
          <CardBody px="5px">
            <Flex direction="column" w="100%">
              <Table variant="simple" color={textColor}>
                <Thead>
                  <Tr my=".8rem" pl="0px" color="gray.400">
                    <Th pl="0px" borderColor={borderColor} color="gray.400">
                      ФИО
                    </Th>
                    <Th borderColor={borderColor} color="gray.400">
                      Почта
                    </Th>
                    <Th borderColor={borderColor} color="gray.400">
                      Средний балл
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {appliedStudents.map((row, index, arr) => {
                    return (
                      <AppliedStudentsRow
                        name={row.name}
                        surname={row.surname}
                        email={row.user}
                        averageMark={row.average_mark}
                        color={
                          index < Number(factoryPosition.students_number)
                            ? "green.100"
                            : "red.100"
                        }
                        isLast={index === arr.length - 1 ? true : false}
                        key={row.pid}
                      />
                    );
                  })}
                </Tbody>
              </Table>
            </Flex>
          </CardBody>
        </Card>
      </Grid>
    </Flex>
  );
}
