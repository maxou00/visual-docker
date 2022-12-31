import {
  HStack,
  IconButton,
  Input,
  VStack,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { X } from "phosphor-react";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { PrimaryButton } from "../../../../../../components/Buttons/Primary";
import { DeviceRate } from "../../../../../types";

interface Props {
  value?: DeviceRate[];
  onChange: (update: DeviceRate[]) => any;
}

type Entry = {
  id: string;
  path: string;
  rate: string;
};

const initial = { id: nanoid(), path: "", rate: '120mb' };

const FieldEntry = ({
  entry,
  onChange,
  onDelete,
}: {
  entry: Entry;
  onChange: (entry: Entry) => any;
  onDelete: () => any;
}) => {
  return (
    <HStack w="full" alignItems="center" spacing={2}>
      <Input
        size="sm"
        flexGrow={1}
        placeholder="Device Path"
        value={entry.path}
        onChange={({ target }) => onChange({ ...entry, path: target.value })}
      />
      <Input
        size="sm"
        placeholder="Read rate"
        value={entry.rate}
        onChange={({ target }) => onChange({ ...entry, rate: target.value })}
      />
      <IconButton size="sm" onClick={() => onDelete()} aria-label={""}>
        <X fontSize={14} />
      </IconButton>
    </HStack>
  );
};

export default function DeviceReadOrWriteBpsInput({
  value,
  onChange,
}: {
  value: any;
  onChange: (v: any) => any;
}) {
  const [keys, setKeys] = useState<Entry[]>([]);

  const onAppendKey = useCallback(() => {
    let cpy = [...keys];
    let collide = cpy.findIndex((c) => c.path === "");
    if (collide > -1) {
      toast.error("Please edit the existing path entry before adding another");
      return;
    }
    cpy.push({ id: nanoid(), path: "", rate: '120mb' });
    onChange(cpy);
    setKeys(cpy);
  }, [keys, onChange]);

  const onEntryChange = useCallback(
    (id: string, entry: Entry) => {
      let cpy = [...keys];
      let index = cpy.findIndex((k) => k.path === id);
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
      let index = cpy.findIndex((k) => k.path === id);
      if (index > -1) {
        cpy.splice(index, 1);
      }
      onChange(cpy);
      setKeys(cpy);
    },
    [keys, onChange]
  );

  return (
    <VStack w="full" spacing={4}>
      {keys.map((k) => {
        return (
          <FieldEntry
            entry={k}
            key={k.id}
            onChange={(entry) => onEntryChange(k.path, entry)}
            onDelete={() => onDeleteEntry(k.path)}
          />
        );
      })}
      <HStack w="full" justifyContent="flex-end">
        <PrimaryButton variant="ghost" size="sm" onClick={onAppendKey}>
          Add a path entry
        </PrimaryButton>
      </HStack>
    </VStack>
  );
}
