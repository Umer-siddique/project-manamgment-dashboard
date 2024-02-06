import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { user, dispatch } = useAuthContext();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <Flex as="nav" p="10px" alignItems="center">
      <Heading as="h1">Project Managment</Heading>

      <Spacer />

      <HStack spacing="20px">
        <Avatar name={user?.name} color="white" bg="purple.400" />
        <Text>{user?.email}</Text>

        <Button onClick={handleLogout} colorScheme="purple">
          Logout
        </Button>
      </HStack>
    </Flex>
  );
};

export default Navbar;
