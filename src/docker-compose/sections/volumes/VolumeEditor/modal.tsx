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
import { useCallback } from "react";
import { useImmer } from "use-immer";
import { VolumeEditor } from ".";
import { PrimaryButton } from "../../../../components/Buttons/Primary";
import { useDockerComposeProject } from "../../../providers/DockerComposeProvider";
import { VolumeConfig } from "../../../types";

export function CreateVolumeModal(props: Omit<ModalProps, "children">) {
  const [content, setContent] = useImmer<{ item: VolumeConfig }>({
    item: {
      label: "",
    },
  });

  const { addVolume } = useDockerComposeProject();

  const onSubmit = useCallback(() => {
    addVolume(content.item);
    if (props.onClose) {
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
            <VolumeEditor
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
          <PrimaryButton onClick={onSubmit}>Add this volume</PrimaryButton>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function UpdateVolumeModal(
  props: Omit<ModalProps, "children"> & { value: VolumeConfig }
) {
  const [content, setContent] = useImmer<{ item: VolumeConfig }>({
    item: {
      ...props.value,
    },
  });

  const { addVolume } = useDockerComposeProject();

  const onSubmit = useCallback(() => {
    addVolume(content.item);
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
            <VolumeEditor
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
