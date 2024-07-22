export default function nonnull<T>(
  array:
    | (T | null | undefined)[]
    | ReadonlyArray<T | null | undefined>
    | null
    | undefined
): T[] {
  if (!array) return [];
  return array.filter(Boolean) as T[];
}
