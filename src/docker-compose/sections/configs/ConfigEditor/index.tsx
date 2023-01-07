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
import { ConfigFile, NetworkConfig, VolumeConfig } from "../../../types";
import { LabelsEditor } from "../../../utils/LabelsEditor";

interface Props {
  value?: ConfigFile;
  onChange: (config: ConfigFile) => any;
}

export function ConfigEditor(props: Props) {
  const [content, setContent] = useImmer<ConfigFile>(
    props.value || {
      label: "",
    }
  );

  useEffect(() => {
    props.onChange(content);
  }, [content]);

  const onLabelChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    let label = ev.currentTarget.value;
    setContent((draft) => {
      draft.label = label;
    });
  }, []);

  const onFileChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    let label = ev.currentTarget.value;
    setContent((draft) => {
      if (!draft.external) {
        draft.file = label;
      }
    });
  }, []);

  const onNameChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    let label = ev.currentTarget.value;
    setContent((draft) => {
      draft.name = label;
    });
  }, []);

  const onExternalChange = useCallback((options: ConfigFile["external"]) => {
    setContent((draft) => {
      if (options) {
        draft.external = true;
        draft.file = undefined;
      } else {
        draft.external = false;
      }
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
          This config is external
        </Checkbox>
      </FormControl>
      <VStack alignItems="flex-start" spacing={2}>
        <FormControl>
          <FormLabel>
            {content.external
              ? "Name of the existent config"
              : "Custom config name"}
          </FormLabel>
          <Input
            value={content.name || ""}
            fontSize="md"
            onChange={onNameChange}
            variant="outline"
            placeholder="A custom name for your configuration"
          />
          <FormHelperText>
            Avoid using spaces. Instead use "-" or "_"
          </FormHelperText>
          <FormHelperText>
            {content.external
              ? `
                While the label will be used in the generated compose file, the name
              is the name of the config existing outside of this environment, that you prefer to directly use. It is unscoped,
              and thus will be used as is.
              `
              : `
                While the label will be used in the generated compose file, the name
              is the custom name you give to this config globally. It is unscoped,
              and thus will be used as is.
                `}
          </FormHelperText>
        </FormControl>
        {!content.external && (
          <FormControl isRequired>
            <FormLabel>File path on host system</FormLabel>
            <Input
              value={content.file || ""}
              fontSize="md"
              onChange={onFileChange}
              variant="outline"
              placeholder=""
            />
          </FormControl>
        )}
        {content.external && (
          <Alert colorScheme="orange" rounded="md">
            <AlertTitle>Other options have been disabled.</AlertTitle>
            <AlertDescription>
              External config are not managed by compose. Thus, file path option
              is useless.
            </AlertDescription>
          </Alert>
        )}
      </VStack>
    </VStack>
  );
}
