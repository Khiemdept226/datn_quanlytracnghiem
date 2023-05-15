<template>
  <v-card>
    <v-card-title>
      DANH SÁCH NGÂN HÀNG CÂU HỎI
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Tìm kiếm"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <form-filter />
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    ></v-data-table>
  </v-card>
</template>
<script>
import FormFilter from "../../../components/ui/FormFilter.vue";
export default {
  name: "QuestionPage",
  components: { FormFilter },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "STT",
          align: "start",
          sortable: false,
          value: "stt",
        },
        { text: "Môn học", value: "subject" },
        { text: "Nội dung câu hỏi và đáp án", value: "question" },
        { text: "Thông tin câu hỏi", value: "information" },
      ],
      desserts: [
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
      ],
    };
  },
};
</script>
