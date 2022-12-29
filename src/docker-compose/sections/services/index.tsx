import { Heading, HStack, VStack } from "@chakra-ui/react";

export function ProjectServices() {
  return (
    <VStack bg="surface" w="full" minH="100vh" alignItems="flex-start">
      <HStack h="56px" w="full" alignItems="center" px={4}>
        <Heading fontSize="xl">Services</Heading>
      </HStack>
    </VStack>
  );
}
