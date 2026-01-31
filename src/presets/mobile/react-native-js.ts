import type { FsGuardConfig } from "../../types";

export const reactNativeJsPreset: FsGuardConfig = {
  root: "src",
  rules: {
    "screens": ["*.jsx"],
    "components": ["*.jsx"],
    "navigation": ["*.jsx"],
    "hooks": ["use*.js"],
    "services": ["*.js"],
    "utils": ["*.js"],
    "contexts": ["*.jsx"],
    "assets": "*",
  },
  ignore: ["node_modules", ".git", "android", "ios", "__tests__"],
};
