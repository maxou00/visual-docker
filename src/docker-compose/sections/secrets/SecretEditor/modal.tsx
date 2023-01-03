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
import { SecretEditor } from ".";
import { PrimaryButton } from "../../../../components/Buttons/Primary";
import { useDockerComposeProject } from "../../../providers/DockerComposeProvider";
import { SecretConfig } from "../../../types";

const initial: SecretConfig = {
  label: "",
};
export function CreateSecretModal(props: Omit<ModalProps, "children">) {
  const [content, setContent] = useImmer<{ item: SecretConfig }>({
    item: {
      id: nanoid(),
      ...initial,
    },
  });

  const { addSecret } = useDockerComposeProject();

  const onSubmit = useCallback(() => {
    addSecret(content.item);
    if (props.onClose) {
      setContent({
        item: {
          id: nanoid(),
          ...initial,
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
          <Heading fontSize="lg">Add a secret</Heading>
          <ModalCloseButton />
        </DrawerHeader>
        <DrawerBody>
          <VStack alignItems="flex-start" spacing={4}>
            <SecretEditor
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
          <PrimaryButton onClick={onSubmit}>Add this secret</PrimaryButton>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function UpdateSecretModal(
  props: Omit<ModalProps, "children"> & { value: SecretConfig }
) {
  const [content, setContent] = useImmer<{ item: SecretConfig }>({
    item: {
      ...props.value,
    },
  });

  const { addSecret } = useDockerComposeProject();

  const onSubmit = useCallback(() => {
    addSecret(content.item);
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
          <Heading fontSize="lg">Update secret {props.value.label}</Heading>
          <DrawerCloseButton />
        </DrawerHeader>
        <DrawerBody>
          <VStack alignItems="flex-start" spacing={4}>
            <SecretEditor
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
