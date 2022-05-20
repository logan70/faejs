export interface SendFileOptions {
  /** Browser cache max-age in milliseconds. (defaults to 0) */
  maxAge?: number
  /** Tell the browser the resource is immutable and can be cached indefinitely. (defaults to false) */
  immutable?: boolean
  /** Root directory to restrict file access. (defaults to '') */
  root?: string
  /** Object containing HTTP headers to serve with the file. */
  headers?: Record<string, string>
}
