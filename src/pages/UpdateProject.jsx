import { useParams } from "react-router-dom";
import CreateProject from "./CreateProject";

const UpdateProject = () => {
  const { id } = useParams();

  return <CreateProject projectId={id} />;
};

export default UpdateProject;
