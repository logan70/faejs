import { AroundDefinition } from '..'
import { InvalidDecoratorItemError } from '../errors/InvalidDecoratorItemError'
import { isFunction } from '.'

export function isAroundValid(around: AroundDefinition) {
  return around && (isFunction(around?.prototype?.around) || isFunction(around))
}

/**
 * Validate each item in arr.
 * Useful to validate decorator's rest params
 */
export function validateEach({
  context,
  arr,
  validator,
  decorator,
  itemName,
}: {
  context: { name: string }
  arr: any[]
  validator: Function
  decorator: string
  itemName: string
}): boolean {
  if (!context || !context.name) {
    return true
  }
  const errors = arr.some(item => !validator(item))
  if (errors) {
    throw new InvalidDecoratorItemError(decorator, itemName, context.name)
  }
  return true
}
