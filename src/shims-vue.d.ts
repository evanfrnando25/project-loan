// shims-vue.d.ts
import { AxiosInstance } from 'axios';

declare module 'vue' {
  interface App {
    $axios: AxiosInstance;
  }
}