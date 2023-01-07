import {
  Divider,
  HStack,
  Heading,
  IconButton,
  Input,
  VStack,
} from '@chakra-ui/react';
import { Check, Pen } from 'phosphor-react';
import { useCallback, useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import { PrimaryButton } from '../../../../components/Buttons/Primary';
import DVInput from '../../../../components/DVInput/DVInput';
import { ProvideService } from '../../../providers/CurrentServiceConfig';
import { ServiceConfig } from '../../../types';
import { BlockIoEditor } from './BlockIoConfigEditor';
import BoundConfigEditor from './BoundConfigEditor';
import BoundDependencies from './BoundDependenciesEditor';
import BoundSecretConfigEditor from './BoundSecretEditor';
import BoundVolumeConfigEditor from './BoundVolumeEditor';
import { CpuConfigEditor } from './CpuConfigEditor';
import CopyVolumesFromEditor from './VolumesFromEditor';

interface Props {
  value?: ServiceConfig;
  onUpdated: (s: ServiceConfig) => any;
}

export function ServiceEditor(props: Props) {
  const [service, setService] = useImmer<ServiceConfig>({
    ...props.value,
    id: props.value?.id || '',
    label: props.value?.label || '',
    configs: [],
    secrets: [],
    volumes: [],
    volumes_from: [],
  });

  useEffect(() => {
    if (props.value) {
      setService({ ...props.value });
    }
  }, [props.value]);

  const [editLabel, setEditLabel] = useState(false);

  const onApplyChanges = useCallback(() => {
    if (props.onUpdated) {
      props.onUpdated(service);
    }
    setEditLabel(false);
  }, [service, props.onUpdated]);

  return (
    <ProvideService service={service}>
      <VStack w="full" alignItems="flex-start" spacing={0}>
        <HStack w="full" p={4}>
          {!editLabel && (
            <Heading fontSize="lg" fontWeight="bold">
              {service.label || 'Set your service label'}
            </Heading>
          )}
          {editLabel && (
            <Input
              flexGrow={1}
              value={service.label}
              onInput={(ev) => {
                setService((draft) => {
                  draft.label = (ev.target as HTMLInputElement).value || '';
                });
              }}
              onKeyDown={(ev) => {
                if (ev.code.toLowerCase() === 'enter') {
                  onApplyChanges();
                }
              }}
            />
          )}
          <IconButton
            aria-label="apply"
            rounded="full"
            size="sm"
            onClick={editLabel ? onApplyChanges : () => setEditLabel(true)}
          >
            {editLabel ? <Check size={16} /> : <Pen weight="fill" size={16} />}
          </IconButton>
        </HStack>
        <Divider />
        <VStack w="full" px={6} py={4} spacing={4}>
          <DVInput
            isRequired
            label="Image name"
            labelLink="https://docs.docker.com/compose/compose-file/#container_name"
            value={service.image}
            onChange={(ev) => {
              setService((draft) => {
                draft.image = ev.target.value;
              });
            }}
          />

          <DVInput
            isRequired
            label="Container name"
            labelLink="https://docs.docker.com/compose/compose-file/#container_name"
            value={service.container_name}
            onChange={(ev) => {
              setService((draft) => {
                draft.container_name = ev.target.value;
              });
            }}
          />

          <DVInput
            label="Domain name"
            labelLink="https://docs.docker.com/compose/compose-file/#domainname"
            value={service.domainName}
            onChange={(ev) => {
              setService((draft) => {
                draft.domainName = ev.target.value;
              });
            }}
          />

          <DVInput
            label="DNS"
            placeholder="8.8.8.8"
            labelLink="https://docs.docker.com/compose/compose-file/#devices"
            value={service.dns}
            onChange={({ target: { value } }) => {
              setService((draft) => {
                draft.dns = value;
              });
            }}
          />
          <DVInput
            label="Entry Point"
            placeholder="/code/entrypoint.sh"
            labelLink="https://docs.docker.com/compose/compose-file/#entrypoint"
            value={service.entrypoint}
            onChange={({ target: { value } }) => {
              setService((draft) => {
                draft.entrypoint = value;
              });
            }}
            helperText="entrypoint overrides the default entrypoint for the Docker image (i.e. ENTRYPOINT set by Dockerfile). Compose implementations MUST clear out any default command on the Docker image - both ENTRYPOINT and CMD instruction in the Dockerfile - when entrypoint is configured by a Compose file. If command is also set, it is used as parameter to entrypoint as a replacement for Docker image’s CMD"
          />

          <BoundVolumeConfigEditor
            value={service.volumes}
            onChange={(cnf) => {
              setService((draft) => {
                draft.volumes = cnf;
              });
            }}
          />
          <CopyVolumesFromEditor
            value={service.volumes_from}
            onChange={(cnf) => {
              setService((draft) => {
                draft.volumes_from = cnf;
              });
            }}
          />
          <BoundConfigEditor
            value={service.configs}
            onChange={(cnf) => {
              setService((draft) => {
                draft.configs = cnf;
              });
            }}
          />
          <BoundSecretConfigEditor
            value={service.secrets}
            onChange={(cnf) => {
              setService((draft) => {
                draft.secrets = cnf;
              });
            }}
          />
          <BoundDependencies
            value={service.depends_on}
            onChange={(cnf) => {
              setService((draft) => {
                draft.depends_on = cnf;
              });
            }}
          />

          <DVInput
            isRequired
            label="Command"
            helperText="Override the default command"
            labelLink="https://docs.docker.com/compose/compose-file/#command"
            value={service.command}
            onChange={(ev) => {
              setService((draft) => {
                draft.command = ev.target.value;
              });
            }}
          />

          <CpuConfigEditor
            value={service}
            onChange={(cnf) => {
              setService((draft) => {
                draft.cpu_count = cnf.cpu_count;
                draft.cpu_percent = cnf.cpu_percent;
                draft.cpu_period = cnf.cpu_period;
                draft.cpu_quota = cnf.cpu_quota;
                draft.cpu_rt_period = cnf.cpu_rt_period;
                draft.cpu_rt_runtime = cnf.cpu_rt_runtime;
                draft.cpuset = cnf.cpuset;
                draft.cpu_shares = cnf.cpu_shares;
              });
            }}
          />
          <BlockIoEditor
            value={service.blkio_config}
            onChange={(cnf) => {
              setService((draft) => {
                draft.blkio_config = cnf;
              });
            }}
          />
        </VStack>
        <HStack p={4} w="full" alignItems="center" justifyContent="center">
          <PrimaryButton
            rightIcon={<Check size={24} />}
            size="md"
            onClick={onApplyChanges}
          >
            Apply changes
          </PrimaryButton>
        </HStack>
      </VStack>
    </ProvideService>
  );
}
