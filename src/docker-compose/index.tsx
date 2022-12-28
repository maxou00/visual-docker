import {
  Button,
  Heading,
  HStack,
  Modal,
  useDisclosure,
  useModal,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import {
  DockerComposeProvider,
  useDockerComposeProject,
} from "./providers/DockerComposeProvider";
import { ProjectNetworks } from "./sections/networks";
import { ProjectNameEditor } from "./sections/ProjectName";

export function DockerComposeProject() {
  const {
    state: { project },
  } = useDockerComposeProject();

  const editProjectModal = useDisclosure();

  useEffect(() => {
    if (!project.name) {
      editProjectModal.onOpen();
    }
  }, [project.name]);

  return (
    <VStack w="full" alignItems="flex-start">
      <HStack>
        <Heading fontSize="xl">{project.name || "Setup your project's name"}</Heading>
        <Button rounded="full" onClick={() => editProjectModal.onOpen()}>
          edit
        </Button>
      </HStack>
      <ProjectNameEditor {...editProjectModal} />
      <ProjectNetworks />
    </VStack>
  );
}
