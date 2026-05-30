export interface SelectOption<TValue extends string = string> {
  label: string;
  value: TValue;
  disabled?: boolean;
}

export interface SelectOptionGroup<TValue extends string = string> {
  label: string;
  options: readonly SelectOption<TValue>[];
}
