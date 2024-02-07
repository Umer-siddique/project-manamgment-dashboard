// App.js
import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateProject from "./pages/CreateProject";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import UpdateProject from "./pages/UpdateProject";

const App = () => {
  const routes = createRoutesFromElements(
    <>
      <>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </>
      <Route path="/" element={<RootLayout />}>
        <Route path="/update/:id" element={<UpdateProject />} />
        <Route
          path="dashboard/projects/all"
          element={
            <Dashboard
              projectUrl="/api/v1/projects?isCompleted=false&&isArchived=false"
              projectHeading="Current Projects"
            />
          }
        />
        <Route
          path="dashboard/projects/completed"
          element={
            <Dashboard
              projectUrl="/api/v1/projects?isCompleted=true"
              projectHeading="Completed Projects"
            />
          }
        />
        <Route
          path="dashboard/projects/archived"
          element={
            <Dashboard
              projectUrl="/api/v1/projects?isArchived=true"
              projectHeading="Archived Projects"
            />
          }
        />
        <Route path="create" element={<CreateProject />} />
      </Route>
    </>
  );

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default App;
