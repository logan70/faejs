import deepmerge from 'deepmerge'
import {
  isObject,
  isString,
  ResultType,
  SymbolKeysNotSupportedError,
} from '../..'
import { getMetadataStorage } from '../../metadata/getMetadataStorage'

/**
 * Request method Decorator. Defines a template to be rendered by the method.
 *
 * @param {String} template Template to render
 * @param {Object} [baseLocals] Define base local variables for the view, would merged with method return value
 *
 * Example:
 *
 * ```ts
 * @Render('index')
 * // or
 * @Render('index', { message: 'Hello World!' })
 * ```
 */
export function Render(
  template: string,
  baseLocals?: Record<string, any>
): MethodDecorator

/**
 * Request method Decorator. Defines a template to be rendered by the method.
 *
 * @param {String} template Template to render
 * @param {String} [root] Where your views are located. Must be an absolute path.
 * @param {Object} [baseLocals] Define base local variables for the view, would merged with method return value
 *
 * Example:
 *
 * ```ts
 * @Render('index', path.resolve(process.cwd(), 'app/views'))
 * // or
 * @Render('index', path.resolve(process.cwd(), 'app/views'), { message: 'Hello World!' })
 * ```
 */
export function Render(
  template: string,
  root?: string,
  baseLocals?: Record<string, any>
): MethodDecorator

export function Render(
  template: string,
  baseLocalsOrRoot?: Record<string, any> | string,
  baseLocals?: Record<string, any>
): MethodDecorator {
  return (instance, methodName, _descriptor) => {
    if (typeof methodName === 'symbol') {
      throw new SymbolKeysNotSupportedError()
    }
    const target = instance.constructor
    let root = ''
    let locals: Record<string, any> = {}

    if (isString(baseLocalsOrRoot)) {
      root = baseLocalsOrRoot
    } else if (isObject(baseLocalsOrRoot)) {
      locals = baseLocalsOrRoot
    }

    if (isObject(baseLocals)) {
      locals = deepmerge(locals, baseLocals)
    }

    getMetadataStorage().collectResultMetadata(target, methodName, {
      target,
      methodName,
      type: ResultType.render,
      data: template,
      options: {
        root,
        locals,
      },
    })
  }
}
