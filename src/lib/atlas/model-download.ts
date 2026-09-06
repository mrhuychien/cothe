/**
 * Mã lỗi của trình tải hình học. Trang /atlas dịch mã này sang tiếng Việt hoặc
 * tiếng Anh, nên phần render không tự nhúng chuỗi hiển thị.
 */
export type AtlasErrorCode =
  | 'catalogue'
  | 'chunk-fetch'
  | 'chunk-incomplete'
  | 'no-decompression'
  | 'assemble'
  | 'webgl'
  | 'context-lost'
  | 'unknown';

export class AtlasError extends Error {
  code: AtlasErrorCode;
  constructor(code: AtlasErrorCode) {
    super(code);
    this.name = 'AtlasError';
    this.code = code;
  }
}

export function errorCode(error: unknown): AtlasErrorCode {
  return error instanceof AtlasError ? error.code : 'unknown';
}

/**
 * Máy chủ tĩnh có thể trả tệp .gz dưới dạng phản hồi đã nén (kèm
 * Content-Encoding) hoặc dưới dạng tệp gzip thô. `fetch` tự giải mã trường hợp
 * đầu, nên phải soi 2 byte đầu payload để không giải nén hai lần.
 *
 * Port từ https://github.com/ashemag/human-atlas (MIT).
 */
export async function decodeModelResponse(
  response: Response,
  expectedBytes: number
): Promise<ArrayBuffer> {
  if (!response.ok) throw new AtlasError('chunk-fetch');

  const payload = await response.arrayBuffer();
  const signature = new Uint8Array(payload, 0, Math.min(2, payload.byteLength));
  const stillCompressed = signature[0] === 0x1f && signature[1] === 0x8b;

  if (stillCompressed && typeof DecompressionStream === 'undefined') {
    throw new AtlasError('no-decompression');
  }

  const buffer = stillCompressed
    ? await new Response(
        new Blob([payload]).stream().pipeThrough(new DecompressionStream('gzip'))
      ).arrayBuffer()
    : payload;

  if (buffer.byteLength !== expectedBytes) throw new AtlasError('chunk-incomplete');
  return buffer;
}
