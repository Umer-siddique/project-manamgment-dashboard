import { Box, SimpleGrid } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  // const boxStyles = {
  //   bg: "purple.400",
  //   p: "10px",
  //   m: "10px",
  //   textAlign: "center",
  //   filter: "blur(2px)",
  //   _hover: {
  //     filter: "blur(0)",
  //     cursor: "pointer",
  //   },
  // };

  return (
    // <Container as="section" maxW="4xl" py="20px">
    //   <Heading my="30px" p="10px">
    //     Chakra UI Crash Course
    //   </Heading>
    //   <Text marginLeft="30px">Chakra ui test description</Text>
    //   <Text color="blue.100">
    //     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus,
    //     praesentium aperiam? Ipsam sequi velit labore accusamus pariatur. Totam,
    //     aut minima dolorum, sequi sed perspiciatis sit, magni sint numquam eum
    //     similique.
    //   </Text>

    //   <Box bg="green" p="10px" my="10px">
    //     <Text color="white">This is a box.</Text>
    //   </Box>

    //   <Box sx={boxStyles}>
    //     <Text color="white">Hello, Dev</Text>
    //   </Box>
    // </Container>
    <SimpleGrid columns={4} p="10px" spacing={10} minChildWidth="250px">
      <Box bg="white" h="200px" border="1px solid"></Box>
      <Box bg="white" h="200px" border="1px solid"></Box>
      <Box bg="white" h="200px" border="1px solid"></Box>
      <Box bg="white" h="200px" border="1px solid"></Box>

      <Box bg="white" h="200px" border="1px solid"></Box>
      <Box bg="white" h="200px" border="1px solid"></Box>
      <Box bg="white" h="200px" border="1px solid"></Box>
      <Box bg="white" h="200px" border="1px solid"></Box>

      <Box bg="white" h="200px" border="1px solid"></Box>
      <Box bg="white" h="200px" border="1px solid"></Box>
      <Box bg="white" h="200px" border="1px solid"></Box>
      <Box bg="white" h="200px" border="1px solid"></Box>
    </SimpleGrid>
  );
}
