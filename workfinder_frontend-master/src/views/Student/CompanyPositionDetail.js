// Chakra imports
import {
  Grid,
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

export default function CompanyPositionDetail() {
  const companyPositionId = useParams().id;
  const textColor = useColorModeValue("gray.700", "white");

  const [companyPosition, setCompanyPosition] = useState([]);
  const [company, setCompany] = useState([]);
  const [isApplied, setIsApplied] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    ApiService.getCompanyPositionDetail(companyPositionId).then((response) => {
      console.log(response.data);
      setIsApplied(response.data.is_applied);
      setCompanyPosition(response.data.position);
      setCompany(response.data.position.company);
    });
  };

  const addCompanyPosition = () => {
    ApiService.addCompanyPosition(companyPositionId)
    window.location.reload(false);
  };


  return (
    
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      { companyPosition !== [] ? (
      <Grid templateColumns={{ sm: "1fr", xl: "repeat(2, 1fr)" }} gap="22px">
        <Card p="16px" my={{ sm: "24px", xl: "0px" }}>
          <CardHeader p="12px 5px" mb="12px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              ИНФОРМАЦИЯ О КОМПАНИИ
            </Text>
          </CardHeader>
          <CardBody px="5px">
            <Flex direction="column">
              <Text fontSize="lg" color={textColor} fontWeight="bold" mb="30px">
                {company.name}
              </Text>
            </Flex>
            <Flex direction="column">
              <Text fontSize="md" color="gray.600" fontWeight="400" mb="30px">
                {company.description}
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
            
            <Flex direction="column" alignItems="center">
              <Text fontSize="md" color="gray.600" fontWeight="400" mb="30px">
              {isApplied === true ? (
                <Text fontSize="md" color="green.600" fontWeight="400" mb="30px">
                <b>ЗАЯВКА УСПЕШНО ПОДАНА</b>
              </Text>
              ) : (
                <Button
                  bg="green.400"
                  color="#fff"
                  fontSize="xs"
                  variant="no-hover"
                  onClick={() => addCompanyPosition()}
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

      </Grid>
    ) : <></>}
    </Flex>
  );
}
