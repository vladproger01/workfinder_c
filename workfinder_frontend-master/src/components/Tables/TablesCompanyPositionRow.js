import React from "react";
import {
  Tr,
  Td,
  Flex,
  Text,
  Progress,
  Icon,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaEllipsisV } from "react-icons/fa";
import { useHistory } from "react-router-dom";


export default function TablesCompanyPositionRow(props) {

  const { name, company, id, isLast } = props;
  const textColor = useColorModeValue("gray.500", "white");
  const titleColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const history = useHistory();


  function redirectToDetails(id) {
    let path = `/student/company-position-detail/${id}`;
    history.push(path);
  }

  return (
    <Tr>
      <Td
        minWidth={{ sm: "250px" }}
        pl="0px"
        borderColor={borderColor}
        borderBottom={isLast ? "none" : null}
      >
        <Flex alignItems="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="md"
            color={titleColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {name}
          </Text>
        </Flex>
      </Td>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {company}
        </Text>
      </Td>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">

          <Button
            bg='blue.500'
            color='#fff'
            fontSize="xs"
            variant="no-hover"
            onClick={() => redirectToDetails(id)}
            px="30px"
            display={{
              sm: "none",
              lg: "flex",
            }}
          >
            Подробнее
          </Button>

        </Text>
      </Td>
    </Tr>
  );
}
