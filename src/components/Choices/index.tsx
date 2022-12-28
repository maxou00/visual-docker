import { Box, BoxProps } from "@chakra-ui/react";
import classNames from "classnames";
import { PropsWithChildren, useMemo } from "react";
import styles from "./index.module.scss";

interface Props<T = any> {
  value: T;
  current?: T;
  onSelect: (choice: T) => any;
}
export function Choice({
  box,
  ...props
}: PropsWithChildren<Props<any>> & { box?: Omit<BoxProps, "children"> }) {
  const selectionClx = useMemo(() => {
    return props.current === props.value
      ? styles.choice_selected
      : styles.choice_unselected;
  }, [props.current, props.value]);

  return (
    <Box
      {...box}
      className={classNames(selectionClx, box?.className || "")}
      onClick={() => props.onSelect(props.value)}
    >
      {props.children}
    </Box>
  );
}
