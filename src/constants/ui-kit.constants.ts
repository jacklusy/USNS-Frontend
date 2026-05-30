export const UI_KIT_COPY = {
  title: "UI component kit",
  description:
    "Development showcase for shared form primitives, selects, and the enterprise DataTable.",
  formsTitle: "Form primitives",
  selectsTitle: "Select components",
  tableTitle: "Data table",
  tableClientLabel: "Client mode",
  tableServerLabel: "Server pagination mode",
  buttonsTitle: "Buttons",
  badgesTitle: "Badges and status",
  toastsTitle: "Toast notifications",
  overlaysTitle: "Overlays",
  datesTitle: "Date pickers",
  modalDemoTitle: "Example modal",
  modalDemoBody: "Modal body slot for forms or read-only content.",
  drawerDemoTitle: "Example drawer",
  drawerDemoBody: "Drawer slides in from the right for detail panels.",
  confirmDemoTitle: "Delete user?",
  confirmDemoDescription:
    "This action cannot be undone. The user will lose access immediately.",
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
