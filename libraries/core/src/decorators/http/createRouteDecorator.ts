import { getMetadataStorage } from '../../metadata/getMetadataStorage'
import { SymbolKeysNotSupportedError } from '../../errors/SymbolKeysNotSupportedError'
import { RequestMethod } from '../../const/RequestMethod'
import { RouteOptions } from '../../interfaces/RouteOptions'

/**
 * @private
 * Create route decorator
 */
export function createRouteDecorator(requestMethod: RequestMethod) {
  return (route?: string | RegExp, options?: RouteOptions): MethodDecorator =>
    (instance, propertyKey, _descriptor) => {
      if (typeof propertyKey === 'symbol') {
        throw new SymbolKeysNotSupportedError()
      }
      const target = instance.constructor
      return getMetadataStorage().collectRouteMetadata(target, propertyKey, {
        route,
        target,
        methodName: propertyKey,
        requestMethod,
        options,
      })
    }
}
