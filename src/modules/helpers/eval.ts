import { FakerError } from '../../errors/faker-error';

const REGEX_DOT_OR_BRACKET = /\.|\(/;

/**
 * Evaluates a function call and returns the remaining string and the mapped results.
 *
 * @param input The input string to parse.
 * @param entrypoints The entrypoints to attempt the call on.
 */
export function evalProcessFunction(
  input: string,
  entrypoints: ReadonlyArray<unknown>
): [remaining: number, mapped: unknown[]] {
  const [index, params] = findParams(input);
  const nextChar = input[index + 1];
  switch (nextChar) {
    case '.':
    case '(':
    case undefined:
      break; // valid
    default:
      throw new FakerError(
        `Expected dot ('.'), open parenthesis ('('), or nothing after function call but got '${nextChar}'`
      );
  }

  return [
    index + (nextChar === '.' ? 2 : 1), // one for the closing bracket, one for the dot
    entrypoints.map((entrypoint): unknown =>
      typeof entrypoint === 'function' ? entrypoint(...params) : undefined
    ),
  ];
}

/**
 * Tries to find the parameters of a function call.
 *
 * @param input The input string to parse.
 */
function findParams(input: string): [remaining: number, params: unknown[]] {
  let index = input.indexOf(')');
  while (index !== -1) {
    const params = input.substring(1, index);
    try {
      // assuming that the params are valid JSON
      return [index, JSON.parse(`[${params}]`) as unknown[]];
    } catch {
      if (!params.includes("'") && !params.includes('"')) {
        try {
          // assuming that the params are a single unquoted string
          return [index, JSON.parse(`["${params}"]`) as unknown[]];
        } catch {
          // try again with the next index
        }
      }
    }

    index = input.indexOf(')', index + 1);
  }

  throw new FakerError(
    `Function parameters cannot be parsed as JSON or simple string: '${input}'`
  );
}

/**
 * Processes one expression part and returns the remaining index and the mapped results.
 *
 * @param input The input string to parse.
 * @param entrypoints The entrypoints to resolve on.
 */
export function evalProcessExpression(
  input: string,
  entrypoints: ReadonlyArray<unknown>
): [remaining: number, mapped: unknown[]] {
  const result = REGEX_DOT_OR_BRACKET.exec(input);
  const dotMatch = (result?.[0] ?? '') === '.';
  const index = result?.index ?? input.length;
  const key = input.substring(0, index);
  if (key.length === 0) {
    throw new FakerError(`Pattern parts cannot be empty in '${input}'`);
  }

  return [
    index + (dotMatch ? 1 : 0),
    entrypoints.map((entrypoint) => resolveProperty(entrypoint, key)),
  ];
}

/**
 * Resolves the given property on the given entrypoint.
 *
 * @param entrypoint The entrypoint to resolve the property on.
 * @param key The property name to resolve.
 */
function resolveProperty(entrypoint: unknown, key: string): unknown {
  switch (typeof entrypoint) {
    case 'function': {
      if (entrypoint[key as keyof typeof entrypoint] == null) {
        try {
          entrypoint = entrypoint();
        } catch {
          return undefined;
        }
      }

      return entrypoint?.[key as keyof typeof entrypoint];
    }

    case 'object': {
      return entrypoint?.[key as keyof typeof entrypoint];
    }

    default:
      return undefined;
  }
}
