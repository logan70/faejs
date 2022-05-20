/**
 * 各种内置对象类型标记，这里并没有列全
 * 详见https://tc39.es/ecma262/#sec-object.prototype.tostring
 */
export enum JSType {
  Null = 'Null',
  Undefined = 'Undefined',
  String = 'String',
  Number = 'Number',
  Boolean = 'Boolean',
  Symbol = 'Symbol',
  BigInt = 'BigInt',
  Object = 'Object',
  Array = 'Array',
  Math = 'Math',
  Function = 'Function',
  AsyncFunction = 'AsyncFunction',
  Promise = 'Promise',
  /** 函数参数对象 */
  Arguments = 'Arguments',
  Error = 'Error',
  RegExp = 'RegExp',
  Date = 'Date',
  Map = 'Map',
  WeakMap = 'WeakMap',
  Set = 'Set',
  WeakSet = 'WeakSet',
  ArrayBuffer = 'ArrayBuffer',
  /** 全局JSON对象 */
  JSON = 'JSON',
  /** 例如function *() {} */
  GeneratorFunction = 'GeneratorFunction',
  Reflect = 'Reflect',
}

export const getType = (o: unknown) =>
  Object.prototype.toString.call(o).slice(8, -1) as JSType

export const isType = (o: unknown, types: JSType[]) =>
  types.includes(getType(o))

export const genTypeJudger =
  <T>(...types: JSType[]) =>
  (o: unknown): o is T =>
    isType(o, types)

export const isObject = genTypeJudger<Record<string, any>>(JSType.Object)
export const isString = genTypeJudger<string>(JSType.String)
export const isNumber = genTypeJudger<number>(JSType.Number)
export const isSymbol = genTypeJudger<symbol>(JSType.Symbol)
export const isArray = genTypeJudger<unknown[]>(JSType.Array)
export const isFunction = (o: unknown): o is Function => typeof o === 'function'
export const isPromise = genTypeJudger<Promise<unknown>>(JSType.Promise)
export const isError = genTypeJudger<Error>(JSType.Error)
export const isSet = genTypeJudger<Set<unknown>>(JSType.Set)
export const isMap = genTypeJudger<Map<unknown, unknown>>(JSType.Map)
export const isUndefined = genTypeJudger<undefined>(JSType.Undefined)
export const isRegExp = genTypeJudger<RegExp>(JSType.RegExp)

export const isDefined = (o: unknown) => o !== null && o !== undefined
export const isNil = (o: unknown): o is null | undefined =>
  isUndefined(o) || o === null

export const isConstructor = (prop: string) => prop === 'constructor'
