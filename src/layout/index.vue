<template>
  <div class="main">
    <Sidebar />
    <div class="content">
      <div class="header">
        <Header />
      </div>
      <div class="section">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import Sidebar from "./sidebar.vue"
import Header from "./header.vue"
import { defineComponent } from "vue"

export default defineComponent({
    components: {
        Sidebar,
        Header
    },
    setup(){}
})

</script>

<style lang="scss" scoped>
.main {
  display: grid;
  grid-template-columns: 20% 80%;
  width: 100%;

  .content {
    display: flex;
    flex-direction: column;
    width: 100%;

    .header {
      width: 100%;
    }

    .section {
      padding: 0% 5%;
    }
  }
}
</style>