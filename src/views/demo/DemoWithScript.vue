<template>
  <DemoItem title="title" ref="DemoItem"></DemoItem>
  <button @click="log">{{ msgg }}</button>
  <!-- <button @click="count++">{{count}}</button> -->
  <button @click="increase($event)">increase {{ count }}</button>

  <h1 v-my-directive>测试指令{{ foo }}</h1>
  <p class="testColor">x</p>


  <p class="testColor">{{ fullName }}</p>
  <input type="text" v-model="fullName">
  <p class="testColor">结合：{{ firstName }}{{ lastName }}</p>


  <p :class="[{active:isActive},testColor]">class动态数组</p>
  <p :class="[{[activeClass]:isActive},testColor]">class动态数组2</p>


  <input @keyup.enter="submit">
  <input @keyup.page-down="onPageDown">
  <!-- alt+enter -->
  <input @keyup.alt.enter="onPageDown">
  <!-- ctrl+点击 -->
  <input @click.ctrl="onPageDown">
  <!-- 只点击ctrl-->
  <input @click.ctrl.exact="onPageDown">

  <input v-model.number="age" />

  <input ref="my-input">

  <ul>
    <li v-for="item in list" :key="item.id" ref="items">{{ item.name }}</li>
  </ul>

</template>

<script setup>
// import {myDirective as vMyDirective} from './xx.js'
import DemoItem from './DemoItem.vue'
import { ref, computed, onMounted, watch, watchEffect ,useTemplateRef,onWatcherCleanup } from 'vue'
import {useFetch} from './fetch'
//声明props
const props = defineProps({
  foo: {
    type: String,
    default: 'xx'
  }
})
//声明emit
const emit = defineEmits(['change', 'delete'])



//顶层绑定变量
const msg = 'Hello'
const msgg = ref('xx')
const count = ref(0)
const isActive = ref(true)
const activeClass=ref('active')
const theme = ref({
  color: 'red'
})

const obj = ref({
  count: 0
})
const age = ref(20)

const firstName = ref('John')
const lastName = ref('Doe')

const list = ref([
  { id: 1, name: 'John' },
  { id: 2, name: 'Alice' },
  { id: 3, name: 'Bob' }
])

const fullName = computed({
  get () {
    return firstName.value + " " + lastName.value
  },
  set (val) {
    [firstName.value, lastName.value] = val.split(" ")
  }
})

// 获取组件
const inputRef=useTemplateRef('my-input')
const itemRefs=useTemplateRef('items')
const DemoItemRef=useTemplateRef('DemoItem')

const {data,error} =useFetch();

//* 
// 不能直接侦听响应式对象的属性值,需要用一个返回该属性的 getter 函数
//在 Vue 3.5+ 中，deep 选项还可以是一个数字，表示最大遍历深度——即 Vue 应该遍历对象嵌套属性的级数
// 
watch(() => obj.value.count, (nVal, oVal) => {
  debugger
})
// 直接侦听一个响应式对象时，侦听器会自动启用深层模式
//nval 与oval一样
watch(obj.value, (nVal, oVal) => {
  debugger
})
//ref基础数据
watch(count, (nVal, oVal) => {
  debugger

  // todo 清理副作用???
  onWatcherCleanup(()=>{
    console.log("cleanup");
  })
})

//watchEffect 是一个更高阶的 watch ��听器，它可以让您在 effect 函数中执行副作用逻辑，并在 effect 停止时自动解除对其的依赖
// 回调会立即执行，不需要指定 immediate: true,我们不再需要明确传递 参数 作为源值。
watchEffect(async () => {
  debugger
  const x = await fetch(`https://jsonplaceholder.typicode.com/todos/${count.value}`)
  msgg.value = await x.json()
})



onMounted(() => {
  console.log(props.foo);
  emit('change')

  inputRef.value.focus();  
  console.log(itemRefs.value);//Proxy(Array) {0: li, 1: li, 2: li}
  console.log(DemoItemRef.value.count);//1
  
})
//顶层绑定函数
function log () {
  console.log(msg);
}
//event:原生 DOM 事件
function increase (event) {
  count.value++;
  obj.value.count++;
}

function submit (event) {
  debugger
}
function onPageDown (event) {
  debugger
}

//他们必须遵循 vNameOfDirective 这样的命名规范：
const vMyDirective = {
  beforeMount: (el) => {
    // 在元素上做些操作
  }
}



//子组件使用<script setup>需要把响应式变量暴露出去,父组件才可以访问
defineExpose({
  count,
  msg
})

</script>
<style scoped>
.testColor {
  color: v-bind('theme.color');
}
.active{
  color: rgb(106, 0, 255);
}
</style>
