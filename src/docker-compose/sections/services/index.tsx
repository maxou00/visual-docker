import {
  Box,
  Center,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { useCallback, useState } from "react";
import { PrimaryButton } from "../../../components/Buttons/Primary";
import { ServiceConfig } from "../../types";
import { ServiceEditor } from "./ServiceEditor";

export function ProjectServices() {
  const [services, setServices] = useState<ServiceConfig[]>([]);

  const onAddService = useCallback(() => {
    setServices((prev) => {
      let newItem = {
        id: nanoid(),
        label: "",
      };
      let cp = [...prev];
      cp.push(newItem);
      return cp;
    });
  }, []);

  const onServiceUpdated = useCallback((s: ServiceConfig) => {
    setServices((prev) => {
      let cp = [...prev];
      let collision = cp.findIndex((c) => c.id === s.id);
      if (collision > -1) {
        cp[collision] = s;
      } else {
        cp.push(s);
      }
      return cp;
    });
  }, []);

  return (
    <VStack w="full" alignItems="flex-start">
      <HStack h="56px" w="full" alignItems="center" px={4}>
        <Heading fontSize="xl">Services</Heading>
      </HStack>
      {services.length === 0 && (
        <Center
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          w="full"
          flexGrow={1}
        >
          <Container>
            <VStack spacing={4}>
              <Text textAlign="center">
                Services are modules that compose your platform. There will
                usually be a database, a gateway, a caching system, your
                frontend module or micro-frontends , your backend monolith or
                microservices.
              </Text>
              <PrimaryButton onClick={onAddService}>
                Add a new service
              </PrimaryButton>
            </VStack>
          </Container>
        </Center>
      )}
      {services.length > 0 && (
        <VStack w="full" alignItems="flex-start" p={4} spacing={4}>
          {services.map((s) => {
            return (
              <Box key={s.id} w="full" p={6} rounded="md" bg="surface">
                <ServiceEditor value={s} onUpdated={onServiceUpdated} />
              </Box>
            );
          })}
          <PrimaryButton onClick={onAddService}>
            Add a new service
          </PrimaryButton>
        </VStack>
      )}
    </VStack>
  );
}
