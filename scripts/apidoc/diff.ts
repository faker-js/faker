import type { ApiDiffHashes } from './output/diff-index';
import {
  FILE_NAME_DOCS_DIFF_INDEX,
  FILE_PATH_DOCS_DIFF_INDEX,
} from './output/diff-index';

/**
 * Loads the diff index from the given source url.
 *
 * @param url The url to load the diff index from.
 */
async function loadRemote(url: string): Promise<ApiDiffHashes> {
  return fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(
        `Failed to load remote diff index from ${url}: ${res.statusText}`
      );
    }

    return res.json() as Promise<ApiDiffHashes>;
  });
}

/**
 * Loads the diff index from the given local path.
 *
 * @param path The path to load the diff index from. Should start with `file://` for cross platform compatibility.
 */
async function loadLocal(path: string): Promise<ApiDiffHashes> {
  return import(path).then((imp) => imp.default as ApiDiffHashes);
}

/**
 * Loads the diff index from the given source.
 * If the source starts with `https://` it will be loaded from the remote url.
 * Otherwise it will be loaded from the local path.
 *
 * @param source The source to load the diff index from.
 */
async function load(source: string): Promise<ApiDiffHashes> {
  return source.startsWith('https://') ? loadRemote(source) : loadLocal(source);
}

/**
 * Returns a set of all keys from the given entries.
 *
 * @param entries The entries to get the keys from.
 */
function allKeys(
  ...entries: ReadonlyArray<Record<string, unknown>>
): Set<string> {
  return new Set(entries.flatMap(Object.keys));
}

/**
 * Compares the target (reference) and source (changed) diff index and returns the differences.
 * The returned object contains the module names as keys and the method names as values.
 * If the module name is `ADDED` or `REMOVED` it means that the module was added or removed in the local diff index.
 *
 * @param targetDiffIndex The url to the target (reference) diff index. Defaults to the next.fakerjs.dev diff index.
 * @param sourceDiffIndex The path to the source (changed) index. Defaults to the local diff index.
 */
export async function diff(
  targetDiffIndex = `https://next.fakerjs.dev/${FILE_NAME_DOCS_DIFF_INDEX}`,
  sourceDiffIndex = `file://${FILE_PATH_DOCS_DIFF_INDEX}`
): Promise<Record<string, ['ADDED'] | ['REMOVED'] | string[]>> {
  const target = await load(targetDiffIndex);
  const source = await load(sourceDiffIndex);

  const diff: Record<string, string[]> = {};

  for (const moduleName of allKeys(target, source)) {
    const remoteModule = target[moduleName];
    const localModule = source[moduleName];

    if (!remoteModule) {
      diff[moduleName] = ['ADDED'];
      continue;
    }

    if (!localModule) {
      diff[moduleName] = ['REMOVED'];
      continue;
    }

    for (const methodName of allKeys(remoteModule, localModule)) {
      const remoteMethod = remoteModule[methodName];
      const localMethod = localModule[methodName];

      if (remoteMethod !== localMethod) {
        (diff[moduleName] ??= []).push(methodName);
      }
    }
  }

  return diff;
}
