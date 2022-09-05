<template>
  <div id="application">
    <header-component ref="header" />
    <main id="main-content">
      <list-contacts-component ref="listContacts" />
    </main>
  </div>
</template>

<script>

  // import store from './vuex/store';

  export default {
    name: 'App',
    mounted(){
      // console.log(this)
      // store.dispatch('clearAllContacts');
      // store.dispatch('insertContact',{
      //   name : 'Carol',
      //   email :'carol@gmail.com',
      //   tel :'16982054351'
      // });
      // store.dispatch('insertContact',{
      //   name : 'Luis',
      //   email :'luis@gmail.com',
      //   tel :'16982054352'
      // });
      // store.dispatch('insertContact',{
      //   name : 'Lucas',
      //   email :'lucas@gmail.com',
      //   tel :'16982054353'
      // });
      // store.dispatch('insertContact',{
      //   name : 'Tâmela',
      //   email :'tamela@gmail.com',
      //   tel :'16982054354'
      // });
      // store.dispatch('insertContact',{
      //   name : 'Flávio',
      //   email :'flavio@gmail.com',
      //   tel :'16982054355'
      // });
      // store.dispatch('insertContact',{
      //   name : 'Davi',
      //   email :'davi@gmail.com',
      //   tel :'16982054356'
      // });
      // store.dispatch('insertContact',{
      //   name : 'Maria',
      //   email :'maria@gmail.com',
      //   tel :'16982054357'
      // });
      // store.dispatch('insertContact',{
      //   name : 'Aristeu',
      //   email :'aristeu@gmail.com',
      //   tel :'16982054358'
      // });
      // store.dispatch('insertContact',{
      //   name : 'Simba',
      //   email :'simba@gmail.com',
      //   tel :'16982054359'
      // });
    },
    
  }
</script>
