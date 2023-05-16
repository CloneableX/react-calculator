import { ConfigEnv, UserConfig } from 'vite';

import deepmerge from 'deepmerge';

import { Configure } from './types';
import { pathResolve } from './utils';
import { createPlugins } from './plugins';

export const createConfig = (params: ConfigEnv, configure?: Configure): UserConfig => {
  const isBuild = params.command === 'build';
  return deepmerge<UserConfig>(
    {
      resolve: {
        alias: {
          '@': pathResolve('src'),
        },
      },
      css: {
        modules: {
          localsConvention: 'camelCaseOnly',
        },
      },
      plugins: createPlugins(isBuild),
    },
    typeof configure === 'function' ? configure(params, isBuild) : {},
    {
      arrayMerge: (d, s, o) => Array.from(new Set(...d, ...s)),
    },
  );
};
