import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { useCallback, useEffect, useState } from 'react';
import { PrimaryButton } from '../../../components/Buttons/Primary';
import { useDockerComposeProject } from '../../providers/DockerComposeProvider';
import { ServiceConfig } from '../../types';
import { ServiceEditor } from './ServiceEditor';
import styles from './styles/index.module.scss';

export function ProjectServices() {
  const [services, setServices] = useState<ServiceConfig[]>([]);
  const [selectedService, setSelectedService] = useState<
    ServiceConfig | undefined
  >();

  const composer = useDockerComposeProject();

  useEffect(() => {
    setServices(composer.state.services);
  }, [composer.state.services]);

  const onAddService = useCallback(() => {
    let newItem: ServiceConfig = {
      id: nanoid(),
      label: '',
      configs: [],
      secrets: [],
      volumes: [],
      volumes_from: [],
      labels: [],
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
    composer.addService(s);
  }, []);

  return (
    <Box className={styles.services}>
      <Box className={styles.panel__menu}>
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
                  <Text fontFamily="heading">{s.label || 'Untitled'}</Text>
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
      <Box className={styles.panel__content__wrapper}>
        <Box className={styles.panel__content}>
          {selectedService && (
            <ServiceEditor
              value={selectedService}
              onUpdated={onServiceUpdated}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
