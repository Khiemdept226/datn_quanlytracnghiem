<template>
  <v-card>
    <v-container fluid class="filter">
      <v-row align="center">
        <v-col cols="12">
          <v-autocomplete
            v-model="value"
            :items="items"
            dense
            filled
            label="Môn học"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12">
          <v-autocomplete
            v-model="chapter"
            :items="orders"
            dense
            chips
            small-chips
            label="Chương"
          ></v-autocomplete>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  name: "FormFilter",
  data: () => ({
    items: ["Toán học", "Ngữ Văn", "Hóa học", "Tiếng Anh"],
    values: ["Toán học", "Ngữ Văn"],
    orders: ["Chương 1", "Chương 2", "Chương 3", "Chương 4"],
    chapter: ["Chương 1", "Chương 2"],
    value: null,
  }),
};
</script>
<style scoped>
.filter {
  display: inline-block;
  width: 50%;
}
</style>
