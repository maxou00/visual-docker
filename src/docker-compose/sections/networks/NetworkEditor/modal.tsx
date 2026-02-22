import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  ModalCloseButton,
  ModalProps,
  VStack,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { useCallback } from "react";
import { useImmer } from "use-immer";
import { NetworkEditor } from ".";
import { PrimaryButton } from "../../../../components/Buttons/Primary";
import { useDockerComposeProject } from "../../../providers/DockerComposeProvider";
import { NetworkConfig } from "../../../types";

let initial = {
  label: "",
  internal: true,
  external: false,
  driver: "bridge",
  driver_opts: {},
};

export function CreateNetworkModal(props: Omit<ModalProps, "children">) {
  const [content, setContent] = useImmer<{ item: NetworkConfig }>({
    item: {
      id: nanoid(),
      ...(initial as any),
    },
  });

  const { addNetwork } = useDockerComposeProject();

  const onSubmit = useCallback(() => {
    addNetwork(content.item);
    if (props.onClose) {
      setContent({
        item: {
          id: nanoid(),
          ...(initial as any),
        },
      });
      props.onClose();
    }
  }, [content, props.onClose]);

  return (
    <Drawer
      size="xl"
      isCentered
      placement="left"
      closeOnOverlayClick={false}
      closeOnEsc={false}
      scrollBehavior="inside"
      {...props}
    >
      <DrawerOverlay />
      <DrawerContent bg="surface">
        <DrawerHeader>
          <Heading fontSize="lg">Add a network</Heading>
          <ModalCloseButton />
        </DrawerHeader>
        <DrawerBody>
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
        </DrawerBody>
        <DrawerFooter>
          <PrimaryButton onClick={onSubmit}>Add this network</PrimaryButton>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function UpdateNetworkModal(
  props: Omit<ModalProps, "children"> & { value: NetworkConfig }
) {
  const [content, setContent] = useImmer<{ item: NetworkConfig }>({
    item: {
      ...props.value,
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
    <Drawer
      size="xl"
      isFullHeight
      placement="right"
      isCentered
      closeOnOverlayClick={false}
      closeOnEsc={false}
      scrollBehavior="inside"
      {...props}
    >
      <DrawerOverlay />
      <DrawerContent bg="surface">
        <DrawerHeader>
          <Heading fontSize="lg">Update network {props.value.label}</Heading>
          <DrawerCloseButton />
        </DrawerHeader>
        <DrawerBody>
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
        </DrawerBody>
        <DrawerFooter>
          <PrimaryButton onClick={onSubmit}>Apply changes</PrimaryButton>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
