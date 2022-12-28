import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  VStack,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useImmer } from "use-immer";
import { NetworkEditor } from ".";
import { PrimaryButton } from "../../../../components/Buttons/Primary";
import { useDockerComposeProject } from "../../../providers/DockerComposeProvider";
import { NetworkConfig } from "../../../types";

export function CreateNetworkModal(props: Omit<ModalProps, "children">) {
  const [content, setContent] = useImmer<{ item: NetworkConfig }>({
    item: {
      label: "",
      internal: true,
      external: false,
      driver: "bridge",
      driver_opts: {},
    },
  });

  const { addNetwork } = useDockerComposeProject();

  const onSubmit = useCallback(() => {
    addNetwork(content.item);
    if (props.onClose) {
      props.onClose();
    }
  }, [content, props.onClose]);

  return (
    <Modal
      size="xl"
      isCentered
      closeOnOverlayClick={false}
      closeOnEsc={false}
      scrollBehavior="inside"
      {...props}
    >
      <ModalOverlay />
      <ModalContent bg="surface">
        <ModalHeader>
          <Heading fontSize="lg">Add a network</Heading>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <VStack alignItems="flex-start" spacing={4}>
            <NetworkEditor
              value={content.item}
              onChange={(update) => {
                setContent((draft) => {
                  draft.item = update;
                });
              }}
            />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <PrimaryButton onClick={onSubmit}>Add this network</PrimaryButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}


export function UpdateNetworkModal(props: Omit<ModalProps, "children"> & { value: NetworkConfig }) {
  const [content, setContent] = useImmer<{ item: NetworkConfig }>({
    item: {
      ...props.value
    },
  });

  const { addNetwork } = useDockerComposeProject();

  const onSubmit = useCallback(() => {
    addNetwork(content.item);
    if (props.onClose) {
      props.onClose();
    }
  }, [content, props.onClose]);

  return (
    <Modal
      size="xl"
      isCentered
      closeOnOverlayClick={false}
      closeOnEsc={false}
      scrollBehavior="inside"
      {...props}
    >
      <ModalOverlay />
      <ModalContent bg="surface">
        <ModalHeader>
          <Heading fontSize="lg">Update network {props.value.label}</Heading>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <VStack alignItems="flex-start" spacing={4}>
            <NetworkEditor
              value={content.item}
              onChange={(update) => {
                setContent((draft) => {
                  draft.item = update;
                });
              }}
            />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <PrimaryButton onClick={onSubmit}>Apply changes</PrimaryButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
