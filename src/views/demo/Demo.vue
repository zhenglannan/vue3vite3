<template>
  <button @click="count++">{{ count }}</button>
  {{title}}
</template>

<script>
import {ref} from  'vue'
 export default{
  props:{
    title:String
  },

  setup(props){
    const count=ref(0)
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
