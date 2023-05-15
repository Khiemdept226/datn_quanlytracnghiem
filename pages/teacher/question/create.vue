<template>
  <v-container>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      :search="search"
      :single-select="singleSelect"
      item-key="subject"
      show-select
      class="elevation-1 app-table"
    >
      <template v-slot:top>
        <v-toolbar flat color="base">
          <v-card-title>
            NGÂN HÀNG CÂU HỎI
            <v-spacer></v-spacer>
          </v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Tìm kiếm"
            single-line
            hide-details
          ></v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <form-uploader @submit="submitFile" />
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                TẠO CÂU HỎI
              </v-btn>
            </template>
            <template v-slot:top>
              <v-switch
                v-model="singleSelect"
                label="Single select"
                class="pa-3"
              ></v-switch>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-form ref="form">
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.stt"
                          label="STT"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.subject"
                          label="Môn học"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.question"
                          label="Nội dung câu hỏi"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.information"
                          label="Thông tin câu hỏi"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this student?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import FormUploader from "../../../components/ui/FormUploader.vue";
export default {
  name: "CreateQuestionPage",
  layout: "teacher",
  components: { FormUploader },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: "",
    singleSelect: false,
    selected: [],
    headers: [
      {
        text: "STT",
        align: "start",
        sortable: false,
        value: "stt",
      },
      { text: "Môn học", value: "subject" },
      { text: "Nội dung câu hỏi", value: "question" },
      { text: "Thông tin câu hỏi", value: "information" },
      { text: "Tùy chỉnh", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      stt: "",
      subject: "",
      question: "",
      information: "",
    },
    defaultItem: {
      stt: "",
      subject: "",
      question: "",
      information: "",
    },
    // formRules: {
    //   name: [(v) => v.length >= 1 || "This field is required"],
    //   studentid: [((v) => v && v.length === 8) || "This field is required"],
    //   phone: [((v) => v && v.length === 10) || "This field is required"],
    // },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Question" : "Edit Question";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    submitFile(file) {
      console.log(123, file);
    },
    initialize() {
      this.desserts = [
        {
          stt: "1",
          subject: "Toán học",
          question: "Số dương là số gì?",
          information: "Chương: 3, Bài: Số nguyên, Mức độ: Dễ",
        },
        {
          stt: "2",
          subject: "Ngữ Văn",
          question: "Tác giả của bài thơ 'Nhớ rừng' là ai?",
          information: "Chương: 4, Bài: Nhớ rừng, Mức độ: Trung bình",
        },
        {
          stt: "3",
          subject: "Hóa học",
          question: "Hóa trị của Cacbon trong hợp chất CO là bao nhiêu?",
          information: "Chương: 1, Bài: Hóa trị, Mức độ: Khó",
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
