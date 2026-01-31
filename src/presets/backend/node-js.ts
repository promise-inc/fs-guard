import type { FsGuardConfig } from "../../types";

export const nodeJsPreset: FsGuardConfig = {
  root: "src",
  rules: {
    ".": {
      required: ["index.js"],
    },
    "routes": ["*.js"],
    "controllers": ["*.controller.js"],
    "services": ["*.service.js"],
    "middlewares": ["*.middleware.js"],
    "utils": ["*.js"],
  },
  ignore: ["node_modules", "dist", ".git"],
};
