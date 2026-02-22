import {
  Alert,
  AlertDescription,
  AlertTitle,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, useCallback, useEffect } from "react";
import { useImmer } from "use-immer";
import { NetworkConfig } from "../../../types";
import { LabelsEditor } from "../../../utils/LabelsEditor";
import { DriverEditor } from "./DriverEditor";
import { IpamEditor } from "./IpamEditor";
import { NetworkVisibilityEditor } from "./VisibilityEditor";

interface Props {
  value?: NetworkConfig;
  onChange: (config: NetworkConfig) => any;
}

export function NetworkEditor(props: Props) {
  const [content, setContent] = useImmer<NetworkConfig>(
    props.value || {
      label: "",
      internal: true,
      external: false,
      driver: "bridge",
      driver_opts: {},
    }
  );

  useEffect(() => {
    props.onChange(content);
  }, [content]);

  const advancedOptions = useDisclosure();

  const onLabelChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    let label = ev.currentTarget.value;
    setContent((draft) => {
      draft.label = label;
    });
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
      if (is) {
        draft.driver = undefined;
        draft.driver_opts = undefined;
        draft.enable_ipv6 = undefined;
        draft.ipam = undefined;
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

  const onLabelsChange = useCallback((options: NetworkConfig["labels"]) => {
    setContent((draft) => {
      draft.labels = options;
    });
  }, []);

  return (
    <VStack alignItems="flex-start" spacing={4}>
      <FormControl isRequired>
        <FormLabel>Label</FormLabel>
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
      <HStack
        cursor="pointer"
        w="full"
        alignItems="center"
        justifyContent="space-between"
        onClick={() => advancedOptions.onOpen()}
      >
        <Heading fontSize="md">Advanced Options</Heading>
      </HStack>
      <VStack alignItems="flex-start" spacing={2}>
        <NetworkVisibilityEditor
          onSwitch={onExternalChange}
          external={content.external}
        />
        <FormControl>
          <FormLabel>Custom name</FormLabel>
          <Input
            value={content.name}
            fontSize="md"
            onChange={onNameChange}
            variant="outline"
            placeholder="A custom name for your network"
          />
          <FormHelperText>
            Avoid using spaces. Instead use "-" or "_"
          </FormHelperText>
          <FormHelperText>
            While the label will be used in the generated compose file, the name
            is the custom name you give to this network. It is unscoped.
          </FormHelperText>
        </FormControl>
        {!content.external && (
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
        )}
        {!content.external && (
          <DriverEditor
            type={content.driver}
            options={content.driver_opts}
            onChange={onDriverChange}
          />
        )}
        {!content.external && (
          <IpamEditor config={content.ipam} onChange={onIpamChange} />
        )}
        {!content.external && (
          <LabelsEditor value={content.labels} onChange={onLabelsChange} />
        )}
        {content.external && (
          <Alert colorScheme="orange" rounded="md">
            <AlertTitle>Other options have been disabled.</AlertTitle>
            <AlertDescription>
              External networks are not managed by compose. Thus, advanced
              options are useless.
            </AlertDescription>
          </Alert>
        )}
      </VStack>
    </VStack>
  );
}
