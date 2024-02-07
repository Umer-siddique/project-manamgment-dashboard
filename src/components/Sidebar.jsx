import { AtSignIcon, CalendarIcon, EditIcon } from "@chakra-ui/icons";
import { List, ListIcon, ListItem } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <List color="white" fontSize="1.1em" spacing={4}>
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
      <ListItem>
        <NavLink to="/profile">
          <ListIcon as={AtSignIcon} color="white" />
          Profile
        </NavLink>
      </ListItem>
    </List>
  );
};

export default Sidebar;
