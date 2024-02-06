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
import useApi from "./../hooks/useApi";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const { apiCall, isLoading, clearError } = useApi();
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      clearError();
      const data = await apiCall("/api/v1/users/signup", "POST", formData);
      if (data) {
        console.log("user", data);
        toast({
          description: "Successfully signed up! Login now.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        clearError();
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      toast({
        description: err?.response?.data?.message,
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
          Register
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={6}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="purple"
              isLoading={isLoading}
              loadingText="Signing up..."
            >
              Signup
            </Button>
          </Stack>
        </form>
        <Text mt={4} textAlign="center">
          Already have an account?
          <Link color="purple.500" ml={1} fontWeight="bold" href="/login">
            Login
          </Link>
        </Text>
      </Box>
    </Center>
  );
};

export default Signup;
