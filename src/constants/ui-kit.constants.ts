export const UI_KIT_COPY = {
  title: "UI component kit",
  description:
    "Development showcase for shared form primitives, selects, and the enterprise DataTable.",
  formsTitle: "Form primitives",
  selectsTitle: "Select components",
  tableTitle: "Data table",
  tableClientLabel: "Client mode",
  tableServerLabel: "Server pagination mode",
} as const;

export const UI_KIT_ROLE_OPTIONS = [
  { label: "President", value: "president" },
  { label: "Dean", value: "dean" },
  { label: "DBA", value: "dba" },
  { label: "Admin", value: "admin" },
  { label: "Faculty", value: "faculty" },
  { label: "Staff", value: "staff" },
] as const;

export const UI_KIT_DEPARTMENT_OPTIONS = [
  { label: "Executive", value: "executive" },
  { label: "Engineering", value: "engineering" },
  { label: "IT", value: "it" },
  { label: "Registrar", value: "registrar" },
  { label: "Finance", value: "finance" },
] as const;
