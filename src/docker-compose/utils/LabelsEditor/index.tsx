import { Heading, Text, VStack } from "@chakra-ui/react";
import KeyValueInput from "../../../components/forms/KeyValueInput";

interface Props {
  value: any;
  onChange(next: any): any;
}

export function LabelsEditor(props: Props) {
  return (
    <VStack w="full" alignItems="flex-start">
      <Text fontSize="md" fontWeight="medium">
        Custom Labels
      </Text>
      <KeyValueInput value={props.value} onChange={props.onChange} />;
    </VStack>
  );
}
