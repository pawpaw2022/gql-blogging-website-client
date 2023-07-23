/** @format */

import { Alert as Al, AlertIcon } from "@chakra-ui/react";

interface IAlertProps {
  status: "error" | "success" | "warning" | "info";
  message: string;
}

export default function Alert({ status, message }: IAlertProps) {
  return (
    <Al status={status}>
      <AlertIcon />
      {message}
    </Al>
  );
}
