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
import { CreateSecretModal, UpdateSecretModal } from "./SecretEditor/modal";

export function ProjectSecrets() {
  const addSecretModal = useDisclosure();
  const editSecretModal = useDisclosure();
  const { state: composer } = useDockerComposeProject();
  const [secretIndex, setSecretIndex] = useState(-1);

  return (
    <VStack
      bg="surface"
      w="full"
      alignItems="flex-start"
      spacing={4}
      p={4}
      rounded="md"
    >
      <Heading fontSize="lg">Secrets</Heading>
      <VStack>
        <Text maxW="54ch" fontSize="sm" opacity={0.55}>
          Secrets are a special kind of Configs dedicated to sensitive datas,
          with specific constraint for this usage. The platform implementation
          may significantly differ from Configs, as dedicated Secrets section
          allows to configure the related resources.
        </Text>
        <Text>
          Use cases: Private keys | Identity files | Content Hashes | Access
          Tokens | Any content you think sensitive.
        </Text>
      </VStack>
      <Link href="https://docs.docker.com/compose/compose-file/#secrets-top-level-element">
        Read more
      </Link>

      <VStack w="full" spacing={2} alignItems="flex-start">
        {composer.secrets.map((vol, i) => {
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
                  setSecretIndex(i);
                  editSecretModal.onOpen();
                }}
                leftIcon={<Pen weight="fill" size={16} />}
              >
                Update
              </PrimaryButton>
            </HStack>
          );
        })}
      </VStack>

      {composer.secrets.length === 0 && (
        <VStack w="full" alignItems="flex-start">
          <Text>
            Do you want to provide your containers a sensitive data, either
            stored on host as a file,or available as an environment variable ?
          </Text>
          <PrimaryButton rounded="md" onClick={() => addSecretModal.onOpen()}>
            Add a secret.
          </PrimaryButton>
        </VStack>
      )}

      {composer.secrets.length > 0 && (
        <VStack>
          <PrimaryButton rounded="md" onClick={() => addSecretModal.onOpen()}>
            Add another secret.
          </PrimaryButton>
        </VStack>
      )}

      <CreateSecretModal {...addSecretModal} />
      {secretIndex > -1 && (
        <UpdateSecretModal
          value={composer.configs[secretIndex]}
          {...editSecretModal}
          onClose={() => {
            editSecretModal.onClose();
          }}
        />
      )}
    </VStack>
  );
}
