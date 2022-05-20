import { extendArrayMetadata, extendObjectMetadata } from '../utils/metadata'
import {
  CONTROLLER_METADATA,
  PARAM_METADATA,
  RESULT_METADATA,
  ROUTE_METADATA,
} from '../const/metadataKey'
import { ensureReflectMetadataExists } from '../utils/reflect'
import { ControllerMetadataArgs } from './ControllerMetadata'
import { ParamMetadataArgs } from './ParamMetadata'
import { RouteMetadataArgs } from './RouteMetadata'
import { MetadataScanner } from './MetadataScanner'
import { ResultMetadataArgs } from './ResultMetadata'

export const HANDLER_METADATA_SYMBOL = Symbol.for('handler_metadata:cache')

export class MetadataStorage {
  // private readonly [HANDLER_METADATA_SYMBOL] = new Map<string, ControllerMetadata>();
  readonly metadataScanner: MetadataScanner = new MetadataScanner()

  constructor() {
    ensureReflectMetadataExists()
  }

  collectControllerMetadata(
    target: Function,
    definition: ControllerMetadataArgs
  ) {
    Reflect.defineMetadata(CONTROLLER_METADATA, definition, target)
  }

  reflectControllerMetadata(
    classes: Function[] = []
  ): ControllerMetadataArgs[] {
    return classes.map(target =>
      Reflect.getMetadata(CONTROLLER_METADATA, target)
    )
  }

  collectRouteMetadata(
    target: Function,
    methodName: string,
    definition: RouteMetadataArgs
  ) {
    extendArrayMetadata({
      key: ROUTE_METADATA,
      metadata: [definition],
      target,
      propertyKey: methodName,
    })
  }

  reflectRouteMetadatas(target: Function): RouteMetadataArgs[] {
    return this.metadataScanner
      .scanMethodsFromConstructor<RouteMetadataArgs[]>(target, methodName =>
        Reflect.getMetadata(ROUTE_METADATA, target, methodName)
      )
      .flat(1)
  }

  collectParamMetadata(
    target: Function,
    methodName: string,
    definition: ParamMetadataArgs
  ) {
    extendArrayMetadata({
      key: PARAM_METADATA,
      metadata: [definition],
      target,
      propertyKey: methodName,
    })
  }

  reflectParamMetadatas(
    target: Function,
    methodName: string
  ): ParamMetadataArgs[] {
    return Reflect.getMetadata(PARAM_METADATA, target, methodName) || []
  }

  collectResultMetadata(
    target: Function,
    methodName: string,
    definition: ResultMetadataArgs
  ) {
    extendObjectMetadata({
      key: RESULT_METADATA,
      metadata: definition,
      target,
      propertyKey: methodName,
      deepMerge: true,
    })
  }

  reflectResultMetadata(
    target: Function,
    methodName: string
  ): ResultMetadataArgs {
    return Reflect.getMetadata(RESULT_METADATA, target, methodName) || {}
  }
}
