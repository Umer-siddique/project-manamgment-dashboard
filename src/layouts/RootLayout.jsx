import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Grid, GridItem } from "@chakra-ui/react";

export default function RootLayout() {
  return (
    <Grid templateColumns="repeat(6,1fr)">
      <GridItem as="aside" colSpan="1" bg="purple.400" p="30px" minH="100vh">
        <span>Sidebar</span>
      </GridItem>
      <GridItem as="main" colSpan="5">
        <Navbar />
        <Outlet />
      </GridItem>
    </Grid>
  );
}
