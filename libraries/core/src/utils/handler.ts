import { isPromise } from '.'

export function awaitIfIsPromise<T>(result: T | Promise<T>): Promise<T> {
  if (isPromise(result)) {
    return result.then(res => res)
  } else {
    return Promise.resolve(result)
  }
}
