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
import { NetworkConfig, VolumeConfig } from "../../../types";
import { LabelsEditor } from "../../../utils/LabelsEditor";

interface Props {
  value?: VolumeConfig;
  onChange: (config: VolumeConfig) => any;
}

export function VolumeEditor(props: Props) {
  const [content, setContent] = useImmer<VolumeConfig>(
    props.value || {
      label: "",
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

  const onExternalChange = useCallback((external: VolumeConfig["external"]) => {
    setContent((draft) => {
      draft.external = external;
      if (external) {
        draft.type = undefined;
        draft.driver_opts = undefined;
        draft.labels = undefined;
      }
    });
  }, []);

  const onDriverChange = useCallback(
    (type: VolumeConfig["type"], options: VolumeConfig["driver_opts"]) => {
      setContent((draft) => {
        draft.type = type;
        draft.driver_opts = options;
      });
    },
    []
  );

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
            is the custom name you give to this network globally. It is
            unscoped.
          </FormHelperText>
        </FormControl>
        {!content.external && (
          <LabelsEditor value={content.labels} onChange={onLabelsChange} />
        )}
        {content.external && (
          <Alert colorScheme="orange" rounded="md">
            <AlertTitle>Other options have been disabled.</AlertTitle>
            <AlertDescription>
              External volumes are not managed by compose. Thus, advanced
              options are useless.
            </AlertDescription>
          </Alert>
        )}
      </VStack>
    </VStack>
  );
}
