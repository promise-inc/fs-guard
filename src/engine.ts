import { readdir, stat } from "node:fs/promises";
import { join, resolve } from "node:path";
import type {
  FsGuardConfig,
  FsGuardRule,
  RuleValue,
  ValidationResult,
  Violation,
} from "./types";
import { isWildcard, matchPattern } from "./utils/matcher";

export async function validate(config: FsGuardConfig): Promise<ValidationResult> {
  const violations: Violation[] = [];
  const checked: string[] = [];
  const rootPath = resolve(config.root);
  const ignore = config.ignore ?? ["node_modules", "dist", ".git"];

  for (const [dir, rule] of Object.entries(config.rules)) {
    const dirPath = join(rootPath, dir);
    const dirExists = await pathExists(dirPath);

    if (!dirExists) {
      violations.push({
        type: "missing-dir",
        path: dirPath,
        message: `Missing directory: ${join(config.root, dir)}`,
      });
      checked.push(join(config.root, dir));
      continue;
    }

    const normalized = normalizeRule(rule);
    const dirViolations = await validateDirectory(
      dirPath,
      normalized,
      config.root,
      dir,
      ignore
    );

    violations.push(...dirViolations.violations);
    checked.push(...dirViolations.checked);
  }

  return {
    passed: violations.length === 0,
    violations,
    checked,
  };
}

function normalizeRule(rule: RuleValue): FsGuardRule {
  if (typeof rule === "string") {
    if (rule === "*") {
      return { pattern: "*" };
    }
    return { required: [rule] };
  }

  if (Array.isArray(rule)) {
    const required: string[] = [];
    let pattern: string | undefined;

    for (const item of rule) {
      if (isWildcard(item)) {
        pattern = item;
      } else {
        required.push(item);
      }
    }

    return { required, pattern };
  }

  return rule;
}

async function validateDirectory(
  dirPath: string,
  rule: FsGuardRule,
  root: string,
  dirName: string,
  ignore: string[]
): Promise<{ violations: Violation[]; checked: string[] }> {
  const violations: Violation[] = [];
  const checked: string[] = [];

  checked.push(join(root, dirName));

  if (rule.required) {
    for (const fileName of rule.required) {
      const filePath = join(dirPath, fileName);
      const exists = await pathExists(filePath);

      if (!exists) {
        violations.push({
          type: "missing-file",
          path: filePath,
          message: `Missing file: ${join(root, dirName, fileName)}`,
        });
      }
      checked.push(join(root, dirName, fileName));
    }
  }

  if (rule.pattern) {
    const entries = await readdir(dirPath);

    for (const entry of entries) {
      if (ignore.includes(entry)) continue;

      const entryPath = join(dirPath, entry);
      const entryStat = await stat(entryPath);

      if (entryStat.isFile() && !matchPattern(entry, rule.pattern)) {
        violations.push({
          type: "invalid-name",
          path: entryPath,
          message: `Invalid file name: ${join(root, dirName, entry)} (expected pattern: ${rule.pattern})`,
        });
      }

      checked.push(join(root, dirName, entry));
    }
  }

  if (rule.maxDepth !== undefined) {
    const depthViolations = await checkDepth(
      dirPath,
      rule.maxDepth,
      0,
      root,
      dirName,
      ignore
    );
    violations.push(...depthViolations);
  }

  return { violations, checked };
}

async function checkDepth(
  dirPath: string,
  maxDepth: number,
  currentDepth: number,
  root: string,
  dirName: string,
  ignore: string[]
): Promise<Violation[]> {
  if (currentDepth > maxDepth) {
    return [
      {
        type: "max-depth",
        path: dirPath,
        message: `Max depth exceeded: ${dirPath} (max: ${maxDepth})`,
      },
    ];
  }

  const violations: Violation[] = [];
  const entries = await readdir(dirPath);

  for (const entry of entries) {
    if (ignore.includes(entry)) continue;

    const entryPath = join(dirPath, entry);
    const entryStat = await stat(entryPath);

    if (entryStat.isDirectory()) {
      const nested = await checkDepth(
        entryPath,
        maxDepth,
        currentDepth + 1,
        root,
        dirName,
        ignore
      );
      violations.push(...nested);
    }
  }

  return violations;
}

async function pathExists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}
