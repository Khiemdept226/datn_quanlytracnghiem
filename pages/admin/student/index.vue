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
          DANH SÁCH SINH VIÊN
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
                      v-model="editedItem.studentid"
                      label="Student ID"
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
      { text: "Student ID", value: "studentid" },
      { text: "Date of birth", value: "birth" },
      { text: "Gender", value: "gender" },
      { text: "Phone number", value: "phone" },
      { text: "Email", value: "email" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      studentid: 0,
      birth: "",
      gender: "",
      phone: "",
      email: "",
    },
    defaultItem: {
      name: "",
      studentid: 0,
      birth: "",
      gender: "",
      phone: "",
      email: "",
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
          name: "Nguyễn Hữu Khiêm",
          studentid: 20191232,
          birth: "22/06/2001",
          gender: "Nam",
          phone: "0978544132",
          email: "huukhiem@gmail.com",
        },
        {
          name: "Đặng Thu Trang",
          studentid: 20194769,
          birth: "01/08/2001",
          gender: "Nữ",
          phone: "0326877925",
          email: "trangdt@gmail.com",
        },
        {
          name: "Nguyễn Thành Long",
          studentid: 20190819,
          birth: "13/03/2001",
          gender: "Nam",
          phone: "0986177432",
          email: "longnt01@gmail.com",
        },
        {
          name: "Trần Trọng Tùng",
          studentid: 20192145,
          birth: "10/10/2001",
          gender: "Nam",
          phone: "0988125672",
          email: "trongtung@gmail.com",
        },
        {
          name: "Nguyễn Tường Vy",
          studentid: 20194928,
          birth: "20/03/2001",
          gender: "Nữ",
          phone: "0338126345",
          email: "tuongvy123@gmail.com",
        },
        {
          name: "Đinh Thị Ngọc Bích",
          studentid: 20192996,
          birth: "18/06/2001",
          gender: "Nữ",
          phone: "0322689443",
          email: "bichngoc@gmail.com",
        },
        {
          name: "Nguyễn Tất Cường",
          studentid: 20190138,
          birth: "25/12/2001",
          gender: "Nam",
          phone: "0987311866",
          email: "tatcuong@gmail.com",
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
