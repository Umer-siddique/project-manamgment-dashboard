import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Textarea,
  Tag,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import useApi from "../hooks/useApi";
import { useProjectContext } from "../hooks/useProjectContext";
import { useNavigate } from "react-router-dom";
import formatDate from "../utils/helper";

export default function CreateProject({ projectId }) {
  const [project, setProject] = useState(null);
  const [projectImg, setProjectImg] = useState(null);
  const [projectData, setProjectData] = useState({
    projectName: "",
    description: "",
    startDate: "",
    techStacks: [],
    liveLink: "",
    repoLink: "",
  });
  const [newTechStack, setNewTechStack] = useState("");
  const toast = useToast();
  const { dispatch } = useProjectContext();
  const navigate = useNavigate();
  const { apiCall, isLoading, clearError } = useApi();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    // Handle image upload and store in state
    const file = e.target.files[0];
    if (file) {
      setProjectImg(file);
    }
  };

  const handleTechStacksChange = () => {
    if (
      newTechStack.trim() !== "" &&
      !projectData?.techStacks?.includes(newTechStack)
    ) {
      setProjectData((prevData) => ({
        ...prevData,
        techStacks: [...prevData.techStacks, newTechStack.trim()],
      }));
      setNewTechStack(""); // Clear input after adding tech stack
    }
  };

  const handleRemoveTechStack = (index) => {
    setProjectData((prevData) => ({
      ...prevData,
      techStacks: prevData.techStacks.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object
    const formData = new FormData();
    if (projectImg) formData.append("project", projectImg); // Append project image to form data

    // Stringify the techStacks array and append it as a single value
    formData.append("techStacks", JSON.stringify(projectData.techStacks));

    // Append rest of the project data to form data
    Object.keys(projectData)
      .filter((key) => key !== "techStacks") // Exclude techStacks from keys
      .forEach((key) => {
        formData.append(key, projectData[key]);
      });

    // Integrate the create project api
    try {
      let data = null;
      clearError();
      if (projectId) {
        data = await apiCall(
          `/api/v1/projects/${projectId}`,
          "PATCH",
          formData
        );
      } else {
        data = await apiCall(`/api/v1/projects`, "POST", formData);
      }

      if (data) {
        toast({
          description: projectId
            ? "Project updated successfully!"
            : "Project Added Successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        clearError();
        setTimeout(() => {
          navigate(-1);
        }, 2000);
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

  // fetch single project
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await apiCall(`/api/v1/projects/${projectId}`);
        if (data) {
          setProject(data?.data?.project);
          clearError();
        }
      } catch (error) {
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
    if (projectId) fetchProject();
  }, [projectId]);

  // reset the project form with the single project found
  useEffect(() => {
    if (project) {
      setProjectData(
        projectId
          ? {
              ...projectData,
              ...project,
            }
          : {}
      );
    }
  }, [project, projectId]);

  return (
    <Box
      maxW="600px"
      m="auto"
      borderRadius="md"
      border="1px solid #ccc"
      my={10}
      p={6}
      bg="white"
    >
      <Heading
        as="h1"
        fontSize={"1.5em"}
        color="#333"
        fontWeight={"semibold"}
        mb={6}
      >
        {projectId ? "Update Project" : "Create Project"}
      </Heading>
      <form onSubmit={handleSubmit}>
        {/* Other form controls... */}
        <FormControl mb="4">
          <FormLabel>Project Image</FormLabel>
          {/* Add image uploader input component */}
          <Input
            type="file"
            placeholder="Project Image"
            mb="2"
            border="1px solid #ccc"
            onChange={handleImageChange}
            accept="image/*"
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Project Name</FormLabel>
          <Input
            type="text"
            name="projectName"
            placeholder="Project Name"
            value={projectData.projectName}
            onChange={handleChange}
            mb="2"
            border="1px solid #ccc"
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            placeholder="Description"
            value={projectData.description}
            onChange={handleChange}
            mb="2"
            resize="none"
            border="1px solid #ccc"
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Start Date</FormLabel>
          {/* Add date picker component */}
          <Input
            type="date"
            name="startDate"
            placeholder="Start Date"
            value={formatDate(projectData.startDate)}
            onChange={handleChange}
            mb="2"
            border="1px solid #ccc"
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Tech Stack</FormLabel>
          <InputGroup>
            <Input
              type="text"
              placeholder="Add Tech Stack"
              value={newTechStack}
              onChange={(e) => setNewTechStack(e.target.value)}
              border="1px solid #ccc"
            />
            <InputRightElement>
              <IconButton
                aria-label="Add Tech Stack"
                icon={<AddIcon />}
                onClick={handleTechStacksChange}
                colorScheme="purple"
                bg="purple.400"
                color="white"
              />
            </InputRightElement>
          </InputGroup>
          <Flex flexWrap="wrap" mt="2">
            {projectData.techStacks.map((tech, index) => (
              <Tag
                key={index}
                size="sm"
                variant="solid"
                colorScheme="purple"
                borderRadius="full"
                mr="2"
                mb="2"
                gap={1}
              >
                {tech}
                <Box
                  cursor="pointer"
                  onClick={() => handleRemoveTechStack(index)}
                >
                  X
                </Box>
              </Tag>
            ))}
          </Flex>
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Live Link</FormLabel>
          <Input
            type="text"
            name="liveLink"
            placeholder="Live Link"
            value={projectData.liveLink}
            onChange={handleChange}
            mb="2"
            border="1px solid #ccc"
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Repo Link</FormLabel>
          <Input
            type="text"
            name="repoLink"
            placeholder="Repo Link"
            value={projectData.repoLink}
            onChange={handleChange}
            mb="2"
            border="1px solid #ccc"
          />
        </FormControl>
        <Flex justify="flex-end">
          <Button
            colorScheme="purple"
            type="submit"
            isLoading={isLoading}
            loadingText={projectId ? "Updating..." : "Creating..."}
          >
            {projectId ? "Update Project" : "Add Project"}
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
