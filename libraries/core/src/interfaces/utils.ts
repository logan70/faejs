export type ValueOrPromise<T = any> = T | Promise<T>
export type ExtractPromiseType<T> = T extends Promise<infer P> ? P : never
