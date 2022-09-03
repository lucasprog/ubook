<template>
  <div class="list-contacts">
    <table>
      <thead>
        <tr>
          <th> </th>
          <th> <span>Contatos</span> </th>
          <th> <span>Email</span> </th>
          <th> <span>Telefone</span> </th>
          <th>  </th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="(contact,index) in listContacts" 
          :key="index">
          <td>
            <span v-if="contact.initial" class="flex items-center justify-center p-4 rounded-full w-[1.5rem] h-[1.5rem] text-white text-xs" :style="`background-color: ${contact.colorInitital}`">{{contact.initial}}</span>  
          </td>
          <td>
            <span>{{contact.name}}</span>
          </td>
          <td>
            <span>{{contact.email}}</span>
          </td>
          <td>
            <span>{{contact.tel}}</span>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  import store from '../vuex/store';

  export default {
    mounted(){},
    computed:{
      listContacts : function(){
        return store.getters.contacts;
      }
    }
  }
</script>
