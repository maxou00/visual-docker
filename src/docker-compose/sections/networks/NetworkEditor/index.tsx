import {
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
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
import { ChangeEvent, useCallback } from "react";
import { useImmer } from "use-immer";
import { PrimaryButton } from "../../../../components/Buttons/Primary";
import { useDockerComposeProject } from "../../../providers/DockerComposeProvider";
import { NetworkConfig } from "../../../types";
import { DriverEditor } from "./DriverEditor";
import { IpamEditor } from "./IpamEditor";
import { NetworkVisibilityEditor } from "./VisibilityEditor";

export function NetworkEditor(props: Omit<ModalProps, "children">) {
  const [content, setContent] = useImmer<NetworkConfig>({
    label: "",
    internal: true,
    driver: "bridge",
    driver_opts: {},
  });

  const { state: projectState } = useDockerComposeProject();

  const onLabelChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    let label = ev.currentTarget.value;
    if (label) {
      setContent((draft) => {
        draft.label = label;
      });
    }
  }, []);

  const onNameChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    let label = ev.currentTarget.value;
    setContent((draft) => {
      draft.name = label;
    });
  }, []);

  const onExternalChange = useCallback((is: boolean) => {
    setContent((draft) => {
      draft.external = is;
      draft.internal = !is;
      if (!is) {
        draft.name = undefined;
      }
    });
  }, []);

  const onDriverChange = useCallback(
    (type: NetworkConfig["driver"], options: NetworkConfig["driver_opts"]) => {
      setContent((draft) => {
        draft.driver = type;
        draft.driver_opts = options;
      });
    },
    []
  );

  const onIpamChange = useCallback((options: NetworkConfig["ipam"]) => {
    setContent((draft) => {
      draft.ipam = options;
    });
  }, []);

  const onSubmit = useCallback(() => {
    if (props.onClose) {
      props.onClose();
    }
  }, [content.label, props.onClose]);

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
            <FormControl>
              <FormLabel>Code</FormLabel>
              <Input
                value={content.label}
                fontSize="md"
                onChange={onLabelChange}
                variant="outline"
                placeholder="Enter a nice eye-catching name"
              />
              <FormHelperText>
                Avoid using spaces. Instead use "-" or "_"
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Network name</FormLabel>
              <Input
                value={content.name}
                fontSize="md"
                onChange={onNameChange}
                variant="outline"
                placeholder="Enter a nice eye-catching name"
              />
              <FormHelperText>
                Avoid using spaces. Instead use "-" or "_"
              </FormHelperText>
            </FormControl>
            <NetworkVisibilityEditor
              onSwitch={onExternalChange}
              external={content.external}
            />
            <FormControl>
              <Checkbox
                isChecked={content.enable_ipv6}
                colorScheme="primary"
                onChange={(ev) => {
                  setContent((draft) => {
                    draft.enable_ipv6 = ev.currentTarget.checked;
                  });
                }}
              >
                Enable IPv6
              </Checkbox>
            </FormControl>
            <DriverEditor
              type={content.driver}
              options={content.driver_opts}
              onChange={onDriverChange}
            />
            <IpamEditor config={content.ipam} onChange={onIpamChange} />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <PrimaryButton onClick={onSubmit}>Add this network</PrimaryButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
