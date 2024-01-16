<template>
  <button @click="count++">{{ count }}</button>
  {{ title }}
</template>

<script>
import { ref } from 'vue'
export default {
  props: {
    title: String
  },

  setup(props,{attrs,slots,emit,expose}) {
    const count = ref(0)
    console.log(props.title);
    console.log(attrs);//透传 Attributes（非响应式的对象，等价于 $attrs）
    console.log(slots);//插槽（非响应式的对象，等价于 $slots）
    console.log(emit);//触发事件（函数，等价于 $emit）
    console.log(expose);//暴露公共属性（函数）

    return {
      count
    }
  },

  mounted() {
    console.log(this.count);
  }
}
</script>
