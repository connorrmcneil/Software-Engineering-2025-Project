/**
 * Converts a path to a backend API storage URL.
 * @param path
 * @returns url
 */
export const toStorageUrl = (path: string) => {
  return `${window.env?.API_URL ?? ''}/public/${path}`
}
