import { isFunction } from '.'

export function filterControllers(controllers?: Function[]): Function[] {
  if (isFunction(controllers)) {
    return [controllers]
  }
  if (!Array.isArray(controllers) || !controllers.length) {
    return []
  }

  return controllers.filter(isFunction)
}
