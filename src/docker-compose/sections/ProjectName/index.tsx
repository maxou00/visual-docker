import {
  Button,
  Heading,
  Input,
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
import { useCallback, useEffect } from "react";
import { useImmer } from "use-immer";
import { PrimaryButton } from "../../../components/Buttons/Primary";
import { useDockerComposeProject } from "../../providers/DockerComposeProvider";

export function ProjectNameEditor(props: Omit<ModalProps, "children">) {
  const [content, setContent] = useImmer({
    label: "",
  });

  const { state: projectState, setProjectName } = useDockerComposeProject();

  useEffect(() => {
    if (projectState.project.name) {
      setContent((draft) => {
        draft.label = projectState.project.name;
      });
    }
  }, [projectState.project.name]);

  const onSubmit = useCallback(() => {
    setProjectName(content.label);
    if (props.onClose) {
      props.onClose();
    }
  }, [content.label, props.onClose]);

  return (
    <Modal isCentered closeOnOverlayClick={false} closeOnEsc={false} {...props}>
      <ModalOverlay />
      <ModalContent bg="surface">
        <ModalHeader>
          <Heading fontSize="lg">Name your project</Heading>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <VStack alignItems="flex-start">
            <Input
              value={content.label}
              fontSize="lg"
              onChange={(ev) => {
                setContent((draft) => {
                  draft.label = ev.target.value;
                });
              }}
              variant="unstyled"
              placeholder="Enter a nice eye-catching name"
            />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <PrimaryButton onClick={onSubmit}>
            Use this name
          </PrimaryButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
