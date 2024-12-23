import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Grid, GridItem } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import { useAuthContext } from "../hooks/useAuthContext";
import Login from "../pages/Login";

export default function RootLayout() {
  const { user } = useAuthContext();
  return user ? (
    <Grid templateColumns="repeat(6,1fr)" bg="gray.100">
      <GridItem
        as="aside"
        colSpan={{ base: 6, lg: 2, xl: 1 }}
        bg="purple.400"
        p={{ base: "20px", lg: "30px" }}
        minH={{ lg: "100vh" }}
      >
        <Sidebar />
      </GridItem>
      <GridItem as="main" colSpan={{ base: 6, lg: 4, xl: 5 }} p="40px">
        <Navbar />
        <Outlet />
      </GridItem>
    </Grid>
  ) : (
    <Login />
  );
}
