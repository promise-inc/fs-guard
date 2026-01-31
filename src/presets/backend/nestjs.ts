import type { FsGuardConfig } from "../../types";

export const nestjsPreset: FsGuardConfig = {
  root: "src",
  rules: {
    ".": {
      required: ["main.ts", "app.module.ts", "app.controller.ts", "app.service.ts"],
    },
    "common": "*",
    "common/decorators": ["*.decorator.ts"],
    "common/guards": ["*.guard.ts"],
    "common/interceptors": ["*.interceptor.ts"],
    "common/filters": ["*.filter.ts"],
    "common/pipes": ["*.pipe.ts"],
    "common/dto": ["*.dto.ts"],
  },
  ignore: ["node_modules", "dist", ".git", "test"],
};
