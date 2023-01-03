import {
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import { useDockerComposeProject } from "../../../../providers/DockerComposeProvider";
import { BindVolumeFrom } from "../../../../types";

export default function FieldEntry({
  entry,
  onChange,
  onDelete,
}: {
  entry: BindVolumeFrom;
  onChange: (entry: BindVolumeFrom) => any;
  onDelete: () => any;
}) {
  const composer = useDockerComposeProject();

  return (
    <VStack w="full" alignItems="flex-start" spacing={2}>
      <Checkbox
        checked={entry.managed ?? true}
        onChange={(ev) => {
          onChange({
            ...entry,
            managed: ev.target.checked,
          });
        }}
      >
        I'am copying from a service managed in this environement
      </Checkbox>
      <HStack w="full" alignItems="flex-start" spacing={4}>
        <FormControl>
          <FormLabel>Service label</FormLabel>
          {entry.managed ? (
            <Select
              size="sm"
              flexGrow={1}
              placeholder=""
              value={entry.service}
              onChange={({ target }) =>
                onChange({ ...entry, service: target.value })
              }
            >
              {composer.state.services.map((s) => {
                return <option key={s.label}>{s.label || "Untitled"}</option>;
              })}
            </Select>
          ) : (
            <Input
              size="sm"
              flexGrow={1}
              placeholder=""
              value={entry.service}
              onChange={({ target }) =>
                onChange({ ...entry, service: target.value })
              }
            />
          )}

          <FormHelperText>
            The service label. If not managed, this label should be the name of
            container else.outide thi environment.{" "}
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Permissions</FormLabel>
          <Select
            size="sm"
            flexGrow={1}
            placeholder=""
            value={entry.mode ?? ""}
            onChange={({ target }) =>
              onChange({ ...entry, mode: target.value as any })
            }
          >
            <option value="">Please choose a value</option>
            <option value="ro">Read-Only</option>
            <option value="rw">Read-write</option>
          </Select>
        </FormControl>
      </HStack>
      <HStack w="full" justifyContent="flex-end">
        <Button size="sm" onClick={() => onDelete()} aria-label={""}>
          Detach this setup
        </Button>
      </HStack>
    </VStack>
  );
}
