import type { DocsApiDiffIndex } from './utils';
import { nameDocsDiffIndexFile, pathDocsDiffIndexFile } from './utils';

const host = 'https://next--serene-sprite-f3ef50.netlify.app';
// const host = 'https://fakerjs.dev';

async function loadRemote(): Promise<DocsApiDiffIndex> {
  return fetch(`${host}/${nameDocsDiffIndexFile}`).then((res) => {
    if (!res.ok) {
      throw new Error(`Failed to load remote diff index: ${res.statusText}`);
    } else {
      return res.json() as Promise<DocsApiDiffIndex>;
    }
  });
}

async function loadLocal(): Promise<DocsApiDiffIndex> {
  return import(`file://${pathDocsDiffIndexFile}`).then(
    (imp) => imp.default as DocsApiDiffIndex
  );
}

function allKeys(...entries: Record<string, unknown>[]): Set<string> {
  return new Set(entries.map(Object.keys).flat());
}

async function diff(): Promise<Record<string, string[]>> {
  const remote: DocsApiDiffIndex = await loadRemote();
  const local: DocsApiDiffIndex = await loadLocal();

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

diff().then(console.log).catch(console.error);
