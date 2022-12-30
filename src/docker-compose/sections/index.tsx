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
import { ProjectConfigFiles } from "./configs";
import { ProjectNetworks } from "./networks";
import { ProjectNameEditor } from "./ProjectName";
import { ProjectSecrets } from "./secrets";
import { ProjectServices } from "./services";
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
    <HStack bg="background" w="full" h="100vh" alignItems="flex-start">
      <VStack h="full" overflowY="auto" alignItems="flex-start" w="40%" p={2}>
        <HStack h="56px" alignItems="center">
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
          <ProjectConfigFiles />
          <ProjectSecrets />
        </VStack>
      </VStack>
      <VStack
        bg="background"
        w="full"
        h="100vh"
        overflowY="auto"
        alignItems="flex-start"
      >
        <ProjectServices />
      </VStack>
    </HStack>
  );
}
