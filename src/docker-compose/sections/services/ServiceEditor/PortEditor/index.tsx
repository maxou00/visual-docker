import { Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import KeyValueInput from '../../../../../components/forms/KeyValueInput';

interface Props {
  value?: any;
  onChange: (ev: any) => any;
}

export function PortConfigEditor(props: Props) {
  const [content, setContent] = useState([...props.value]);

  useEffect(() => {
    props.onChange(content);
  }, [content]);

  return (
    <VStack w="full" alignItems="flex-start" spacing={2}>
      <VStack alignItems="flex-start" spacing={0}>
        <Text>Ports</Text>
        <Text fontSize="sm" opacity={0.6}>
          Edit ports you're opening to the host.
        </Text>
      </VStack>
      <KeyValueInput
        fieldProps={{
          keyLabel: 'Internal Port',
          valueLabel: 'External Port',
        }}
        value={content}
        onChange={(data) => setContent(data)}
      />
    </VStack>
  );
}
