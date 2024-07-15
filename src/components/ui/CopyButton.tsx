import { useClipboard } from "@mantine/hooks";
import { Check } from "lucide-react";
import { ButtonProps } from "react-aria-components";

import { cn } from "../../lib/utils";

import { Button } from "./button";

interface ICopyButtonProps extends ButtonProps {
  stringToCopy: string;

  onClick?: () => void;
}

const CopyButton = ({
  stringToCopy,

  onClick,

  ...props
}: ICopyButtonProps): JSX.Element => {
  const clipboard = useClipboard({ timeout: 1000 });

  const onCopyButtonClick = (): void => {
    clipboard.copy(stringToCopy);

    onClick?.();
  };

  return (
    <Button
      onPress={onCopyButtonClick}
      type="button"
      variant="default"
      size="sm"
      className={cn({
        "bg-green-500 hover:bg-green-500": clipboard.copied,
      })}
      {...props}
    >
      {clipboard.copied ? (
        <div className="flex flex-row items-center gap-2">
          Copied <Check className="h-4 w-4" />
        </div>
      ) : (
        "Copy"
      )}
    </Button>
  );
};

export default CopyButton;
