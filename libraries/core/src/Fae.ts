import { BaseDriver } from './driver/BaseDriver'
import FaeApplicationOptions from './application/options'
import { FaeApplication } from './application/FaeApplication'
import { BuildContext } from './application/BuildContext'

export class Fae {
  private static instance?: Fae

  /**
   * create singleton Fae instance
   *
   * ```ts
   * Fae.create(driver, options)
   * ```
   */
  static create(driver: BaseDriver, options: FaeApplicationOptions): Fae {
    if (Fae.instance) {
      return Fae.instance
    }

    Fae.instance = new Fae(driver, options)

    return Fae.instance
  }

  application: FaeApplication

  options: FaeApplicationOptions

  private started: boolean = false

  private constructor(
    readonly driver: BaseDriver,
    options: FaeApplicationOptions
  ) {
    BuildContext.create(options)

    this.options = options
    this.driver = driver
    this.application = new FaeApplication(driver, options)
  }

  /**
   * Start Fae application
   * @param allowMultiStart useful for hot-reload scene
   */
  public async start(allowMultiStart = false): Promise<Fae> {
    if (!Fae.instance) {
      return Promise.reject(
        new Error(
          'Fae has not be instantiated, run `Fae.create(driver, options)` first'
        )
      )
    }
    if (this.started && !allowMultiStart) {
      return Promise.reject(new Error('Fae.start() called multiple times'))
    }
    this.started = true
    await this.driver.beforeCreate?.(this.options)

    this.application.registerControllers(this.options.controllers)

    await this.driver.created?.()
    return this
  }
}
