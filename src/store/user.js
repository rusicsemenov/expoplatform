import firebase from "@/plugins/firebase";

export default {
  state: {
    user: {}
  },
  actions: {
    async registerUser({ commit }, payload) {
      try {
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(payload.email, payload.password);
        commit("userUpdate", user);
        return true;
      } catch (error) {
        console.log(error);
        return error.message;
      }
    },
    async loginUser({ commit }, payload) {
      try {
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password);
        commit("userUpdate", user);
        return true;
      } catch (error) {
        console.log(error);
        return error.message;
      }
    },
    setUser({ commit }, payload) {
      commit("userUpdate", payload);
    },
    async logoutUser({ commit }) {
      try {
        await firebase.auth().signOut();
        commit("userUpdate", {});
        return true;
      } catch (error) {
        console.log(error);
        return error.message;
      }
    }
  },
  mutations: {
    userUpdate(state, payload) {
      state.user = payload.user || payload;
    }
  },
  getters: {
    User(state) {
      return state.user;
    },
    userEmail(state) {
      return state.user.email;
    }
  }
};
