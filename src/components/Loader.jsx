import { Center, Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Center mt={28}>
      <Spinner
        thickness="10px"
        speed="0.65s"
        emptyColor="gray.200"
        color="purple.400"
        size="xl"
      />
    </Center>
  );
};

export default Loader;
