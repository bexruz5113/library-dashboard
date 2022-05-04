<template>
  <div>
    <v-container>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th
                class="text-left text-md-body-1 font-weight-black"
                v-for="(thead, index) in schedule"
                :key="index"
              >
                {{ thead }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr @click="edit()" v-for="(item, index) in addition" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.author }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.format }}</td>
              <td>{{ item.lang }}</td>
              <td>{{ item.rollOut }}</td>
              <td>{{ item.isbn }}</td>
              <td>{{ item.cover }}</td>
              <td>{{ item.page }}</td>
              <td>
                <v-dialog transition="dialog-top-transition" max-width="600">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      @click="showInfo(item.id)"
                      icon
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon color="blue">mdi-pencil-outline</v-icon>
                    </v-btn>
                  </template>
                  <v-card class="pa-4">
                    <v-card-title>
                      Do you really want to change ?
                    </v-card-title>
                    <v-form>
                      <v-container>
                        <v-row>
                          <v-col cols="12" md="6">
                            <v-text-field
                              v-model="update.title"
                              label="Book title"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-text-field
                              v-model="update.author"
                              label="Author"
                              required
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12" md="6">
                            <v-text-field
                              v-model="update.isbn"
                              label="ISBN"
                              required
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12" md="6">
                            <v-select
                              v-model="update.lang"
                              :items="lang"
                              label="Language"
                            ></v-select>
                          </v-col>

                          <v-col cols="12" md="6">
                            <v-select
                              v-model="update.cover"
                              :items="cover"
                              label="Cover"
                            ></v-select>
                          </v-col>

                          <v-col cols="12" md="6">
                            <v-select
                              v-model="update.format"
                              :items="format"
                              label="Format"
                            ></v-select>
                          </v-col>

                          <v-col cols="12" md="4">
                            <v-text-field
                              v-model="update.price"
                              label="Price"
                              required
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12" md="4">
                            <v-text-field
                              v-model="update.rollOut"
                              label="Roll Out"
                              required
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12" md="4">
                            <v-text-field
                              v-model="update.page"
                              label="Pages"
                              required
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12">
                            <v-btn
                              @click="editBook(item.id)"
                              style="width: 100%"
                              color="primary"
                            >
                              + Add
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-card>
                </v-dialog>
                <v-dialog
                  open-on-click
                  transition="dialog-top-transition"
                  max-width="600"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon color="red">mdi-trash-can-outline </v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title> Do you want to delete? </v-card-title>
                    <v-card-actions class="d-flex justify-space-around">
                      <v-btn
                        color="green darken-1"
                        text
                        @click="dialogDelete = false"
                      >
                        Disagree
                      </v-btn>
                      <v-btn
                        color="green darken-1"
                        text
                        @click="deleteItem(item.id)"
                      >
                        Agree
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
    <div>
      <v-snackbar absolute right top color="#27dd8d" v-model="snackbarDelete">
        You have deleted the book

        <template v-slot:action="{ attrs }">
          <v-btn
            color="grey"
            icon
            text
            v-bind="attrs"
            @click="snackbarDelete = false"
          >
            <v-icon color="white" x-small>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </div>
    <div>
      <v-snackbar absolute right top color="#27dd8d" v-model="snackbarEdit">
        You have updated about book information
        <template v-slot:action="{ attrs }">
          <v-btn
            color="grey"
            icon
            text
            v-bind="attrs"
            @click="snackbarEdit = false"
          >
            <v-icon color="white" x-small>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    snackbarDelete: false,
    snackbarEdit: false,
    update: {},
    lang: ["English", "Russia", "Uzbek"],
    cover: ["Qattiq", "Yumshoq"],
    format: ["A4", "A5"],
    schedule: [
      "N_",
      "Book",
      "Author",
      "Price",
      "Format",
      "Language",
      "Roll Out",
      "ISBN",
      "Cover",
      "Pages",
      "Edit/Delete",
    ],
  }),
  created() {
    this.getBook();
  },
  computed: {
    ...mapGetters("addition", ["addition"]),
  },
  methods: {
    ...mapActions("addition", ["getBook", "deleteBook"]),

    deleteItem(id) {
      this.deleteBook(id);
      console.log("item=> " + id);
      this.snackbarDelete = true;
    },
    showInfo(id) {
      this.$http
        .get(`/${id}/`)
        .then((res) => {
          console.log(res);
          this.update = res.data;
        })
        .catch((err) => {
          alert(err);
        });
    },

    editBook(id) {
      this.$http
        .put(`/${id}/`, this.update)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          alert(err);
        });
      window.location.reload();
      this.snackbarEdit = true;
    },
  },
};
</script>

<style lang="scss"></style>
