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
  Link,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import Loader from "../components/Loader";
import { useProjectContext } from "../hooks/useProjectContext";

export default function Dashboard() {
  const toast = useToast();
  const { apiCall, clearError, isLoading } = useApi();
  const { projects, dispatch } = useProjectContext();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        clearError();
        const data = await apiCall("/api/v1/projects");
        if (data) {
          console.log("data", data);
          dispatch({ type: "SET_PROJECTS", payload: data?.data?.projects });
          clearError();
        }
      } catch (err) {
        console.log(err);
        toast({
          description: err?.response?.data?.message || "Something went wrong",
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
      {projects?.map((el, i) => {
        return (
          <Card maxW="sm" key={i}>
            <CardBody>
              <Image
                src={el?.image}
                alt="Project image"
                borderRadius="lg"
                w={"100%"}
                // h={"250px"}
                objectFit="contain"
              />
              <Stack mt="6" spacing="3">
                <Heading size="md" textTransform="capitalize">
                  {el?.projectName}
                </Heading>
                <Text color="gray.600" fontSize="13px">
                  {el?.description}
                </Text>
                <Stack direction="row" spacing="1">
                  {el?.techStacks.map((tech, index) => (
                    <Tag
                      key={index}
                      size="md"
                      variant="solid"
                      colorScheme="purple"
                      bg="purple.500"
                    >
                      {tech}
                    </Tag>
                  ))}
                </Stack>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="2">
                <Button variant="solid" colorScheme="purple">
                  <Link href={el?.liveLink} target="_blank">
                    View
                  </Link>
                </Button>
                <Button variant="ghost" colorScheme="purple">
                  <Link href={el?.repoLink} target="_blank">
                    Github
                  </Link>
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
