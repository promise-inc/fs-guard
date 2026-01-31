import type { FsGuardConfig } from "../../types";

export const reactJsPreset: FsGuardConfig = {
  root: "src",
  rules: {
    ".": {
      required: ["App.jsx"],
    },
    "components": ["*.jsx"],
    "pages": ["*.jsx"],
    "hooks": ["use*.js"],
    "services": ["*.js"],
    "utils": ["*.js"],
    "contexts": ["*.jsx"],
  },
  ignore: ["node_modules", "dist", "build", ".git"],
};
