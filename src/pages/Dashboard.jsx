import { Box, Container, Heading, Text } from "@chakra-ui/react";

export default function Dashboard() {
  return (
    <Container>
      <Heading my="30px" p="10px">
        Chakra UI Crash Course
      </Heading>
      <Text marginLeft="30px">Chakra ui test description</Text>
      <Text color="blue.100">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus,
        praesentium aperiam? Ipsam sequi velit labore accusamus pariatur. Totam,
        aut minima dolorum, sequi sed perspiciatis sit, magni sint numquam eum
        similique.
      </Text>

      <Box bg="green" p="10px" my="10px">
        <Text color="white">This is a box.</Text>
      </Box>
    </Container>
  );
}
