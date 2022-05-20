import { Header } from './Header'

/**
 * Request method Decorator.  Sets Location header with given value to the response.
 *
 * @param url location url.
 *
 * Example:
 *
 * ```ts
 * @Location('http://github.com')
 * ```
 */
export function Location(url: string): MethodDecorator {
  return Header('Location', url)
}
