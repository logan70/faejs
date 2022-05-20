import { ReflectMetadataMissingError } from '../errors/ReflectMetadataMissingError'

export function ensureReflectMetadataExists() {
  if (
    typeof Reflect !== 'object' ||
    typeof Reflect.decorate !== 'function' ||
    typeof Reflect.metadata !== 'function'
  ) {
    throw new ReflectMetadataMissingError()
  }
}
