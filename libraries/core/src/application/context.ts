import FaeApplicationOptions from './options'

export interface IntegrationContextArgument<TContext = Record<string, any>> {
  /** Request object */
  request: any

  /** Response object */
  response: any

  /** Context */
  context?: TContext

  /** "Next" function used to call next middleware. */
  next?: Function
}

export interface FaeRequestContext<TContext = Record<string, any>>
  extends IntegrationContextArgument<TContext> {
  readonly options: FaeApplicationOptions
}

export async function buildRequestContext<TContext = Record<string, any>>(
  options: FaeApplicationOptions<IntegrationContextArgument<TContext>>,
  integrationContextArgument: IntegrationContextArgument<TContext>
): Promise<FaeRequestContext<TContext>> {
  let { context } = options
  try {
    if (typeof context === 'function') {
      context = await context(integrationContextArgument)
    }
  } catch (e) {
    context = () => {
      throw e
    }
  }

  return {
    ...integrationContextArgument,
    context: (context as TContext) || integrationContextArgument.context,
    options,
  }
}
