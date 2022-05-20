import { BaseResult } from '../../application/BaseResult'
import { ResultMetadataArgs } from '.'

/**
 * Result metadata.
 */
export class ResultMetadata extends BaseResult {
  /**
   * Class on which's method this route is attached.
   */
  target: Function

  /**
   * Object's method that will be executed on this route.
   */
  methodName: string

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor(args: ResultMetadataArgs) {
    super(args)
    this.target = args.target
    this.methodName = args.methodName
  }
}
