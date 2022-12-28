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
} from "../providers/DockerComposeProvider";
import { ProjectNetworks } from "./networks";
import { ProjectNameEditor } from "./ProjectName";
import { ProjectVolumes } from "./volumes";

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
    <VStack bg="background" w="full" minH="100vh" alignItems="flex-start">
      <VStack alignItems="flex-start" w="30%" p={2}>
        <HStack alignItems="center" p={2}>
          <Heading fontSize="xl">
            {project.name || "Setup your project's name"}
          </Heading>
          <Button rounded="full" onClick={() => editProjectModal.onOpen()}>
            edit
          </Button>
        </HStack>
        <VStack w="full" alignItems="flex-start" spacing={4}>
          <ProjectNameEditor {...editProjectModal} />
          <ProjectNetworks />
          <ProjectVolumes />
        </VStack>
      </VStack>
    </VStack>
  );
}
