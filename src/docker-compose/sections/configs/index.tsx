import {
  Heading,
  HStack,
  Link,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Pen } from "phosphor-react";
import { useState } from "react";
import { PrimaryButton } from "../../../components/Buttons/Primary";
import { useDockerComposeProject } from "../../providers/DockerComposeProvider";
import { CreateConfigModal, UpdateConfigModal } from "./ConfigEditor/modal";

export function ProjectConfigFiles() {
  const addConfigModal = useDisclosure();
  const editConfigModal = useDisclosure();
  const { state: composer } = useDockerComposeProject();
  const [configIndex, setConfigIndex] = useState(-1);

  return (
    <VStack
      bg="surface"
      w="full"
      alignItems="flex-start"
      spacing={4}
      p={4}
      rounded="md"
    >
      <Heading fontSize="lg">Configs (Configuration files)</Heading>
      <Text maxW="54ch" fontSize="sm" opacity={0.55}>
        Configuration files work like volumes. But instead, you should see them
        as a soft way to inject configuration files from host into your
        services. They are mounted in the container as /config-file for Linux
        containers and C:\config-file for windows containers.
      </Text>
      <Link href="https://docs.docker.com/compose/compose-file/#configs-top-level-element">
        Read more
      </Link>

      <VStack w="full" spacing={2} alignItems="flex-start">
        {composer.configs.map((vol, i) => {
          return (
            <HStack
              bg="background"
              px={2}
              py={2}
              rounded="md"
              w="full"
              cursor="pointer"
              justifyContent="space-between"
              key={vol.label}
            >
              <Text fontFamily="heading">{vol.label}</Text>
              <PrimaryButton
                rounded="md"
                onClick={() => {
                  setConfigIndex(i);
                  editConfigModal.onOpen();
                }}
                leftIcon={<Pen weight="fill" size={16} />}
              >
                Update
              </PrimaryButton>
            </HStack>
          );
        })}
      </VStack>

      {composer.configs.length === 0 && (
        <VStack w="full" alignItems="flex-start">
          <Text>
            Do you want to provide your containers a configuration stored on
            host as a file ?
          </Text>
          <PrimaryButton rounded="md" onClick={() => addConfigModal.onOpen()}>
            Add a config file.
          </PrimaryButton>
        </VStack>
      )}

      {composer.configs.length > 0 && (
        <VStack>
          <PrimaryButton rounded="md" onClick={() => addConfigModal.onOpen()}>
            Add another config.
          </PrimaryButton>
        </VStack>
      )}

      <CreateConfigModal {...addConfigModal} />
      {configIndex > -1 && (
        <UpdateConfigModal
          value={composer.configs[configIndex]}
          {...editConfigModal}
          onClose={() => {
            editConfigModal.onClose();
          }}
        />
      )}
    </VStack>
  );
}
