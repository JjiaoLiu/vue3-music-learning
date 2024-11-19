import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Pages from "vite-plugin-pages";
import Components from "unplugin-vue-components/vite";
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";
import ElementPlus from "unplugin-element-plus/vite";
import Inspect from "vite-plugin-inspect";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
    AutoImport({
      imports: ["vue", "vue-router"],
      dts: "./auto-imports.d.ts",
      eslintrc: {
        enabled: true, // Default `false`
        filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      resolvers: [ElementPlusResolver({importStyle: "sass"})],
    }),
    Components({
      resolvers: [ElementPlusResolver({importStyle: "sass"})],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
      //默认自动导入src/components下的组件
    }),
    Pages({
      exclude: ["**/components/*.vue"],
      importMode(filepath, options) {
        // default resolver
        for (const page of options.dirs) {
          // console.log(`/${page.dir}/index`) // /src/pages/index
          if (
            page.baseRoute === "" &&
            filepath.startsWith(`/${page.dir}/index`)
          )
            return "sync"; //同步
        }
        return "async"; //异步
        // Load about page synchronously, all other pages are async.
        // return filepath.indexOf("about") > -1 ? "sync" : "async";
      },
    }),
    ElementPlus({
      useSource: true,
    }),
    Inspect(),
  ],
  resolve: {
    alias: {
      "@": "/src",
      "~/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        additionalData: `@use "@/styles/element/index.scss" as *;`,
      },
    },
  },
});
