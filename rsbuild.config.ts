import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import tailwindcssPostcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import fs from 'fs';
import path from 'path';
import os from 'os';

// ---------- Helpers ----------
const readJSON = (filePath: string) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (err) {
    throw new Error(`Failed to read config file at ${filePath}: ${err}`);
  }
};

const readFileIfExists = (filePath?: string) => {
  return filePath && fs.existsSync(filePath)
    ? fs.readFileSync(filePath)
    : undefined;
};

const isHTTPS = process.env.HTTPS === 'true';

// ---------- Load config ----------
const configPath = path.join(os.homedir(), '.envs', 'config.json');
const { common, github, auth } = readJSON(configPath);

const {
  front: {
    ports: { http: APP_HTTP_PORT, https: APP_HTTPS_PORT },
  },
  back: {
    ports: { http: API_HTTP_PORT, https: API_HTTPS_PORT },
  },
} = github;

const {
  back: {
    ports: { http: AUTH_HTTP_PORT, https: AUTH_HTTPS_PORT },
  },
} = auth;

// ---------- Derived values ----------
const serverPort = isHTTPS ? APP_HTTPS_PORT : APP_HTTP_PORT;

const httpsConfig = isHTTPS
  ? {
      key: readFileIfExists(common?.certs?.key_path),
      cert: readFileIfExists(common?.certs?.cert_path),
    }
  : undefined;

console.log(
  JSON.stringify({
    API_HTTP_PORT,
    API_HTTPS_PORT,
    AUTH_HTTP_PORT,
    AUTH_HTTPS_PORT,
  }),
);
// ---------- Config ----------
export default defineConfig({
  server: {
    port: serverPort,
    strictPort: true,
    ...(httpsConfig && { https: httpsConfig }),
  },

  source: {
    define: {
      'process.env': JSON.stringify({
        ...process.env,
        API_HTTP_PORT,
        API_HTTPS_PORT,
        AUTH_HTTP_PORT,
        AUTH_HTTPS_PORT,
      }),
    },
  },

  plugins: [pluginReact()],

  html: {
    template: './public/index.html',
  },

  tools: {
    postcss: {
      postcssOptions: {
        plugins: [tailwindcssPostcss, autoprefixer],
      },
    },
  },
});
