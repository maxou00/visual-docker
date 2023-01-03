import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { X } from "phosphor-react";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { useImmer } from "use-immer";
import { PrimaryButton } from "../../../../../components/Buttons/Primary";
import { useDockerComposeProject } from "../../../../providers/DockerComposeProvider";
import { BindConfigToService } from "../../../../types";

interface Props {
  value?: BindConfigToService[];
  onChange: (update: BindConfigToService[]) => any;
}

type Entry = BindConfigToService;

const initial: Entry = { id: nanoid(), source: "" };

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

  return (
    <VStack w="full" alignItems="center" spacing={2}>
      <Select
        size="sm"
        value={entry.source}
        onChange={(nodeEv) => {
          onChange({ ...entry, source: nodeEv.target.value });
        }}
      >
        <option value="">Choose a Config</option>
        {composer.state.configs.map((config) => {
          return <option value={config.label}>{config.label}</option>;
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
};

export default function BoundSecretConfigEditor({
  value,
  onChange,
}: {
  value: any;
  onChange: (v: any) => any;
}) {
  const [keys, setKeys] = useState<Entry[]>([]);

  const onAppendKey = useCallback(() => {
    let cpy = [...keys];
    let collide = cpy.findIndex((c) => c.source === "");
    if (collide > -1) {
      toast.error(
        "Please edit the existing source entry before adding another"
      );
      return;
    }
    cpy.push({ id: nanoid(), source: "" });
    onChange(cpy);
    setKeys(cpy);
  }, [keys, onChange]);

  const onEntryChange = useCallback(
    (id: string, entry: Entry) => {
      let cpy = [...keys];
      let index = cpy.findIndex((k) => k.id === id);
      if (index > -1) {
        cpy[index] = entry;
      }
      onChange(cpy);
      setKeys(cpy);
    },
    [keys, onChange]
  );

  const onDeleteEntry = useCallback(
    (id: string) => {
      let cpy = [...keys];
      let index = cpy.findIndex((k) => k.id === id);
      if (index > -1) {
        cpy.splice(index, 1);
      }
      onChange(cpy);
      setKeys(cpy);
    },
    [keys, onChange]
  );

  return (
    <VStack w="full" alignItems="flex-start" spacing={4}>
      <VStack w="full" alignItems="flex-start" spacing={2}>
        <Text>Associated Secrets</Text>
        <Text fontSize="sm">
          Here are listed secrets bound to this service.
        </Text>
      </VStack>
      <VStack w="full" spacing={4}>
        {keys.map((k) => {
          return (
            <FieldEntry
              entry={k}
              key={k.id}
              onChange={(entry) => onEntryChange(k.id || "", entry)}
              onDelete={() => onDeleteEntry(k.id || "")}
            />
          );
        })}
        <HStack w="full" justifyContent="flex-end">
          <PrimaryButton variant="ghost" size="sm" onClick={onAppendKey}>
            Bind a volume
          </PrimaryButton>
        </HStack>
      </VStack>
    </VStack>
  );
}
