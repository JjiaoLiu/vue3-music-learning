import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Pages from "vite-plugin-pages";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver, VantResolver } from "unplugin-vue-components/resolvers";
import ElementPlus from "unplugin-element-plus/vite";
// import { VantResolver } from '@vant/auto-import-resolver';
import Inspect from "vite-plugin-inspect";
import pxtoviewport from '@minko-fe/postcss-pxtoviewport';
import tailwindcss from 'tailwindcss'
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: "icon-[dir]-[name]"
    }),
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
      resolvers: [ElementPlusResolver({ importStyle: "sass" }), VantResolver({ importStyle: true })],
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: "sass" }), VantResolver({ importStyle: true })],
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
    postcss: {
      plugins: [
        tailwindcss({
          config: './tailwind.config.js', // 指定tailwind配置文件路径
          css: ['./src/style.scss'], // 指定tailwind处理的文件
        }),
        // 需要文字自适应的项目再打开
        // pxtoviewport({
        //   unitToConvert: 'px', // 需要转换的单位，默认为"px"，将 px 单位转换为视口单位的 (vw, vh, vmin, vmax)
        //   viewportWidth: file => {
        //     let num = 1920; // 公司设计稿宽度
        //     // van组件是375
        //     // if (file.indexOf('van') > 0) {
        //     //   num = 375;
        //     // }
        //     return num;
        //   },
        //   // viewportWidth: 375, // 设计稿的视口宽度
        //   unitPrecision: 5, // 单位转换后保留的精度
        //   propList: ['*'], // 能转化为vw的属性列表
        //   viewportUnit: 'vw', // 希望使用的视口单位
        //   fontViewportUnit: 'vw', // 字体使用的视口单位
        //   selectorBlackList: ['ignore-', 'pageAll', 'report', 'block'], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
        //   minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
        //   // mediaQuery: true, // 媒体查询里的单位是否需要转换单位
        //   replace: true, //  是否直接更换属性值，而不添加备用属性
        //   exclude: undefined, // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
        //   include: undefined, // 如果设置了include，那将只有匹配到的文件才会被转换
        //   // landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
        //   // landscapeUnit: 'vw', // 横屏时使用的单位
        //   // landscapeWidth: 1920 // 横屏时使用的视口宽度
        // }),
      ]
    }
  },
});
