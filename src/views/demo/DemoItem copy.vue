<template>
  <button @click="count++">{{ count }}</button>
  {{title}}
</template>

<script>
import {ref} from  'vue'
 export default{
  name:'DemoItem',
  props:{
    title:String
  },

  setup(props){
    //定义变量
    const count=ref(1)
    //props不要解构
    console.log(props.title);

    return {
      count
    }
  },

  mounted(){
    console.log(this.count);
  }
 }
</script>
