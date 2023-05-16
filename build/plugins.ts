import react from '@vitejs/plugin-react';
import { PluginOption } from 'vite';

export const createPlugins = (isBuild: boolean) => {
  const vitePlugins: Array<PluginOption | PluginOption[]> = [react()];
  return vitePlugins;
};
