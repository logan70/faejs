import { getMetadataStorage } from '../../metadata/getMetadataStorage'
import { SymbolKeysNotSupportedError } from '../../errors/SymbolKeysNotSupportedError'
import { FaeRequestContext } from '../../application/context'
import { ParamType } from '../../const/ParamType'
import { isFunction, isString } from '../../utils/typeof'

export type ParamFactory<
  CustomArgs extends Array<any> = Array<any>,
  Output = any
> = (reqContext: FaeRequestContext, ...customArgs: CustomArgs) => Output

/**
 * Create custom parameter decorator
 *
 * Example to create a @User() decorator.
 *
 * ```ts
 * export const User = createParamDecorator<[]>((reqContext) => {
 *   return reqContext.context?.user
 * })
 * ```
 *
 * Example to create a @User(prop) decorator,
 * the behavior of your decorator depends on the `property` parameter.
 *
 *
 * ```ts
 * export const User = createParamDecorator<[string]>((reqContext, key) => {
 *   const user = reqContext.context?.user
 *   return key ? user?.[key] : user
 * })
 * ```
 *
 * Example to create a decorator with several parameters
 *
 *
 * ```ts
 * export const User = createParamDecorator<[string, boolean?]>((reqContext, key, trim = true) => {
 *   const prop = reqContext.context?.user?.[key]
 *   return trim ? prop?.trim() : key
 * })
 * ```
 */

export function createParamDecorator<
  CustomArgs extends Array<any> = Array<any>,
  Output = any
>(
  factory: ParamFactory<CustomArgs, Output>
): (...customArgs: CustomArgs) => ParameterDecorator

/**
 * @private create internal param decorator
 * @param type param type
 */
export function createParamDecorator<
  CustomArgs extends Array<any> = Array<any>
>(type: ParamType): (...customArgs: CustomArgs) => ParameterDecorator

export function createParamDecorator<
  CustomArgs extends Array<any> = Array<any>,
  Output = any
>(factoryOrType: ParamFactory<CustomArgs, Output> | ParamType) {
  return (...customArgs: CustomArgs): ParameterDecorator =>
    (instance, propertyKey, index) => {
      if (typeof propertyKey === 'symbol') {
        throw new SymbolKeysNotSupportedError()
      }

      const type =
        isString(factoryOrType) && ParamType[factoryOrType]
          ? factoryOrType
          : ParamType.custom
      const factory = isFunction(factoryOrType) ? factoryOrType : undefined

      const target = instance.constructor
      getMetadataStorage().collectParamMetadata(target, propertyKey, {
        target,
        controllerInstance: instance,
        methodName: propertyKey,
        index,
        type,
        factory: factory as ParamFactory,
        customArgs,
      })
    }
}
