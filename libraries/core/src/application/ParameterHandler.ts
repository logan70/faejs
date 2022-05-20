import { isFunction } from '..'
import { ParamType } from '../const/ParamType'
import { BaseDriver } from '../driver/BaseDriver'
import { ParamMetadata } from '../metadata/ParamMetadata/class'
import { FaeRequestContext } from './context'

export class ParameterHandler {
  constructor(private readonly driver: BaseDriver) {}

  resolve(
    reqContext: FaeRequestContext,
    param: ParamMetadata
  ): Promise<any> | any {
    if (param.type === ParamType.custom) {
      return isFunction(param.factory)
        ? param.factory(reqContext, param.customArgs)
        : undefined
    }
    if (param.type === ParamType.request) {
      return reqContext.request
    }
    if (param.type === ParamType.response) {
      return reqContext.response
    }
    if (param.type === ParamType.context) {
      return reqContext.context
    }

    const paramValue = this.driver.getParam(reqContext, param)
    return paramValue
  }
}
