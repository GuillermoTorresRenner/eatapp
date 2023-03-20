<template>
  <q-page class="q-mx-xl q-mt-xl">
    <q-card>
      <h4 class="text-center text-primary q-my-md">Login</h4>
      <q-card-section>
        <q-form @submit.prevent="login">
          <q-input
            v-model="user.email"
            type="email"
            label="Email"
            :rules="[(val) => val.length > 3 || 'Debe ingresar un correo']"
            lazy-rules="ondemand"
          />
          <q-input
            v-model="user.password"
            type="password"
            label="Password"
            :rules="[(val) => val.length > 3 || 'Debe ingresar un password']"
            lazy-rules="ondemand"
          />
          <q-card-section>
            <q-input
              v-model="pass"
              type="password"
              label="CLAVE PARTIDA"
              :rules="[(val) => val.length > 3 || 'Debe ingresar una Clave']"
              lazy-rules="ondemand"
            />
          </q-card-section>

          <q-card-section class="text-center">
            <q-btn label="Ingresar" type="submit" color="primary" />
            <q-btn
              label="crear una cuenta"
              color="green"
              flat
              to="/create-account"
            />
            <p class="text-center text-red q-mt-md" v-if="mensaje !== ''">
              {{ mensaje }}
            </p>
          </q-card-section>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { api } from "../boot/axios";
import { useUser } from "../stores/useUser";
const userStore = useUser();
const router = useRouter();
const mensaje = ref("");
const user = ref({
  email: "",
  password: "",
});
const pass = ref("");

function login() {
  if (pass.value === "matrix") {
    api
      .post("/login", user.value)

      .then((res) => {
        console.log(res.data);
        userStore.saveUser(res.data.token);
        router.push("/");
      })

      .catch((error) => {
        console.log(error.response);
        mensaje.value = error.response.data.mensaje;
      });
  }
}
</script>
