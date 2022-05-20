import { BuildContext, FaeRequestContext } from '..'
import { AROUND_FLAG } from '../const/metadataKey'
import {
  AroundFn,
  AroundDefinition,
  AroundInterface,
} from '../interfaces/Around'
import { IProceedJoinPoint } from '../interfaces/JoinPoint'
import { isFunction } from '.'

export type AroundedMethod<
  Args extends Array<any> = Array<any>,
  Output = any
> = (reqContext: FaeRequestContext, ...args: Args) => Output

export function isMethodArounded(method: Function): boolean {
  return Reflect.get(method, AROUND_FLAG)
}

export function getAroundFnParams(
  method: Function,
  reqContext: FaeRequestContext,
  rawParams: any[]
): any[] {
  const isOriginal = !isMethodArounded(method)
  return isOriginal ? rawParams : [reqContext, ...rawParams]
}

/* eslint-disable @babel/no-invalid-this */
export function genNewDescriptorWithAround(
  methodName: string,
  desc: TypedPropertyDescriptor<Function>,
  around: AroundDefinition
): TypedPropertyDescriptor<any> {
  const { value: methodToAround, configurable, enumerable } = desc

  const aop: AroundedMethod = function aop(this: object, reqContext, ...args) {
    const proceed = (...proceedArgs: any[]) => {
      const realArgs = proceedArgs.length ? proceedArgs : args

      // pass reqContext if is not the original method
      const paramsToApply = getAroundFnParams(
        methodToAround!,
        reqContext,
        realArgs
      )
      return Reflect.apply(methodToAround!, this, paramsToApply)
    }
    Reflect.defineProperty(proceed, 'name', { value: methodName })

    const proceedPoint: IProceedJoinPoint = {
      target: this,
      args,
      proceed,
      context: reqContext,
    }

    const aroundFn = prepareAroundFn(around)
    return Reflect.apply(aroundFn, this, [proceedPoint])
  }
  Reflect.defineProperty(aop, AROUND_FLAG, { value: true })

  return {
    configurable,
    enumerable,
    writable: true,
    value: aop,
  }
}
/* eslint-enable @babel/no-invalid-this */

export function prepareAroundFn(around: AroundDefinition): AroundFn<any> {
  if (isFunction(around.prototype?.around)) {
    return async function (proceedPoint) {
      // if this is function instance of AroundInterface
      const aroundInstance = await BuildContext.getFromContainer<
        AroundInterface<any>
      >(around, proceedPoint.context)
      return aroundInstance.around(proceedPoint)
    }
  }
  return around as AroundFn<any>
}
