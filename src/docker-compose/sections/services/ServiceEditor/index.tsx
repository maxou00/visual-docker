import {
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Check, Pen } from "phosphor-react";
import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from "react";
import { useImmer } from "use-immer";
import { PrimaryButton } from "../../../../components/Buttons/Primary";
import { ServiceConfig } from "../../../types";
import { BlockIoEditor } from "./BlockIoConfigEditor";
import BoundConfigEditor from "./BoundConfigEditor";
import { CpuConfigEditor } from "./CpuConfigEditor";

interface Props {
  value?: ServiceConfig;
  onUpdated: (s: ServiceConfig) => any;
}

export function ServiceEditor(props: Props) {
  const [service, setService] = useImmer<ServiceConfig>({
    ...props.value,
    id: props.value?.id || "",
    label: props.value?.label || "",
  });

  const [editLabel, setEditLabel] = useState(false);

  const onApplyChanges = useCallback(() => {
    if (props.onUpdated) {
      props.onUpdated(service);
    }
    setEditLabel(false);
  }, [service, props.onUpdated]);

  return (
    <VStack w="full" alignItems="flex-start" spacing={0}>
      <HStack w="full" p={4}>
        {!editLabel && (
          <Heading fontSize="lg" fontWeight="bold">
            {service.label || "Set your service label"}
          </Heading>
        )}
        {editLabel && (
          <Input
            flexGrow={1}
            value={service.label}
            onInput={(ev) => {
              setService((draft) => {
                draft.label = (ev.target as HTMLInputElement).value || "";
              });
            }}
            onKeyDown={(ev) => {
              if (ev.code.toLowerCase() === "enter") {
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
        <FormControl isRequired>
          <FormLabel>Image name</FormLabel>
          <Input
            value={service.image}
            size="sm"
            onChange={(ev) => {
              setService((draft) => {
                draft.image = ev.target.value;
              });
            }}
            variant="outline"
            placeholder=""
          />
        </FormControl>
        <FormControl>
          <FormLabel>
            <Link href="https://docs.docker.com/compose/compose-file/#command">
              Command
            </Link>
          </FormLabel>
          <Input
            size="sm"
            value={service.command}
            onChange={(ev) => {
              setService((draft) => {
                draft.command = ev.target.value;
              });
            }}
            variant="outline"
            placeholder=""
          />
          <FormHelperText>Override the default command</FormHelperText>
        </FormControl>
        <BoundConfigEditor
          value={service.configs}
          onChange={(cnf) => {
            setService((draft) => {
              draft.configs = cnf;
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
  );
}
