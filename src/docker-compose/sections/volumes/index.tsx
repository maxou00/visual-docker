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
import { CreateVolumeModal, UpdateVolumeModal } from "./VolumeEditor/modal";

export function ProjectVolumes() {
  const addVolumeModal = useDisclosure();
  const editVolumeModal = useDisclosure();
  const { state: composer } = useDockerComposeProject();
  const [volIndex, setVolIndex] = useState(-1);

  return (
    <VStack bg="surface" w="full" alignItems="flex-start" spacing={4} p={4} rounded="md">
      <Heading fontSize="lg">Your Volumes are here.</Heading>
      <Text maxW="54ch" fontSize="sm" opacity={0.55}>
        Volumes bring data storage capability within your environment, allowing
        you to persist information across containers restarts.
      </Text>
      <Link href="https://docs.docker.com/storage/volumes/">Read more</Link>

      <VStack w="full" spacing={2} alignItems="flex-start">
        {composer.volumes.map((vol, i) => {
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
                  setVolIndex(i);
                  editVolumeModal.onOpen();
                }}
                leftIcon={<Pen weight="fill" size={16} />}
              >
                Change
              </PrimaryButton>
            </HStack>
          );
        })}
      </VStack>

      <PrimaryButton rounded="md" onClick={() => addVolumeModal.onOpen()}>
        {composer.networks.length === 0
          ? "Start by creating one"
          : "Add a volume"}
      </PrimaryButton>
      <CreateVolumeModal {...addVolumeModal} />
      {volIndex > -1 && (
        <UpdateVolumeModal
          value={composer.volumes[volIndex]}
          {...editVolumeModal}
          onClose={() => {
            editVolumeModal.onClose();
          }}
        />
      )}
    </VStack>
  );
}
