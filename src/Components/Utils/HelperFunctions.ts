export function extractDate(dateString: string): string {
  const regex = /^\d{4}-\d{2}-\d{2}/;
  const match = dateString.match(regex);
  if (match) {
    return match[0];
  }
  throw new Error("Invalid ISO 8601 date string");
}