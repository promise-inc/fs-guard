export function matchPattern(fileName: string, pattern: string): boolean {
  if (pattern === "*") return true;

  const regex = patternToRegex(pattern);
  return regex.test(fileName);
}

function patternToRegex(pattern: string): RegExp {
  const escaped = pattern
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replace(/\*/g, ".*");

  return new RegExp(`^${escaped}$`);
}

export function isWildcard(pattern: string): boolean {
  return pattern.includes("*");
}
