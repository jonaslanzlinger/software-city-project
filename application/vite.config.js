import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue'; // or any other plugins you are using
import fs from 'fs';
import path from 'path';

export default defineConfig({
   base: "/software-city-project/",
   plugins: [vue()],
   server: {
      https: {
         key: fs.readFileSync(path.resolve(__dirname, './localhost-key.pem')),
         cert: fs.readFileSync(path.resolve(__dirname, './localhost.pem')),
      },
   },
})

