import deepmerge from 'deepmerge'
import { BaseDriver } from '../driver/BaseDriver'
import { MetadataBuilder } from '../metadata/MetadataBuilder'
import { RouteMetadata } from '../metadata/RouteMetadata'
import { TResult } from '../interfaces/Result'
import { isObject, isString, ResultType } from '..'
import { filterControllers } from '../utils/filter'
import { BaseResult } from './BaseResult'
import {
  buildRequestContext,
  FaeRequestContext,
  IntegrationContextArgument,
} from './context'
import FaeApplicationOptions, {
  buildServerOptions,
  Context,
  ContextFunction,
} from './options'
import { ParameterHandler } from './ParameterHandler'

export class FaeApplication<
  // The type of the argument to the `context` function for this integration.
  ContextFunctionParams = any
> {
  private readonly context?: Context | ContextFunction<ContextFunctionParams>

  private readonly options: FaeApplicationOptions<ContextFunctionParams>

  private readonly isDev: boolean

  /**
   * Used to check and handle controller route parameters.
   */
  private readonly parameterHandler: ParameterHandler

  /**
   * Used to build metadata objects for controllers and middlewares.
   */
  private readonly metadataBuilder: MetadataBuilder

  constructor(
    private readonly driver: BaseDriver,
    options: FaeApplicationOptions<ContextFunctionParams>
  ) {
    if (!options) {
      throw new Error('FaeApplication requires options.')
    }
    this.options = buildServerOptions(options)

    const { context, nodeEnv } = this.options
    this.context = context
    this.isDev = nodeEnv !== 'production'

    this.parameterHandler = new ParameterHandler(this.driver)
    this.metadataBuilder = new MetadataBuilder(this.options)
  }

  /**
   * 具体框架集成实现时调用此方法获取构建请求上下文配置
   * @param integrationContextArgument 具体框架集成时需提供标准化的上下文参数
   * @returns
   */
  protected async buildRequestContext(
    integrationContextArgument: IntegrationContextArgument
  ) {
    return buildRequestContext(this.options, integrationContextArgument)
  }

  registerControllers(classes: Function[] = []): this {
    const controllers = filterControllers(classes)
    const controllerMetadatas =
      this.metadataBuilder.buildControllerMetadatas(controllers)
    controllerMetadatas.forEach(controllerMetadata => {
      controllerMetadata.routeMetadatas.forEach(routeMetadata => {
        this.driver.registerRoute(routeMetadata, reqContext =>
          this.executeRouteHandler(routeMetadata, reqContext)
        )
      })
    })
    return this
  }

  registerMiddlewares() {
    return this
  }

  executeRouteHandler(
    routeMetadata: RouteMetadata,
    reqContext: FaeRequestContext
  ) {
    const paramPromises = routeMetadata.params
      .sort((param1, param2) => param1.index - param2.index)
      .map(param => this.parameterHandler.resolve(reqContext, param))

    return Promise.all(paramPromises)
      .then(params => routeMetadata.callMethod(params, reqContext))
      .then(result => this.formatRouteHandlerResult(result, routeMetadata))
      .then(formattedResult =>
        this.driver.handleSuccess(formattedResult, routeMetadata, reqContext)
      )
      .catch(error => this.driver.handleError(error, routeMetadata, reqContext))
  }

  private formatRouteHandlerResult(
    data: any,
    routeMetadata: RouteMetadata
  ): TResult {
    const { target, methodName, ...baseResult } = routeMetadata.result

    const result =
      data instanceof BaseResult
        ? (data as TResult)
        : this.formatCustomResult(baseResult as TResult, data)

    return {
      type: result.type ?? baseResult.type ?? this.options.type,
      data: result.data ?? baseResult.data,
      options: deepmerge<TResult['options']>(
        baseResult.options || {},
        result.options || {}
      ),
      statusCode: result.statusCode ?? baseResult.statusCode,
      headers: {
        ...baseResult.headers,
        ...result.headers,
      },
    } as TResult
  }

  private formatCustomResult(baseResult: TResult, data: any): TResult {
    if (data instanceof BaseResult) {
      return data as TResult
    }

    const customResult: TResult = {}
    switch (baseResult.type) {
      // render type is special
      case ResultType.render:
        // if route handler result is an object, treat it as locals instead of template path
        if (isObject(data)) {
          customResult.options =
            'locals' in data && isObject(data.locals)
              ? data
              : {
                  locals: data,
                }
        } else if (isString(data)) {
          customResult.data = data
        }
        break

      default:
        customResult.data = data
        break
    }
    return customResult
  }
}
