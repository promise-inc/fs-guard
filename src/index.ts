export { validate as fsGuard } from "./engine";
export { validate } from "./engine";
export { loadConfig, resolvePreset, mergeWithPreset } from "./config";
export {
  presets,
  presetNames,
} from "./presets/registry";
export type {
  PresetName,
} from "./presets/registry";
export type {
  FsGuardConfig,
  FsGuardRule,
  RuleValue,
  ValidationResult,
  Violation,
} from "./types";
