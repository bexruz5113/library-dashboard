import axios from "axios";

const state = () => ({
  addition: [],
});

const getters = {
  addition(state) {
    return state.addition;
  },
};
const mutations = {
  POST_BOOK(state, payload) {
    state.addition = payload;
  },
  GET_BOOK(state, payload) {
    state.addition = payload;
  },
  DELETE_BOOK(state, id) {
    state.addition = state.addition.filter((x) => x.id != id);
  },
  EDIT_BOOK(state, payload) {
    state.addition = state.addition.map((x) => {
      if (x.id == payload.id) return payload;
      else return x;
    });
  },
};
const actions = {
  async postBook({ commit }, payload) {
    await axios
      .post("http://localhost:3000/posts", payload)
      .then((result) => {
        commit("GET_BOOK");
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async getBook({ commit }) {
    // console.log("xaxaxa");
    await axios
      .get("http://localhost:3000/posts")
      .then((result) => {
        // console.log("xaxaxa" + JSON.stringify(result.data));
        commit("GET_BOOK", result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async deleteBook({ commit }, id) {
    await axios
      .delete(`http://localhost:3000/posts/${id}`)
      .then((res) => {
        commit("DELETE_BOOK", id);
        console.log(res);
      })
      .catch((err) => {
        alert(err);
      });
  },
  // async getByIdBook(id) {
  //   await axios
  //     .get(`http://localhost:3000/posts/${id}`)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // },

  // async editBook({ commit }, payload) {
  //   await axios
  //     .put(`http://localhost:3000/posts/${payload.id}`, payload)
  //     .then((res) => {
  //       commit("EDIT_BOOK", res.data);
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
