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
import useApi from "../hooks/useApi";
import { useAuthContext } from "./../hooks/useAuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { apiCall, isLoading, clearError } = useApi();
  const navigate = useNavigate();
  const toast = useToast();
  const { dispatch } = useAuthContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      clearError();
      const data = await apiCall("/api/v1/users/login", "POST", {
        email,
        password,
      });
      if (data) {
        dispatch({ type: "LOGIN", payload: data?.data?.user });
        localStorage.setItem("user", JSON.stringify(data?.data?.user));
        localStorage.setItem("token", JSON.stringify(data?.token));
        toast({
          description: "Successfully Logged in!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        clearError();
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast({
        description: err?.response?.data?.message || "Something went wrong!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
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
              <Input
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="purple"
              isLoading={isLoading}
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
