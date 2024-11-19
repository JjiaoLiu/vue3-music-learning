<script lang="ts" setup>
// import { useCssVar } from '@vueuse/core'

// const elv = ref(null)
// let colorRef = ref('--el-text-color-primary')
// const color = useCssVar(colorRef, elv)
// console.log(color);


// setTimeout(() => {
//   color.value = 'green'
//   console.log(color.value);
// })

// interface Person {
//   name: string,
//   [key: string]: string
// }

// const person = reactive<Person>({ name: '1', name2: '1', name3: '1' })
// const person: Person = reactive<Person>({ name: '1', name2: '1', name3: '1' })
import { language } from '@/utils/injectionKey'
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

const local = ref(zhCn)

provide(language, local)
</script>
<template>
  <el-config-provider :locale="local">
    <el-container class="h-full w-full p-0">
      <el-header class=" p-0">
        <Header></Header>
      </el-header>
      <el-container class=" p-0 flex-1 overflow-y-auto">
        <el-aside width="200px" class=" h-full py-2 overflow-hidden">
          <Side></Side>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      <el-footer>
        <Footer />
      </el-footer>
    </el-container>
  </el-config-provider>
</template>
