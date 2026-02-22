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
import { nanoid } from "nanoid";
import { useDockerComposeProject } from "../../../../providers/DockerComposeProvider";
import { BindVolumeToService } from "../../../../types";

interface Props {
  value?: BindVolumeToService[];
  onChange: (update: BindVolumeToService[]) => any;
}

export type Entry = BindVolumeToService;

const initial: Entry = { id: nanoid(), type: "volume", source: "" };

const FieldEntry = ({
  entry,
  onChange,
  onDelete,
}: {
  entry: Entry;
  onChange: (entry: Entry) => any;
  onDelete: () => any;
}) => {
  const composer = useDockerComposeProject();

  const bindTypes = [
    {
      name: "volume",
    },
    {
      name: "bind",
    },
    {
      name: "tmpfs",
    },
    {
      name: "npipe",
    },
  ];

  return (
    <VStack w="full" alignItems="center" spacing={2}>
      <Select
        size="sm"
        value={entry.type}
        onChange={(nodeEv) => {
          onChange({ ...entry, type: nodeEv.target.value as any });
        }}
      >
        <option value="">Choose a bind type</option>
        {bindTypes.map((config) => {
          return (
            <option key={config.name} value={config.name}>
              {config.name}
            </option>
          );
        })}
      </Select>
      {["volume"].includes(entry.type) ? (
        <Select
          size="sm"
          value={entry.source}
          onChange={(nodeEv) => {
            onChange({ ...entry, source: nodeEv.target.value });
          }}
        >
          <option value="">Choose a Volume</option>
          {composer.state.volumes.map((config) => {
            return (
              <option key={config.label} value={config.label}>
                {config.label}
              </option>
            );
          })}
        </Select>
      ) : (
        <FormControl>
          <FormLabel>Source path within the host</FormLabel>
          <Input
            size="sm"
            flexGrow={1}
            placeholder=""
            value={entry.target}
            onChange={({ target }) =>
              onChange({ ...entry, source: target.value })
            }
          />
          <FormHelperText>
            Enter the path on the host you want to mount in the container
          </FormHelperText>
        </FormControl>
      )}
      <FormControl>
        <Checkbox
          checked={entry.read_only}
          onChange={(ev) => {
            onChange({ ...entry, read_only: ev.target.checked });
          }}
        >
          Read Only
        </Checkbox>
      </FormControl>
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
          Enter the path where this volume should be mounted within the
          container.
        </FormHelperText>
      </FormControl>
      {entry.type === "bind" && (
        <>
          <FormControl>
            <FormLabel>Propagation</FormLabel>
            <Input
              size="sm"
              flexGrow={1}
              placeholder=""
              value={entry.bind?.propagation ?? ""}
              onChange={({ target }) => {
                onChange({
                  ...entry,
                  bind: {
                    ...entry.bind,
                    propagation: target.value ?? "",
                  } as any,
                });
              }}
            />
          </FormControl>
          <FormControl>
            <Checkbox
              checked={entry.bind?.create_host_path}
              onChange={(ev) => {
                onChange({
                  ...entry,
                  bind: {
                    ...entry.bind,
                    create_host_path: ev.target.checked,
                  } as any,
                });
              }}
            >
              Create Host Path (create_host_path)
            </Checkbox>
          </FormControl>
          <FormControl>
            <FormLabel>SELinux re-labelling</FormLabel>
            <Select
              value={entry.bind?.selinux ?? ""}
              onChange={(ev) => {
                onChange({
                  ...entry,
                  bind: {
                    ...entry.bind,
                    selinux: ev.target.value,
                  } as any,
                });
              }}
            >
              <option value={""}>Choose a re-labelling option</option>
              <option value="z">z (shared)</option>
              <option value="Z">Z (private)</option>
            </Select>
          </FormControl>
        </>
      )}
      {entry.type === "volume" && (
        <>
          <FormControl>
            <Checkbox
              checked={entry.volume?.nocopy}
              onChange={(ev) => {
                onChange({
                  ...entry,
                  volume: {
                    ...entry.bind,
                    nocopy: ev.target.checked,
                  } as any,
                });
              }}
            >
              Disable Data copying (nocopy)
            </Checkbox>
          </FormControl>
        </>
      )}
      {entry.type === "tmpfs" && (
        <>
          <FormControl>
            <FormLabel>Mount Size (in Byte)</FormLabel>
            <Input
              size="sm"
              type="number"
              flexGrow={1}
              placeholder=""
              value={entry.tmpfs?.size}
              onChange={({ target }) =>
                onChange({
                  ...entry,
                  tmpfs: {
                    ...entry.tmpfs,
                    size: target.valueAsNumber,
                  },
                })
              }
            />
            <FormHelperText>
              Enter the mount size estimated in bytes
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Filemode (Unix-style permission)</FormLabel>
            <Input
              size="sm"
              flexGrow={1}
              placeholder="0777"
              value={entry.tmpfs?.mode}
              onChange={({ target }) =>
                onChange({
                  ...entry,
                  tmpfs: {
                    ...entry.tmpfs,
                    mode: target.value,
                  },
                })
              }
            />
            <FormHelperText>
              Enter the mount size estimated in bytes
            </FormHelperText>
          </FormControl>
        </>
      )}
      <FormControl>
        <FormLabel>Consistency requirements</FormLabel>
        <Input
          size="sm"
          flexGrow={1}
          placeholder=""
          value={entry.consistency}
          onChange={({ target }) =>
            onChange({
              ...entry,
              consistency: target.value,
            })
          }
        />
        <FormHelperText>
          The consistency requirements of the mount. Available values are
          platform specific
        </FormHelperText>
      </FormControl>
      <HStack w="full" justifyContent="flex-end">
        <Button size="sm" onClick={() => onDelete()} aria-label={""}>
          Unbind this volume
        </Button>
      </HStack>
    </VStack>
  );
};

export default FieldEntry;
