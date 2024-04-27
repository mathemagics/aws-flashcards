export async function parseResponse<T>(response: Response): Promise<T> {
  const buffer = await response.arrayBuffer();
  const uint8Array = new Uint8Array(buffer);
  const textDecoder = new TextDecoder();
  const jsonStr = textDecoder.decode(uint8Array);
  return JSON.parse(jsonStr) as T;
}
