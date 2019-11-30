<template>
  <vialan-loader class="loader mh100" v-if="loadData" />
  <div class="home container" v-else>
    <h1>Записи в блокноте</h1>
    <div class="actions text-right mw100">
      <span
        class="mdi mdi-36px mdi-plus-circle-outline pointer"
        @click="addNote"
      ></span>
    </div>
    <table class="mw100">
      <thead>
        <tr>
          <th
            :class="[classObject, sotrColumn === 'id' ? 'sort' : '']"
            @click="sort($event.target, 'id')"
          >
            id
          </th>
          <th
            :class="[classObject, sotrColumn === 'created' ? 'sort' : '']"
            @click="sort($event.target, 'created')"
          >
            create
          </th>
          <th
            :class="[classObject, sotrColumn === 'title' ? 'sort' : '']"
            @click="sort($event.target, 'title')"
          >
            title
          </th>
          <th>description</th>
          <th>actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in sortedNotes" :key="item.id">
          <td v-text="item.id"></td>
          <td>{{ item.created | toDateTime }}</td>
          <td v-text="item.title"></td>
          <td v-text="item.description"></td>
          <td>
            <span
              class="mdi mdi-circle-edit-outline blue"
              @click="editNote(item.id)"
            ></span>
            <span
              class="mdi mdi-delete-circle-outline red"
              @click="deleteNote(item)"
            ></span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import vialanLoader from "@/components/Loader.vue";

export default {
  name: "home",
  components: { vialanLoader },
  data() {
    return {
      loadData: false,
      sendData: false,
      sotrColumn: undefined,
      modifer: 1
    };
  },
  computed: {
    ...mapGetters(["User", "allNotes"]),
    sortedNotes() {
      if (!this.sotrColumn) return this.allNotes;

      const column = this.sotrColumn || "created";
      let array = this.allNotes;
      return array.sort((a, b) => {
        if (a[column] < b[column]) return -1 * this.modifer;
        if (a[column] > b[column]) return 1 * this.modifer;
        return 0;
      });
    },
    classObject() {
      return {
        sorted: true,
        down: this.modifer == -1 ? true : false
      };
    }
  },
  methods: {
    sort(target, column) {
      if (this.sotrColumn === column) {
        this.modifer *= -1;
      } else {
        this.modifer = 1;
      }
      this.sotrColumn = column;
    },
    editNote(index) {
      this.$router.push({ name: "editnote", params: { id: index } });
    },
    async deleteNote(item) {
      this.sendData = true;
      await this.$store.dispatch("deleteNote", item);
      this.sendData = false;
    },
    async getNotes() {
      this.loadData = true;
      await this.$store.dispatch("getNotes");
      this.loadData = false;
    },
    addNote() {
      this.$router.push({ name: "addnote" });
    }
  },
  async created() {
    this.loadData = true;
    await this.$store.dispatch("getNotes");
    this.loadData = false;
  }
};
</script>
