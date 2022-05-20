import * as path from 'path'

/**
 * Loads all exported classes from the given directory.
 */
export function importClassesFromDirectories(
  directories: string[],
  formats = ['.js', '.ts', '.tsx']
): Function[] {
  const loadFileClasses = function (exported: any, allLoaded: Function[]) {
    if (exported instanceof Function) {
      allLoaded.push(exported)
    } else if (exported instanceof Array) {
      exported.forEach((i: any) => loadFileClasses(i, allLoaded))
    } else if (exported instanceof Object || typeof exported === 'object') {
      Object.keys(exported).forEach(key =>
        loadFileClasses(exported[key], allLoaded)
      )
    }

    return allLoaded
  }

  const allFiles = directories.reduce(
    (allDirs, dir) => allDirs.concat(require('glob').sync(path.normalize(dir))),
    [] as string[]
  )

  const dirs = allFiles
    .filter(file => {
      const dtsExtension = file.substring(file.length - 5, file.length)
      return formats.includes(path.extname(file)) && dtsExtension !== '.d.ts'
    })
    .map(file => require(file))

  return loadFileClasses(dirs, [])
}