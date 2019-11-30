import firebase from "@/plugins/firebase";
import Vue from "vue";

class Note {
  constructor(payload) {
    this.title = payload.title || "";
    this.description = payload.description || "";
    this.created = new Date().getTime();
  }
}

export default {
  state: {
    notes: []
  },
  actions: {
    async getNotes({ commit }) {
      try {
        await firebase
          .database()
          .ref("/notes/")
          .once("value")
          .then(response => {
            commit("updateNotes", response.val());
            return true;
          });
      } catch (error) {
        console.log(error);
      }
    },
    async addNote({ commit }, payload) {
      try {
        const newPostRef = await firebase
          .database()
          .ref()
          .child("notes")
          .push();

        const note = new Note(payload);
        await firebase
          .database()
          .ref(`notes/${newPostRef.key}`)
          .set(note);

        commit("addNote", Object.assign({ id: newPostRef.key }, note));
      } catch (error) {
        console.log(error);
      }
    },
    async updateNote({ commit }, payload) {
      try {
        await firebase
          .database()
          .ref(`notes/${payload.id}`)
          .update(payload.data);

        commit("updateNote", payload);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteNote({ commit }, payload) {
      const confirmResult = confirm(
        `Вы действительно хотите удалить "${payload.title}" \n Удаление не обратимо!`
      );
      if (!confirmResult) return;
      try {
        await firebase
          .database()
          .ref(`notes/${payload.id}`)
          .remove();
        commit("deleteNote", payload);
      } catch (error) {
        console.log(error);
      }
    }
  },
  mutations: {
    updateNotes(state, payload) {
      state.notes = [];
      for (const key in payload) {
        if (payload.hasOwnProperty(key)) {
          const element = Object.assign({ id: key }, payload[key]);
          state.notes.push(element);
        }
      }
    },
    addNote(state, payload) {
      state.notes.push(payload);
    },
    updateNote(state, payload) {
      Vue.set(state.notes, payload.id, payload.data);
    },
    deleteNote(state, item) {
      const index = state.notes.indexOf(item);
      console.log(index);
      state.notes.splice(index, 1);
    }
  },
  getters: {
    allNotes(state) {
      return state.notes;
    },
    getNotepadById(state) {
      return id => {
        if (!state.notes) return [];
        return state.notes.find(el => el.id === id);
      };
    }
  }
};
