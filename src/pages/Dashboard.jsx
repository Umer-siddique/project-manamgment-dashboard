import { useState, useEffect } from "react";
import {
  Button,
  SimpleGrid,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  Stack,
  Heading,
} from "@chakra-ui/react";
import useApi from "../hooks/useApi";
import Loader from "../components/Loader";
import Projects from "../components/Projects";
import { useProjectContext } from "../hooks/useProjectContext";

export default function Dashboard({ projectUrl, projectHeading }) {
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);
  const [projectToArchive, setProjectToArchive] = useState(null);
  const [projectToComplete, setProjectToComplete] = useState(null);
  const [filter, setFilter] = useState(""); // State for filter selection (A-Z or Z-A)
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const toast = useToast();
  const { apiCall, clearError, isLoading } = useApi();
  const { projects, dispatch } = useProjectContext();

  const fetchProjects = async () => {
    try {
      clearError();
      let apiUrl = projectUrl;
      if (filter) {
        apiUrl += `&sort=${filter === "ZA" ? "createdAt" : "-createdAt"}`;
      }
      if (searchQuery) {
        apiUrl = `/api/v1/projects/search?q=${searchQuery}`;
      }
      const data = await apiCall(apiUrl);
      if (data) {
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

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProjects();
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    fetchProjects();
  }, [dispatch, projectUrl, filter, toast]);

  const handleArchiveConfirmation = async () => {
    try {
      clearError();
      const data = await apiCall(
        `/api/v1/projects/${projectToArchive?._id}`,
        "PATCH",
        { isArchived: true }
      );
      if (data) {
        toast({
          description: "Project Archived!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        clearError();
        setIsArchiveOpen(false);
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

  const handleCompleteConfirmation = async () => {
    try {
      clearError();
      const data = await apiCall(
        `/api/v1/projects/${projectToComplete?._id}`,
        "PATCH",
        { isCompleted: true }
      );
      if (data) {
        toast({
          description: "Marked as completed!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        clearError();
        setIsCompleteOpen(false);
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

  if (isLoading) return <Loader />;

  return (
    <>
      {/* Filter and Search */}
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={4}
        my={10}
        bg="white"
        p={4}
        borderRadius={"md"}
      >
        <Heading as="h1" fontSize={"1em"} color="#333" fontWeight={"semibold"}>
          Filters and Search:
        </Heading>
        <Input
          placeholder="Search by Name or Tech Stacks"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          border="1px solid #ccc"
          maxW={"400px"}
          autoFocus
        />
        <Select
          placeholder="Filter By Order"
          onChange={(e) => setFilter(e.target.value)}
          border="1px solid #ccc"
          maxW={"400px"}
        >
          <option value="AZ">A-Z</option>
          <option value="ZA">Z-A</option>
        </Select>
      </Stack>
      <Heading
        as="h1"
        ml={2}
        my={4}
        fontSize={"1.5em"}
        color="#333"
        fontWeight={"semibold"}
      >
        {projectHeading}
      </Heading>
      <SimpleGrid columns={4} p="10px" spacing={6} minChildWidth="300px">
        {projects?.map((el, i) => (
          <Projects
            key={el?._id}
            project={el}
            setProjectToArchive={setProjectToArchive}
            setIsArchiveOpen={setIsArchiveOpen}
            setProjectToComplete={setProjectToComplete}
            setIsCompleteOpen={setIsCompleteOpen}
          />
        ))}
      </SimpleGrid>

      {/* Archive confirmation modal */}
      <Modal isOpen={isArchiveOpen} onClose={() => setIsArchiveOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Archive Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to archive {projectToArchive?.projectName}?
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="purple"
              mr={3}
              onClick={handleArchiveConfirmation}
            >
              Yes
            </Button>
            <Button variant="ghost" onClick={() => setIsArchiveOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Complete confirmation modal */}
      <Modal isOpen={isCompleteOpen} onClose={() => setIsCompleteOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Complete Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to mark {projectToComplete?.projectName} as
            complete?
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="purple"
              mr={3}
              onClick={handleCompleteConfirmation}
            >
              Yes
            </Button>
            <Button variant="ghost" onClick={() => setIsCompleteOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
