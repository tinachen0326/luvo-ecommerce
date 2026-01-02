import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import "./assets/styles/main.css";
import App from "./App.vue";
import BaseCard from "@/components/base/BaseCard.vue";
import BaseModal from "@/components/base/BaseModal.vue";
import BasePagination from "@/components/base/BasePagination.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import NotificationToast from "@/components/base/NotificationToast.vue";

const app = createApp(App);
const pinia = createPinia();

app.component("BaseCard", BaseCard);
app.component("BaseModal", BaseModal);
app.component("BasePagination", BasePagination);
app.component("BaseButton" , BaseButton);
app.component("BaseInput" , BaseInput);
app.component("NotificationToast" , NotificationToast);

app.use(pinia);
app.use(router);

app.mount("#app");
