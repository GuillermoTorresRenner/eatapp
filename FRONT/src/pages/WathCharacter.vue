<template>
  <q-page class="q-mx-sm">
    <div class="text-center q-my-md">
      <q-avatar size="100px">
        <q-img :src="src" />
      </q-avatar>
      <CharacterForm accion="update" />
    </div>
  </q-page>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useCharacter } from "../stores/useCharacters";
import { useRoute } from "vue-router";
import CharacterForm from "src/components/CharacterForm.vue";
const characterStore = useCharacter();

const route = useRoute();
onMounted(() => {
  characterStore.findCharacterById(route.params.id);
});

const src = computed(() => {
  return characterStore.getCharacter.avatar !== ""
    ? characterStore.getCharacter.avatar
    : "../public/FateLogo.png";
});
</script>

<style></style>
