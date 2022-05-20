import { RouteMetadata } from '../RouteMetadata'
import { ParamType } from '../../const/ParamType'
import { ParamOptions } from '../../interfaces/ParamOptions'
import { ParamFactory } from '../../decorators/params/createParamDecorator'
import { ParamMetadataArgs } from './args'

/**
 * Parameter metadata.
 */
export class ParamMetadata {
  // -------------------------------------------------------------------------
  // Properties
  // -------------------------------------------------------------------------

  /**
   * Parameter's route.
   */
  routeMetadata: RouteMetadata

  /**
   * Object on which's method's parameter this parameter is attached.
   */
  object: any

  /**
   * Method on which's parameter is attached.
   */
  methodName: string

  /**
   * Index (# number) of the parameter in the method signature.
   */
  index: number

  /**
   * Parameter type.
   */
  type: ParamType

  /**
   * Custom param args.
   * e.g. in `@Query('id')`, args is ['id']
   */
  customArgs?: any[]

  /**
   * Parameter target.
   */
  target: any

  /**
   * Route-specific options.
   */
  options?: ParamOptions

  /**
   * Custom param factory.
   */
  factory?: ParamFactory

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor(routeMetadata: RouteMetadata, args: ParamMetadataArgs) {
    this.routeMetadata = routeMetadata

    this.target = args.controllerInstance.constructor
    this.methodName = args.methodName
    this.index = args.index
    this.type = args.type
    this.customArgs = args.customArgs
    this.options = args.options
    this.factory = args.factory
  }
}
