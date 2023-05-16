import { ConfigEnv, defineConfig, UserConfig } from 'vite';
import { createConfig } from './build';

// https://vitejs.dev/config/
export default defineConfig((params: ConfigEnv): UserConfig => {
  return createConfig(params);
});
