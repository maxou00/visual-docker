import { Heading, Link, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { PrimaryButton } from "../../../components/Buttons/Primary";
import { NetworkEditor } from "./NetworkEditor";

export function ProjectNetworks() {
  const addNetworkModal = useDisclosure();
  return (
    <VStack alignItems="flex-start" spacing={4}>
      <Heading fontSize="lg">Your networks are here.</Heading>
      <Text maxW="54ch" fontSize="sm" opacity={0.55}>
        Networks bring exchange capability within your environment, helping you
        to tie services and containers up.
      </Text>
      <Link href="https://docs.docker.com/network/">Read more</Link>
      <PrimaryButton onClick={() => addNetworkModal.onOpen()}>
        Start by creating one.
      </PrimaryButton>
      <NetworkEditor {...addNetworkModal} />
    </VStack>
  );
}
