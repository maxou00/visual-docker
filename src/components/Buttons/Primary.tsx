import { Button, ButtonProps } from "@chakra-ui/react";

export function PrimaryButton(props: ButtonProps) {
  return (
    <Button
      rounded="full"
      size="sm"
      bg="primary.400"
      _hover={{
        bg: "primary.500",
      }}
      fontFamily="heading"
      {...props}
    >
      {props.children}
    </Button>
  );
}
