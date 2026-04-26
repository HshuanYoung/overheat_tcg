export async function readJsonResponse<T = any>(response: Response): Promise<T | null> {
  const text = await response.text();

  if (!text.trim()) {
    return null;
  }

  return JSON.parse(text) as T;
}
