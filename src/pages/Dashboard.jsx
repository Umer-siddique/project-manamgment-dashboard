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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useApi from "../hooks/useApi";
import Loader from "../components/Loader";
import { useProjectContext } from "../hooks/useProjectContext";
import Projects from "../components/Projects";

export default function Dashboard() {
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);
  const [projectToArchive, setProjectToArchive] = useState(null);
  const [projectToComplete, setProjectToComplete] = useState(null);
  const toast = useToast();
  const { apiCall, clearError, isLoading } = useApi();
  const { projects, dispatch } = useProjectContext();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        clearError();
        const data = await apiCall(
          "/api/v1/projects?isCompleted=false&&isArchived=false"
        );
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
  }, [dispatch]);

  const handleArchiveConfirmation = async () => {
    try {
      clearError();
      // Call your complete API here
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

        // Refetch projects to get updated list
        const updatedProjectsData = await apiCall(
          "/api/v1/projects?isCompleted=false&&isArchived=false"
        );
        if (updatedProjectsData) {
          dispatch({
            type: "SET_PROJECTS",
            payload: updatedProjectsData?.data?.projects,
          });
          clearError();
        }
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
      // Call your complete API here
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

        // Refetch projects to get updated list
        const updatedProjectsData = await apiCall(
          "/api/v1/projects?isCompleted=false&&isArchived=false"
        );
        if (updatedProjectsData) {
          dispatch({
            type: "SET_PROJECTS",
            payload: updatedProjectsData?.data?.projects,
          });
          clearError();
        }
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
      <SimpleGrid columns={4} p="10px" spacing={6} minChildWidth="300px">
        {projects?.map((el, i) => {
          return (
            <Projects
              key={el?._id}
              project={el}
              // image={el?.image}
              // projectName={el?.projectName}
              // description={el?.description}
              // techStacks={el?.techStacks}
              // liveLink={el?.liveLink}
              // repoLink={el?.repoLink}
              setProjectToArchive={setProjectToArchive}
              setIsArchiveOpen={setIsArchiveOpen}
              setProjectToComplete={setProjectToComplete}
              setIsCompleteOpen={setIsCompleteOpen}
            />
          );
        })}
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
