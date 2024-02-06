import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import Loader from "../components/Loader";

export default function Dashboard() {
  const toast = useToast();
  const { apiCall, clearError, isLoading } = useApi();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        clearError();
        const data = await apiCall("/api/v1/projects");
        if (data) {
          console.log("data", data);
          // dispatch({ type: "LOGIN", payload: data?.data?.user });
          clearError();
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

    fetchProjects();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <SimpleGrid columns={4} p="10px" spacing={10} minChildWidth="300px">
      {[1, 2, 3, 4, 5, 6].map((el, i) => {
        return (
          <Card maxW="sm" key={i}>
            <CardBody>
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt="Green double couch with wooden legs"
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <Heading size="md">Living room Sofa</Heading>
                <Text>
                  This sofa is perfect for modern tropical spaces, baroque
                </Text>
                <Text color="blue.600" fontSize="2xl">
                  $450
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="2">
                <Button variant="solid" colorScheme="purple">
                  View
                </Button>
                <Button variant="ghost" colorScheme="purple">
                  Github
                </Button>
                <Button variant="ghost" colorScheme="purple">
                  Update
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        );
      })}
    </SimpleGrid>
  );
}
