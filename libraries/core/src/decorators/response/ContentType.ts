import { Header } from './Header'

/**
 * Request method Decorator.  Sets response Content-Type.
 *
 * @param contentType content type
 *
 * Example:
 *
 * ```ts
 * @ContentType('text/csv')
 * ```
 */
export function ContentType(contentType: string): MethodDecorator {
  return Header('Content-type', contentType)
}
