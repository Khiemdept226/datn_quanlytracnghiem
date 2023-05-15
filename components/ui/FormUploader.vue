<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on"> Import </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Import</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-file-input
            accept="image/*"
            label="File input"
            v-model="file"
          ></v-file-input>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="onCancel"> Close </v-btn>
        <v-btn color="blue darken-1" text @click="onSubmit"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "FormUploader",
  data: () => ({
    dialog: false,
    file: null,
  }),
  methods: {
    onCancel() {
      this.dialog = false;
      this.file = null;
    },
    onSubmit() {
      this.dialog = false;
      this.$emit("submit", this.file);
      this.file = null;
    },
  },
};
</script>
