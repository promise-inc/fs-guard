export interface FsGuardRule {
  required?: string[];
  pattern?: string;
  maxDepth?: number;
}

export type RuleValue = string | string[] | FsGuardRule;

export interface FsGuardConfig {
  root: string;
  rules: Record<string, RuleValue>;
  ignore?: string[];
  preset?: string;
}

export interface Violation {
  type: "missing-dir" | "missing-file" | "invalid-name" | "max-depth";
  path: string;
  message: string;
}

export interface ValidationResult {
  passed: boolean;
  violations: Violation[];
  checked: string[];
}
