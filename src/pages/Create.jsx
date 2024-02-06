import { useState } from "react";
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
  Stack,
  Textarea,
  Tag,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

export default function Create() {
  const [formData, setFormData] = useState({
    projectImage: "",
    projectName: "",
    description: "",
    startDate: "",
    techStacks: [],
    liveLink: "",
    repoLink: "",
  });

  const [newTechStack, setNewTechStack] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTechStacksChange = () => {
    if (newTechStack.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        techStacks: [...prevData.techStacks, newTechStack.trim()],
      }));
      setNewTechStack(""); // Clear input after adding tech stack
    }
  };

  const handleRemoveTechStack = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      techStacks: prevData.techStacks.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <Box maxW="600px" m="auto" borderRadius="md">
      <form onSubmit={handleSubmit}>
        {/* Other form controls... */}
        <FormControl mb="4">
          <FormLabel>Project Image</FormLabel>
          {/* Add image uploader input component */}
          <Input
            type="file"
            name="projectImage"
            placeholder="Project Image"
            onChange={handleChange}
            mb="2"
            border="1px solid #ccc"
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Project Name</FormLabel>
          <Input
            type="text"
            name="projectName"
            placeholder="Project Name"
            value={formData.projectName}
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
            value={formData.description}
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
            value={formData.startDate}
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
            {formData.techStacks.map((tech, index) => (
              <Tag
                key={index}
                size="sm"
                variant="solid"
                colorScheme="purple"
                borderRadius="full"
                mr="2"
                mb="2"
              >
                {tech}
                <IconButton
                  size="xs"
                  aria-label="Remove Tech Stack"
                  icon={<CloseIcon />}
                  onClick={() => handleRemoveTechStack(index)}
                  ml="1"
                />
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
            value={formData.liveLink}
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
            value={formData.repoLink}
            onChange={handleChange}
            mb="2"
            border="1px solid #ccc"
          />
        </FormControl>
        <Flex justify="flex-end">
          <Button colorScheme="purple" type="submit" isLoading={false}>
            Add Project
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
