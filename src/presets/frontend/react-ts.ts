import type { FsGuardConfig } from "../../types";

export const reactTsPreset: FsGuardConfig = {
  root: "src",
  rules: {
    ".": {
      required: ["App.tsx"],
    },
    "components": ["*.tsx"],
    "pages": ["*.tsx"],
    "hooks": ["use*.ts"],
    "services": ["*.ts"],
    "utils": ["*.ts"],
    "types": ["*.ts"],
    "contexts": ["*.tsx"],
  },
  ignore: ["node_modules", "dist", "build", ".git"],
};
