<template>
  <div class="list-contacts">
    <!-- Sem lista de contatos  -->
    <div 
      v-if="listContacts.length < 1"
      class="without-contacts">

      <icon-component name="book" size="14.813rem"  />
      <h6 class="title">Nenhum contato foi criado ainda.</h6>
      <button class="btn-create" @click="showForm">
        <icon-component name="plus" /> 
        Criar contato
      </button>

    </div>
    <!-- Listagem de Contatos -->
    <table v-if="listContacts.length > 0">
      <thead>
        <tr>
          <th></th>
          <th><span>Contatos</span></th>
          <th><span>Email</span></th>
          <th><span>Telefone</span></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="(contact,index) in listContacts" 
          :key="index"
          :ref="`contact_${contact.id}`">
          <td>
            <span 
              v-if="contact.initial" 
              class="brand-initial" 
              :style="`background-color: ${contact.colorInitital}`">
                {{contact.initial}}
            </span>  
          </td>
          <td> <span>{{contact.name}}</span> </td>
          <td> <span>{{contact.email}}</span> </td>
          <td> <span>{{contact.tel | VMask('(##) ####-####')}}</span> </td>
          <td>
            <div class="flex gap-6">
              <button type="button" @click="editContact(contact)">
                <icon-component name="edit" class="cursor-pointer"/>
              </button>
              <button type="button" @click="showDelete(contact)">
                <icon-component name="delete" class="cursor-pointer"/>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Dialog de Formulário / Cadastro e Edição  -->
    <dialog-component 
      class="dialog-form"
      ref="dialogForm" 
      :show="isShowForm"
      @handler="submitedForm">
      <template v-slot:title>
        {{form.type === 'register'? 'Criar contato' : 'Editar Contato'}}
      </template>
      <template v-slot:content>
        <div class="content">
          
          <div v-if="errorMessageForm" class="alert-error">{{ errorMessageForm }}</div>

          <div class="item-form">
            <label for="name">Nome</label>
            <input type="text" name="name" v-model="form.name" />
          </div>
          
          <div class="item-form">
            <label for="name">E-mail</label>
            <input type="email" name="email" v-model="form.email" />
          </div>

          <div class="item-form">
            <label for="name">Telefone</label>
            <input type="text" name="tel" v-model="form.tel" v-mask="'(##) ####-####'" />
          </div>
                    
        </div>
      </template>
      <template v-slot:footer>
        <button type="button" class="btn-cancel" @click="closeDialogForm">Cancelar</button>
        <button type="submit" class="btn-save" :disabled="disableSubmitForm">Salvar</button>
      </template>
    </dialog-component>

    <!-- Dialog para Remover -->
    <dialog-component 
      class="dialog-delete"
      ref="dialogDelete" 
      :show="questionDelete"
      @handler="submitedDelete">
      <template v-slot:title>
        Excluír Contato
      </template>
      <template v-slot:content>
        <div class="content">
          <p>Deseja realmente excluír o contato?</p>
        </div>
      </template>
      <template v-slot:footer>
        <button type="button" class="btn-cancel" @click="closeDialogDelete">Cancelar</button>
        <button type="submit" class="btn-save">Excluír</button>
      </template>
    </dialog-component>
  </div>
</template>
<script>
  import store from '../vuex/store';
  import moment from 'moment';

  export default {
    data(){
      return{
        isShowForm : false,
        questionDelete : null,
        form : {
          type : 'register',
          name :'',
          email: '',
          tel : ''
        },
        errorMessageForm : null,
        qtdContacts : 0
      }
    },
    mounted(){},
    computed:{
      listContacts : function(){
        return store.getters.contacts;
      },
      disableSubmitForm : function(){
        let form = this.getDataForm();
        return !Object.values(form).filter( item => item?true:false).length > 0;
      }
    },
    watch : {
      listContacts : function(){
       
        const now = moment(new Date());

        this.listContacts.map((item) => {
          let expire = moment(item.created_at);

          if( now.diff(expire,'seconds') < 5 ){
            this.$nextTick(() => {
              this.$refs[`contact_${item.id}`][0].classList.add('active');
              setTimeout( () => this.$refs[`contact_${item.id}`][0].classList.remove('active'), 10000);
            })
          }

        });

      }
    },
    methods:{
      getDataForm(){
        const onlyDatasForm = {
          name  : this.form.name,
          email : this.form.email,
          tel   : this.form.tel,
          id    : this.form.id?this.form.id:null
        };
        return onlyDatasForm;
      },
      showForm(){
        this.errorMessageForm = null;
        this.isShowForm = true;
      },
      showDelete(contact){
        this.questionDelete = contact;
      },
      submitedForm(){ 

        const checked = this.verifyContact();
        if( checked.error )
        {
          this.errorMessageForm = checked.message;
          return;
        }

        /**
         * Remove a mascara no telefone, deixando somente 
         * os números
         */    
        let tel = this.disMaskTel();
        
        let form = {
          ...this.getDataForm(),
          tel
        }

        /**
         * Se for do tipo 'register' ou seja cadastro entra no if
         * */   
        if( this.form.type === 'register' )
        {
          store.dispatch('insertContact',form);          
        }
        /**
         * Se for do tipo 'edit' ou seja editar entra no if
         * */ 
         if( this.form.type === 'edit' )
        {
          store.dispatch('updateContact',form);          
        }
        this.closeDialogForm();
      },
      editContact(contact){
        this.form = {
          name : contact.name,
          email : contact.email,
          tel: contact.tel,
          id : contact.id
        };
        this.form['type'] = 'edit';
        this.showForm();
      },
      submitedDelete(){ 
        if( this.questionDelete )
        {
          store.dispatch('deleteContact',this.questionDelete); 
          this.closeDialogDelete();       
        }
      },
      closeDialogForm(){
        this.isShowForm = false;
        this.clearForm();
      },
      closeDialogDelete(){
        this.questionDelete = null;
      },
      clearForm(){
        this.form = {
          type : 'register',
          name :'',
          email: '',
          tel : ''
        }
      },
      disMaskTel(){
        let tel = this.form.tel;
          tel = tel.split('(').join('').split(') ').join('').split('-').join('');
        return tel;
      },
      verifyContact(){
        let findedContactByEmail = this.listContacts.find( (cont) => cont.email === this.form.email );

        if( findedContactByEmail )
        {
          if( this.form.id )
          {
            if( this.form.id !== findedContactByEmail.id )
            {
              return { error: true, message : 'E-mail já cadastrado!' };
            }
          }else{
            return { error: true, message : 'E-mail já cadastrado!' };
          }
        }

        let findedContactByTel = this.listContacts.find( (cont) => cont.tel === this.disMaskTel() );

        if( findedContactByTel )
        {
          if( this.form.id )
          {
            if( this.form.id !== findedContactByTel.id )
            {
              return { error: true, message : 'Telefone já cadastrado!' };
            }
          }else{
            return { error: true, message : 'Telefone já cadastrado!' };
          }
        }

        return { error : false };
      }
    }
  }
</script>
