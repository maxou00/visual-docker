import {
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
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
      <Heading fontSize="lg" fontWeight="bold" contentEditable onInput={(ev) => {
        setService(draft => {
          draft.label = (ev.target as HTMLHeadingElement).textContent || "";
        });
      }}>
        Set your service name here
      </Heading>
      <FormControl isRequired>
        <FormLabel>Image name</FormLabel>
        <Input
          value={service.image}
          size="sm"
          onChange={onImageChange}
          variant="outline"
          placeholder=""
        />
      </FormControl>
      <BlockIoEditor />
    </VStack>
  );
}
