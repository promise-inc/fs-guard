import type { FsGuardConfig } from "../../types";

export const nextjsPreset: FsGuardConfig = {
  root: "src",
  rules: {
    "app": {
      required: ["layout.tsx", "page.tsx"],
    },
    "app/api": "*",
    "components": ["*.tsx"],
    "hooks": ["use*.ts"],
    "services": ["*.ts"],
    "utils": ["*.ts"],
    "types": ["*.ts"],
    "lib": ["*.ts"],
  },
  ignore: ["node_modules", ".next", ".git", "public"],
};
