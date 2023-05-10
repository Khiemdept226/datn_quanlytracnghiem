<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :search="search"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-card-title>
          DANH SÁCH GIÁO VIÊN
          <v-spacer></v-spacer>
        </v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Full Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.birth"
                      label="Date of birth"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.gender"
                      label="Gender"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.phone"
                      label="Phone number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.subject"
                      label="Subject"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
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
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: "",
    headers: [
      {
        text: "Full Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Date of birth", value: "birth" },
      { text: "Gender", value: "gender" },
      { text: "Phone number", value: "phone" },
      { text: "Email", value: "email" },
      { text: "Subject", value: "subject" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      birth: "",
      gender: "",
      phone: "",
      email: "",
      subject: "",
    },
    defaultItem: {
      name: "",
      birth: "",
      gender: "",
      phone: "",
      email: "",
      subject: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
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
    initialize() {
      this.desserts = [
        {
          name: "Nguyễn Kim Dũng",
          birth: "04/10/1979",
          gender: "Nam",
          phone: "0923866111",
          email: "kimdung@gmail.com",
          subject: "Toán học",
        },
        {
          name: "Đào Lê Thu Thảo",
          birth: "08/06/1985",
          gender: "Nữ",
          phone: "0356188967",
          email: "thuthaodt@gmail.com",
          subject: "Ngữ Văn",
        },
        {
          name: "Trịnh Hữu Việt",
          birth: "13/05/1981",
          gender: "Nam",
          phone: "0982773466",
          email: "viethuu11@gmail.com",
          subject: "Vật lý",
        },
        {
          name: "Trần Hữu Bình",
          birth: "10/11/1976",
          gender: "Nam",
          phone: "0946110284",
          email: "binhnguyen@gmail.com",
          subject: "Toán học",
        },
        {
          name: "Nguyễn Thị Lan",
          birth: "18/03/1978",
          gender: "Nữ",
          phone: "0326508234",
          email: "lannguyen123@gmail.com",
          subject: "Tiếng Anh",
        },
        {
          name: "Vũ Lê Minh Tâm",
          birth: "28/12/1984",
          gender: "Nữ",
          phone: "0328139643",
          email: "minhtam@gmail.com",
          subject: "Ngữ Văn",
        },
        {
          name: "Phạm Hoàng Hải",
          birth: "06/01/1983",
          gender: "Nam",
          phone: "0981183676",
          email: "phoanghai@gmail.com",
          subject: "Hóa học",
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
