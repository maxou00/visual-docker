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
import { ConfigEditor } from ".";
import { PrimaryButton } from "../../../../components/Buttons/Primary";
import { useDockerComposeProject } from "../../../providers/DockerComposeProvider";
import { ConfigFile } from "../../../types";

const initial = {
  label: "",
};

export function CreateConfigModal(props: Omit<ModalProps, "children">) {
  const [content, setContent] = useImmer<{ item: ConfigFile }>({
    item: {
      id: nanoid(),
      ...initial,
    },
  });

  const { addConfigFile } = useDockerComposeProject();

  const onSubmit = useCallback(() => {
    addConfigFile(content.item);
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
          <Heading fontSize="lg">Add a config</Heading>
          <ModalCloseButton />
        </DrawerHeader>
        <DrawerBody>
          <VStack alignItems="flex-start" spacing={4}>
            <ConfigEditor
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
          <PrimaryButton onClick={onSubmit}>Add this config file</PrimaryButton>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function UpdateConfigModal(
  props: Omit<ModalProps, "children"> & { value: ConfigFile }
) {
  const [content, setContent] = useImmer<{ item: ConfigFile }>({
    item: {
      ...props.value,
    },
  });

  const { addConfigFile } = useDockerComposeProject();

  const onSubmit = useCallback(() => {
    addConfigFile(content.item);
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
          <Heading fontSize="lg">Update config {props.value.label}</Heading>
          <DrawerCloseButton />
        </DrawerHeader>
        <DrawerBody>
          <VStack alignItems="flex-start" spacing={4}>
            <ConfigEditor
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
