import { IProceedJoinPoint } from './JoinPoint'

export type AroundFn<Target> = (
  proceedPoint: IProceedJoinPoint<Target>
) => Promise<any>

export interface AroundInterface<Target> {
  around: AroundFn<Target>
}

export type AroundClass<Target = any> = new (
  ...args: any[]
) => AroundInterface<Target>

export type AroundDefinition<Target = any> =
  | AroundFn<Target>
  | AroundClass<Target>
