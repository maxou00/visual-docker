import { Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import KeyValueInput from '../../../../../components/forms/KeyValueInput';

interface Props {
  value?: any;
  onChange: (ev: any) => any;
}

export function EnvironmentKeysEditor(props: Props) {
  const [content, setContent] = useState([...props.value]);

  useEffect(() => {
    props.onChange(content);
  }, [content]);

  return (
    <VStack w="full" alignItems="flex-start" spacing={2}>
      <VStack alignItems="flex-start" spacing={0}>
        <Text>Environment Keys</Text>
        <Text fontSize="sm" opacity={0.6}>
          Add your environment keys here.
        </Text>
      </VStack>
      <KeyValueInput value={content} onChange={(data) => setContent(data)} />
    </VStack>
  );
}
