---
title: VueNote2
date: 2023.7.30
sidebar: 'auto'
categories:
  - 前端
tags:
  - vuelearning
---

**3.侦听器**
>https://cn.vuejs.org/guide/essentials/watchers.html

**3.1 选项式侦听**

在选项式 API 中，我们可以使用 watch 选项在每次响应式属性发生变化时触发一个函数。

3.1.1 函数侦听

watch中声明的函数就是函数侦听，其中函数名就是侦听数据源，参数1是新数据值，参数2是旧的数据值

```html
<template>
    年龄<input type="number" v-model="age">
    <hr>
    员工名字<input type="string" v-model="emp.name">
</template>

<script>
export default {
  data: () => ({
    age: 30,
    emp : {
        name : 'jack',
        salary : 15000
    }
  }),
  watch: {
    //侦听器
    age(newData, oldData) {
      console.log("新的age" + newData + "以及旧的age" + oldData);
    },
  },
  'emp.name'(newData,oldData){
    console.log("新的name" + newData + "以及旧的name" + oldData)
  }
};
</script>]
```
3.1.2 对象侦听

声明数据源对象就是对象侦听，对象里面的handler就是发生变化之后需要执行的代码块
```javascript
 age:{
        handler(newData, oldData) {
      console.log("新的age" + newData + "以及旧的age" + oldData);
    }
  },
  ```
**deep**:直接侦听对象

watch默认是浅层的，被侦听的属性仅仅在赋新值的死后才会触发回调函数，嵌套的属性不会发生变化

如果想要侦听所有嵌套的变更，需要使用deep : true选项,但是前后值都会一样

只有改变侦听对象的值的时候，新旧值才会不一样

深度侦听会遍历所有的属性，会有一定开销
```javascript
 age:{
    deep : true,
    handler(newData, oldData) {
      console.log("新的age" + newData + "以及旧的age" + oldData);
    }
  },
  ```
  **immediate**

  watch默认是懒执行，只有当数据源变化的时候执行回调，当我们希望创建侦听器后立即执行的时候，需要设置immediate为true.

  **flush**

默认情况下，用户创建的侦听器回调都会在Vue组件更新之前被调用，这意味着此时访问的vue的dom是更新之前的状态

如果想要指定侦听器回调中能够访问Vue更新之后的dom，需要指明

flush : 'post'
```html
<template>
  <h2 id="titleAccount">
    最新账号: <span>{{ account }}</span>
  </h2>
  员工账户<input type="text" v-model="account" />
</template>1

<script>
1;
export default {
  data: () => ({
    account: "abc",
    watch: {
      //侦听器默认情况下，回调函数中访问dom是更新之前的状态
      account: {
        flush : 'post',
        handler(newData, oldData) {
          console.log(newData + "和" + oldData);
          console.log(document.getElementById("titleAccount").innerHTML)
        },
      },
    },
  }),
};
```
3.1.3 this.$watch侦听器

使用组件实例的$watch方法来命令式的`创建`

语法： this.$watch(data,method,object)

同时需要声明周期函数mounted(){
   this.$watch() 后接匿名函数
}

- data是侦听的数据源，类型为string
- method是回调函数，参数1是新值，参数2是旧值
- object是相关配置 
- a.   deep深度侦听
- b.   immediate创建时候立即触发
- c.   flush : 'post' 更改回调机制

需要`自行停止侦听器`的时候，这时可以调用$watch()api返回的函数

stopXXXWatch : null

this.stopXXXWatch = this.$watch() 后接匿名函数

**3.2 组合式侦听**

组合式api中我们可以使用watch函数或者是watchEffect函数在每次响应式状态变化时触发对应的回调函数

1. source:需要侦听的数据源，可以是ref(包括计算属性)，一个响应式对象，一个getter函数，或者多个数据源组成的数组

```javascript
let emp = ref({
    name : 'jack',
    salary : 10000
})
watch(
    () => emp.salary,
    (newData, oldData) => {
  console.log(newData + "和" + oldData);
    }
)
```
2. callback：回调函数

a. 侦听单个数据源，回调函数第一个数据是新值，第二个是旧值

b.侦听多个数据源的数组，一个参数数组是新值，另一个是旧值
```javascript
const emp = reactive({
    name : 'jack',
    salary : 10000
})
const dept = reactive({
    name : 'jacky',
    salary : 100000
})
watch(
     [dept,() => emp],
    ([newData, newEmp],[oldData,oldEmp]) => {
  console.log(newData );
  console.log(newEmp)
  console.log(oldData)
  console.log(oldEmp)
    },
    { deep : true}
)
```
3. options ： 配置，Object类型

a.deep : true深度侦听，一般是用来侦听getter返回的值
b.immediate : true 创建好侦听器立即执行
c.flush : true更改回调的触发机制

```html
<script setup>
import { ref ,watch} from "vue";
let account  = ref('abc')
watch(account,(newData, oldData) => {
          console.log(newData + "和" + oldData);
          console.log(document.getElementById("titleAccount").innerHTML)
        })
        </script>
```
侦听对象的时候，嵌套属性值发生变化，也会触发回调函数，新旧值一样

如果嵌套属性值发生变化，默认情况下无法触发回调函数(提供了getter函数)
```javascript
const emp = reactive({
    name : 'jack',
    salary : 10000
})
watch(
     () => emp,
    (newData, oldData) => {
  console.log(newData );
  console.log(oldData)
    },
    { deep : true}
)
```
停止侦听器，只需要调用watch函数
```html
<script>
let stopWatch = watch(
     [dept,() => emp],
    ([newData, newEmp],[oldData,oldEmp]) => {
  console.log(newData );
  console.log(newEmp)
  console.log(oldData)
  console.log(oldEmp)
    },
    { deep : true}
)
</script>
<button @click="stopWatch"></button>
```
watchEffect函数会立即执行一遍回调函数，如果产生了副作用，vue会自动追踪副作用的依赖关系，自动分析响应源

触发机制是：默认都会在vue组件更新前被调用，想要使用更新后的dom

一种是设置flush为post,另一种是watchPostEffect函数里面匿名回调
```javascript
watchEffect(() =>{
    console.log(account.value)
} )
```

# 4.计算属性

模板的表达式虽然方便，但是只能做简单的操作，写太多逻辑的话会很臃肿

```html
<!--简单的逻辑-->
<template>
  <div>
    年龄: <input type="number" v-model.lazy="age">
    <h1>
        年龄阶段 ： {{ age < 18 ? 'junior':'senior' }}
    </h1>
  </div>
</template>

<script setup>
import { ref } from "vue";

let age = ref(20)
```
使用computed之后(组合式)
```html
<template>
  <div>
    年龄: <input type="number" v-model.lazy="age">
    <h1>
        年龄阶段 ： {{ agestate  }}
    </h1>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

let age = ref(20)
let agestate = computed(() => {
    if(age.value < 18){
        return '少年'
    }else if (age.value >= 18 && age.value < 100) {
        return '顶真'
    }
})
```
```javascript
export default {
    computed : {
        
    }
}