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
  Link,
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
      if (!Boolean(draft.external)) {
        draft.name = label;
      } else {
        draft.external = {
          name: label,
        };
      }
    });
  }, []);

  const onDriverChange = useCallback(
    (type: VolumeConfig["driver"], options: VolumeConfig["driver_opts"]) => {
      setContent((draft) => {
        if (!draft.external) {
          draft.driver = type;
          draft.driver_opts = options;
        }
      });
    },
    []
  );

  const onExternalChange = useCallback((options: VolumeConfig["external"]) => {
    setContent((draft) => {
      if (typeof options === "boolean") {
        if (options) {
          if (draft.name) {
            draft.external = {
              name: draft.name,
            };
          } else {
            draft.external = true;
          }
        } else {
          draft.external = false;
        }
      }
      if (typeof options === "object") {
        draft.external = options;
      }
      if (Boolean(options)) {
        draft.name = undefined;
        draft.driver = undefined;
        draft.driver_opts = undefined;
        draft.labels = undefined;
      }
    });
  }, []);

  const onLabelsChange = useCallback((options: VolumeConfig["labels"]) => {
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
      <FormControl>
        <Checkbox
          isChecked={Boolean(content.external)}
          onChange={(ev) => {
            if (ev.target.checked) {
              onExternalChange(true);
            } else {
              onExternalChange(false);
            }
          }}
        >
          This volume is{" "}
          <Link href="https://docs.docker.com/compose/compose-file/#external-1">
            external
          </Link>
        </Checkbox>
      </FormControl>
      <VStack alignItems="flex-start" spacing={2}>
        <FormControl>
          <FormLabel>
            {content.external
              ? "Name of the existent volume"
              : "Custom volume name"}
          </FormLabel>
          <Input
            value={
              typeof content.external === "object"
                ? content.external?.name
                : content.name || ""
            }
            fontSize="md"
            onChange={onNameChange}
            variant="outline"
            placeholder="A custom name for your volume"
          />
          <FormHelperText>
            Avoid using spaces. Instead use "-" or "_"
          </FormHelperText>
          <FormHelperText>
            {content.external
              ? `
              While the label will be used in the generated compose file, the name
            is the name of the volume existing outside of this environment, that you prefer to directly use. It is unscoped,
            and thus will be used as is.
            `
              : `
              While the label will be used in the generated compose file, the name
            is the custom name you give to this volume globally. It is unscoped,
            and thus will be used as is.
              `}
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
