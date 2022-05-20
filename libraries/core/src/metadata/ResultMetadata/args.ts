import { TResult } from '../../interfaces/Result'

export type ResultMetadataArgs = TResult & {
  /**
   * Class on which's method this route is attached.
   */
  target: Function

  /**
   * Object's method that will be executed on this route.
   */
  methodName: string
}
