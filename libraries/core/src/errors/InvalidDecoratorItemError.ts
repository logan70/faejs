export class InvalidDecoratorItemError extends Error {
  constructor(decorator: string, item: string, context: string) {
    const message = `Invalid ${item} passed to ${decorator}() decorator (${context}).`
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
