import { SymbolKeysNotSupportedError } from '../errors/SymbolKeysNotSupportedError'

export interface ExtendMetadataParams<T> {
  key: string
  metadata: T
  target: Object
  propertyKey?: string
}

export interface ExtendObjectMetadataParams<T> extends ExtendMetadataParams<T> {
  /**
   * Deep merge object or not. Default to false
   */
  deepMerge?: boolean
}

export function extendArrayMetadata<T extends Array<unknown>>({
  key,
  metadata,
  target,
  propertyKey,
}: ExtendMetadataParams<T>) {
  if (typeof propertyKey === 'symbol') {
    throw new SymbolKeysNotSupportedError()
  }
  const previousValue = propertyKey
    ? Reflect.getMetadata(key, target, propertyKey)
    : Reflect.getMetadata(key, target)
  const value = [...(previousValue || []), ...metadata]
  if (propertyKey) {
    Reflect.defineMetadata(key, value, target, propertyKey)
  } else {
    Reflect.defineMetadata(key, value, target)
  }
}

export function extendObjectMetadata<T extends object>({
  key,
  metadata,
  target,
  propertyKey,
  deepMerge,
}: ExtendObjectMetadataParams<T>) {
  if (typeof propertyKey === 'symbol') {
    throw new SymbolKeysNotSupportedError()
  }
  const previousValue = propertyKey
    ? Reflect.getMetadata(key, target, propertyKey)
    : Reflect.getMetadata(key, target)
  const value = deepMerge
    ? require('deepmerge')(previousValue, metadata)
    : {
        ...previousValue,
        ...metadata,
      }
  if (propertyKey) {
    Reflect.defineMetadata(key, value, target, propertyKey)
  } else {
    Reflect.defineMetadata(key, value, target)
  }
}
