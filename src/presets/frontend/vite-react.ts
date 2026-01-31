import type { FsGuardConfig } from "../../types";

export const viteReactPreset: FsGuardConfig = {
  root: "src",
  rules: {
    ".": {
      required: ["main.tsx", "App.tsx"],
    },
    "components": ["*.tsx"],
    "pages": ["*.tsx"],
    "hooks": ["use*.ts"],
    "services": ["*.ts"],
    "utils": ["*.ts"],
    "types": ["*.ts"],
    "routes": ["*.tsx"],
  },
  ignore: ["node_modules", "dist", ".git", "public"],
};
