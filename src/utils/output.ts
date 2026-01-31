import type { Violation } from "../types";

const COLORS = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  dim: "\x1b[2m",
  bold: "\x1b[1m",
  reset: "\x1b[0m",
};

export function printViolation(violation: Violation): void {
  const icon = "✖";
  console.log(`  ${COLORS.red}${icon}${COLORS.reset} ${violation.message}`);
}

export function printSuccess(path: string): void {
  console.log(`  ${COLORS.green}✔${COLORS.reset} ${path}`);
}

export function printHeader(): void {
  console.log();
  console.log(`${COLORS.cyan}${COLORS.bold}fs-guard${COLORS.reset}`);
  console.log();
}

export function printSummary(
  violations: number,
  checked: number,
  passed: boolean
): void {
  console.log();
  if (passed) {
    console.log(
      `  ${COLORS.green}${COLORS.bold}✔ All ${checked} paths passed${COLORS.reset}`
    );
  } else {
    console.log(
      `  ${COLORS.red}${COLORS.bold}✖ ${violations} violation${violations === 1 ? "" : "s"} found${COLORS.reset} ${COLORS.dim}(${checked} paths checked)${COLORS.reset}`
    );
  }
  console.log();
}
