import {
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Check, Pen } from "phosphor-react";
import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from "react";
import { useImmer } from "use-immer";
import { PrimaryButton } from "../../../../components/Buttons/Primary";
import { ServiceConfig } from "../../../types";
import { BlockIoEditor } from "./BlockIoConfigEditor";
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
              if(ev.code.toLowerCase() === "enter") {
                onApplyChanges();
              }
            }}
          />
        )}
        <IconButton
          aria-label="apply"
          size="md"
          onClick={editLabel ? onApplyChanges : () => setEditLabel(true)}
        >
          {editLabel ? <Check size={20} /> : <Pen weight="fill" size={20} />}
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
                draft.image = ev.currentTarget.value;
              });
            }}
            variant="outline"
            placeholder=""
          />
        </FormControl>
        <BlockIoEditor
          value={service.blkio_config}
          onChange={(cnf) => {
            setService((draft) => {
              draft.blkio_config = cnf;
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
      </VStack>
      <HStack p={4} w="full" alignItems="center" justifyContent="flex-end">
        <PrimaryButton size="md" onClick={onApplyChanges}>
          Apply changes
        </PrimaryButton>
      </HStack>
    </VStack>
  );
}
