/** @format */

type Props = {
  title: string;
  description: string;
  status: "success" | "error" | "warning" | "info";
  toast: any;
};

export const toastToast = ({ title, description, status, toast }: Props) => {
  toast({
    position: "top",
    title: title,
    description: description,
    status: status,
    duration: 9000, // 9 seconds
    isClosable: true,
  });
};
