import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { useImmer } from "use-immer";
import { BlockIoConfig } from "../../../../types";
import DeviceReadOrWriteBpsInput from "./DeviceReadOrWriteBpsEditor";
import DeviceReadOrWriteIopsInput from "./DeviceReadOrWriteIopsEditor";
import WeightDeviceInput from "./WeightDeviceEditor";

interface Props {
  value?: BlockIoConfig;
  onChange: (config:BlockIoConfig) => any;
}

export function BlockIoEditor(props: Props) {
  const [content, update] = useImmer<BlockIoConfig>({
    weight: 500,
    weight_device: [],
    device_read_bps: [],
    device_write_bps: [],
    device_read_iops: [],
    device_write_iops: [],
    ...props.value
  });

  const onWeightChange = useCallback((weight: number) => {
    update(draft => {
      draft.weight = weight;
    })
  }, []);

  useEffect(() => {
    props.onChange(content);
  }, [content]);

  return (
    <VStack w="full" alignItems="flex-start" spacing={4}>
      <VStack w="full" alignItems="flex-start" spacing={2}>
        <Text>Block Input Output Config (blkio_config)</Text>
        <Text fontSize="sm">
          Block configuration defines limits related to read/write operations on
          the storage device.
        </Text>
        <Link href="https://docs.docker.com/compose/compose-file/#blkio_configs">
          Learn more
        </Link>
      </VStack>
      <FormControl>
        <FormLabel>Weight</FormLabel>
        <Input
          size="sm"
          value={content.weight}
          fontSize="md"
          type="number"
          onChange={(ev) => {
            onWeightChange(ev.currentTarget.valueAsNumber);
          }}
          variant="outline"
          placeholder=""
        />
        <FormHelperText>
          Modify the proportion of bandwidth allocated to this service relative
          to other services. Takes an integer value between 10 and 1000, with
          500 being the default.
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Weight Device</FormLabel>
        <FormHelperText mb={2}>
          Fine-tune bandwidth allocation by device. You need to specify for each
          device its path and the bandwidth allocation (weight).
        </FormHelperText>
        <WeightDeviceInput
          value={content.weight_device}
          onChange={(latest) => {
            update((draft) => {
              draft.weight_device = latest;
            });
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Device Read B/s</FormLabel>
        <FormHelperText mb={2}>
          Fine-tune read bytes per second on the device. You need to specify for
          each device its path and the rate allocation (expressed in b, kb, mb
          or gb).
        </FormHelperText>
        <DeviceReadOrWriteBpsInput
          value={content.device_read_bps}
          onChange={(latest) => {
            update((draft) => {
              draft.device_read_bps = latest;
            });
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Device Write B/s</FormLabel>
        <FormHelperText mb={2}>
          Fine-tune read bytes per second on the device. You need to specify for
          each device its path and the rate allocation (expressed in b, kb, mb
          or gb).
        </FormHelperText>
        <DeviceReadOrWriteBpsInput
          value={content.device_write_bps}
          onChange={(latest) => {
            update((draft) => {
              draft.device_write_bps = latest;
            });
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Device Read IO/s</FormLabel>
        <FormHelperText mb={2}>
          Fine-tune the number of read operations per second on the device. You
          need to specify for each device a path and the rate allocation
          (numeric value).
        </FormHelperText>
        <DeviceReadOrWriteIopsInput
          value={content.device_read_iops}
          onChange={(latest) => {
            update((draft) => {
              draft.device_read_iops = latest;
            });
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Device Write IO/s </FormLabel>
        <FormHelperText mb={2}>
          Fine-tune the number of write operations per second on the device. You
          need to specify for each device a path and the rate allocation
          (numeric value).
        </FormHelperText>
        <DeviceReadOrWriteIopsInput
          value={content.device_write_iops}
          onChange={(latest) => {
            update((draft) => {
              draft.device_write_iops = latest;
            });
          }}
        />
      </FormControl>
    </VStack>
  );
}
