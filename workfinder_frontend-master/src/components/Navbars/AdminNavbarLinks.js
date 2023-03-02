// Chakra Icons
import { BellIcon } from "@chakra-ui/icons";
// Chakra Imports
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import React from "react";
import { NavLink } from "react-router-dom";
import routes from "routes.js";

export default function HeaderLinks(props) {
  const history = useHistory();
  const {
    variant,
    children,
    fixed,
    scrolled,
    secondary,
    onOpen,
    ...rest
  } = props;

  const { colorMode } = useColorMode();
  const handleLogout = (e) => {
    (e) => e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("is_superuser");
    localStorage.removeItem("email");
    localStorage.setItem("logged_in", false);
    localStorage.setItem("is_company", false);
    localStorage.setItem("is_student", false);
    history.push("/auth/signin");
    axios.defaults.headers["Authorization"] = 'Token';
  };

  let navbarIcon =
    fixed && scrolled
      ? useColorModeValue("gray.700", "gray.200")
      : useColorModeValue("white", "gray.200");
  let menuBg = useColorModeValue("white", "navy.800");
  if (secondary) {
    navbarIcon = "white";
  }
  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
    >
      {localStorage.getItem("logged_in") == "true" ? (
        <>
        <Text
              mr="5px"
              display={{ sm: "none", md: "flex" }}
              color={navbarIcon}
            > 
            
            {localStorage.getItem("email") }
            </Text>
          <Text
              mr="20px"
              display={{ sm: "none", md: "flex" }}
              color={navbarIcon}
            > 
            
            {localStorage.getItem("is_student") == "true" ? (
                <> (cтудент)</>
              ) : (
                <></>
              )}
            {localStorage.getItem("is_company") == "true" ? (
                <> (компания) </>
              ) : (
                <></>
              )}
            </Text>
          <NavLink to="/auth/signin" onClick={(e) => handleLogout()}>
            <Text
              mr="20px"
              display={{ sm: "none", md: "flex" }}
              color={navbarIcon}
              fontWeight="bold"
            >
              Выйти
            </Text>
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/auth/signin">
            <Text
              mr="20px"
              display={{ sm: "none", md: "flex" }}
              color={navbarIcon}
              fontWeight="bold"
            >
              Войти
            </Text>
          </NavLink>
          <NavLink to="/auth/signup">
            <Text
              display={{ sm: "none", md: "flex" }}
              color={navbarIcon}
              fontWeight="bold"
            >
              Зарегистрироваться
            </Text>
          </NavLink>
        </>
      )}
    </Flex>
  );
}
