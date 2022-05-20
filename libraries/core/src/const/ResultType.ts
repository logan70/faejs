/**
 * Result type.
 */
export enum ResultType {
  json = 'json',
  jsonp = 'jsonp',
  stream = 'stream',
  download = 'download',
  redirect = 'redirect',
  render = 'render',
}

export const defaultType = ResultType.json
