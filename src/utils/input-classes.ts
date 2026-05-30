import {
  INPUT_BASE_CLASSES,
  INPUT_BORDER_DEFAULT,
  INPUT_BORDER_ERROR,
  INPUT_DISABLED_CLASSES,
  TEXTAREA_BASE_CLASSES,
} from "@/constants/input.constants";

export function getInputClassName(
  hasError: boolean,
  disabled: boolean,
  className = "",
): string {
  const border = hasError ? INPUT_BORDER_ERROR : INPUT_BORDER_DEFAULT;
  const disabledClass = disabled ? INPUT_DISABLED_CLASSES : "";
  return `${INPUT_BASE_CLASSES} ${border} ${disabledClass} ${className}`.trim();
}

export function getTextareaClassName(
  hasError: boolean,
  disabled: boolean,
  className = "",
): string {
  const border = hasError ? INPUT_BORDER_ERROR : INPUT_BORDER_DEFAULT;
  const disabledClass = disabled ? INPUT_DISABLED_CLASSES : "";
  return `${TEXTAREA_BASE_CLASSES} ${border} ${disabledClass} ${className}`.trim();
}
