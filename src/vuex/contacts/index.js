
const INITIAL_SET = {
  paramsToSearch : null,
  listContacts :[]
};

const ContactsStore = {
  state: () => (INITIAL_SET),
  mutations: {
    search(state,paramSearch){
      if( paramSearch ) {
        state.paramsToSearch = paramSearch;
      }else{
        state.paramsToSearch = null;
      }
    },
    insert(state,contact){
      if( contact ) {
        contact['created_at']    = new Date();
        contact['initial']       = contact.name.charAt(0);
        contact['colorInitital'] = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        state.listContacts.push(contact);
      }
    },
    delete(state,index){
      if( index !== null || index !== undefined ) {
        const newListContacts = state.listContacts.splice(index,1);
        state.listContacts = newListContacts;
      }
    },
    deleteAll(state){
      const newListContacts = state.listContacts.splice(0,Number.MAX_VALUE);
      state.listContacts = newListContacts;
    }
  },
  actions: { 
    insertContact(context,contact) {
      context.commit('insert',contact);
    },
    deleteContact(context,index) {
      context.commit('delete',index);
    },
    clearAllContacts(context) {
      context.commit('deleteAll');
    },
    searchContacts(context,paramsSearch){
      context.commit('search',paramsSearch);
    }
  },
  getters: {
    contacts : state => {
      let contacts = state.listContacts;
      if( state.paramsToSearch )
      {
        contacts = state.listContacts.filter( (cont) => {
          return ( cont.name.indexOf(state.paramsToSearch) !== -1 ) || 
                 (cont.email.indexOf(state.paramsToSearch) !== -1 ) || 
                 (cont.tel.indexOf(state.paramsToSearch)   !== -1 )
        });
      }
      return contacts.sort(function (contact1, contact2) {
        if (contact1.name < contact2.name) { return -1; }
        if (contact1.name > contact2.name) { return 1; }
        return 0;
      });
    },
    paramsSearch : state => {
      return state.paramsToSearch;
    }
  }
}

export default ContactsStore;