import { FaeRequestContext } from '../application/context'

export type SupportedType<T> = (new (...args: any[]) => T) | Function

export interface ContainerType {
  get: (
    someClass: any,
    requestContext: FaeRequestContext<any>
  ) => any | Promise<any>
}

export type ContainerGetter<TContext extends object> = (
  requestContext: FaeRequestContext<TContext>
) => ContainerType

/**
 * 依赖注入用到的默认Container
 * 如果用户未配置自定义Container，则实例化一个默认Container
 */
class DefaultContainer {
  private readonly instances: Array<{ type: Function; object: any }> = []

  get<T>(someClass: SupportedType<T>): T {
    let instance = this.instances.find(it => it.type === someClass)
    if (!instance) {
      instance = { type: someClass, object: new (someClass as any)() }
      this.instances.push(instance)
    }

    return instance.object
  }
}

export class IOCContainer {
  private readonly container: ContainerType | undefined

  private readonly containerGetter: ContainerGetter<any> | undefined

  private readonly defaultContainer: DefaultContainer = new DefaultContainer()

  constructor(
    iocContainerOrContainerGetter?: ContainerType | ContainerGetter<any>
  ) {
    if (
      iocContainerOrContainerGetter &&
      'get' in iocContainerOrContainerGetter &&
      typeof iocContainerOrContainerGetter.get === 'function'
    ) {
      this.container = iocContainerOrContainerGetter
    } else if (typeof iocContainerOrContainerGetter === 'function') {
      this.containerGetter = iocContainerOrContainerGetter
    }
  }

  getInstance<T = any>(
    someClass: SupportedType<T>,
    requestContext: FaeRequestContext<any>
  ): T | Promise<T> {
    const container = this.containerGetter
      ? this.containerGetter(requestContext)
      : this.container
    if (!container) {
      return this.defaultContainer.get<T>(someClass)
    }
    return container.get(someClass, requestContext)
  }
}
