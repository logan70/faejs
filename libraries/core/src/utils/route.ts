import { isString } from './typeof'

export function fixRouteMultiSlash(route: string) {
  if (!route || !isString(route)) {
    return ''
  }

  return route.replace(/\/{2,}/g, '/')
}
