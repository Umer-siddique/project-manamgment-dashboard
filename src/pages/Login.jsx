import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    // Simulate API call or any other async task
    setTimeout(() => {
      setLoading(false);
      toast({
        // title: "Account created.",
        description: "You have successfully signed up.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      navigate("/login");
    }, 2000);
  };

  return (
    <Center minH="100vh">
      <Box w="full" maxW="xl" p={6} borderWidth="1px" borderRadius="lg">
        <Heading
          mb={6}
          textAlign="center"
          size="lg"
          color="purple.500"
          fontFamily="sans-serif"
          fontWeight="semi-bold"
        >
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={6}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Enter your email" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Enter your password" />
            </FormControl>

            <Button
              type="submit"
              colorScheme="purple"
              isLoading={loading}
              loadingText="Signing in..."
            >
              Login
            </Button>
          </Stack>
        </form>
        <Text mt={4} textAlign="center">
          Don't have an account?
          <Link color="purple.500" ml={1} fontWeight="bold" href="/signup">
            Signup
          </Link>
        </Text>
      </Box>
    </Center>
  );
};

export default Login;
