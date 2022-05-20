import { ParamType } from '../../const/ParamType'
import { createParamDecorator } from './createParamDecorator'

/**
 * Route handler parameter decorator. Extracts the `Context`
 *
 * Example: `info(@Context() context)`
 */
export function Context(): ParameterDecorator {
  return createParamDecorator<[]>(ParamType.context)()
}

/**
 * Route handler parameter decorator. Extracts the `Context`
 *
 * Example: `info(@Ctx() ctx)`
 */
export const Ctx = Context
