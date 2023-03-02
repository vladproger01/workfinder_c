// Chakra imports
import {
  Grid,
  Text,
  Table,
  Thead,
  Tbody,
  Th,
  Button,
  Tr,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { useHistory } from "react-router-dom";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ApiService } from "api/ApiRequests";
import AppliedStudentsRow from "components/Tables/AppliedStudentsRow";

export default function CompanyPositionDetail() {
  const companyPositionId = useParams().id;
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const [companyPosition, setCompanyPosition] = useState([]);
  const [appliedStudents, setAppliedStudents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    ApiService.getCompanyPositionForCompanyDetail(companyPositionId).then(
      (response) => {
        // console.log(response.data);
        setCompanyPosition(response.data);
      }
    );
    ApiService.getAppliedStudents(companyPositionId).then((response) => {
      console.log(response.data);
      setAppliedStudents(response.data);
    });
  };

  const deleteCompanyPosition = () => {
    ApiService.deleteCompanyPosition(companyPositionId);
    history.push("/company/company-positions");
  };

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      {companyPosition !== [] ? (
        <Grid templateColumns={{ sm: "1fr", xl: "repeat(2, 1fr)" }} gap="22px">
          <Card p="16px" my={{ sm: "24px", xl: "0px" }}>
            <CardHeader p="12px 5px" mb="12px">
              <Text fontSize="lg" color={textColor} fontWeight="bold">
                ИНФОРМАЦИЯ О ВАКАНСИИ
              </Text>
            </CardHeader>
            <CardBody px="5px">
              <Flex direction="column">
                <Text
                  fontSize="lg"
                  color={textColor}
                  fontWeight="bold"
                  mb="30px"
                >
                  {companyPosition.name}
                </Text>
              </Flex>
              <Flex direction="column">
                <Text fontSize="md" color="gray.600" fontWeight="400" mb="30px">
                  <b>Описание:</b> {companyPosition.description}
                </Text>
              </Flex>
              <Flex direction="column">
                <Text fontSize="md" color="gray.600" fontWeight="400" mb="30px">
                  <b>Требуемые навыки:</b> {companyPosition.skills}
                </Text>
              </Flex>
              <Flex direction="column">
                <Text fontSize="md" color="gray.600" fontWeight="400" mb="30px">
                  <b>Статус:</b> {companyPosition.status_name}
                </Text>
              </Flex>
              <Flex direction="column" alignItems="center">
                <Text fontSize="md" color="gray.600" fontWeight="400" mb="30px">
                  <Button
                    bg="red.400"
                    color="#fff"
                    fontSize="xs"
                    variant="no-hover"
                    onClick={() => deleteCompanyPosition()}
                    px="30px"
                    display={{
                      sm: "none",
                      lg: "flex",
                    }}
                  >
                    УДАЛИТЬ ВАКАНСИЮ
                  </Button>
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
                          color="grey.100"
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
      ) : (
        <></>
      )}
    </Flex>
  );
}
