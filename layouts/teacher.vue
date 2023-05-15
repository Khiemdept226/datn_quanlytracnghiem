<template>
  <v-app dark>
    <!-- <v-app-bar fixed app class="app-bar" color="base">
      <div class="app-title">
        <nuxt-link to="/">{{ title }}</nuxt-link>
      </div>
      <v-spacer />
    </v-app-bar> -->
    <v-main>
      <v-container class="app-menu"
        ><v-list class="menu-list text-light" color="base">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
            class="text-light menu-item"
          >
            <v-list-item-action>
              <v-icon class="text-light">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
      <div class="app-main">
        <Nuxt />
      </div>
    </v-main>
    <!-- <v-footer :absolute="!fixed" app color="base" class="app-footer">
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
export default {
  name: "TeacherLayout",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-application",
          title: "Subjects",
          to: "/teacher/subject",
        },
        {
          icon: "mdi-calendar-edit",
          title: "Questions",
          to: "/teacher/question/create",
        },
        {
          icon: "mdi-file-document-outline",
          title: "Exams",
          to: "/teacher/exam",
        },
        {
          icon: "mdi-google-classroom",
          title: "Exam Class",
          to: "/teacher/exclass",
        },
        {
          icon: "mdi-marker",
          title: "Mark Exam",
          to: "/teacher/mark",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Multichoice Exam",
    };
  },
};
</script>
<style lang="scss" scoped>
.app-title > a {
  text-decoration: none;
  font-size: 30px;
  color: #720606;
}
.app-menu {
  float: left;
  height: 100%;
  width: 20%;
  padding: unset;
  border-bottom: 1px solid #720606;
  & .text-light {
    color: $text-light !important;
  }
}
.app-menu > .menu-list {
  padding: 0;
}

.app-main {
  float: left;
  width: 80%;
}
</style>
