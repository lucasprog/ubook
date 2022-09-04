<template>
  <header id="header">
    <figure id="logo">
      <img src="../assets/imgs/ic-logo.svg" alt="Logotipo uBook"/>
    </figure>
    <button @click="showFormRegister">Criar contato</button>

    <form 
      @submit="submitToSearch"
      id="search-contacts">
      <input 
        type="search" 
        name="search-contact"
        v-model="search"
        placeholder="Buscar..." 
        @search="goToSearch" />
        <button type="submit">
          <icon-component name="search" />
        </button>
    </form>
  </header>
</template>

<script>

  import store from '../vuex/store';

  export default {
    data(){
      return{
        search : null
      }
    },
    mounted() {
      console.log(this)
      this.search = store.getters.paramsSearch;
    },
    methods:{
      submitToSearch(e){
        e.preventDefault();
        this.goToSearch();
      },
      goToSearch(){ store.dispatch('searchContacts',this.search) },
      showFormRegister(){
        this.$parent.$refs.listContacts.showFormRegister();
      }
    }
  }
</script>