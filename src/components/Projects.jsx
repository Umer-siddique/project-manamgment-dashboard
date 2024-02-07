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
                textTransform={"capitalize"}
              >
                {tech}
              </Tag>
            ))}
          </Stack>
        </Stack>
        <Stack mt={3}>
          <Text fontSize={"14px"} color="#333" fontWeight="semibold">
            Live URL:
            <Link
              href={project?.liveLink}
              target="_blank"
              color="purple.500"
              fontSize="13px"
              ml={2}
            >
              {project?.liveLink}
            </Link>
          </Text>
          <Text fontSize={"14px"} color="#333" fontWeight="semibold">
            Github URL:
            <Link
              href={project?.liveLink}
              target="_blank"
              color="purple.500"
              fontSize="13px"
              ml={2}
            >
              {project?.repoLink}
            </Link>
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="1">
          <Button variant="solid" colorScheme="purple">
            <Link href={`/update/${project?._id}`}>Edit</Link>
          </Button>
          {!project?.isArchived && !project?.isCompleted && (
            <>
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
            </>
          )}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default Projects;
