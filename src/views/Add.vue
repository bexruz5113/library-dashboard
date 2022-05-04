<template>
  <div>
    <v-container class="px-6 px-sm-12">
      <div class="mx-auto">
        <v-card class="pa-4">
          <p class="font-weight-bold text-h5">Add Brand New Book</p>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="obj.title"
                    label="Book title"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="obj.author"
                    label="Author"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="obj.isbn"
                    label="ISBN"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-select
                    v-model="obj.lang"
                    :items="lang"
                    label="Language"
                  ></v-select>
                </v-col>

                <v-col cols="12" md="6">
                  <v-select
                    v-model="obj.cover"
                    :items="cover"
                    label="Cover"
                  ></v-select>
                </v-col>

                <v-col cols="12" md="6">
                  <v-select
                    v-model="obj.format"
                    :items="format"
                    label="Format"
                  ></v-select>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="obj.price"
                    label="Price"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="obj.rollOut"
                    label="Roll Out"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="obj.page"
                    label="Pages"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-btn @click="addBook()" style="width: 100%" color="primary">
                    + Add
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </div>
    </v-container>
    <div>
      <v-snackbar absolute right top color="#27dd8d" v-model="snackbar">
        You have added brand new stuff

        <template v-slot:action="{ attrs }">
          <v-btn
            color="grey"
            icon
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            <v-icon color="white" x-small>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    snackbar: false,
    obj: {
      title: "",
      author: "",
      isbn: "",
      lang: "",
      format: "",
      cover: "",
      price: null,
      rollOut: null,
      page: null,
    },
    selection: [],
    lang: ["English", "Russia", "Uzbek"],
    cover: ["Qattiq", "Yumshoq"],
    format: ["A4", "A5"],
  }),

  created() {
    this.getBook();
  },

  computed: {
    ...mapGetters("addition", ["addition"]),
  },
  methods: {
    ...mapActions("addition", ["getBook", "postBook"]),
    addBook() {
      if (this.obj?.title) {
        this.postBook(this.obj);
        this.snackbar = true;
        this.obj = {
          title: "",
          author: "",
          isbn: "",
          lang: "",
          format: "",
          cover: "",
          price: null,
          rollOut: null,
          page: null,
        };
      }
    },
  },
};
</script>
