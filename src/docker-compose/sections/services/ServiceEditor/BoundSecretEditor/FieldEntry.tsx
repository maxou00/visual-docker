import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import { useDockerComposeProject } from "../../../../providers/DockerComposeProvider";
import { BindConfigToService } from "../../../../types";

export default function FieldEntry({
  entry,
  onChange,
  onDelete,
}: {
  entry: BindConfigToService;
  onChange: (entry: BindConfigToService) => any;
  onDelete: () => any;
}) {
  const composer = useDockerComposeProject();

  return (
    <VStack w="full" alignItems="center" spacing={2}>
      <Select
        size="sm"
        value={entry.source}
        onChange={(nodeEv) => {
          onChange({ ...entry, source: nodeEv.target.value });
        }}
      >
        <option value="">Choose a Secret</option>
        {composer.state.secrets.map((secret) => {
          return (
            <option key={secret.label} value={secret.label}>
              {secret.label}
            </option>
          );
        })}
      </Select>
      <HStack w="full" alignItems="flex-start" spacing={4}>
        <FormControl>
          <FormLabel>Target path within the container</FormLabel>
          <Input
            size="sm"
            flexGrow={1}
            placeholder=""
            value={entry.target}
            onChange={({ target }) =>
              onChange({ ...entry, target: target.value })
            }
          />
          <FormHelperText>
            Enter the path where this config should be mounted within the
            container. Default to {"/<config-name>"}
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Permissions assigned the config file</FormLabel>
          <Input
            size="sm"
            flexGrow={1}
            placeholder=""
            value={entry.mode}
            onChange={({ target }) =>
              onChange({ ...entry, target: target.value })
            }
          />
          <FormHelperText>
            Linux permission mode assigned to the config file. Like 0444 or 777
          </FormHelperText>
        </FormControl>
      </HStack>
      <HStack w="full" spacing={4}>
        <FormControl>
          <FormLabel>UID (user id) that owns the config file</FormLabel>
          <Input
            size="sm"
            flexGrow={1}
            placeholder=""
            value={entry.uid}
            onChange={({ target }) =>
              onChange({ ...entry, target: target.value })
            }
          />
          <FormHelperText>
            Default to the uid of the USER running the container. It's a numeric
            value.
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>GID (group id) that owns the config file</FormLabel>
          <Input
            size="sm"
            flexGrow={1}
            placeholder=""
            value={entry.gid}
            onChange={({ target }) =>
              onChange({ ...entry, target: target.value })
            }
          />
          <FormHelperText>
            Default to the gid of the USER running the container. It's a numeric
            value.
          </FormHelperText>
        </FormControl>
      </HStack>
      <HStack w="full" justifyContent="flex-end">
        <Button size="sm" onClick={() => onDelete()} aria-label={""}>
          Unbind this config
        </Button>
      </HStack>
    </VStack>
  );
}
