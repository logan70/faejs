import { ParamType } from '../../const/ParamType'
import { ParamFactory } from '../../decorators/params/createParamDecorator'
import { ParamOptions } from '../../interfaces/ParamOptions'

/**
 * Controller metadata used to storage information about registered parameters.
 */
export interface ParamMetadataArgs {
  /**
   * Indicates object which is used by this parameter.
   */
  target: Function

  /**
   * Parameter object.
   */
  controllerInstance: any

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
   * Param-specific options.
   */
  options?: ParamOptions

  /**
   * Custom param factory.
   */
  factory?: ParamFactory
}
