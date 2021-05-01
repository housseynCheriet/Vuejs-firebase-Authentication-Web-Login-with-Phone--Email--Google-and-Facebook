// /src/app.vue
<template>
  <div id="app">
    <GetInTouch />
   <router-view></router-view>
  </div>
</template>


<script>
 import GetInTouch from './components/GetInTouch'
  export default {
    name: 'app',
    components: {
      GetInTouch
    }   ,
    methods:{
      floatingBtn(){
        document.querySelector('.social-panel-container').classList.toggle('visible')
      },
       closeBtn(){
         document.querySelector('.social-panel-container').classList.remove('visible')
      }
    }
   
     
  }
</script>