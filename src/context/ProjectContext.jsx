import { createContext, useReducer } from "react";

export const ProjectContext = createContext();

const projectReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROJECTS":
      return { projects: action.payload };
    case "CREATE_PROJECT":
      return {
        projects: [action.payload, ...state.projects],
      };
    case "DELETE_PROJECT":
      return {
        projects: state.projects.filter((project) => {
          return project._id !== action.payload._id;
        }),
      };
    case "UPDATE_PROJECT":
      return {
        projects: state.projects.map((project) => {
          if (project._id === action.payload._id) {
            return {
              ...project,
              ...action.payload,
            };
          }
          return project;
        }),
      };
    default:
      return state;
  }
};

export const ProjectContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, {
    projects: [],
  });

  return (
    <ProjectContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
};
