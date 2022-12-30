import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useCallback } from "react";
import { useImmer } from "use-immer";
import { ServiceConfig } from "../../../types";
import { BlockIoEditor } from "./BlockIoConfigEditor";

interface Props {
  value?: ServiceConfig;
  onUpdated: (s: ServiceConfig) => any;
}

export function ServiceEditor(props: Props) {
  const [service, setService] = useImmer<ServiceConfig>({
    ...props.value,
    id: props.value?.id || "",
    label: "",
  });

  const onLabelChange = useCallback((ev: FormEvent<HTMLParagraphElement>) => {
    let label = ev.currentTarget.textContent || "";
    setService((draft) => {
      draft.label = label;
    });
  }, []);

  const onImageChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    let label = ev.currentTarget.value;
    setService((draft) => {
      draft.image = label;
    });
  }, []);

  return (
    <VStack w="full" alignItems="flex-start" spacing={4}>
      <Text fontWeight="bold" contentEditable onInput={(ev) => {}}>
        Set your service name here
      </Text>
      <FormControl isRequired>
        <FormLabel>Image name</FormLabel>
        <Input
          value={service.image}
          fontSize="md"
          onChange={onImageChange}
          variant="outline"
          placeholder=""
        />
      </FormControl>
      <BlockIoEditor />
    </VStack>
  );
}
