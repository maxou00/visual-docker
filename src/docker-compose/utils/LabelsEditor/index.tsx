import { Text, VStack } from '@chakra-ui/react';
import KeyValueInput from '../../../components/forms/KeyValueInput';

interface Props {
  value: any;
  onChange(payload: any): any;
  label: string;
}

export function LabelsEditor({ label, onChange, value }: Props) {
  return (
    <VStack w="full" alignItems="flex-start">
      <Text fontSize="md" fontWeight="medium">
        {label}
      </Text>
      <KeyValueInput value={value} onChange={onChange} />;
    </VStack>
  );
}
