const REQUIRED = "is required";

export function assertRequiredString(value: string | undefined, field: string): void {
  if (!value || !value.trim()) {
    throw new Error(`${field} ${REQUIRED}`);
  }
}

export function assertDateRange(startsAt: Date, endsAt: Date): void {
  if (endsAt <= startsAt) {
    throw new Error("endsAt must be greater than startsAt");
  }
}
