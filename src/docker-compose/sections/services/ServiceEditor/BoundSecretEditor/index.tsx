import { HStack, Text, VStack } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { PrimaryButton } from "../../../../../components/Buttons/Primary";
import { BindConfigToService } from "../../../../types";
import FieldEntry from "./FieldEntry";

export default function BoundSecretConfigEditor({
  value,
  onChange,
}: {
  value: any;
  onChange: (v: any) => any;
}) {
  const [keys, setKeys] = useState<BindConfigToService[]>([]);

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
    (id: string, entry: BindConfigToService) => {
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
            Bind another config
          </PrimaryButton>
        </HStack>
      </VStack>
    </VStack>
  );
}
