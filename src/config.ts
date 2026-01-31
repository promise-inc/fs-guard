import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { presets, presetNames } from "./presets/registry";
import type { FsGuardConfig } from "./types";

const CONFIG_FILES = [
  "fs-guard.config.ts",
  "fs-guard.config.js",
  "fs-guard.config.json",
];

export function resolvePreset(presetName: string): FsGuardConfig {
  const config = presets[presetName];

  if (!config) {
    throw new Error(
      `Unknown preset: "${presetName}". Available presets: ${presetNames.join(", ")}`
    );
  }

  return config;
}

export function mergeWithPreset(config: FsGuardConfig): FsGuardConfig {
  if (!config.preset) return config;

  const base = resolvePreset(config.preset);

  return {
    root: config.root ?? base.root,
    rules: { ...base.rules, ...config.rules },
    ignore: config.ignore ?? base.ignore,
  };
}

export async function loadConfig(
  cwd: string,
  presetOverride?: string
): Promise<FsGuardConfig> {
  if (presetOverride) {
    return resolvePreset(presetOverride);
  }

  for (const file of CONFIG_FILES) {
    const configPath = join(cwd, file);
    try {
      if (file.endsWith(".json")) {
        const content = await readFile(configPath, "utf-8");
        const config = JSON.parse(content) as FsGuardConfig;
        return mergeWithPreset(config);
      }

      const imported = await import(configPath);
      const config = (imported.default ?? imported) as FsGuardConfig;
      return mergeWithPreset(config);
    } catch {
      continue;
    }
  }

  try {
    const pkgPath = join(cwd, "package.json");
    const content = await readFile(pkgPath, "utf-8");
    const pkg = JSON.parse(content) as Record<string, unknown>;

    if (pkg["fs-guard"]) {
      const config = pkg["fs-guard"] as FsGuardConfig;
      return mergeWithPreset(config);
    }
  } catch {
    // no package.json config
  }

  throw new Error(
    `No fs-guard config found. Create fs-guard.config.ts, fs-guard.config.json, add "fs-guard" to package.json, or use --preset (${presetNames.join(", ")}).`
  );
}
