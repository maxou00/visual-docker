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
  const [selectedService, setSelectedService] = useState<
    ServiceConfig | undefined
  >();

  const onAddService = useCallback(() => {
    let newItem = {
      id: nanoid(),
      label: "",
    };
    setServices((prev) => {
      let cp = [...prev];
      cp.push(newItem);
      return cp;
    });
    setSelectedService(newItem);
  }, []);

  const onServiceUpdated = useCallback((s: ServiceConfig) => {
    setSelectedService(s);
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
    <HStack w="full" h="full" overflow="hidden" alignItems="flex-start">
      <Box w="360px" h="full" overflowY="auto">
        <HStack h="56px" w="full" alignItems="center" px={2}>
          <Heading fontSize="xl">Services</Heading>
        </HStack>
        {services.length > 0 && (
          <VStack w="full" alignItems="flex-start" p={2} spacing={4}>
            {services.map((s) => {
              return (
                <HStack
                  bg="surface"
                  px={4}
                  py={2}
                  rounded="md"
                  shadow="lg"
                  w="full"
                  cursor="pointer"
                  justifyContent="space-between"
                  key={s.id}
                  onClick={() => setSelectedService(s)}
                >
                  <Text fontFamily="heading">{s.label || "Untitled"}</Text>
                </HStack>
              );
            })}
            <PrimaryButton rounded="md" onClick={onAddService}>
              Add a new service
            </PrimaryButton>
          </VStack>
        )}
        {services.length === 0 && (
          <VStack alignItems="flex-start" spacing={4} p={2}>
            <Text textAlign="left" fontSize="sm" opacity={0.65}>
              Services are modules that compose your platform. There will
              usually be a database, a gateway, a caching system, your frontend
              module or micro-frontends , your backend monolith or
              microservices.
            </Text>
            <PrimaryButton rounded="md" onClick={onAddService}>
              Add a new service
            </PrimaryButton>
          </VStack>
        )}
      </Box>
      <Box h="full" overflow="hidden" bg="surface" flexGrow={1}>
        <Box w="full" h="full" overflowY="auto">
          {selectedService && (
            <ServiceEditor
              value={selectedService}
              onUpdated={onServiceUpdated}
            />
          )}
        </Box>
      </Box>
    </HStack>
  );
}
