import { isConstructor, isFunction, isNil } from '../utils/typeof'

type ScannerCallback<R> = (methodName: string) => R
type ScannerFilter = (prototype: object, prop: string) => boolean

const isMethod = (prototype: object, prop: string) =>
  !isConstructor(prop) && isFunction((prototype as any)[prop])

export class MetadataScanner {
  scanMethodsFromPrototype<R = any>(
    prototype: object,
    callback: ScannerCallback<R>
  ): R[] {
    return this.scanFromPrototype<R>(prototype, callback, isMethod)
  }

  scanMethodsFromInstance<T extends object = object, R = any>(
    instance: T,
    callback: ScannerCallback<R>
  ): R[] {
    const prototype = Object.getPrototypeOf(instance)
    return this.scanFromPrototype<R>(prototype, callback, isMethod)
  }

  scanMethodsFromConstructor<R = any>(
    constructor: Function,
    callback: ScannerCallback<R>
  ): R[] {
    const { prototype } = constructor
    return this.scanFromPrototype<R>(prototype, callback, isMethod)
  }

  private scanFromPrototype<R = any>(
    prototype: object,
    callback: ScannerCallback<R>,
    filter?: ScannerFilter
  ): R[] {
    if (!prototype) {
      return []
    }

    let methodsNames = Object.getOwnPropertyNames(prototype)

    if (isFunction(filter)) {
      methodsNames = methodsNames.filter(name => filter(prototype, name))
    }
    return methodsNames.map(callback).filter(metadata => !isNil(metadata))
  }
}
