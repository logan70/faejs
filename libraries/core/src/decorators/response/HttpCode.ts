import { SymbolKeysNotSupportedError } from '../..'
import { HttpStatus } from '../../const/HttpStatus'
import { getMetadataStorage } from '../../metadata/getMetadataStorage'

/**
 * Request method Decorator.  Defines the HTTP response status code.
 *
 * @param statusCode HTTP response code to be returned by route handler.
 *
 * Example:
 *
 * ```js
 * @HttpCode(204)
 * ```
 */
export function HttpCode(statusCode: HttpStatus): MethodDecorator {
  return (instance, methodName, _descriptor) => {
    if (typeof methodName === 'symbol') {
      throw new SymbolKeysNotSupportedError()
    }
    const target = instance.constructor
    getMetadataStorage().collectResultMetadata(target, methodName, {
      target,
      methodName,
      statusCode,
    })
  }
}
