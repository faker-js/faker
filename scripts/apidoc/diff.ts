import type { DocsApiDiffIndex } from './utils';
import { nameDocsDiffIndexFile, pathDocsDiffIndexFile } from './utils';

/**
 * Loads the diff index from the given source url.
 *
 * @param url The url to load the diff index from.
 */
async function loadRemote(url: string): Promise<DocsApiDiffIndex> {
  return fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(
        `Failed to load remote diff index from ${url}: ${res.statusText}`
      );
    } else {
      return res.json() as Promise<DocsApiDiffIndex>;
    }
  });
}

/**
 * Loads the diff index from the given local path.
 *
 * @param path The path to load the diff index from. Should start with `file://` for cross platform compatibility.
 */
async function loadLocal(path: string): Promise<DocsApiDiffIndex> {
  return import(path).then((imp) => imp.default as DocsApiDiffIndex);
}

/**
 * Loads the diff index from the given source.
 * If the source starts with `https://` it will be loaded from the remote url.
 * Otherwise it will be loaded from the local path.
 *
 * @param source The source to load the diff index from.
 */
async function load(source: string) {
  if (source.startsWith('https://')) {
    return loadRemote(source);
  } else {
    return loadLocal(source);
  }
}

/**
 * Returns a set of all keys from the given entries.
 *
 * @param entries The entries to get the keys from.
 */
function allKeys(...entries: Record<string, unknown>[]): Set<string> {
  return new Set(entries.map(Object.keys).flat());
}

/**
 * Compares the remote and local diff index and returns the differences.
 * The returned object contains the module names as keys and the method names as values.
 * If the module name is `ADDED` or `REMOVED` it means that the module was added or removed in the local diff index.
 *
 * @param remoteDiffIndex The url to the remote diff index. Defaults to the next.fakerjs.dev diff index.
 * @param localDiffIndex The path to the local diff index. Defaults to the local diff index.
 */
export async function diff(
  remoteDiffIndex = `https://next.fakerjs.dev/${nameDocsDiffIndexFile}`,
  localDiffIndex = `file://${pathDocsDiffIndexFile}`
): Promise<Record<string, string[]>> {
  const remote = await load(remoteDiffIndex);
  const local = await load(localDiffIndex);

  const diff: Record<string, string[]> = {};

  for (const moduleName of allKeys(remote, local)) {
    const remoteModule = remote[moduleName];
    const localModule = local[moduleName];

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
