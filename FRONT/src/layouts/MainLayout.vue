<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-center">
          Fate Acelerado - {{ user.getUser.data.nombre }}</q-toolbar-title
        >
        <q-btn-dropdown class="glossy" icon="ion-settings" flat>
          <q-btn
            color="red-5"
            icon="ion-log-out"
            @click="cerrarSesion"
            v-if="user.getToken !== ''"
            label="Cerrar Sesión"
          />
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> FATE</q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useRouter } from "vue-router";
import { useUser } from "src/stores/useUser";
import { useQuasar } from "quasar";

const linksList = [
  // {
  //   title: 'Users Admin',
  //   caption: 'Crud users',
  //   icon: 'person',
  //   link: '/users-admin'
  // },
  {
    title: "Mis Personajes",
    caption: "panel de administración de personajes",
    icon: "ion-person",
    link: "/characters",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const router = useRouter();
    const user = useUser();
    const $q = useQuasar();

    // set status
    $q.dark.set(true); // or false or "auto"

    return {
      user,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      cerrarSesion() {
        localStorage.removeItem("token");
        user.$state.token = "";
        router.push("/login");
      },
    };
  },
});
</script>
