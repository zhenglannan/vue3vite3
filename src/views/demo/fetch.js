import { ref, watchEffect, toValue } from 'vue'

// url可以是静态 URL 字符串、ref 和 getter
export function useFetch (url) {
  const data = ref(null)
  const error = ref(null)

  const fetchData = () => {
    data.value = null
    error.value = null

    //toValue() 是一个在 3.3 版本中新增的 API。它的设计目的是将 ref 或 getter 规范化为值
    fetch(toValue(url))
      .then(res => res.json())
      .then(json => (data.value = json))
      .catch(err => (error.value = err))
  }

  watchEffect(() => {
    fetchData();
  })

  return { data, error }
}