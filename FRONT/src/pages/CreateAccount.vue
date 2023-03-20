<template>
  <q-page class="q-mx-xl">
    <q-form @submit.prevent="crearCuenta">
      <q-card class="my-card">
        <h4 class="text-center text-primary">Crear una cuenta</h4>
        <q-card-section>
          <q-input
            v-model.trim="nuevoUsuario.nombre"
            type="text"
            label="Nombre usuario"
            lazy-rules="ondemand"
            :rules="[(val) => val.length > 3 || 'ingrese un Nombre']"
          />
          <q-input
            v-model.trim="nuevoUsuario.email"
            type="email"
            label="email"
            lazy-rules="ondemand"
          />
          <q-input
            v-model.trim="nuevoUsuario.password"
            type="password"
            label="Password"
            lazy-rules="ondemand"
            :rules="[(val) => val.length > 3 || 'ingrese un Password']"
          />
          <q-input
            v-model.trim="pass2"
            type="password"
            label="repetir Password"
            lazy-rules="ondemand"
            :rules="[(val) => val.length > 3 || 'Repita su Password']"
          />
        </q-card-section>
      </q-card>
      <div class="row justify-center q-mt-lg">
        <q-btn
          label="Crear Cuenta"
          type="submit"
          color="green"
          :disable="!comparaPass"
        />
        <q-btn
          label="Login"
          type="submit"
          color="primary"
          to="/login"
          class="q-ml-md"
          flat=""
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const nuevoUsuario = ref({
  nombre: "",
  email: "",
  password: "",
});
const pass2 = ref("");
const router = useRouter();
const $q = useQuasar();
const comparaPass = computed(() => {
  return pass2.value === nuevoUsuario.value.password;
});

function crearCuenta() {
  api
    .post("/create-user", nuevoUsuario.value)
    .then(() => {
      $q.notify({
        message: "Usuario creado",
        color: "green",
        icon: "check",
        position: "bottom",
      });
      router.push("/login");
    })

    .catch((res) => {
      console.log(res.data);
    });
}
</script>

<style></style>
