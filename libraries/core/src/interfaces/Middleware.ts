import { FaeRequestContext } from '../application/context'

export type NextFn = () => Promise<any>

export type MiddlewareFn<TContext = {}> = (
  requestContext: FaeRequestContext<TContext>,
  next: NextFn
) => Promise<any>

export interface MiddlewareInterface<TContext = {}> {
  use: MiddlewareFn<TContext>
}
export type MiddlewareClass<TContext = {}> = new (
  ...args: any[]
) => MiddlewareInterface<TContext>

export type Middleware<TContext = {}> =
  | MiddlewareFn<TContext>
  | MiddlewareClass<TContext>
