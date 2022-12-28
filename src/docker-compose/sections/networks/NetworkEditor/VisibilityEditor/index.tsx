import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Choice } from "../../../../../components/Choices";
import styles from "./index.module.scss";

interface Props {
  external?: boolean;
  onSwitch: (isExternal: boolean) => any;
}

export function NetworkVisibilityEditor(props: Props) {
  return (
    <VStack alignItems="flex-start" spacing={2}>
      <FormLabel>Network visibility</FormLabel>
      <Text fontSize="sm" opacity={0.75}>
        Choose{" "}
        <Link
          color="primary.400"
          href="https://docs.docker.com/compose/compose-file/compose-file-v2/#external-1"
        >
          External network
        </Link>{" "}
        when your network exists outside of your environment and you just want
        to open it to you nodes. <br />
        <Link
          color="primary.400"
          href="https://docs.docker.com/compose/compose-file/compose-file-v2/#internal"
        >
          Internal networks
        </Link>{" "}
        are created exclusively for your environment.
      </Text>
      <HStack pt={2} w="full" alignItems="center" justifyContent="center">
        <Choice
          current={props.external}
          value={false}
          onSelect={props.onSwitch}
        >
          Internal network
        </Choice>
        <Choice current={props.external} value={true} onSelect={props.onSwitch}>
          External network
        </Choice>
      </HStack>
    </VStack>
  );
}
