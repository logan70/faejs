import { ParamType } from '../../const/ParamType'
import { createParamDecorator } from './createParamDecorator'

/**
 * Route handler parameter decorator. Extracts the `Ip` property
 *
 * Example: `info(@Ip() ip: string)`
 */
export function Ip(): ParameterDecorator {
  return createParamDecorator(ParamType.ip)()
}
