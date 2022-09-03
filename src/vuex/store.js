import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

//Reducers
import ContactsStore from "./contacts"
// import DialogModalStore from "./dialog-modal"

Vue.use(Vuex)

const vuexPersistenceLocal = new VuexPersistence({ storage: window.localStorage });

const store = new Vuex.Store({
  modules: {
    contacts: ContactsStore,
    // dialogModal: DialogModalStore
  },
  plugins: [vuexPersistenceLocal.plugin],
});

export default store;