import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store';
 
import VueMask from 'v-mask';

//Máscara
Vue.use(VueMask);  

//CSS
import './main.css'

Vue.config.productionTip = false

//Components
Vue.component('header-component',require('./components/HeaderComponent').default);
Vue.component('list-contacts-component',require('./components/ListContactsComponent').default);
Vue.component('icon-component',require('./components/IconsComponent').default);
Vue.component('dialog-component',require('./components/DialogComponent').default);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
