import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Link,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";

const Projects = ({
  //   image,
  //   projectName,
  //   description,
  //   techStacks,
  //   liveLink,
  //   repoLink,
  project,
  setProjectToArchive,
  setIsArchiveOpen,
  setProjectToComplete,
  setIsCompleteOpen,
}) => {
  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src={project?.image}
          alt="Project image"
          borderRadius="lg"
          w={"100%"}
          h={"150px"}
          // objectFit="contain"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md" textTransform="capitalize">
            {project?.projectName}
          </Heading>
          <Text color="gray.600" fontSize="13px">
            {project?.description}
          </Text>
          <Stack direction="row" spacing="1">
            {project?.techStacks.map((tech, index) => (
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
        <Stack mt={3}>
          <Link
            href={project?.liveLink}
            target="_blank"
            color="purple.500"
            // textDecoration="underline"
            fontSize="13px"
          >
            {project?.liveLink}
          </Link>
          <Link
            href={project?.repoLink}
            target="_blank"
            color="purple.500"
            fontSize="13px"
            // textDecoration="underline"
          >
            {project?.repoLink}
          </Link>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="1">
          <Button variant="solid" colorScheme="purple">
            Edit
          </Button>
          <Button
            variant="ghost"
            colorScheme="purple"
            onClick={() => {
              setProjectToArchive(project);
              setIsArchiveOpen(true);
            }}
          >
            Archive
          </Button>
          <Button
            variant="ghost"
            colorScheme="purple"
            onClick={() => {
              setProjectToComplete(project);
              setIsCompleteOpen(true);
            }}
          >
            Complete
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default Projects;
