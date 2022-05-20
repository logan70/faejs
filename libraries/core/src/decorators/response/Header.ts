import { SymbolKeysNotSupportedError } from '../..'
import { getMetadataStorage } from '../../metadata/getMetadataStorage'

/**
 * Request method Decorator.  Sets a response header.
 *
 * @param name string to be used for header name
 * @param value string to be used for header value
 *
 * Example:
 *
 * ```ts
 * @Header('Cache-Control', 'none')
 * ```
 */
export function Header(name: string, value: string): MethodDecorator {
  return (instance, methodName, _descriptor) => {
    if (typeof methodName === 'symbol') {
      throw new SymbolKeysNotSupportedError()
    }
    const target = instance.constructor
    getMetadataStorage().collectResultMetadata(target, methodName, {
      target,
      methodName,
      headers: {
        [name]: value,
      },
    })
  }
}
