import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useImmer } from "use-immer";
import { CpuConfig } from "../../../../types";

interface Props {
  value?: CpuConfig;
  onChange: (conf: CpuConfig) => any;
}
export function CpuConfigEditor(props: Props) {
  const [content, update] = useImmer<CpuConfig>({
    ...props.value,
  });

  return (
    <VStack w="full" alignItems="flex-start" spacing={4}>
      <VStack w="full" alignItems="flex-start" spacing={2}>
        <Text>CPU configurations</Text>
        <Text fontSize="sm">
          Here are listed configurations that defines how this service should
          use available computational unit.
        </Text>
        <Link href="https://docs.docker.com/compose/compose-file/#cpu_count">
          Learn more starting from here
        </Link>
      </VStack>
      <FormControl>
        <FormLabel>
          <Link href="https://docs.docker.com/compose/compose-file/#cpu_count">
            CPU count
          </Link>
        </FormLabel>
        <Input
          size="sm"
          value={content.cpu_count}
          type="number"
          onChange={(ev) => {
            update((draft) => {
              draft.cpu_count = ev.target.valueAsNumber;
            });
          }}
          variant="outline"
          placeholder=""
        />
        <FormHelperText>
          How much units are usable by this container.
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>
          <Link href="https://docs.docker.com/compose/compose-file/#cpu_percent">
            CPU percent
          </Link>
        </FormLabel>
        <Input
          size="sm"
          value={content.cpu_percent}
          type="number"
          onChange={(ev) => {
            update((draft) => {
              draft.cpu_percent = ev.target.valueAsNumber;
            });
          }}
          variant="outline"
          placeholder=""
        />
        <FormHelperText>
          Defines the usable percentage (of available cpus) by this container.
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>
          <Link href="https://docs.docker.com/compose/compose-file/#cpu_shares">
            CPU shares
          </Link>
        </FormLabel>
        <Input
          size="sm"
          value={content.cpu_shares}
          type="number"
          onChange={(ev) => {
            update((draft) => {
              draft.cpu_shares = ev.target.valueAsNumber;
            });
          }}
          variant="outline"
          placeholder=""
        />
        <FormHelperText>
          Defines service container relative CPU weight versus other containers.
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>
          <Link href="https://docs.docker.com/compose/compose-file/#cpu_period">
            CPU shares
          </Link>
        </FormLabel>
        <Input
          size="sm"
          value={content.cpu_period}
          type="number"
          onChange={(ev) => {
            update((draft) => {
              draft.cpu_period = ev.target.valueAsNumber;
            });
          }}
          variant="outline"
          placeholder=""
        />
      </FormControl>
      <FormControl>
        <FormLabel>
          <Link href="https://docs.docker.com/compose/compose-file/#cpu_quota">
            CPU quota
          </Link>
        </FormLabel>
        <Input
          size="sm"
          value={content.cpu_quota}
          type="number"
          onChange={(ev) => {
            update((draft) => {
              draft.cpu_quota = ev.target.valueAsNumber;
            });
          }}
          variant="outline"
          placeholder=""
        />
      </FormControl>
      <FormControl>
        <FormLabel>
          <Link href="https://docs.docker.com/compose/compose-file/#cpu_rt_runtime">
            CPU Realtime Runtime (cpu_rt_runtime)
          </Link>
        </FormLabel>
        <Input
          size="sm"
          value={content.cpu_rt_runtime}
          onChange={(ev) => {
            update((draft) => {
              draft.cpu_rt_runtime = ev.target.value;
            });
          }}
          variant="outline"
          placeholder=""
        />
      </FormControl>
      <FormControl>
        <FormLabel>
          <Link href="https://docs.docker.com/compose/compose-file/#cpu_rt_period">
            CPU Realtime Period (cpu_rt_period)
          </Link>
        </FormLabel>
        <Input
          size="sm"
          value={content.cpu_rt_period}
          onChange={(ev) => {
            update((draft) => {
              draft.cpu_rt_period = ev.target.value;
            });
          }}
          variant="outline"
          placeholder=""
        />
      </FormControl>
      <FormControl>
        <FormLabel>
          <Link href="https://docs.docker.com/compose/compose-file/#cpuset">
            CPU Set (cpuset)
          </Link>
        </FormLabel>
        <Input
          size="sm"
          value={content.cpuset}
          onChange={(ev) => {
            update((draft) => {
              draft.cpuset = ev.target.value;
            });
          }}
          variant="outline"
          placeholder=""
        />
      </FormControl>
    </VStack>
  );
}
