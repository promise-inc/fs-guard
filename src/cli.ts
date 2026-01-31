#!/usr/bin/env node

import { loadConfig } from "./config";
import { validate } from "./engine";
import { presetNames } from "./presets/registry";
import {
  printHeader,
  printSuccess,
  printSummary,
  printViolation,
} from "./utils/output";

function parseArgs(args: string[]): { preset?: string; help: boolean; list: boolean } {
  let preset: string | undefined;
  let help = false;
  let list = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "--preset" || arg === "-p") {
      preset = args[i + 1];
      i++;
    } else if (arg === "--help" || arg === "-h") {
      help = true;
    } else if (arg === "--list" || arg === "-l") {
      list = true;
    }
  }

  return { preset, help, list };
}

function printHelp(): void {
  console.log(`
  \x1b[1m\x1b[36mfs-guard\x1b[0m — Validate project folder and file structure

  \x1b[1mUsage:\x1b[0m
    npx fs-guard
    npx fs-guard --preset nestjs
    npx fs-guard --list

  \x1b[1mOptions:\x1b[0m
    -p, --preset <name>   Use a built-in preset
    -l, --list            List available presets
    -h, --help            Show this help message

  \x1b[1mPresets:\x1b[0m
    ${presetNames.join(", ")}

  \x1b[1mConfig files:\x1b[0m
    fs-guard.config.ts | fs-guard.config.js | fs-guard.config.json | package.json
`);
}

function printPresetList(): void {
  console.log(`\n  \x1b[1m\x1b[36mAvailable presets:\x1b[0m\n`);

  const groups: Record<string, string[]> = {
    "Backend": ["nestjs", "node-ts", "node-js"],
    "Frontend": ["react-ts", "react-js", "nextjs", "vite-react"],
    "Mobile": ["react-native-ts", "react-native-js", "expo"],
  };

  for (const [group, names] of Object.entries(groups)) {
    console.log(`  \x1b[1m${group}\x1b[0m`);
    for (const name of names) {
      console.log(`    \x1b[32m${name}\x1b[0m`);
    }
    console.log();
  }

  console.log(`  Usage: npx fs-guard --preset nestjs\n`);
}

async function main(): Promise<void> {
  const { preset, help, list } = parseArgs(process.argv.slice(2));

  if (help) {
    printHelp();
    return;
  }

  if (list) {
    printPresetList();
    return;
  }

  printHeader();

  try {
    const cwd = process.cwd();
    const config = await loadConfig(cwd, preset);
    const result = await validate(config);

    for (const violation of result.violations) {
      printViolation(violation);
    }

    const passedPaths = result.checked.filter(
      (path) => !result.violations.some((v) => v.path.endsWith(path) || v.message.includes(path))
    );

    for (const path of passedPaths) {
      printSuccess(path);
    }

    printSummary(result.violations.length, result.checked.length, result.passed);

    if (!result.passed) {
      process.exit(1);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`\n  \x1b[31m✖ ${message}\x1b[0m\n`);
    process.exit(2);
  }
}

main();
