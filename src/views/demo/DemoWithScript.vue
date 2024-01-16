<template>
  <Demo title="title"></Demo>
  <button @click="log">{{msg}}</button>
  <button @click="count++">{{count}}</button>

  <h1 v-my-directive>测试指令</h1>
</template>

<script setup>
//声明props
const props=defineProps({
  foo:String
})
//声明emits
const emits=defineEmits(['change','delete'])


// import {myDirective as vMyDirective} from './xx.js'
import Demo from './Demo.vue'
import {ref} from 'vue'

//顶层绑定变量
const msg='Hello'
const count=ref(0)

//顶层绑定函数
function log(){
  console.log(msg);
}

//他们必须遵循 vNameOfDirective 这样的命名规范：
const vMyDirective={
  beforeMount:(el)=>{
     // 在元素上做些操作
  }
}

defineExpose({
  count,
  msg
})


</script>
