import { SymbolKeysNotSupportedError } from '../..'
import { AroundDefinition } from '../../interfaces/Around'
import { getMetadataStorage } from '../../metadata/getMetadataStorage'
import { genNewDescriptorWithAround } from '../../utils/around'
import { isAroundValid, validateEach } from '../../utils/validator'

const decoratorName = '@Around'
const decoratorItemName = 'around'

/**
 * AOP implement
 * can perform custom behavior before and after the route handler invocation
 *
 * Example:
 *
 * ```js
 * @Around(async (proceedPoint: IProceedJoinPoint) => {
 *    const { proceed, args } = proceedPoint
 *    console.log(args)
 *    const result = await proceed(...args)
 *    console.log(result)
 *    return result
 * })
 * ```
 */
export function Around(
  around: AroundDefinition
): MethodDecorator & ClassDecorator {
  return (
    target: any,
    key?: string | symbol,
    descriptor?: TypedPropertyDescriptor<any>
  ) => {
    if (typeof key === 'symbol') {
      throw new SymbolKeysNotSupportedError()
    }

    const isDecoratingMethod = Boolean(descriptor)
    const ctor = isDecoratingMethod ? target.constructor : target

    // validate around definition
    validateEach({
      context: ctor,
      arr: [around],
      validator: isAroundValid,
      decorator: decoratorName,
      itemName: decoratorItemName,
    })

    // for method, wrap the original method, return a new descriptor
    if (isDecoratingMethod) {
      const newDescriptor = genNewDescriptorWithAround(
        key!,
        descriptor!,
        around
      )
      return newDescriptor
    }

    // for class, wrap all the methods on it's prototype
    const methodKeys =
      getMetadataStorage().metadataScanner.scanMethodsFromConstructor<string>(
        target,
        methodKey => methodKey
      )

    methodKeys.forEach(methodKey => {
      const newDescriptor = genNewDescriptorWithAround(
        methodKey,
        Reflect.getOwnPropertyDescriptor(target.prototype, methodKey)!,
        around
      )
      Reflect.defineProperty(target.prototype, methodKey, newDescriptor)
    })
    return target
  }
}
