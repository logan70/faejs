import { FaeRequestContext } from '../application/context'

export interface IJoinPoint<T = any> {
  target: T
  args: Array<any>
  context: FaeRequestContext
}

export interface IProceedJoinPoint<T = any> extends IJoinPoint<T> {
  proceed: (...args: any[]) => Promise<any>
}
