---
title: VueNote1
date: 2023.7.29
sidebar: 'auto'
categories: 
  - 前端
tags:
  - vuelearning
---

**开始** 
>https://cn.vuejs.org/guide/essentials/template-syntax.html


1.ref函数和reactive函数

reactive函数只对对象类型有效（对象，数组，map，Set），对原始类型无效

使用ref函数我们可以创建任何类型的响应式数据，获取的时候需要通过 
.value 来进行获取；当值为对象类型的时候，会用reactive自动转换其.value

2.模板语法

通过模板语法，是我们能够声明式将组件实例的数据绑定到呈现的dom上

2.1 `内容渲染`

2.1.1 `v-text`

能够将数据采用纯文本的方式填充到`空元素 `当中

```javascript

<template>
  <div v-text="student.name"></div>
  <div v-text="student.desc"></div>
  <!-- 以下的代码会报错
   因为div元素不是空元素
  <div v-text="student.name"></div>
  <div v-text="student.desc">我也是数据</div>
  -->
</template>

<script >
import { reactive, ref } from 'vue'
let student = ref({
    name : "jacky",
    desc :  '<h3>我是顶真</h3>'
})
export default {
    data : () => ({
        student : {
            name : "jack",
            desc :  '<h3>我是顶真</h3>'
        }
})
}
</script>

<style>

</style>
```

2.1.2 v-html

使用这个指令，会将数据采用html语法填充到空元素中
同样有组合式和选项式
```javascript
<template>
  <div v-html="student.name"></div>
  <div v-html="student.desc"></div>
  <!-- 以下的代码会报错
   因为html元素不是空元素
  <div v-text="student.name"></div>
  <div v-html="student.desc">我也是数据</div>
  -->
</template>

<script >
import { reactive, ref } from 'vue'
let student = ref({
    name : "jacky",
    desc :  '<h3>我是顶真</h3>'
})
```
2.1.3 插值表达式
{{?}}
在元素中的某一个位置采用纯文本的位置渲染数据
```html
<div>这是一个div元素，{{student.name}},{{student.desc}}</div>
```

2.2 `双向绑定`

2.2.1 **v-model**

双向绑定指令，视图数据和数据源同步
一般情况该指令用在表单元素中
```javascript
<template>
<input type="text" v-model="innertext">
</template>

<script >
import { reactive, ref } from 'vue'
export default {
    data : () => ({
       innertext : "abc"
})
}
</script>
```
+ 1.文本类型的 input标签和textarea标签 元素会绑定`value属性并且侦听事件`.
+ input type="checkbox"或者是radio属性的话会`绑定checked属性`并且监听change事件.
+ select属性会绑定value属性并且侦听change事件
+ 自定义复选框首部 ， true-value/false-value

 2.2.2 `v-model修饰符`

| 修饰符  | 作用                                                    | 示例                 |
| ------- | ------------------------------------------------------- | -------------------- |
| .number | 自动将用户的输入值转换为数值类型`/`转换不了就不更新数据 | v-model.number="age" |
| .trim   | 自动过滤用户输入的首尾空白字符                          | v-model.trim="msg"   |
| .lazy   | 在change后面时而非input更新                             | v-model.lazy="msg"   |
------ 


**2.3 属性绑定**

响应式的绑定一个元素的属性，应该使用v-bind

如果绑定的值是null或者是underfined，那么该属性会从渲染的元素上移除

特定的简写语法  `:`
```html
<template>
<img v-bind:src="picture.src" v-bind:width="picture.width">
<input type="number" :width="picture.width">
<input type="number" v-model="picture.width">
</template>
<script>
export default {
    data : () => ({
        picture :{
            width : 200,
            src : https://www.bilibili.com/
        }
    })
}
</script>
```
## 2.3.1 动态绑定多个值
```html
<template>
  <button v-bind="attrs">我是一个按钮</button>
</template>
    <script>
import { ref } from "vue";
let attrs = ref({
  class: "error",
  id: "borderBlue",
});
export default {
  data: () => ({
    attrs,
  }),
};
</script>
<style>
.error {
  background-color: antiquewhite;
  color: aquamarine;
}
#borderBlue {
  border: 2px solid rgb(44, 67, 167);
}
</style>
```
2.3.2 绑定class和style属性

二者可以直接绑定动态的字符才能，但是通过简单的拼接是容易出问题的，
vue专门为其设计了功能增强，表达式的值可以是数组或者是对象
```html
<button :class="attrs">我是一个按钮</button>
<button 
:class= " {'rounded' : capsule , 'fullwidth' : block }"
>
</button>
  ```

2.4 条件渲染指令

2.4.1 v-if 指令是用来条件性的渲染元素，返回真值才被渲染

v-else-if和v-else必须配合if使用

v-if是一个不可见的包装器元素，最后渲染的并不会包括template元素
```javascript
<template>
    <input type="checkbox" v-model="isShow">
  <h v-if="isShow">这是一个标题标签</h>
  <h1 v-else>否则展示的</h1>
</template>

<script>
export default {
data : () => ({
    isShow : false
})
}
</script>
```

2.4.2 v-show

+ v-show按照条件渲染一个元素的指令
+ v-show会在dom渲染中保留这个元素
+ v-show仅切换元素名字上的display的css属性
+  v-show不支持在template上面使用，也不能和v-else使用
+ v-if有着更高的切换开销，v-show是更高的初始渲染开销，频繁切换用show，if适合绑定条件很少改变
```html
<template>
    

年龄: <input type="range" min="0" max="100" v-model="age" >{{ age }}
<h1 v-show="age < 18">未成年</h1>
<h1 v-show="age >= 18 && age < 30">成年</h1>
<h1 v-show="age >= 30 && age < 50">中年</h1>
<h1 v-show="age >= 50 ">老年</h1>

</template>
```
**2.5 事件绑定**

我们可以使用v-on指令（简写@）来监听dom事件，并且在事件触发时候执行

对应的js代码

用法： v-on:click="" /  @click=""

```javascript
<button v-on:click="addvolume()">添加音量</button>
```

2.5.1 **事件修饰符**

| 事件修饰符 | 说明                                              |
| ---------- | ------------------------------------------------- |
| .prevent   | 阻止默认行为                                      |
| .stop      | 阻止事件冒泡                                      |
| .capture   | 以捕获的方式触发当前事件处理函数                  |
| .once      | 绑定的事件只触发一次                              |
| .self      | 只有在event.target 是当前元素自身时候触发事件处理 |
| .passice   | 向浏览器表明不想阻止事件默认行为                  |

```html
<!--默认阻止跳转到百度页面-->
<a href="http://baidu.com" @click.prevent="say('baidu')">baidu</a>
<!--
     1.capture的使用,当元素产生冒泡时候先触发带有capture的事件
     2.当元素存在多个capture修饰符，则由外向内依次触发
     -->
<div class="divArea" @click="say('div-1')">
    <div class="divArea" @click.capture="say('div-2')">
       <div class="divArea" @click="say('div-3')">
        <button></button>
        </div>
    </div>
</div>
<!-- event.preventDefault()阻止默认行为-->
```
2.5.2 按键修饰符

+ 按键别名.enter,.tab,.esc,.space,.up,.down,.left,.right,.delete
+ 系统修饰符.ctrl,.alt,.shify,.meta
+ 准确的修饰符.exact

2.5.3 鼠标按键修饰
+ .left,.right,.middle
  
# 2.6 列表渲染指令 

2.6.1 v-for渲染数组

语法：

1. in 前一个参数 : item in items

item : 值

items : 需要循环的数组

2. in 前两个参数 : (value , index ) in items
item : 值，index：索引，items：需要循环的数组
```javascript
let subject = ref({
    {id : 1, name : 'gin'},
    {id : 2, name : 'gorm'}
})
<li>v-for="in subject"</li>
```

2.6.2 渲染对象

使用v-for能够遍历对象所有的属性

遍历的顺序会按照该对象调用Object.keys()的返回值来决定

1. in 前一个参数 : value in object
2. in 前两个参数 : (value , name键 ) in object
3. in 前三个参数 : (value , name , index ) in object 

2.6.3 通过key管理状态

数组添加.value.unshift()后

默认的性能优化策略可能会导致有状态的列表无法被正确更新

例如：勾选框加上添加项目后，添加的会替代掉之前勾选的项目

这样，给每个添加key属性

+ 1.key类型只能是number / string
+ 2.key值必须具有唯一性
+ 3.建议在循环过程中有一个属性当key
+ 4.不建议索引当key
+ 5.使用v-for时候建议一定使用key