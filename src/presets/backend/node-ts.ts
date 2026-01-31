import type { FsGuardConfig } from "../../types";

export const nodeTsPreset: FsGuardConfig = {
  root: "src",
  rules: {
    ".": {
      required: ["index.ts"],
    },
    "routes": ["*.ts"],
    "controllers": ["*.controller.ts"],
    "services": ["*.service.ts"],
    "middlewares": ["*.middleware.ts"],
    "utils": ["*.ts"],
    "types": ["*.ts"],
  },
  ignore: ["node_modules", "dist", ".git"],
};
