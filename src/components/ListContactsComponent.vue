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
          <td>
            <div class="flex gap-6">
              <icon-component name="edit" class="cursor-pointer"/>
              <icon-component name="delete" class="cursor-pointer"/>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <dialog-component 
      class="dialog-form"
      ref="dialogFormRegister" 
      :show="isShowFormRegister"
      @handler="submitedFormRegister">
      <template v-slot:title>
        Criar contato
      </template>
      <template v-slot:content>
        <div class="content-form">

          <div class="item-form">
            <label for="name">Nome</label>
            <input type="text" name="name" v-model="formRegister.name" />
          </div>
          
          <div class="item-form">
            <label for="name">E-mail</label>
            <input type="email" name="email" v-model="formRegister.email" />
          </div>

          <div class="item-form">
            <label for="name">Telefone</label>
            <input type="text" name="tel" v-model="formRegister.tel" v-mask="'(##) ####-####'" />
          </div>
                    
        </div>
      </template>
      <template v-slot:footer>
        <button type="button" class="btn-cancel" @click="closeDialog">Cancelar</button>
        <button type="submit" class="btn-save" :disabled="disableSubmitForm">Salvar</button>
      </template>
    </dialog-component>
  </div>
</template>
<script>
  import store from '../vuex/store';

  export default {
    data(){
      return{
        isShowFormRegister : false,
        formRegister : {
          name :'',
          email: '',
          tel : ''
        }
      }
    },
    mounted(){},
    computed:{
      listContacts : function(){
        return store.getters.contacts;
      },
      disableSubmitForm : function(){
        const form = this.formRegister;
        return !Object.values(form).filter( item => item?true:false).length > 0;
      }
    },
    methods:{
      showFormRegister(){
        this.isShowFormRegister = true;
      },
      submitedFormRegister(e){
        console.log('e',e)
        
        let tel = this.formRegister.tel;
            tel = tel.split('(').join('');
            tel = tel.split(') ').join('');
            tel = tel.split('-').join('');

        const form = {
          ...this.formRegister,
          tel
        }

        store.dispatch('insertContact',form);
        
      },
      closeDialog(){
        this.isShowFormRegister = false;
      }
    }
  }
</script>
