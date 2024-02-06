import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex as="nav" p="10px" alignItems="center">
      <Heading as="h1">Project Managment</Heading>

      <Spacer />

      <HStack spacing="20px">
        {/* <Box bg="gray.200" p="10px">
          M
        </Box> */}
        <Avatar name="Abdul Moiz" color="white" bg="purple.400" />
        <Text>mario@netninja.dev</Text>
        <Button colorScheme="purple">Logout</Button>
      </HStack>
    </Flex>
  );
};

export default Navbar;
