<template>
  <div class="sidebar">
    <div class="wrapper">
      <div class="content">
        <div class="content__logo">
          <img src="@/assets/img/logo.png" />
        </div>
        <div class="content__link">
          <div
            class="navigation"
            v-for="items in navigationList"
            :key="items.id"
            :class="{ active: route.path === items.value }"
            @click="linkRouter(items.value)"
          >
            <span>{{ items.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent, ref} from "vue"
import {useRouter, useRoute } from "vue-router"
export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();

    const linkRouter = (index: string) => {
      router.push(index);
    };

    const navigationList = ref([
      {
        id: 0,
        name: "Dashboard",
        value: "/dashboard",
      },
    ]);

    return {
      route,
      navigationList,
      linkRouter,
    };
  },
});
</script>

<style lang="scss" scoped>
.sidebar {
  display: grid;
  min-height: 100vh;
  max-height: 200vh;
  grid-template-columns: 100%;

  .wrapper {
    background: #F9F4F2;
    padding: 10%;
    width: 100%;
    position: relative;

    .content {
      display: flex;
      flex-direction: column;
      gap: 50px;
      &__logo {
        width: 100%;

        img {
          width: 100%;
        }
      }

      &__link {
        display: flex;
        flex-direction: column;
        gap: 40px;

        .active {
          background: #ED5C27 !important;

          a {
            color: #ffffff !important;
          }
        }
        .navigation {
          background: #ED5C27;
          padding: 5%;
          border-radius: 5px;
          text-align: center;
          cursor: pointer;

          span {
            text-decoration: none;
            color: #ffffff !important;
            letter-spacing: 1px;
          }
        }
      }
    }
  }
}
</style>