import { HStack, Text, VStack } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { PrimaryButton } from "../../../../../components/Buttons/Primary";
import { BindVolumeFrom } from "../../../../types";
import FieldEntry from "./FieldEntry";

export default function CopyVolumesFromEditor({
  value,
  onChange,
}: {
  value: any;
  onChange: (v: any) => any;
}) {
  const [keys, setKeys] = useState<BindVolumeFrom[]>([]);

  const onAppendKey = useCallback(() => {
    let cpy = [...keys];
    let collide = cpy.findIndex((c) => c.id === "");
    if (collide > -1) {
      toast.error(
        "Please edit the existing source entry before adding another"
      );
      return;
    }
    cpy.push({
      id: nanoid(),
      managed: true,
      mode: "rw",
    });
    onChange(cpy);
    setKeys(cpy);
  }, [keys, onChange]);

  const onEntryChange = useCallback(
    (id: string, entry: BindVolumeFrom) => {
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
      const cpy = [...keys].filter((item) => item.id !== id);
      onChange(cpy);
      setKeys(cpy);
    },
    [keys, onChange]
  );

  return (
    <VStack w="full" alignItems="flex-start" spacing={4}>
      <VStack w="full" alignItems="flex-start" spacing={2}>
        <Text>Mount Volumes from other service (volumes_from)</Text>
        <Text fontSize="sm">Here are listed mount configurations.</Text>
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
            Add a new mount
          </PrimaryButton>
        </HStack>
      </VStack>
    </VStack>
  );
}
