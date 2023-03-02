// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TablesCompanyPositionRow from "components/Tables/TablesCompanyPositionRow";
import React, { useState, useEffect } from "react";
import { ApiService } from "api/ApiRequests";

export default function CompanyPositions() {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const [companyPositions, setCompanyPositions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    ApiService.getCompanyAvailiablePositions().then((response) => {
      console.log(response.data);
      setCompanyPositions(response.data);
    });
  };

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card my="22px" overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px">
          <Flex direction="column">
            <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
              Работа в компании
            </Text>
          </Flex>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px">
                <Th pl="0px" color="gray.400" borderColor={borderColor}>
                  Наименование позиции
                </Th>
                <Th color="gray.400" borderColor={borderColor}>
                  Компания
                </Th>
                <Th color="gray.400" borderColor={borderColor}>
                  Подробнее
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {companyPositions.map((row, index, arr) => {
                return (
                  <TablesCompanyPositionRow
                    name={row.name}
                    company={row.company.name}
                    id={row.id}
                    isLast={index === arr.length - 1 ? true : false}
                    key={row.id}
                  />
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
  );
}
