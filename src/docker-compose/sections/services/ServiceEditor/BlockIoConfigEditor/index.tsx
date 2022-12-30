import { Text, VStack } from "@chakra-ui/react";

export function BlockIoEditor() {
  return (
    <VStack w="full" alignItems="flex-start" spacing={0}>
      <Text>Block Input Output Config (blkio_config)</Text>
      <Text fontSize="sm">
        Block configuration defines limits related to read/write operations on
        the storage device.
      </Text>
    </VStack>
  );
}
