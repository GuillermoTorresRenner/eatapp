<template>
  <q-form @submit="submit">
    <q-expansion-item
      icon="perm_identity"
      label="IDENTIDAD"
      class="bg-dark text-white q-mt-xl"
      :default-opened="true"
    >
      <q-card>
        <q-card-section class="row justify-between">
          <q-file
            v-model="img"
            class="col-4"
            label="Avatar"
            bg-color="grey"
            filled
            accept=".jpg, image/*"
            max-file-size="3000000"
            @rejected="onRejected"
          >
            <template v-slot:append>
              <q-icon name="photo" size="md" />
            </template>
            <template v-slot:prepend>
              <q-icon name="attachment" />
            </template>
          </q-file>

          <q-input
            v-model.number="characterStore.getCharacter.fate.puntos"
            type="number"
            label="Puntos Fate"
            min="0"
            max="3"
            class="col-3 q-ml-md"
            bg-color="green"
          />
          <q-input
            v-model.number="characterStore.getCharacter.fate.recuperacion"
            type="number"
            label="Recuperación"
            min="0"
            max="3"
            class="col-3 q-ml-md"
            bg-color="purple"
          />
        </q-card-section>

        <q-card-section>
          <q-input
            v-model.trim="characterStore.getCharacter.identidad.nombre"
            type="text"
            label="Nombre"
            lazy-rules="ondemand"
            :rules="[
              (val) => val.length > 0 || 'Ingrese un nombre para el personaje',
            ]"
            dense
          />
          <q-input
            v-model.trim="characterStore.getCharacter.identidad.descripcion"
            type="textarea"
            label="descripcion"
            class="row"
            dense
          />
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <!-- ------------------------------------------------------------------------------------------------------------------------- -->

    <q-expansion-item
      icon="ion-thumbs-up"
      label="ASPECTOS"
      class="bg-dark text-white q-mt-xl"
    >
      <q-card>
        <q-card-section>
          <q-input
            v-model.trim="characterStore.getCharacter.aspectos.principal"
            type="text"
            label="Aspecto Principal"
            dense
          />
          <q-input
            v-model.trim="characterStore.getCharacter.aspectos.complicacion"
            type="text"
            label="Complicación"
            dense
          />
          <q-input
            v-model.trim="characterStore.getCharacter.aspectos.aspecto1"
            type="text"
            label="Aspecto 1"
            dense
          />
          <q-input
            v-model.trim="characterStore.getCharacter.aspectos.aspecto2"
            type="text"
            label="Aspecto 2"
            dense
          />
          <q-input
            v-model.trim="characterStore.getCharacter.aspectos.aspecto3"
            type="text"
            label="Aspecto 3"
            dense
          />
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <!-- ------------------------------------------------------------------------------------------------------------------------- -->

    <q-expansion-item
      icon="grade"
      label="ESTILOS"
      class="bg-dark text-white q-mt-xl"
    >
      <q-card>
        <q-card-section>
          <q-input
            v-model.number="characterStore.getCharacter.estilos.cauto"
            type="number"
            min="0"
            max="3"
            label="CAUTO"
            dense
          />
          <q-input
            v-model.number="characterStore.getCharacter.estilos.furtivo"
            type="number"
            min="0"
            max="3"
            label="FURTIVO"
            dense
          />
          <q-input
            v-model.number="characterStore.getCharacter.estilos.ingenioso"
            type="number"
            min="0"
            max="3"
            label="INGENIOSO"
            dense
          />
          <q-input
            v-model.number="characterStore.getCharacter.estilos.llamativo"
            type="number"
            min="0"
            max="3"
            label="LLAMATIVO"
            dense
          />
          <q-input
            v-model.number="characterStore.getCharacter.estilos.rapido"
            type="number"
            min="0"
            max="3"
            label="RAPIDO"
            dense
          />
          <q-input
            v-model.number="characterStore.getCharacter.estilos.vigoroso"
            type="number"
            min="0"
            max="3"
            label="VIGOROSO"
            dense
          />
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <!-- ------------------------------------------------------------------------------------------------------------------------- -->

    <q-expansion-item
      icon="ion-battery-charging"
      label="PROEZAS"
      class="bg-dark text-white q-mt-xl"
    >
      <q-card>
        <q-card-section>
          <q-input
            v-model.trim="characterStore.getCharacter.proezas.proeza1"
            type="textarea"
            label="PROEZA 1"
            dense
          />
          <q-input
            v-model.trim="characterStore.getCharacter.proezas.proeza2"
            type="textarea"
            label="PROEZA 2"
            dense
          />
          <q-input
            v-model.trim="characterStore.getCharacter.proezas.proeza3"
            type="textarea"
            label="PROEZA 3"
            dense
          />
          <q-input
            v-model.trim="characterStore.getCharacter.proezas.proeza4"
            type="textarea"
            label="PROEZA 4"
            dense
          />
          <q-input
            v-model.trim="characterStore.getCharacter.proezas.proeza5"
            type="textarea"
            label="PROEZA 5"
            dense
          />
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <div class="text-center q-mt-md">
      <q-btn
        icon="ion-save"
        type="submit"
        :color="accion === 'save' ? 'green' : 'warning'"
      />
      <q-btn
        icon="ion-trash"
        color="red"
        v-if="accion === 'update'"
        class="q-ml-md"
        @click="confirmDelete"
      />
    </div>
  </q-form>
</template>

<script setup>
import { onMounted, ref } from "vue";

import { useQuasar } from "quasar";
import { useCharacter } from "../stores/useCharacters";
import { api } from "src/boot/axios";
import { useUser } from "src/stores/useUser";
import { useRouter } from "vue-router";
const characterStore = useCharacter();
const router = useRouter();
const $q = useQuasar();
const user = useUser();
const props = defineProps({
  accion: { type: String },
});

function submit() {
  if (props.accion === "save") {
    confirmCreate();
  }
  if (props.accion === "update") {
    confirmUpdate();
  }
}

const img = ref();

function saveCharacter() {
  const formData = new FormData();
  characterStore.getCharacter.userId = user.getUser.data._id;
  formData.set("personaje", JSON.stringify(characterStore.getCharacter));
  formData.append("img", img.value);

  api
    .post("/create-character", formData, {
      headers: {
        "content-type": "multipart/form-data",
        token: user.getToken,
      },
    })
    .then((res) => {
      console.log(res.data);
      $q.notify({
        message: res.data.message,
        color: "green",
        icon: "check",
        position: "bottom",
      });

      router.push("/characters");
    })
    .catch((res) => {
      console.log(res.data);
      $q.notify({
        message: res.data.message,
        color: "red",
        icon: "ion-close-circle",
        position: "bottom",
      });
    });
}

function updateCharacter() {
  const formData = new FormData();
  //formData.append("personaje", character.value);
  formData.set("personaje", JSON.stringify(characterStore.getCharacter));
  formData.append("img", img.value);
  formData.append("avatar", characterStore.getCharacter.avatar);

  api
    .put(`/update-character/${characterStore.getCharacter._id}`, formData, {
      headers: {
        "content-type": "multipart/form-data",
        token: user.getToken,
      },
    })
    .then((res) => {
      $q.notify({
        message: res.data.message,
        color: "green",
        icon: "check",
        position: "bottom",
      });

      router.push("/characters");
    })
    .catch((res) => {
      $q.notify({
        message: res.data.message,
        color: "red",
        icon: "ion-close-circle",
        position: "bottom",
      });
    });
}

function onRejected(rejectedEntries) {
  $q.notify({
    type: "negative",
    message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
  });
}
function confirmCreate() {
  $q.dialog({
    title: "¿Crear al personaje Personaje?",
    message: characterStore.getCharacter.identidad.nombre,
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      saveCharacter();
    })
    .onCancel(() => {});
}

function confirmUpdate() {
  $q.dialog({
    title: "¿Editar al personaje?",
    message: characterStore.getCharacter.identidad.nombre,
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      updateCharacter();
    })
    .onCancel(() => {});
}

function confirmDelete() {
  $q.dialog({
    title: "¿Borrar Personaje?",
    message: characterStore.getCharacter.identidad.nombre,
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      deleteCharacter();
    })
    .onCancel(() => {});
}

function deleteCharacter() {
  api
    .delete(
      `/delete-character/${characterStore.getCharacter._id}`,

      {
        headers: {
          token: user.getToken,
        },
      }
    )
    .then((res) => {
      $q.notify({
        message: res.data.message,
        color: "green",
        icon: "check",
        position: "bottom",
      });

      characterStore.resetCharacter();
      router.push("/characters");
    })
    .catch((res) => {
      $q.notify({
        message: res.data.message,
        color: "red",
        icon: "check",
        position: "bottom",
      });
    });
}
</script>

<style></style>
