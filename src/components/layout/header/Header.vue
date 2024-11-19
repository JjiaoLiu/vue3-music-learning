<template>
    <div class="flex items-center h-full">
        <div class="app-actions  inline-flex items-center justify-end h-full" style="width: 200px;">
            <IconPark @click="goPrevPage" :icon="Left" :size="iconParKProps.size"
                :stroke-width="iconParKProps.strokeWidth" :class="['p-2 cursor-pointer ',prevCanUse ? '':' ']">
            </IconPark>
            <IconPark @click="goNextPage" :icon="Right" :size="iconParKProps.size"
                :stroke-width="iconParKProps.strokeWidth" :class="['p-2 cursor-pointer ', nextCanUse ? '' : ' ']">
            </IconPark>
        </div>
        <div class="flex flex-1 items-center justify-between pr-4">
            <div class="inline-flex flex-1 items-center">
                <div v-for="topMenu in topMenus" :key="topMenu.key" @click="menuClick(topMenu)"
                    :class="['text-sm  py-2 px-4 cursor-pointer hover: whitespace-nowrap', currentKey == topMenu.key ? ' font-bold hover:' : '']">
                    {{ topMenu.label }}
                </div>
                <SearchPop />
            </div>
            <el-button type="primary" size="small" @click="changeLanguage">切换语言</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import IconPark from '@/components/common/IconPark.vue'
import { Left, Right } from '@icon-park/vue-next'
import { useMenu } from '@/components/layout/menu/useMenu'
import SearchPop from './SearchPop.vue'
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import en from "element-plus/dist/locale/en.mjs";
import { language } from '@/utils/injectionKey';

let local = inject(language)
const changeLanguage = () => {
    local?.value.name == 'zh-cn' ? local!.value = en : local!.value = zhCn
};
const router = useRouter();

const { topMenus, menuClick, currentKey } = useMenu()
const iconParKProps = {
    strokeWidth: 2,
    size: 22
}
const prevCanUse = ref(false)
const nextCanUse = ref(false)
function goPrevPage() {
    if(History.length === 0) return
    router.back()
    prevCanUse.value = !!History.length
}
function goNextPage() {
    router.forward()
}
</script>
