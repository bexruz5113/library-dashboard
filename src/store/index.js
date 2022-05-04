import Vue from "vue";
import Vuex from "vuex";
import addition from "./module/addition";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { addition },
  strict: true,
});
