<template>
  <q-page class="q-mx-md">
    <h4 class="text-center text-primary q-mb-lg">Mis Personajes</h4>

    <div class="row justify-between items-center">
      <div class="col-6">
        <q-img src="../../public/FateLogo.png" class="col" width="30%" />
      </div>
      <div class="column items-end items-center">
        <q-btn
          glossy
          rounded
          icon="add"
          color="green"
          to="/create-character"
          class="col-3 q-mr-md"
        />
      </div>
    </div>
    <div
      class="q-mt-md"
      v-for="c in charactersStore.getCharactersList"
      :key="c._id"
    >
      <q-card>
        <q-card-section class="text-center">
          <q-avatar size="80px"> <q-img :src="c.avatar" /> </q-avatar>
        </q-card-section>
        <q-card-section class="column items-center">
          <p class="text-h6">
            {{ c.identidad.nombre }}
          </p>
        </q-card-section>

        <q-card-section class="row justify-between">
          <q-toggle
            v-model="selected"
            color="green"
            icon="ion-play"
            label="Selecionar Personaje"
          />
          <q-btn
            color="purple"
            icon="ion-eye"
            l
            @click="verPersonaje(c._id)"
            round
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { useCharacter } from "src/stores/useCharacters";

import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const charactersStore = useCharacter();
const router = useRouter();
const selected = ref(false);

function verPersonaje(id) {
  router.push(`/watch-character/${id}`);
}

onMounted(() => {
  charactersStore.fillCharacterListFromDB();
});
</script>

<style></style>
