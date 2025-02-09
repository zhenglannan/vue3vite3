<template>
  <DemoItem title="title"></DemoItem>
  <button @click="log">{{xx}}</button>
  <!-- <button @click="count++">{{count}}</button> -->
  <button @click="increase">xx {{count}}</button>

  <h1 v-my-directive>测试指令{{foo}}</h1>
  <p class="testColor">x</p>
</template>

<script setup>
// import {myDirective as vMyDirective} from './xx.js'
import DemoItem from './DemoItem.vue'
import { ref,computed,onMounted } from 'vue'

//声明props
const props = defineProps({
  foo: {
    type:String,  
    default:'xx'
  }
})
//声明emits
const emits = defineEmits(['change', 'delete'])



//顶层绑定变量
const msg = 'Hello'
const msgg = ref('xx')
const count = ref(0)
const theme=ref({
  color:'red'
})

const xx=computed(()=>{
  return count.value?(msgg.value='大于0'):(msgg.value='等于0')
})
onMounted(()=>{
  console.log(props.foo);
})
//顶层绑定函数
function log () {
  console.log(msg);
}
function increase () {
  count.value++;
}

//他们必须遵循 vNameOfDirective 这样的命名规范：
const vMyDirective = {
  beforeMount: (el) => {
    // 在元素上做些操作
  }
}

//?需要把响应式变量暴露出去
defineExpose({
  count,
  msg
})


</script>
<style scoped>
 .testColor {
    color: v-bind('theme.color');
  }
</style>
