
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
        const date = new Date();
        contact['id']            = `uid_${date.getTime()}`;
        contact['created_at']    = date;
        contact['initial']       = contact.name.charAt(0);
        contact['colorInitital'] = `#${Math.floor(Math.random()*16777215).toString(16)}`;

        state.listContacts.push(contact);

        const reorded = state.listContacts.sort(function (contact1, contact2) {
          if (contact1.name < contact2.name) { return -1; }
          if (contact1.name > contact2.name) { return 1; }
          return 0;
        });

        state.listContacts = reorded;

      }
    },
    update(state,contact){
      if( contact ) {
        let newListContacts = state.listContacts.map((item) => {
          if( item.id === contact.id )
          {
            item = {...item,...contact};
          }
          return item;
        });
        state.listContacts = newListContacts.sort(function (contact1, contact2) {
          if (contact1.name < contact2.name) { return -1; }
          if (contact1.name > contact2.name) { return 1; }
          return 0;
        });
      }
    },
    delete(state,contact){
      if( contact ) {
        const newListContacts = state.listContacts.filter((item) => item.id !== contact.id );
        state.listContacts = newListContacts.sort(function (contact1, contact2) {
          if (contact1.name < contact2.name) { return -1; }
          if (contact1.name > contact2.name) { return 1; }
          return 0;
        });
      }
    },
    deleteAll(state){
      const newListContacts = state.listContacts.splice(1,state.listContacts.length);
      state.listContacts = newListContacts.sort(function (contact1, contact2) {
        if (contact1.name < contact2.name) { return -1; }
        if (contact1.name > contact2.name) { return 1; }
        return 0;
      });
    }
  },
  actions: { 
    insertContact(context,contact) {
      context.commit('insert',contact);
    },
    updateContact(context,contact) {
      context.commit('update',contact);
    },
    deleteContact(context,contact) {
      context.commit('delete',contact);
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
      return contacts;
    },
    paramsSearch : state => {
      return state.paramsToSearch;
    }
  }
}

export default ContactsStore;