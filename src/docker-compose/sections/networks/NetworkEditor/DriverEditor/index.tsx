import { FormLabel, VStack } from "@chakra-ui/react";
import { useCallback } from "react";
import { Choice } from "../../../../../components/Choices";
import KeyValueInput from "../../../../../components/forms/KeyValueInput";
import { NetworkConfig } from "../../../../types";
import styles from "./index.module.scss";

interface DriverProps {
  type?: NetworkConfig["driver"];
  options?: NetworkConfig["driver_opts"];
  onChange: (
    type: NetworkConfig["driver"],
    options: NetworkConfig["driver_opts"] | undefined
  ) => any;
}

export function DriverEditor(props: DriverProps) {
  const onChoiceChange = useCallback(
    (choice: NetworkConfig["driver"]) => {
      props.onChange(choice, props.options);
    },
    [props.options]
  );

  const choices = ["bridge", "host", "overlay", "ipvlan", "macvlan", "none"];

  return (
    <VStack w="full" alignItems={"flex-start"} spacing={2}>
      <VStack w="full" alignItems="flex-start">
        <FormLabel>Choose the driver</FormLabel>
        <div className={styles.choices}>
          {choices.map((choice) => {
            return (
              <Choice
                key={choice}
                current={props.type}
                value={choice}
                onSelect={onChoiceChange}
              >
                {choice}
              </Choice>
            );
          })}
        </div>
      </VStack>

      <VStack w="full" alignItems="flex-start">
        <FormLabel>Driver Options </FormLabel>
        <KeyValueInput
          value={props.options}
          onChange={(v) => props.onChange(props.type, v)}
        />
      </VStack>
    </VStack>
  );
}
