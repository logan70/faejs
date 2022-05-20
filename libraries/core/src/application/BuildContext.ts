import { Middleware } from '../interfaces/Middleware'
import { IOCContainer } from '../utils/container'
import { FaeRequestContext } from './context'
import FaeApplicationOptions from './options'

export class BuildContext {
  static globalMiddlewares: Array<Middleware<any>>

  static container: IOCContainer

  /**
   * Set static fields with current building context data
   */
  static create(options: FaeApplicationOptions = {}) {
    if (Array.isArray(options.middlewares)) {
      this.globalMiddlewares = options.middlewares
    }
    this.container = new IOCContainer(options.container)
  }

  static async getFromContainer<T>(
    someClass: Function,
    reqContext: FaeRequestContext
  ): Promise<T> {
    return this.container.getInstance(someClass, reqContext)
  }

  /**
   * Restore default settings
   */
  static reset() {
    this.globalMiddlewares = []
    this.container = new IOCContainer()
  }
}
