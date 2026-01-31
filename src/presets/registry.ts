import type { FsGuardConfig } from "../types";
import { nestjsPreset } from "./backend/nestjs";
import { nodeTsPreset } from "./backend/node-ts";
import { nodeJsPreset } from "./backend/node-js";
import { reactTsPreset } from "./frontend/react-ts";
import { reactJsPreset } from "./frontend/react-js";
import { nextjsPreset } from "./frontend/nextjs";
import { viteReactPreset } from "./frontend/vite-react";
import { reactNativeTsPreset } from "./mobile/react-native-ts";
import { reactNativeJsPreset } from "./mobile/react-native-js";
import { expoPreset } from "./mobile/expo";

export const presets: Record<string, FsGuardConfig> = {
  "nestjs": nestjsPreset,
  "node-ts": nodeTsPreset,
  "node-js": nodeJsPreset,
  "react-ts": reactTsPreset,
  "react-js": reactJsPreset,
  "nextjs": nextjsPreset,
  "vite-react": viteReactPreset,
  "react-native-ts": reactNativeTsPreset,
  "react-native-js": reactNativeJsPreset,
  "expo": expoPreset,
};

export type PresetName = keyof typeof presets;

export const presetNames = Object.keys(presets);
