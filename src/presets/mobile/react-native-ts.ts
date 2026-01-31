import type { FsGuardConfig } from "../../types";

export const reactNativeTsPreset: FsGuardConfig = {
  root: "src",
  rules: {
    "screens": ["*.tsx"],
    "components": ["*.tsx"],
    "navigation": ["*.tsx"],
    "hooks": ["use*.ts"],
    "services": ["*.ts"],
    "utils": ["*.ts"],
    "types": ["*.ts"],
    "contexts": ["*.tsx"],
    "assets": "*",
  },
  ignore: ["node_modules", ".git", "android", "ios", "__tests__"],
};
