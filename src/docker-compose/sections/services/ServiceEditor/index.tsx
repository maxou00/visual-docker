import {
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useCallback } from "react";
import { useImmer } from "use-immer";
import { PrimaryButton } from "../../../../components/Buttons/Primary";
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
    label: props.value?.label || "",
  });

  const onApplyChanges = useCallback(() => {
    if (props.onUpdated) {
      props.onUpdated(service);
    }
  }, [service, props.onUpdated]);

  return (
    <VStack w="full" alignItems="flex-start" spacing={4}>
      <Heading
        fontSize="lg"
        fontWeight="bold"
        contentEditable
        onInput={(ev) => {
          setService((draft) => {
            draft.label = (ev.target as HTMLHeadingElement).textContent || "";
          });
        }}
      >
        Set your service name here
      </Heading>
      <Divider />
      <VStack w="full" p={4} spacing={4}>
        <FormControl isRequired>
          <FormLabel>Image name</FormLabel>
          <Input
            value={service.image}
            size="sm"
            onChange={(ev) => {
              setService((draft) => {
                draft.image = ev.currentTarget.value;
              });
            }}
            variant="outline"
            placeholder=""
          />
        </FormControl>
        <BlockIoEditor />
      </VStack>
      <HStack w="full" alignItems="center" justifyContent="flex-end">
        <PrimaryButton size="md" onClick={onApplyChanges}>
          Apply changes
        </PrimaryButton>
      </HStack>
    </VStack>
  );
}
