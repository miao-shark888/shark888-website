import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.shark888.cn',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  }
});
