<template>
  <q-page class="q-mx-sm">
    <CharacterForm accion="save"></CharacterForm>
  </q-page>
</template>

<script setup>
import { onMounted } from "vue";
import CharacterForm from "src/components/CharacterForm.vue";
import { useCharacter } from "src/stores/useCharacters";
const characterStore = useCharacter();
onMounted(() => {
  characterStore.resetCharacter();
});
</script>

<style></style>
