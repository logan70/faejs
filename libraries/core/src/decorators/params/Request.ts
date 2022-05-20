import { ParamType } from '../../const/ParamType'
import { createParamDecorator } from './createParamDecorator'

/**
 * Route handler parameter decorator. Extracts the `Request`
 *
 * Example: `info(@Request() req)`
 */
export function Request(): ParameterDecorator {
  return createParamDecorator(ParamType.request)()
}

/**
 * Route handler parameter decorator. Extracts the `Request`
 *
 * Example: `info(@Req() req)`
 */
export const Req = Request
