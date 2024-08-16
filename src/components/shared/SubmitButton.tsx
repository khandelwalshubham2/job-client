import { LoaderCircle } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  isLoading: boolean;
  buttonText: string;
  fullWidth?: boolean;
};

const SubmitButton = ({ isLoading, buttonText, fullWidth = true }: Props) => {
  return (
    <Button
      type="submit"
      className={`disabled:opacity-[0.6] cursor-pointer disabled:cursor-not-allowed ${
        fullWidth ? "w-full" : ""
      }`}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="flex items-center">
          <LoaderCircle className="animate-spin mr-2" />
          Loading
        </span>
      ) : (
        <span>{buttonText}</span>
      )}
    </Button>
  );
};

export default SubmitButton;
