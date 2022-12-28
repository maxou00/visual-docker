import { FormLabel, Input, Link, VStack } from "@chakra-ui/react";
import { useImmer } from "use-immer";
import KeyValueInput from "../../../../../components/forms/KeyValueInput";
import { IPAMConfig } from "../../../../types";

interface Props {
  config: IPAMConfig | undefined;
  onChange: (v: IPAMConfig) => any;
}

export function IpamEditor(props: Props) {
  const [config, setConfig] = useImmer<Partial<IPAMConfig>>({});

  return (
    <VStack w="full" alignItems={"flex-start"} spacing={2}>
      <FormLabel>IP Address Management (IPAM)</FormLabel>
      <Link href="https://docs.docker.com/compose/compose-file/compose-file-v2/#ipam">
        Learn more
      </Link>
      <VStack w="full" alignItems="flex-start">
        <FormLabel>Custom driver</FormLabel>
        <Input
          placeholder="default"
          value={config.driver || ""}
          onChange={(ev) => {
            setConfig((draft) => {
              draft.driver = ev.target.value as any;
            });
          }}
        />
      </VStack>

      <VStack w="full" alignItems="flex-start">
        <FormLabel>Subnet</FormLabel>
        <Input
          placeholder="Enter subnet here"
          value={config.config?.subnet || ""}
          onChange={(ev) => {
            setConfig((draft) => {
              draft.config = {
                ...draft.config,
                subnet: ev.target.value as any,
              } as any;
            });
          }}
        />
      </VStack>

      <VStack w="full" alignItems="flex-start">
        <FormLabel>IP Range</FormLabel>
        <Input
          placeholder="Enter ip range here"
          value={config.config?.ip_range || ""}
          onChange={(ev) => {
            setConfig((draft) => {
              draft.config = {
                ...draft.config,
                ip_range: ev.target.value as any,
              } as any;
            });
          }}
        />
      </VStack>

      <VStack w="full" alignItems="flex-start">
        <FormLabel>Gateway</FormLabel>
        <Input
          placeholder="Enter gateway here"
          value={config.config?.ip_range || ""}
          onChange={(ev) => {
            setConfig((draft) => {
              draft.config = {
                ...draft.config,
                gateway: ev.target.value as any,
              } as any;
            });
          }}
        />
      </VStack>

      <VStack w="full" alignItems="flex-start">
        <FormLabel>Aux Addresses</FormLabel>
        <KeyValueInput
          value={config.config?.aux_addresses}
          onChange={(v) => {
            setConfig((draft) => {
              draft.config = {
                ...draft.config,
                aux_addresses: v,
              } as any;
            });
          }}
        />
      </VStack>

      <VStack w="full" alignItems="flex-start">
        <FormLabel>Custom Driver Options </FormLabel>
        <KeyValueInput
          value={config.options}
          onChange={(v) => {
            setConfig((draft) => {
              draft.options = v;
            });
          }}
        />
      </VStack>
    </VStack>
  );
}
