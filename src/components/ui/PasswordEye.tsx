import { cn } from "cn";
import { CloseEye } from "../icon/CloseEye";
import { OpenEye } from "../icon/OpenEye";

interface PasswordEyeProps {
  className: string;
  isShowPass: boolean;
}
export const PasswordEye = ({ isShowPass, className }: PasswordEyeProps) => {
  return (
    <label
      className={cn("flex items-center justify-between", className)}
      htmlFor="show-pass"
    >
      <p>{isShowPass ? "HIDE" : "SHOW"} PASSWORD</p>

      {isShowPass ? (
        <OpenEye className="w-8 h-8" />
      ) : (
        <CloseEye className="w-8 h-8" />
      )}
    </label>
  );
};
