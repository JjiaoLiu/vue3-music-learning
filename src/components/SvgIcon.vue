<template>
  <svg aria-hidden="true" :width="props.size" :height="props.size">
    <use :xlink:href="symbolId" :fill="props.color" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#f00'
  },
  size: {
    type: String,
    default: '22px'
  }
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>