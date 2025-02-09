<template>
  <button @click="count++">{{ count }}</button>
  {{ title }}
</template>

<script setup>
import { ref,onMounted } from 'vue'
//声明props
const props = defineProps({
  title: {
    type: String,
    default: 'title'
  }
})
const count = ref(1)

onMounted(() => {
  console.log(props.title);
})

//子组件需要把响应式变量暴露出去
defineExpose({
  count,
})
</script>
