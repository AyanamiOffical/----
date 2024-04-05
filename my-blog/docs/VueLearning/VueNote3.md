---
title: VueNote3
date: 2023.8.1
sidebar: 'auto'
categories: 
  - 前端
tags:
  - vuelearning
---

**5.组件**

5.1.1 全局注册组件

一个Vue组件在使用之前需要先被注册，这样在渲染的时候才能找到对应的实现

可以使用`app.component(name,Component)`注册组件的方法
```javascript
import login from './components/login.vue'
const app = createApp(App)
app.use(router)
app.mount('#app')

 <login></login>

```
5.1.2 局部注册

选项式：可以使用components选项来局部注册组件
```html
<template>

</template>
<!-- 使用注册的组件-->
<script>
//引入需要的组件
import login from './components/login.vue'
export default {
components : {
    //选项式注册组件
    "login" : login
}
}
</script>
```
组合式的使用方法：

```html
<template>
</template>
<!-- 使用注册的组件-->
<script setup>
//引入需要的组件
import login from './components/login.vue'
```

5.2 传递数据[父 -> 子]

如果父组件需要向子组件传递数据，需要在子组件中声明`props`来接收传递数据的属性，可以使用字符串数组或者是对象式来声明props

使用组件的标签上采用属性方式传递的props，可以使用`v-bind`或者`:`来绑定属性

组件中props数据是只读的，不可以直接修改，`只能通过父组件进行更改`

在组合式api中：
- a. 可以采用defineProps宏来声明接受传递的数据
- b. 在js中使用defineProps返回的对象来访问声明的自定义属性
- c. 在试图模板中，可以直接访问defineProps中声明的属性

```html
<script setup>
import { ref } from 'vue'
import button22 from './views/vueEx/button.vue'
let iserror= ref(false)
let isFlat = ref(false)
let btntext = ref('普通按钮')
</script>

<template>
  主题： <input type="checkbox" v-model="iserror">
  阴影： <input type="checkbox" v-model="isFlat">
  文本： <input type="text" v-model="btntext">
  <!--父向子传值，可以采用属性方式赋值-->
 <button22 :title="提交" :error="true" :flat="false"/>
</template>
```
```html
<template>\
    <!--在视图模板上可以直接使用props声明的属性-->
  <button :class="{error,flat}"
  >
  {{title}}
</button>
</template>

<script setup>
    //采用的是字符串数组的形式
defineProps(['title','error','flat'])
</script>

<style>
button {
border : none;
padding : 12px 25px 

}
.error{
    background-color: bisque;
    .0
    color: red;
     
}
.flat{
    box-shadow: 0 0 10px grey;
}
```
还有一种采用的是对象的形式

对象声明的props，可以对传进来的值进行校验，如果传入的值不满足类型要求，会在浏览器提示警告

对象形式声明的props，key是prop的名称，值则是约束的条件

对象中的属性：

1. type：string，number，boolean，array，object，Date，functional，Symbol
2. default：默认值，对象或者数组应当用工厂函数返回
3. required：是否必须填的，布尔值
4. validator：自定义校验。函数类型

一些补充细节：

+ 所有 prop 默认都是可选的，除非声明了 required: true。

+ 除 Boolean 外的未传递的可选 prop 将会有一个默认值 undefined。

+ Boolean 类型的未传递 prop 将被转换为 false。这可以通过为它设置 default 来更改——例如：设置为 default: undefined 将与非布尔类型的 prop 的行为保持一致。

+ 如果声明了 default 值，那么在 prop 的值被解析为 undefined 时，无论 prop 是未被传递还是显式指明的 undefined，都会改为 default 值。

+ 当 prop 的校验失败后，Vue 会抛出一个控制台警告 (在开发模式下)。

+ 如果使用了基于类型的 prop 声明 ，Vue 会尽最大努力在运行时按照 prop 的类型标注进行编译。举例来说，defineProps<{ msg: string }> 会被编译为 { msg: { type: String, required: true }}。
  
```html
<script>
    defineProps({
        // 基础类型检查
        // （给出 `null` 和 `undefined` 值则会跳过任何类型检查）
        propA: Number,
        // 多种可能的类型
        propB: [String, Number],
        // 必传，且为 String 类型
        propC: {
            type: String,
            required: true
        },
        // Number 类型的默认值
        propD: {
            type: Number,
            default: 100
        },
        // 对象类型的默认值
        propE: {
            type: Object,
            // 对象或数组的默认值
            // 必须从一个工厂函数返回。
            // 该函数接收组件所接收到的原始 prop 作为参数。
            default(rawProps) {
                return { message: 'hello' }
            }
        },
        // 自定义类型校验函数
        propF: {
            validator(value) {
                // The value must match one of these strings
                return ['success', 'warning', 'danger'].includes(value)
            }
        },
        // 函数类型的默认值
        propG: {
            type: Function,
            // 不像对象或数组的默认，这不是一个工厂函数。这会是一个用来作为默认值的函数
            default() {
                return 'Default function'
            }
        }
    })
</script>
```
另一个就是选项式声明

```html
<script>
    export default {
        props: {
            // 基础类型检查
            //（给出 `null` 和 `undefined` 值则会跳过任何类型检查）
            propA: Number,
            // 多种可能的类型
            propB: [String, Number],
            // 必传，且为 String 类型
            propC: {
                type: String,
                required: true
            },
            // Number 类型的默认值
            propD: {
                type: Number,
                default: 100
            },
            // 对象类型的默认值
            propE: {
                type: Object,
                // 对象或者数组应当用工厂函数返回。
                // 工厂函数会收到组件所接收的原始 props
                // 作为参数
                default(rawProps) {
                    return { message: 'hello' }
                }
            },
            // 自定义类型校验函数
            propF: {
                validator(value) {
                    // The value must match one of these strings
                    return ['success', 'warning', 'danger'].includes(value)
                }
            },
            // 函数类型的默认值
            propG: {
                type: Function,
                // 不像对象或数组的默认，这不是一个工厂函数。这会是一个用来作为默认值的函数
                default() {
                    return 'Default function'
                }
            }
        }
    }
</script>
```

**5.3 组件事件 [子 -> 父]**

有的时候，父组件在使用子组件时，子组件如何给父组件传值呢？
1. 子组件声明自定义的事件
2. 子组件中触发自定义事件（可传值）
   
   在选项式 API 中，可通过组件当前实例this.$emit(event, ...args)来触发当前组件自定义的事件

   在组合式 API 中，可调用defineEmits宏返回的emit(event, ...args)函数来触发当前组件自定义的事件
其中上方两个参数分别为：
● event：触发事件名，字符串类型
● ...args：传递参数，可没有，可多个
1. 父组件使用子组件时监听对应的自定义事件，并执行父组件中的函数（获取子组件传递的值）
   
在选项式 API 中，子组件可通过emits选项来声明自定义的事件
```javascript

    export default {
        emits: ['inFocus', 'submit'],
        this.$emit('infocus',30)
    }
```

```javascript
export default {
    // 自定义事件
    emits: ['changeAge'],
    methods: {
        emitAgeEvent() {
            // 触发自定义事件 changeAge，并传递参数 1，20
            this.$emit('changeAge', 1, 20)
        }
    }
}
```

```html
<script>
import ButtonVue from './components/Button.vue';
export default {
    components: { ButtonVue },
    data: () => ({
        startAge: 0, // 开始年龄 
        endAge: 0 // 结束年龄
    }),
    methods: {
        // 子组件触发事件的回调函数
        addAge(start_age, end_age) {
            console.log('----------------');
            console.log(start_age)
            console.log(end_age)
            this.startAge = start_age
            this.endAge = end_age
        }
    }
}
</script>

<template>
    <h3>
        开始年龄：{{ startAge }}
    </h3>
    <h3>
        结束年龄：{{ endAge }}
    </h3>

    <!-- 使用引入的组件，并通过属性传递数据 -->
    <ButtonVue @change-age="addAge" />
</template>
```
使用v-on:event="callback"或者@event="callback"来监听子组件是否触发了该事件
1. event：事件名字（camelCase 形式命名的事件，在父组件中可以使用kebab-case形式来监听）
2. callback：回调函数，如果子组件触发该事件，那么在父组件中执行对应的回调函数，回调函数声明参数可自动接收到触发事件传来的值 
```html
<template>
    <button @click="emitAgeEvent">触发自定义事件</button>
    <hr>
    <!-- 触发自定义事件 changeAge，并传递参数 30 -->
    <button @click="$emit('changeAge', 30)">触发自定义事件</button>
</template>
```
同时在父组件中，需要指定事件
```html
<zizujian
@change-age-and-name = "getNweAgeAndName"
@change-age="getNewAge"
/>
```
以下是组合式api的例子
```html
<script setup>
    
defineEmits({
    autoEvent1: null, // 无需校验
    // 需要校验，param 可以是多个参数，返回布尔值来表明事件是否合法
    autoEvent2: (param) => {
        // true 则通过
        // false 则不通过，可以在控制台输入警告语句
    }
})
    
</script>
```
```html
<script setup>

// 自定义事件，并返回 emit 函数
const emit = defineEmits(['changeAge'])

function emitAgeEvent() {
    // 触发自定义事件 changeAge，并传递参数 1，20
    emit('changeAge', 1, 20)
}
</script>

<template>
    <button @click="emitAgeEvent">触发自定义事件</button>
    <hr>
    <!-- 触发自定义事件 changeAge，并传递参数 30 -->
    <button @click="emit('changeAge', 30)">触发自定义事件</button>
</template>
```
```html
<script setup>
import { ref } from 'vue';

import ButtonVue from './components/Button.vue';

let startAge = ref(0)
let endAge = ref(0)

// 子组件触发事件的回调函数
function addAge(start_age, end_age) {
    console.log('----------------');
    console.log(start_age)
    console.log(end_age)
    startAge.value = start_age
    endAge.value = end_age
}
</script>

<template>
    <h3>
        开始年龄：{{ startAge }}
    </h3>
    <h3>
        结束年龄：{{ endAge }}
    </h3>
    
    <!-- 使用引入的组件，并通过属性传递数据 -->
    <ButtonVue @change-age="addAge" />
</template>
```
**采用对象式声明自定义事件**，还可以进行校验传递的参数是否符合预期要求
对象式声明自定义事件中，属性名为自定义事件名，属性值则是是否验证传递的参数：
1. 属性值为null则不需要验证
2. 属性值为函数时，参数为传递的数据，函数返回true则验证通过，返回false则验证失败，验证失败可以用警告语句提示开发者【注意：无论是true还是false都会继续执行下去的，父组件都会获取到传递的值】
   
```javascript
    export default {
        emits: {
            autoEvent1: null, // 无需校验
            // 需要校验，param 可以是多个参数，返回布尔值来表明事件是否合法
            autoEvent2: (param) => {
                // true 则通过
                // false 则不通过，可以在控制台输出警告语句
            }
        }
    }

```
5.4 透传属性和事件

1. 透传属性和事件并没有在子组件中用props和emits声明
2. 透传属性和事件最常见的如@click和class、id、style
3. 当子组件只有一个根元素时，透传属性和事件会自动添加到该根元素上；如果根元素已有class或style属性，它会自动合并

以下是两个方式的父组件
```html
<script>
import ChipVue from './components/Chip.vue'

export default {
    components: { ChipVue },
    methods:{
        say(){
            alert('Hello')
        }
    }
}
</script>

<template>
    <!-- 透传的属性（style，class，title）在子组件中并没有在 props 声明 -->
    <!-- 透传的事件（click）在子组件中并没有在 emits 声明 -->
    <ChipVue
        class="rounded"
        style="border: 1px solid blue;"
        title="纸片"
        @click="say"
    />
</template>
```
```html
<script setup>
import ChipVue from './components/Chip.vue';

function say() {
    alert('Hello')
}
</script>

<template>
    <!-- 透传的属性（style，class，title）在子组件中并没有在 props 声明 -->
    <!-- 透传的事件（click）在子组件中并没有在 emits 声明 -->
    <ChipVue
        class="rounded"
        style="border: 1px solid blue;"
        title="纸片"
        @click="say"
    />
</template>
```
以下是子组件
```html
<template>
    <!-- 
        当子组件只有一个根元素时，透传属性和事件会自动添加到该根元素上
        如果根元素已有 class 或 style 属性，它会自动合并
     -->
    <button class="chip" style="box-shadow: 0 0 8px grey;">
        普通纸片
    </button>
</template>

<style>
.chip {
    border: none;
    background-color: rgb(231, 231, 231);
    padding: 8px 15px;
}

.rounded {
    border-radius: 100px;
}
</style>
```

那么如何禁止呢？
1. 当子组件只有一个根元素时，透传属性和事件会自动添加到该根元素上，那怎么阻止呢？
2. 在选项式 API 中，你可以在组件选项中设置inheritAttrs: false来阻止；
3. 在组合式 API 的script setup中，你需要一个额外的script块来书写inheritAttrs: false选项声明来禁止
   
同样分为选项式和组合式

选项式
```html
<script>
import ChipVue from './components/Chip.vue'

export default {
    components: { ChipVue },
    methods:{
        say(){
            alert('Hello')
        }
    }
}
</script>

<template>
    <!-- 透传的属性（style，class，title）在子组件中并没有在 props 声明 -->
    <!-- 透传的事件（click）在子组件中并没有在 emits 声明 -->
    <ChipVue
        class="rounded"
        style="border: 1px solid blue;"
        title="纸片"
        @click="say"
    />
</template>
```
```html
<script>
export default {
    inheritAttrs: false // 阻止自动透传给唯一的根组件
}
</script>

<template>
    <!-- 
        当子组件只有一个根元素时，透传属性和事件会自动添加到该根元素上
        如果根元素已有 class 或 style 属性，它会自动合并
     -->
    <button class="chip" style="box-shadow: 0 0 8px grey;">
        普通纸片
    </button>
</template>

<style>
.chip {
    border: none;
    background-color: rgb(231, 231, 231);
    padding: 8px 15px;
}

.rounded {
    border-radius: 100px;
}
</style>
```
下面是组合式
```html
<script setup>
import ChipVue from './components/Chip.vue';

function say() {
    alert('Hello')
}
</script>

<template>
    <!-- 透传的属性（style，class，title）在子组件中并没有在 props 声明 -->
    <!-- 透传的事件（click）在子组件中并没有在 emits 声明 -->
    <ChipVue
        class="rounded"
        style="border: 1px solid blue;"
        title="纸片"
        @click="say"
    />
</template>
```
```html
<script>
export default {
    inheritAttrs: false // 阻止自动透传给唯一的根组件
}
</script>

<!-- 
    在组合式 API 的 <script setup> 中，
    你需要一个额外的 <script> 块来书写 inheritAttrs: false 选项声明来禁止 
-->
<script setup></script>

<template>
    <!-- 
        当子组件只有一个根元素时，透传属性和事件会自动添加到该根元素上
        如果根元素已有 class 或 style 属性，它会自动合并
     -->
    <button class="chip" style="box-shadow: 0 0 8px grey;">
        普通纸片
    </button>
</template>

<style>
.chip {
    border: none;
    background-color: rgb(231, 231, 231);
    padding: 8px 15px;
}

.rounded {
    border-radius: 100px;
}
</style>
```
多根节点的组件并没有自动“透传属性和事件”的行为，由于Vue不确定要将“透传属性和事件”透传到哪里，所以我们需要`v-bind="$attrs"`来显式绑定，否则将会抛出一个运行时警告

从3.3开始，组合式API中可直接在script setup中使用 `defineOptions({inheritAttrs: false}) `来禁止自动透传属性和事件

5.4.4 访问“透传属性和事件”

`1. 在选项式 API 中，我们可通过this.$attrs来访问“透传属性和事件”`

`2. 在组合式 API 中的script setup中引入useAttrs()来访问一个组件的“透传属性和事件”`
   
注意：
● 虽然这里的attrs对象总是反映为最新的“透传属性和事件”，但它并不是响应式的 (考虑到性能因素)，你不能通过侦听器去监听它的变化
● 如果你需要响应性，可以使用prop或者你也可以使用onUpdated()使得在每次更新时结合最新的attrs执行副作用
```html
<script>
import ChipVue from './components/Chip.vue'

export default {
    components: { ChipVue },
    methods:{
        say(){
            alert('Hello')
        }
    }
}
</script>

<template>
    <!-- 透传的属性（style，class，title）在子组件中并没有在 props 声明 -->
    <!-- 透传的事件（click）在子组件中并没有在 emits 声明 -->
    <ChipVue
        class="rounded"
        style="border: 1px solid blue;"
        title="纸片"
        @click="say"
    />
</template>
```
```html
<script>
export default {
    methods: {
        // 在 JS 中访问透传的属性和事件
        showAttrs() {
            console.log(this.$attrs) 
            console.log(this.$attrs.class) 
            console.log(this.$attrs.title) 
            console.log(this.$attrs.style) 
            this.$attrs.onClick()
        }
    }
}
</script>

<template>
    <button class="chip" v-bind="$attrs">
        普通纸片
    </button>

    <hr>

    <h6>{{ $attrs }}</h6>

    <ul>
        <li>{{ $attrs.title }}</li>
        <li>{{ $attrs.class }}</li>
        <li>{{ $attrs.style }}</li>
    </ul>

    <button @click="$attrs.onClick()">执行透传的事件</button>

    <hr>

    <button @click="showAttrs">在 JS 中访问透传的属性和事件</button>
</template>

<style>
.chip {
    border: none;
    background-color: rgb(231, 231, 231);
    padding: 8px 15px;
    margin: 10px;
}

.rounded {
    border-radius: 100px;
}
</style>
```
5.5 **插槽**

在某些场景中，可能需要为子组件传递一些模板片段，让子组件在它们的组件中渲染这些片段，为此 vue 提供了组件的插槽

在封装组件时，可以使用<slot>元素把不确定的、希望由用户指定的部分定义为插槽；`插槽可以理解为给预留的内容提供占位符`

插槽也可以提供默认内容，如果组件的使用者没有为插槽提供任何内容，则插槽内的默认内容会生效

注意：如果在封装组件时没有预留任何<slot>插槽，用户提供传递一些模板片段将会被遗弃
```html
<script setup>
import CardVue from './components/Card.vue'
</script>

<template>
    <CardVue>
        <!-- 向子组件插槽中提供内容 -->
        <button>关闭</button>
    </CardVue>
</template>
```
```html
<template>
    <div class="card">
        <h2 class="title"></h2>
        <div class="subtitle"></div>
        <div class="content"></div>
        <div class="action">
            <!-- 定义一个插槽 -->
            <!-- 插槽的默认内容，只有没有提供内容时，才会显示 -->
            <slot>卡片功能区域</slot>
        </div>
    </div>
</template>

<style>
.card {
    width: 250px;
    border: 1px solid black;
}

.card h2,
.card div {
    margin: 10px;
    padding: 5px;
}

.title {
    border: 1px solid red;
}

.subtitle {
    border: 1px solid green;
}

.content {
    border: 1px solid blue;
}

.action {
    border: 1px solid pink;
}
</style>
```

5.5.2 具名插槽
1. 如果在封装组件时需要预留多个插槽节点，则需要为每个slot插槽指定具体的name名称，这种带有具体名称的插槽叫做“具名插槽”
2. 没有指定name名称的插槽，会有隐含的名称叫做 default
3. 在template元素上使用 v-slot:slotName或者#slotName向指定的具名插槽提供内容
```html
<script>
import CardVue from './components/Card.vue'
export default {
    components: { CardVue },
}
</script>

<template>
    <CardVue>
        <!-- v-slot:slotName 向具名插槽提供内容 -->
        <template v-slot:cardTitle>
            博客
        </template>

		<!-- #slotName 向具名插槽提供内容 -->
        <template #cardSubtitle>
            <i>百万博主分享经验</i>
        </template>

        <!-- 向子组件默认插槽中提供内容 -->
        <!-- <button>关闭</button> -->

        <template #default>
            <button>关闭</button>
        </template>
    </CardVue>
</template>
```
```html
<template>
    <div class="card">
        <h2 class="title">
            <!-- 带有 name 的属性的插槽，称为具名插槽 -->
            <slot name="cardTitle"></slot>
        </h2>
        <div class="subtitle">
            <slot name="cardSubtitle"></slot>
        </div>
        <div class="content">
            <slot name="cardContent"></slot>
        </div>
        <div class="action">
            <!-- 定义一个插槽 -->
            <!-- 插槽的默认内容，只有没有提供内容时，才会显示 -->
            <!-- 没有 name 属性的插槽称为默认插槽，会有一个隐含的名字：default -->
            <slot>卡片功能区域</slot>
        </div>
    </div>
</template>

<style>
.card {
    width: 250px;
    border: 1px solid black;
}

.card h2,
.card div {
    margin: 10px;
    padding: 5px;
}

.title {
    border: 1px solid red;
}

.subtitle {
    border: 1px solid green;
}

.content {
    border: 1px solid blue;
}

.action {
    border: 1px solid pink;
}
</style>
```
5.5.3 作用域插槽

如何在向插槽提供的内容时获得子组件域内的数据呢？
1. 在声明插槽时使用属性值的方式来传递子组件的数据，这种带有数据的插槽称之为作用域插槽
2. 在template元素上使用v-slot:slotName="slotProps"或#slotName="slotProps"的方式来访问插槽传递属性值
3. 如果没有使用template元素，而是直接在使用子组件中直接给默认插槽提供内容，我们可以在使用该子组件时用v-slot="slotProps"来接收该插槽传递的数据对象

注意：slot插槽上的name是一个Vue特别保留的属性，不会在作用域插槽中访问到


**5.6 单文件组件css功能**

默认情况下，写在.vue组件中的样式会全局生效，很容易造成多个组件之间的样式冲突问题
导致组件之间样式冲突的根本原因是：
1. 单页面应用程序中，所有组件的DOM结构，都是基于唯一的index.html页面进行呈现的
2. 每个组件中的样式，都会影响整个index.html页面中的DOM元素
   
5.6.1 组件作用域css

当style标签带有scoped属性的后：
1. 它的CSS只会影响当前组件的元素，父组件的样式将不会渗透到子组件中
2. 该组件的所有元素编译后会自带一个特定的属性
3. 该style scoped内的选择器，在编译后会自动添加特定的属性选择器
4. 子组件的根节点会同时被父组件的作用域样式和子组件的作用域样式影响，主要是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式
转换前
```html
<style scoped>
.error {
    color: red;
}
</style>

<template>
    <div class="error">hi</div>
</template>
```
转换后
```html
<style>
.error[data-v-f3f3eg9] {
    color: red;
}
</style>

<template>
    <div class="example" data-v-f3f3eg9>hi</div>
</template>
```
案例
```html
<script setup>
import ButtonVue from './components/Button.vue';
</script>

<template>
    <div class="error">
        <h3>【父】标题</h3>
        <button>【父】普通按钮</button>
    </div>

    <hr>
    <ButtonVue />
</template>

<!-- 
    scoped 属性，
    让下方的选择器的样式只作用在该组件中，或者子组件的根元素上 
-->
<style scoped>
h3 {
    border: 1px solid blue;
}

.error {
    border: 1px solid red;
    padding: 15px;
}
</style>
```
```html
<template>
    <div class="error">
        <h3>【子】标题</h3>
        <button>【子】普通按钮</button>
    </div>
</template>
```
5.6.2 深度选择器

处于scoped样式中的选择器如果想要做更“深度”的选择，即影响到子组件，可以使用:deep()这个伪类
```html
<style scoped>
    .a :deep(.b) { /* ... */ }	
</style>
<style>
    .a[data-v-f3f3eg9] .b { /* ... */ }
</style>
```
案例
```html
<script setup>
import ButtonVue from './components/Button.vue';
</script>

<template>
    <div class="error">
        <h3>【父】标题</h3>
        <button>【父】普通按钮</button>
    </div>

    <hr>
    <ButtonVue />
</template>

<!-- 
    scoped 属性，
    让下方的选择器的样式只作用在该组件中，或者子组件的根元素上
    该组件中的所有元素及子组件中的根元素会加上固定的属性（data-v-~）
    该 css 选择器都会自动添加固定的属性选择器（[data-v-~]）
-->
<style scoped>
h3 {
    border: 1px solid blue;
}

.error {
    border: 1px solid red;
    padding: 15px;
}

/* 如果想在 style scoped 中让样式作用到子组件中，那么可以使用 :deep() 伪类选择器 */
.error:deep(button) {
    border: 2px solid green;
    padding: 8px 15px;
}
</style>
```
```html
<template>
    <div class="error">
        <h3>【子】标题</h3>
        <button>【子】普通按钮</button>
    </div>
</template>
```
5.6.3 css的v-bind()

1. 单文件组件的style标签支持使用v-bindCSS函数将CSS的值链接到动态的组件状态
2. 这个语法同样也适用script setup，且支持JavaScript表达式（需要用引号包裹起来）
3. 实际的值会被编译成哈希化的CSS自定义属性，因此CSS本身仍然是静态的
4. 自定义属性会通过内联样式的方式应用到组件的某个元素上，并且在源值变更的时候响应式地更新

```html
<script setup>
import { reactive } from 'vue';

// 按钮主题
let btnTheme = reactive({
    backColor: '#000000', // 背景色
    textColor: '#FFFFFF' // 文本色
})
</script>

<template>
    <button>普通按钮</button>

    <hr>

    背景色：<input type="color" v-model="btnTheme.backColor">
    文本色：<input type="color" v-model="btnTheme.textColor">
</template>


<style scoped>
    button {
        /* 使用 v-bind() 可以使用该组件的中数据源，如果绑定的数据源值发生变化，则样式也会随着更新 */
        background-color: v-bind('btnTheme.backColor');
        color: v-bind('btnTheme.textColor');
    }
</style>
```
5.7 依赖注入

如果有一个深层的子组件需要一个较远的祖先组件中的部分数据，如果实现呢？
1. 可使用props沿着组件链逐级传递下去，如图 
2. 我们可在祖先组件使用provide提供数据，后代组件使用inject注入数据
   
![alt text](image.png)

![alt text](image-1.png)

7.7.1 provide提供

在应用层方面可通过app.provide()为后代提供数据

```javascript
import { createApp } from 'vue'
const app = createApp({ })
app.provide('message', 'hello!') // message 注入名， 'hello' 值
```

在选项式 API 中，可通过provide选项为后代组件提供数据

```javascript
export default {
    // 为后代组件提供数据选项
    provide: { title: '博客!' } // message：注入名，'hello'：值
}
```
如果想访问到组件的实例this，provide必须采用函数的方式（不能用箭头函数），为保证注入方和供给方之间的响应性链接，必须借助组合式 API 中的computed()函数提供计算属性，还可以提供修改响应式数据的函数（响应式数据的修改，尽量放在同一个组件中，为了好维护）
```javascript
export default {
    data: () => ({
        title: '博客',
        subtitle: '百万博主分享经验'
    }),
    methods: {
        changeSubtitle(sub) {
            this.subtitle = sub
        }
    },
    // 使用函数的形式，可以访问到组件的实例 `this`
    provide() {
        return {
            // 传递数据的值为数据源 title，此方式注入方和供给方之间没有响应性链接
            title: this.title,
            // 传递数据的值为数据源 subtitle，此方式注入方和供给方之间具有响应性链接
            subtitle: computed(() => this.subtitle),
            // 为后代组件提供修改响应式数据 subtitle 的函数
            changeSubtitle: this.changeSubtitle
        }
	}
}
```
provide选项中通过computed函数提供的响应式的数据，需要设置app.config.unwrapInjectedRef = true以保证注入会自动解包这个计算属性。这将会在 Vue 3.3 后成为一个默认行为，而我们暂时在此告知此项配置以避免后续升级对代码的破坏性。在 3.3 后就不需要这样做了。

同样有组合式
```javascript
<script setup>
import { ref, provide } from 'vue'

const message = 'hello'
const title = ref('博客')
const subtitle = ref('百万博主分享经验')

function changeSubtitle(sub) {
    this.subtitle = sub
}

provide('message', message) // 提供固定数据
provide('title', title) // 提供响应式数据
provide('subtitle', subtitle) // 提供响应式数据
provide('changeSubtitle', changeSubtitle) // 为后代组件提供修改响应式数据 subtitle 的函数
</script>
```

5.7.2 注入

1. 在选项式 API 中，可通过inject选项来声明需要注入祖先组件提供的数据，他们可以在JS中直接通过this来访问，在视图模板中也可直接访问
```javascript
export default {
    // 注入祖先组件提供的数据
    inject: ['message', 'title', 'subtitle', 'changeSubtitle'] 
}
```
2. inject采用对象的形式来注入祖先组件提供的数据有哪些好处？
  a. 可用本地属性名注入祖先组件提供的数据（如相同时，from选项可省略）
  b. 如果注入的数据并没有在祖先组件中提供，则会抛出警告，可采用defalut选项设置默认值来解决
 ```javascript

  export default {
    // 注入祖先组件提供的数据
    inject: {
        c_message: { 
            from: 'message', // 注入的哪个数据
        },
        // 本地属性名和需要注入的数据名一致时，from 可省略
        title, // 普通数据
        c_subtitle: {from: 'subtitle'}, // 响应式数据
        c_changeSub: {from: 'changeSubtitle'}, // 修改响应式数据 subtitle 的函数
        c_content: {
            from: 'content', // 祖先组件并未提供 content，则会报警告
            default: '暂时还未有内容' // 设置默认值（可为函数等），解决警告问题
        } 
    }
}
```
在组合式 API 中，使用inject()函数的返回值来注入祖先组件提供的数据
1. 如果提供数据的值是一个ref，注入进来的会是该ref对象，和提供方保持响应式连接
2. 如果注入的数据并没有在祖先组件中提供，则会抛出警告，可在provide()函数的第二个参数设置默认值来解决
3. 他们可以在JS和视图模板中直接访
```javascript
<script setup>
import { inject } from 'vue'

const c_message = inject('message')
const title = inject('title')
const c_subtitle = inject('subtitle')
const c_changeSub = inject('changeSubtitle')
// 祖先组件并未提供 content，则会报警告，设置默认值来解决
const c_content = inject('content',  '暂时还未有内容') 
</script>
```

