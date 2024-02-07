import { CalendarIcon, EditIcon } from "@chakra-ui/icons";
import { Box, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <List color="white" fontSize="1.1em" spacing={4}>
      <Box
        border="5px solid white"
        h="120px"
        w="120px"
        borderRadius={"50%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text
          fontSize="2.6em"
          border="1px solid white"
          p="3"
          borderRadius={"50%"}
        >
          PM
        </Text>
      </Box>

      <ListItem>
        <NavLink to="/dashboard/projects/all">
          <ListIcon as={CalendarIcon} color="white" />
          Current Projects
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="dashboard/projects/archived">
          <ListIcon as={CalendarIcon} color="white" />
          Archived Projects
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="/dashboard/projects/completed">
          <ListIcon as={CalendarIcon} color="white" />
          Completed Projects
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="/create">
          <ListIcon as={EditIcon} color="white" />
          New Project
        </NavLink>
      </ListItem>
    </List>
  );
};

export default Sidebar;
