import {
  Heading,
  HStack,
  Link,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Pen } from "phosphor-react";
import { PrimaryButton } from "../../../components/Buttons/Primary";
import { useDockerComposeProject } from "../../providers/DockerComposeProvider";
import { NetworkEditor } from "./NetworkEditor";
import { CreateNetworkModal } from "./NetworkEditor/modal";

export function ProjectNetworks() {
  const addNetworkModal = useDisclosure();
  const { state: composer } = useDockerComposeProject();

  return (
    <VStack w="full" alignItems="flex-start" spacing={4}>
      <Heading fontSize="lg">Your networks are here.</Heading>
      <Text maxW="54ch" fontSize="sm" opacity={0.55}>
        Networks bring exchange capability within your environment, helping you
        to tie services and containers up.
      </Text>
      <Link href="https://docs.docker.com/network/">Read more</Link>

      <VStack w="full" spacing={2} alignItems="flex-start">
        {composer.networks.map((net) => {
          return (
            <HStack
              bg="surface"
              px={2}
              py={2}
              rounded="md"
              w="full"
              cursor="pointer"
              justifyContent="space-between"
              key={net.label}
            >
              <Text fontFamily="heading">{net.label}</Text>
              <PrimaryButton
                rounded="md"
                onClick={() => addNetworkModal.onOpen()}
                leftIcon={<Pen weight="fill" size={16}/>}
              >
                Change
              </PrimaryButton>
            </HStack>
          );
        })}
      </VStack>

      <PrimaryButton rounded="md" onClick={() => addNetworkModal.onOpen()}>
        {composer.networks.length === 0
          ? "Start by creating one"
          : "Add another network"}
      </PrimaryButton>
      <CreateNetworkModal {...addNetworkModal} />
    </VStack>
  );
}
