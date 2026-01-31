import type { FsGuardConfig } from "../../types";

export const expoPreset: FsGuardConfig = {
  root: "src",
  rules: {
    "screens": ["*.tsx"],
    "components": ["*.tsx"],
    "navigation": ["*.tsx"],
    "hooks": ["use*.ts"],
    "services": ["*.ts"],
    "utils": ["*.ts"],
    "types": ["*.ts"],
    "constants": ["*.ts"],
    "assets": "*",
  },
  ignore: ["node_modules", ".git", ".expo", "__tests__"],
};
