import FaeApplicationOptions from '../application/options'
import { ControllerMetadata } from './ControllerMetadata'
import { getMetadataStorage } from './getMetadataStorage'
import { MetadataStorage } from './MetadataStorage'
import { ParamMetadata } from './ParamMetadata'
import { ResultMetadata } from './ResultMetadata'
import { RouteMetadata, RouteMetadataArgs } from './RouteMetadata'

export class MetadataBuilder {
  private readonly metadataStorage: MetadataStorage = getMetadataStorage()

  constructor(private readonly options: FaeApplicationOptions) {}

  /**
   * Creates controller metadatas.
   */
  buildControllerMetadatas(classes: Function[] = []): ControllerMetadata[] {
    return this.metadataStorage
      .reflectControllerMetadata(classes)
      .filter(Boolean)
      .map(controllerArgs => {
        const controller = new ControllerMetadata(controllerArgs, this.options)
        controller.build()
        controller.routeMetadatas = this.buildRouteMetadatas(controller)
        return controller
      })
  }

  /**
   * Creates route metadatas.
   */
  buildRouteMetadatas(controller: ControllerMetadata): RouteMetadata[] {
    let { target } = controller
    const routeArgsWithTarget: RouteMetadataArgs[] = []
    while (target) {
      const routes = this.metadataStorage
        .reflectRouteMetadatas(target)
        .filter(route => {
          const methodNames = routeArgsWithTarget.map(r => r.methodName)
          return !methodNames.includes(route.methodName)
        })

      routes.forEach(r => {
        r.target = controller.target

        routeArgsWithTarget.push(r)
      })

      target = Object.getPrototypeOf(target)
    }

    return routeArgsWithTarget.map(routeArgs => {
      const route = new RouteMetadata(controller, routeArgs, this.options)
      route.params = this.buildParamMetadatas(route)
      route.result = this.buildRouteResultMetadata(route)
      return route
    })
  }

  /**
   * Create param metadatas.
   */
  buildParamMetadatas(route: RouteMetadata): ParamMetadata[] {
    return this.metadataStorage
      .reflectParamMetadatas(route.target, route.methodName)
      .map(paramArgs => new ParamMetadata(route, paramArgs))
  }

  /**
   * Create result metadata
   */
  buildRouteResultMetadata(route: RouteMetadata): ResultMetadata {
    const resultArgs = this.metadataStorage.reflectResultMetadata(
      route.target,
      route.methodName
    )
    return new ResultMetadata(resultArgs)
  }
}
