---
title: VueNote4
date: 2023.8.14
sidebar: 'auto'
categories: 
  - 前端
tags:
  - vuelearning
---
>https://cn.vuejs.org/guide/essentials/lifecycle.html

**6. 生命周期**

每个 Vue 组件实例在创建时都需要经历一系列的初始化步骤，比如设置好数据侦听，编译模板，挂载实例到 DOM，以及在数据改变时更新 DOM。在此过程中，它也会运行被称为生命周期钩子的函数，让开发者有机会在特定阶段运行自己的代码。

最常用的是created、mounted、updated和unmounted。
![alt text](image-2.png)

`组件【实例化阶段】的生命周期函数`

1. beforeCreate
  a. beforeCreate选项式声明周期函数

  b. 在组件实例初始化之前调用（props解析已解析、data和computed等选项还未处理）

  c. 不能访问组件的实例this及其组件中的数据源和函数等

  d. 不能访问组件中的视图DOM元素

  e. 组合式 API 中的setup()钩子会在所有选项式 API 钩子之前调用

2. created
   
  a. created选项式生命周期函数

  b. 在组件实例化成功后调用

  c. 可访问组件的实例this及其组件中的数据源和函数等

  d. 不能访问组件中的视图DOM元素

`组件【视图渲染阶段】的生命周期函数`

1. beforeMount/onBeforeMount
  a. beforeMount：选项式生命周期函数、onBeforeMount：组合式生命周期钩子

  b. 组件视图在浏览器渲染之前调用

  c. 可访问组件实例东西（数据源、函数、计算属性等）

  d. 不能访问组件视图中的DOM元素

2. mounted/onMounted
  a. mounted：选项式生命周期函数、onMounted：组合式生命周期钩子

  b. 组件视图在浏览器渲染之后调用

  c. 可访问组件实例东西（数据源、函数、计算属性等）

  d. 可以访问组件视图中的DOM元素

`组件【运行阶段】的生命周期函数`
1. beforeUpdate/onBeforeUpdate
   
  a. beforeUpdate：选项式生命周期函数、onBeforeUpdate：组合式生命周期钩子

  b. 数据源发生变化时，组件视图重新渲染之前调用

  c. 可访问组件实例东西（数据源、函数、计算属性等）

  d. 可以访问该组件中在更新之前的DOM元素，但是不能访问该组件中在更新之后的DOM元素

2. updated/onUpdated 
  a. updated：选项式生命周期函数、onUpdated：组合式生命周期钩子

  b. 数据源发生变化时，组件视图重新渲染之后调用

  c. 可访问组件实例东西（数据源、函数、计算属性等）

  d. 不可以访问该组件中在更新之前的DOM元素，但是可以访问该组件中在更新之后的DOM元素

`组件【卸载阶段】的生命周期函数`
1. beforeUnmount/onBeforeUnmount
2. 
  a. beforeUnmount：选项式生命周期函数、onBeforeUnmount：组合式生命周期钩子

  b. 组件实例被卸载之前调用

  c. 可访问组件实例东西（数据源、函数、计算属性等）

  d. 可以访问组件视图中的DOM元素

1. unmounted/onUnmounted
   
  a. unmounted：选项式生命周期函数、onUnmounted：组合式生命周期钩子

  b. 组件实例被卸载之后调用

  c. 可访问组件实例东西（数据源、函数、计算属性等）

  d. 不可以访问组件视图中的DOM元素

  e. 一般在这个生命周期函数里，我们可以手动清理一些副作用，例如计时
  器、DOM事件监听器或者与服务器的连接

案例
```html
<script setup>
import { onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref } from 'vue';

let age = ref(30)

function showMessage() {
    console.log('HELLO')
}

// 组件视图渲染之前
// 能访问组件实例的东西（数据源、函数等）
// 但是不能访问组件视图中的 DOM 元素
onBeforeMount(() => {
    console.log('------------------------')
    console.log('onBeforeMount 组件视图渲染之前（生命周期钩子）')
    console.log(age.value)
    showMessage()
    console.log('不能访问组件视图中的 DOM 元素');
    // console.log(document.getElementById('title').innerHTML)
})

// 组件视图渲染之后
// 能访问组件实例的东西（数据源、函数等）
// 可以访问组件视图中的 DOM 元素
onMounted(() => {
    console.log('------------------------')
    console.log('onMounted 组件视图渲染之后（生命周期钩子）')
    console.log(age.value)
    showMessage()
    console.log(document.getElementById('title').innerHTML)
})

// 数据源发生变化，组件视图重新渲染之前
// 能访问组件实例的东西（数据源、函数等）
// 能访问组件视图渲染之前的 DOM 元素
onBeforeUpdate(() => {
    console.log('------------------------')
    console.log('onBeforeUpdate 数据源发生变化，组件视图重新渲染之前（生命周期钩子）')
    console.log(age.value)
    showMessage()
    console.log(document.getElementById('title').innerHTML)
})

// 数据源发生变化，组件视图重新渲染之后
// 能访问组件实例的东西（数据源、函数等）
// 能访问组件视图渲染之后的 DOM 元素
onUpdated(() => {
    console.log('------------------------')
    console.log('onUpdated 数据源发生变化，组件视图重新渲染之后（生命周期钩子）')
    console.log(age.value)
    showMessage()
    console.log(document.getElementById('title').innerHTML)
})

// 组件卸载之前
// 能访问组件实例的东西（数据源、函数等）
// 能访问组件视图 DOM 元素
onBeforeUnmount(() => {
    console.log('------------------------')
    console.log('onBeforeUnmount 组件卸载之前（生命周期钩子）')
    console.log(age.value)
    showMessage()
    console.log(document.getElementById('title').innerHTML)
}) 

// 组件卸载之后
// 能访问组件实例的东西（数据源、函数等）
// 不能访问组件视图 DOM 元素
onUnmounted(() => {
    console.log('------------------------')
    console.log('onUnmounted 组件卸载之后（生命周期钩子）')
    console.log(age.value)
    showMessage()
    console.log('不能访问组件视图中的 DOM 元素');
    // console.log(document.getElementById('title').innerHTML)
}) 

</script>

<template>
    <h3 id="title">
        <i>年龄：{{ age }}</i>
    </h3>
    <button @click="(age = 70)">年龄改成 70</button>
    <button @click="(age = 30)">年龄改成 30</button>
</template>
```

**7. 模板引用**

如果需要直接访问组件中的底层DOM元素，可使用vue提供特殊的ref属性来访问

7.1 访问模板引用

1. 在视图元素中采用ref属性来设置需要访问的DOM元素
   
  a. 该ref属性可采用字符值的执行设置

  b. 该ref属性可采用v-bind:或:ref的形式来绑定函数，其函数的第一个参数则为该元素

2. 如果元素的ref属性值采用的是字符串形式
   
  a. 在选项式 API JS中，可通过this.$refs来访问模板引用

  b. 在组合式 API JS中，我们需要声明一个同名的ref变量，来获得该模板的引用
```html
<script setup>
import { ref } from 'vue';

// 账号输入框
let account = ref(null) // ref 变量名和账号输入框中的 ref 属性值一样

function changeAccountInputStyle() {
    console.log(account.value)
    account.value.style = 'padding: 10px'
    account.value.className = 'rounded'
    account.value.focus()
}

// ------------------------------------------------------------------------
  
// 密码输入框元素
let passwordEl = ref(null)

function passwordRef(el) {
    passwordEl.value = el // el 元素是密码输入框
}

function changePasswordInputStyle() {
    console.log(passwordEl.value)
    passwordEl.value.style = 'padding: 10px'
    passwordEl.value.className = 'rounded'
    passwordEl.value.focus()
}
</script>


<template>
    <!-- ref 字符串值形式 -->
    账号输入框：<input type="text" ref="account">
    <button @click="changeAccountInputStyle">改变账号输入框的样式</button>

    <hr>

    <!-- ref 函数形式：元素渲染后，会立即执行该函数-->
    密码输入框：<input type="password" :ref="passwordRef">
    <button @click="changePasswordInputStyle">改变密码输入框的样式</button>
</template>

<style>
.rounded {
    border-radius: 15px;
}
</style>
```

7.2 v-for的模板引用

当在v-for中使用模板引用时：
1. 如果ref值是字符串形式，在元素被渲染后包含对应整个列表的所有元素【数组】
2. 如果ref值是函数形式，则会每渲染一个列表元素则会执行对应的函数【不推荐使用】

注意：需要v3.2.25及以上版本
```html
<script setup>
import { onMounted, ref } from 'vue';

// 书本
let books = ref([
    { id: 1, name: '海底两万里' },
    { id: 2, name: '骆驼祥子' },
    { id: 3, name: '老人与海' },
    { id: 4, name: '安徒生童话' },
])

let bookList = ref(null)

onMounted(() => {
    console.log(bookList.value); // 获取引用的 DOM 对象，并打印，发现那么是数组，
    bookList.value[2].className = 'error'
})
</script>

<template>
    <ul>
        <li v-for="b in books" :key="b.id" ref="bookList">
            {{ b.name }}
        </li>
    </ul>
</template>

<style>
.error {
    border: 1px solid red;
}
</style>
```
7.3 组件模板引用(组件里面的ref)

模板引用也可以被用在一个子组件上；这种情况下引用中获得的值是组件实例
1. 如果子组件使用的是选项式 API ，默认情况下父组件可以随意访问该子组件的数据和函数，除非在子组件使用expose选项来暴露特定的数据或函数，expose值为字符串数组
2. 如果子组件使用的是组合式 API script setup，那么该子组件默认是私有的，则父组件无法访问该子组件，除非子组件在其中通过defineExpose宏采用对象形式显式暴露特定的数据或函数

```html
<script setup>
import { ref } from 'vue'
import LoginVue from './components/Login.vue'

let loginView = ref(null)

function showSonData() {
    console.log(loginView.value.account)  // 访问子组件的 acccount 数据
    console.log(loginView.value.password)  // 访问子组件的 password 数据
    loginView.value.toLogin() // 调用子组件的 toLogin 函数
}
</script>

<template>
    <h3>登陆界面</h3>
    <hr>
    <!-- 组件上的 ref 的值为该组件的实例 -->
    <LoginVue ref="loginView" />
    <hr>

    <button @click="showSonData">查看子组件中的信息</button>
</template>
```
**8.路由**

创建路由模块
1. 在项目中的src文件夹中创建一个router文件夹，在其中创建index.js模块
2. 采用createRouter()创建路由，并暴露出去
3. 在main.js文件中初始化路由模块app.use(router)

```javascript
import { createRouter } from 'vue-router'

// 创建路由
const router = createRouter({
    // ……
})

export default router // 暴露出去
```
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'  // 引入路由模块
let app = createApp(App)

app.use(router) // 初始化路由插件

app.mount('#app')
```
规定路由模式

history路由模式可采用：
1. createWebHashHistory()：Hash模式
2. 
  a. 它在内部传递的实际URL之前使用了一个哈希字符#，如https://example.com/#/user/id

  b. 由于这部分 URL 从未被发送到服务器，所以它不需要在服务器层面上进行任何特殊处理

1. createWebHistory()：html5模式，推荐使用
   
  a. 当使用这种历史模式时，URL会看起来很“正常”，如https://example.com/user/id

  b. 由于我们的应用是一个单页的客户端应用，如果没有适当的服务器配置，用户在浏览器中直接访问https://example.com/user/id，就会得到一个404错误；要解决这个问题，你需要做的就是在你的服务器上添加一个简单的回退路由，如果URL不匹配任何静态资源，它应提供与你的应用程序中的index.html相同的页面


使用路由规则

routes配置路由规则：
- path：路由分配的URL
- name：当路由指向此页面时显示的名字
- component：路由调用这个页面时加载的组件

import { createRouter, createWebHistory } from 'vue-router'
import BlogHomeView from '@/views/BlogHomeView.vue'
```javascript
let routes = [
    {
        path: '/home', // URL 地址
        name: 'home',  // 名称
        component: () => import('@/views/HomeView.vue')  // 渲染该组件
    },
    {
        path: '/blog',
        name: 'blog',
        component: BlogHomeView
    }
]

// 创建路由
const router = createRouter({
    history: createWebHistory(), // 使用 history 模式路由
    routes // 路由规则
})

export default router // 将路由对象暴露出去
```

声明路由链接和占位符

在组件模板中声明路由连接和占位符

router-link：路由链接，to属性则为点击此元素，需要切换的路由地址

router-view：路由占位符，路由切换的视图展示的位置
```html
<template>
	<!--   路由链接，点击是路由地址会切换到属性 to 的地方   -->
    <router-link to="/home">首页</router-link>
    |
    <router-link to="/blog">博客</router-link>
    
    <hr>
    
	<!--   路由试图，路由切换组件展示的地方   -->
    <router-view/>
</template>
```

8.2 重定向路由

在路由规则中，可采用redirect来重定向另一个地址
```javascript
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
  
let routes = [
    {
        path: '/',
        redirect: '/home' // 如果访问是 / 则强制跳转到 /home
    },
    {
        path: '/home',
        component: HomeView
    },
    {
        path: '/blog',
        component: () => import('@/views/BlogHomeView.vue')
    }
]
  
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
```
8.3 嵌套路由

1. 在某一个路由规则中采用children来声明嵌套路由的规则
2. 嵌套路由规则中的path不能以/开头，访问需使用/father/son的形式

8.4路径参数
1. 很多时候，我们需要将给定匹配模式的路由映射到同一个组件，例如：想渲
   染不同博客的内容，其实只是渲染到同一个组件上，只是博客的编号不同而已

2. 在Vue Router中，可以在路径中使用一个动态字段来实现，我们称之为“路径参数” ，语法如：path: '/url/:param'
   
3. 在展示的组件中访问路径参数
   
  a. 在选项式 APIJS中采用this.$route.params来访问，试图模板上采用$route.params来访问

  b. 在组合式 API 中，需要import { useRoute } from 'vue-router'，JS和视图模板上通过useRoute().params来访问

  c. 还可以通过在路由规则上添加props: true，将路由参数传递给组件的props中

```html
<script setup>
import { useRoute } from 'vue-router'

const routeObj = useRoute() // 获取的跳转的路由对象
const propsData = defineProps(['id'])

function showRouteParams() {
    console.log(routeObj.params) // 获取路由路径参数对象
    console.log(routeObj.params.id) // 获取路由路径参数对象指定的属性
    console.log(propsData.id) // 在 props 取出路由路径参数
}
</script>

<template>
    <div class="blog-content">
        博客详情界面
        <ul>
            <li>{{ routeObj.params }}</li>
            <li>{{ routeObj.params.id }}</li>
            <li>{{ id }}</li>
        </ul>
        <button @click="showRouteParams">在 JS 中获取路由路径参数</button>
    </div>
</template>

<style scoped>
div.blog-content {
    padding: 50px;
    background-color: rgb(228, 78, 190);
}
</style>
```
```html
<script>
export default {
    props: ['id'],
    methods: {
        showRouteParams() {
            console.log(this.$route.params) // 获取路由路径参数对象
            console.log(this.$route.params.id) // 获取路由路径参数对象指定的属性
            console.log(this.id) // 在 props 取出路由路径参数
        }
    }
}
</script>

<template>
    <div class="blog-content">
        博客详情界面
        <ul>
            <li>{{ $route.params }}</li>
            <li>{{ $route.params.id }}</li>
            <li>{{ id }}</li>
        </ul>
        <button @click="showRouteParams">在 JS 中获取路由路径参数</button>
    </div>
</template>

<style scoped>
div.blog-content {
    padding: 50px;
    background-color: rgb(228, 78, 190);
}
</style>
```

`8.5 声明式导航 / 编程式导航`

8.5.1 导航到不同的位置

声明式|编程式
-|- 
router-link :to="..."  | 【选项式】this.$router.push(...) 
                 |【组合式】useRouter().push(...)
----

会向history栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，会回到之前的URL

编程式的router.push(...)的语法
1. 其的参数可以是一个字符串路径，或者一个描述地址的对象
2. 如果参数是描述地址的对象的话，其对象中path和params不能同时使用
选项式
```javascript
this.$router.push('/home') // 简单的字符串地址

this.$router.push({ path : '/home' }) // 路径地址对象 path（路由地址）

this.$router.push({ name : 'home' }) // 路径地址对象 name（路由名称）


// --------------------- 嵌套路由 -------------------------

this.$router.push('/school/english') // 简单的字符串地址

this.$router.push({ path : '/school/english' }) // 路径地址对象 path（路由地址）

this.$router.push({ name : 'schoo-english' }) // 路径地址对象 name（路由名称）


// --------------------- 路径传参 -------------------------
const id_one = 110
const id_two = 119
const id_three = 120

this.$router.push(`/blog-content/${ id_one }`) // 简单的字符串地址

this.$router.push({ path : `/blog-content/${ id_two }`}) // 路径地址对象 path（路由地址）

this.$router.push({ name : 'blog-content' , params: { id_three } }) // 路径地址对象 name（路由名称）
```
组合式
```javascript
import { useRouter } from 'vue-router'

const router = useRouter()


// ====================================================================
router.push('/home') // 简单的字符串地址
router.push({ path : '/home' }) // 路径地址对象 path（路由地址）
router.push({ name : 'home' }) // 路径地址对象 name（路由名称）


// --------------------- 嵌套路由 -------------------------

router.push('/school/english') // 简单的字符串地址
router.push({ path : '/school/english' }) // 路径地址对象 path（路由地址）
router.push({ name : 'schoo-english' }) // 路径地址对象 name（路由名称）


// --------------------- 路径传参 -------------------------
const id_one = 110
const id_two = 119
const id_three = 120

router.push(`/blog-content/${ id_one }`) // 简单的字符串地址
router.push({ path : `/blog-content/${ id_two }`}) // 路径地址对象 path（路由地址）
router.push({ name : 'blog-content' , params: { id_three } }) // 路径地址对象 name（路由名称）
```
8.5.2 替换当前位置

![alt text](<屏幕截图 2024-02-12 165340.png>)

```javascript
// ----------------- 选项式的 JS 中 -------------------

this.$router.push({ path: '/home', replace: true })

this.$router.replace({ path: '/home' })
```
```javascript
// ----------------- 组合式的 JS 中 -------------------
import { useRouter } from 'vue-router'
const router = useRouter()

router.push({ path: '/home', replace: true })

router.replace({ path: '/home' })
```

8.5.3 路由历史

![alt text](<屏幕截图 2024-02-12 165512.png>)

1. router.go(1)：前进1条记录，相当于router.forward()
2. router.go(-1)：后退1条记录，相当于router.back()
3. 如果前进或者后退的步数大于实际的历史记录数，则什么都不会发生

`8.6 路由守卫`

8.6.1 全局前置守卫
>https://router.vuejs.org/zh/guide/advanced/navigation-guards.html

每次发生路由的导航跳转时，都会触发全局前置守卫，因此，在全局前置守卫中，程序员可以对每个路由进行访问权限的控制

使用router.beforeEach((to, from, next) => {})注册一个全局前置守卫

1. to：将要访问的路由信息对象
2. from：将要离开的路由信息对象
3. next：函数
   
  a. 调用next()表示放行，允许这次路由导航

  b. 调用next(false)表示不放行，不允许此次路由导航

  c. 调用next({ routerPath })表示导航到此地址，一般情况用户未登录时，会导航到登陆界面

```javascript
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BlogHomeView from '@/views/BlogHomeView.vue'
import LoginView from '@/views/LoginView.vue'
import MainHomeView from '@/views/admin/MainHomeView.vue'
import UserManagerView from '@/views/admin/UserManagerView.vue'

// 路由规则
const routes = [
    {
        path: '/', 
        redirect: '/home' // 重定向地址
    },{
        path: '/home', // 路由地址
        name: 'home', // 路由名称
        component: HomeView
    },{
        path: '/blog', 
        name: 'blog', 
        component: BlogHomeView
    },{
        path: '/login', 
        name: 'login', 
        component: LoginView
    },{
        path: '/admin/main', 
        name: 'admin-main', 
        meta: { isLogin : true }, // 自定 mate 属性，isLogin：是否需要用户登录
        component: MainHomeView
    },{
        path: '/admin/user', 
        name: 'admin-user', 
        meta: { isLogin : true },
        component: UserManagerView
    }
]

// 创建路由对象
const router = createRouter({
    history: createWebHistory(), // 采用 html 5 路由模式
    routes
})

// 注册全局前置守卫
// to：将要访问的路由信息对象
// from：将要离开的路由信息对象
router.beforeEach((to, from, next) => {

    // 判断将要访问的路由信息对象是否需要用户登录
    if (to.meta.isLogin) {
        let userLogin = localStorage.getItem('loginUser') // 获取存储对象
        // 判断用户是否已经登陆了
        if(userLogin == null) {
            // 未登录 --> 跳转至登录页
            return next({ path: '/login' }) 
        }
    }

    return next() // 放行
})

// 将路由对象暴露出去
export default router
```


**9.pinia状态管理库**

Pinia是Vue的专属状态管理库，它允许你跨组件或页面共享状态

```javascript
import { createApp } from 'vue'
import App from './App.vue'

// 引入 createPinia 函数
import { createPinia } from 'pinia'

const app = createApp(App)

// 使用 createPinia() 来创建 Pinia（根存储），并应用到整个应用中
app.use(createPinia())

app.mount('#app')
```

1. store是一个保存状态和业务逻辑的实体，它并不与你的组件树绑定；换句话说，它承载着全局状态；它有点像一个永远存在的组件，每个组件都可以读取和写入它
   
2. store它有三个概念，state、getters和actions，我们可以l理解成组件中的data、computed和methods
   
3. 在项目中的src\store文件夹下不同的store.js文件
   
4. store是用defineStore(name, function | options)定义的，建议其函数返回的值命名为use...Store方便理解
  a. 参数name：名字，必填值且唯一

  b. 参数function|options：可以是对象或函数形式

    ■ 对象形式【选项模式】，其中配置state、getters和actions选项
    ■ 函数形式【组合模式，类似组件组合式API的书写方式】，定义响应式变
    量和方法，并且return对应的变量和方法；ref()相当于state，computed
    ()相当于getters，function()相当于actions

```javascript
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// 创建 store，并暴露出去
// 参数一：名字，必填值且唯一
// 参数二：组合式书写方式采用函数形式
export const useStore = defineStore('main', () => {   
    
    // ref 变量  --->  state
    // computed() 计算属性  --->  getters 
    // functions 函数  --->  actions

    return { 
        // 暴露出去 变量，函数，计算属性即可
    }
})
```
9.3 state

state是store的核心部分，主要存储的是共享的数据

1. `store`采用的是选项式模式时，state选项为函数返回的对象，在其定义共享的数据
 ```javascript
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  	// 共享的数据，为函数返回的对象形式
    state: () => ({
        age: 27,
        level: 5,
        account: 'SD77842',
        nickname: '自古风流'
    })
})
```
2. `store`采用的是组合式模式时，在其函数内定义的ref变量，最终return出去来提供共享的数据
```javascript
import {defineStore} from "pinia";
import {ref} from "vue";

export const useUserStore = defineStore('user', () => {
    const age = ref(27)
    const level = ref(5)
    const account = ref('SD77842')
    const nickname = ref('自古风流')
    
    return { age, level, account, nickname } // 将数据暴露出去，共享给需要的组件
})
```
那么如何在组件中访问呢？

1. 在选项式 API 组件中，可以使用mapState(storeObj, array | object)帮助器将状态属性映射为只读计算属性

  a. storeObj引入的store对象

  b. array | object：字符串数组形式或者对象形式

    ■ 【字符串数组形式】直接将store中state的数据映射为当前组件的计算属性，但是不能自定义名称
    ■ 【对象形式时】key为自定义当前组件的计算属性名，value字符串形式，是store中state的共享数据

提示：mapState()函数映射到组件中的计算属性是只读的，如果想在组件中响应式修改state的数据，则应该选择mapWritableState()函数来映射计算属性

2. 在组合式 API 组件中，直接引入对应的store，通过store对象直接获取和修改state
   
提示：
如果想在组件中自定义变量来接收store中的state中共享的数据，我们可以这样做：

+ 使用computed(() => store.dataName)，具有响应式，但是只读形式
+ 使用storeToRefs(store)从store解构想要的state，具有响应式，可直接修改，可自定义名称

```html
<script setup>
import { useUserStore } from '@/store/useUserStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import UserVue from '@/components/User.vue'

// 获取 UserStore 实例
const user_store = useUserStore()

// 通过 computed() 将 store 中 state 映射成当前组件中的计算属性，具有响应性，但是是只读的
const user_age = computed(() => user_store.age)
const user_level = computed(() => user_store.level)
const user_account = computed(() => user_store.account)
const user_nickname = computed(() => user_store.nickname)

// storeToRefs 将 store 中 state 解构为组件的数据，具有响应性，还可以响应式修改
const { 
    age, 
    level,
    account: userAccount,
    nickname: userNickname
} = storeToRefs(user_store)
</script>

<template>
    <UserVue></UserVue>
    <h2>从 store 直接取 state </h2>
    <ul>
        <li>年龄：{{ user_store.age }}</li>
        <li>等级：{{ user_store.level }}</li>
        <li>账号：{{ user_store.account }}</li>
        <li>昵称：{{ user_store.nickname }}</li>
    </ul>
    <button @click="user_store.age += 10">更改年龄</button>
    |
    <button @click="user_store.nickname += '='">更改昵称</button>

    <hr>
    <h2>computed 映射为计算属性</h2>
    <ul>
        <li>年龄：{{ user_age }}</li>
        <li>等级：{{ user_level }}</li>
        <li>账号：{{ user_account }}</li>
        <li>昵称：{{ user_nickname }}</li>
    </ul>
    <button @click="user_age += 10">更改年龄</button>
    |
    <button @click="user_nickname += '='">更改昵称</button>
    
    <hr>
    <h2>storeToRefs 解构成自己的数据</h2>
    <ul>
        <li>年龄：{{ age }}</li>
        <li>等级：{{ level }}</li>
        <li>账号：{{ userAccount }}</li>
        <li>昵称：{{ userNickname }}</li>
    </ul>
    <button @click="age += 10">更改年龄</button>
    |
    <button @click="userNickname += '='">更改昵称</button>

</template>
```
```html
<script setup>
import { useUserStore } from '@/store/useUserStore'
import { storeToRefs } from 'pinia'

const user_store = useUserStore()

const { 
    age, 
    level,
    account: userAccount,
    nickname: userNickname
} = storeToRefs(user_store)

</script>

<template>
    <ul>
        <li>年龄：{{ age }}</li>
        <li>等级：{{ level }}</li>
        <li>账号：{{ userAccount }}</li>
        <li>昵称：{{ userNickname }}</li>
    </ul>
</template>

<style scoped>
ul {
    background-color: yellow;
}
</style>
```
9.4 定义getters

getters是计算得到的新的共享数据，当依赖的数据发生变化时则重新计算，所以其他组件包括store自己不要直接对其修改

1. store采用的是选项式模式时，getters选项中声明的函数即为计算属性
2. 
  a. 在其函数内可通过this关键字来获取store实例，也可通过方法的第一个参数得到store实例

  b. 如果采用的是箭头函数的话，无法使用this关键字，为了更方便使用store中实例，可为其箭头函数设置第一个参数来获取store实例

2. store采用的是组合式模式时，可通过computed()函数通过计算得到新的数据，再将其return暴露出去即可

```javascript
import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useUserStore = defineStore('user', () => {
    const birthday = ref('1992-12-27')
    const age = ref(30)

    // 声明通过计算得到的共享数据，是只读的，如果依赖的数据发生变化则会重新计算
    const month = computed(() => {
        return birthday.value.split('-')[1]
    })

    const ageStage = computed(() => {
        if (age.value < 18) return '未成年'
        if (age.value < 35) return '青年'
        if (age.value < 50) return '中年'
        if (age.value >= 50) return '老年'
    })

    return { birthday, age, month, ageStage }

})
```
```javascript
import { defineStore } from "pinia"

export const useUserStore = defineStore('user', {
    state: () => ({
        birthday: '1992-12-27',
        age: 30
    }),
    // 通过计算得到的新的共享的数据，只读
    // 如果依赖的数据发生变化，则会重新计算
    getters: {
        month() {
          	// this 为 store 实例，当然其函数的第一个参数也为 store 实例
            return this.birthday.split('-')[1] 
        },
        // 因箭头函数无法使用 `this`，函数的第一个参数为 store 实例
        ageStage: store => {
            if(store.age < 18) return '未成年'
            if(store.age < 35) return '青年'
            if(store.age < 50) return '中年'
            if(store.age >= 50) return '老年'
        }
    }
})
```
9.4.2 组件中使用

1. 选项式API的组件中，访问store中的getters和访问state类似，同样可使用mapState()帮助器将getters属性映射为只读计算属性
   
注意：如果采用mapWritableState()帮助器将store中的getters映射为组件内部的计算属性，依旧可以具有响应式，一旦对其进行修改则会报错

1. 在组合式API组件中，访问store中的getters和访问state类似，直接引入对应的store，通过store对象直接获取getters，但是如果对其进行修改则会报错
   
提示
如果想将store中的getter中共享的数据映射为本地组件的计算属性，我们可以这样做：
● 使用computed(() => store.getterName)，具有响应式，但是只读形式
● 使用storeToRefs(store)从store解构getter依旧是计算属性，所以是只读的，一旦对其进行修改则会报错，但是具有响应式，可自定义名称

```html
<script setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useUserStore } from './store/useUserStore'

// store 实例，可直接通过 store 获取 getters, 但是是只读的，如果一旦修改则会报错
const user_store = useUserStore()
  

// 通过 computed 将 getters 映射为自己的计算属性， 但是是只读的，如果一旦修改则会警告
const birthday_month = computed(() => user_store.month)
const user_age_stage = computed(() => user_store.ageStage)
  

// 通过 storeToRefs 将 getters 解构为自己的计算属性， 但是是只读的，如果一旦修改则会警告
const { month, ageStage: userAgeStage } = storeToRefs(user_store)

  
// 将 state 解构为自己的数据
const { birthday, age } = storeToRefs(user_store)
  
</script>

<template>
  
    <h3>通过 store 直接获取 getters</h3>
    <ul>
        <li>月份：{{ user_store.month }}</li>
        <li>年龄阶段：{{ user_store.ageStage }}</li>
    </ul>

    <button @click="user_store.month = '5'">更改月份</button>
    |
    <button @click="user_store.ageStage = '未知'">更改年龄阶段</button>

    <hr>

    <h3>通过 computed 将 getters 映射为自己的计算属性</h3>
    <ul>
        <li>月份：{{ birthday_month }}</li>
        <li>年龄阶段：{{ user_age_stage }}</li>
    </ul>

    <button @click="birthday_month = '5'">更改月份</button>
    |
    <button @click="user_age_stage = '未知'">更改年龄阶段</button>

    <hr>

    <h3>通过 storeToRefs 将 getters 映射为自己的计算属性</h3>
    <ul>
        <li>月份：{{ month }}</li>
        <li>年龄阶段：{{ userAgeStage }}</li>
    </ul>

    <button @click="month = '5'">更改月份</button>
    |
    <button @click="userAgeStage = '未知'">更改年龄阶段</button>

    <hr>

    生日：<input type="date" v-model="birthday">
    |    
    年龄：<input type="number" min="1" max="100" v-model="age">
</template>
```
9.5 actions

actions一般情况下是对state中的数据进行修改的业务逻辑函数，actions也可以是异步的，您可以在其中await任何API调用甚至其他操作！

1. store采用的是选项式模式时，actions选项中声明的函数即可共享其函数，在其函数内可通过this来获取整个store实例
```javascript
import {defineStore} from "pinia"

export const useUserStore = defineStore('user', {
    state: () => ({
        nickname: '自古风流',
        age: 20
    }),
    // 定义共享的函数，其主要是修改 state 中的数据的逻辑代码
    // 其函数可以是异步的
    actions: {
        setUserInfo(nickname, age) {
            // 可通过 `this` 来获取当前 store 实例
            this.nickname = nickname
            this.age = age
        },
        setUserInfoByObject(user) {
            this.nickname = user.nickname
            this.age = user.age
        }
    }
})
```
2. store采用的是组合式模式时，可通过声明函数，再将其return暴露出去即可共享其函数
```javascript
import {defineStore} from "pinia"
import {ref} from "vue";

export const useUserStore = defineStore('user', () => {
    const nickname = ref('自古风流')
    const age = ref(20)

    // 定义函数（注意：形参不要和 ref 名冲突）
    function setUserInfo(user_nickname, user_age) {
        nickname.value = user_nickname
        age.value = user_age
    }

    function setUserInfoByObject(user) {
        // 可通过 `this` 来获取当前 store 实例
        nickname.value = user.nickname
        age.value = user.age
    }

    return {nickname, age, setUserInfo, setUserInfoByObject} // 暴露函数即可共享函数
})
```
9.5.2 访问actions

1. 在选项式 API 组件中，可以使用mapActions(storeObj, array | object)帮助器将actions映射为当前组件的函数
   
  a. storeObj引入的store对象

  b. array | object：字符串数组形式或者对象形式

    ■ 【字符串数组形式】直接将store中actions的函数映射为当前组件的函数，但是不能自定义名称
    ■ 【对象形式时】key为自定义当前组件的函数名，value字符串形式，是store中actions的函数名
```html
<script>
import {mapActions, mapState} from "pinia"
import {useUserStore} from "@/store/useUserStore"

export default {
    computed: {
        ...mapState(useUserStore, ['nickname', 'age'])
    },
    methods: {
        // 使用 mapActions 将 store 中的 actions 映射为自己的函数
        // 采用函数形式，无法自定义映射的函数名
        // 采用对象形式，可自定义映射的函数名
        ...mapActions(useUserStore, ['setUserInfo']),
        ...mapActions(useUserStore, {
            set_info_by_object: 'setUserInfoByObject'
        })
    }
}
</script>

<template>
    <ul>
        <li>昵称：{{ nickname }}</li>
        <li>昵称：{{ age }}</li>
    </ul>
    
    <button @click="setUserInfo('Tom', 15)">修改信息</button>

    <button @click="set_info_by_object({ nickname: 'Jack', age: 40})">
        修改信息
    </button>
</template>
```
1. 在组合式API组件中，直接引入对应的store，通过store对象直接获取actions
```html
<script setup>
import {useUserStore} from "@/store/useUserStore"
import { storeToRefs } from "pinia"

// 可直接使用 store 执行 actions
const user_store = useUserStore()
const {nickname, age} = storeToRefs(user_store)

// 可将 store 中的 actions 映射为自己的函数，可自定映射的函数名（不可使用 storeToRes 函数）
const {setUserInfo, setUserInfoByObject: set_user_info_object} = user_store
</script>

<template>
    <ul>
        <li>昵称：{{ nickname }}</li>
        <li>昵称：{{ age }}</li>
    </ul>
  
    <span>直接使用 store 执行 actions：</span>
    <button @click="user_store.setUserInfo('Tom', 15)">修改信息</button>
    <button @click="user_store.setUserInfoByObject({ nickname: 'Jack', age: 40})">
      	修改信息
    </button>

    <hr>

    <span>将 store 中的 actions 映射成自己的函数：</span>
    <button @click="setUserInfo('Annie', 45)">修改信息</button>
    <button @click="set_user_info_object({ nickname: 'Drew', age: 50})">
      	修改信息
    </button>
</template>
```
提示：如果想将store中的actions中函数映射为本地组件的函数，可将store解构出对应的函数即可，也可自定应函数名，此处不可通过storeToRefs(store)函数

**10.axios**

基本配置：
```javascript
{
    url: '/user', // 请求的服务器地址 URL        
    method: 'GET', // 请求方式，默认值 GET
    baseURL: 'https://some-domain.com/api/', // 如果 url 不是绝对地址，则会发送请求时在 url 前方加上 baseURL
    headers: {'X-Requested-With': 'XMLHttpRequest'}, // 自定义请求头
    params: { ID: 12345 }, // 与请求一起发送的 URL 参数
    data: { firstName: 'Fred' },  // 作为请求体被发送的数据，仅适用 'PUT', 'POST', 'DELETE 和 'PATCH' 请求方法
    timeout: 1000, // 请求超时的毫秒数，如果请求时间超过 `timeout` 的值，则请求会被中断，默认值是 `0` (永不超时)，
    responseType: 'json', // 期望服务器返回的数据类型，选项包括: 'arraybuffer', 'document', 'json', 'text', 'stream'， 浏览器专属：'blob'，默认值 json
    // 允许在向服务器发送前，修改请求数据，它只能用于 'PUT', 'POST' 和 'PATCH' 这几个请求方法
    transformRequest: [function (data, headers) {   
        return data; // 对发送的 data 进行任意转换处理
    }],
    // 在传递给 then/catch 前，允许修改响应数据
    transformResponse: [function (data) {
    	return data; // 对接收的 data 进行任意转换处理
    }]
}
```
10.2 发送请求

post请求
```javascript
axios({
    method: 'POST', // 请求方式
    url: '/example-url/……', // 请求地址
    // …… 其他配置 ……
})
```
```javascript
axios(
    '/example-url/……', // 请求地址
    {
        method: 'POST', // 请求方式
        // …… 其他配置 ……
    }
)
```
get请求
```javascript
axios({
    method: 'GET', // 请求方式，可省略不写
    url: '/example-url/……', // 请求地址
    // …… 其他配置 ……
})
```
```javascript
axios(
     '/example-url/……', // 请求地址
    {
        method: 'GET', // 请求方式，可省略不写
        // …… 其他配置 ……
    }
)
```

`为了方便起见，已经为所有支持的请求方法提供了别名`
1. axios.request(config)
2. axios.get(url[, config])
3. axios.delete(url[, config])
4. axios.head(url[, config])
5. axios.options(url[, config])
6. axios.post(url[, data[, config]])
7. axios.put(url[, data[, config]])
8. axios.patch(url[, data[, config]])
注意：在使用别名方法时，url、method、data 这些属性都不必在config中指定

12.3 创建实例

```javascript
import axios from 'axios'

const request = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
})

export default request
```

12.4 响应数据

发送请求后通过`.then(response => {})`来获取服务器响应的数据
response响应式结构：
1. data：服务器提供的响应【最重要】
2. status：来自服务器响应的 HTTP 状态码，成功为200，请求地址不存在为404，服务器异常为500，请求方式错误为405……
3. statusText：来自服务器响应的 HTTP 状态信息
4. headers：服务器响应头
5. config： 请求的配置信息
6. request：生成此响应的请求，在node.js中它是最后一个ClientRequest实例，在浏览器中则是XMLHttpRequest实例
```javascript
axios({
    method: 'GET',
    url: '/example-url/……'
    // …… 其他配置 ……
}).then(response => {
    console.log(response.data) // 获取服务器传递来的数据
})
```
```javascript
axios.get(
    url: '/example-url/……'
    { /* …… 其他配置 …… */ }
)
.then(response => {
    console.log(response.data) // 获取服务器传递来的数据
})
```
10.5 错误处理

发送请求后，使用`.catch(error => {})`来处理此次请求异常，请求成功发出且服务器也响应了状态码，但状态代码超出了2xx的范围

```javascript
axios({
    method: 'GET', // 请求方式
    url: '/example-url/……', // 请求地址
}).catch(error => {
    console.log('请求失败！')
})
```

`10.6 跨域`

1. 跨域：指的是浏览器不能执行其他网站的脚本；它是由浏览器的同源策略造成的，是浏览器对javascript施加的安全限制
2. 同源策略：是指协议，域名，端口都要相同，其中有一个不同都会产生跨域
3. 浏览器为了安全问题一般都限制了跨域访问，也就是不允许跨域请求资源，如果未处理跨域访问则会在请求时控制台出现Access-Control-Allow-Origin……的报错信息
4. 如何处理跨域问题，可在vite项目的vite.config.js文件中添加proxy代理
```javascript
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    // 服务
    server: {
        // 代理
        proxy: {
            '/ok': {
                target: 'https://v.api.aa1.cn/api', // 代理后台服务器地址
                changeOrigin: true, //允许跨域               
                rewrite: path => path.replace(/^\/ok/,'') // 将请求地址中的 /ok 替换成空
            }
        }
    }
})
```
