<template>
  <div>Home Page</div>
</template>

<script>
export default {
  name: "IndexPage",
  computed: {
    counter() {
      return this.$store.state.counter.counter;
    },
  },
  methods: {
    increment() {
      this.$store.commit("counter/increment");
      console.log(this.$store.state.counter.counter);
    },
  },
};
</script>
