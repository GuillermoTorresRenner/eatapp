<template>
  <h5 class="text-center text-primary">Crear una campaña</h5>
  <q-form @submit="submit">
    <q-card>
      <q-card-section>
        <q-input
          v-model="campaignStore.getCampaign.nombre"
          type="text"
          label="Nombre Campaña"
        />
        <q-input
          v-model="campaignStore.getCampaign.descripcion"
          type="textarea"
          label="Descripcion"
        />
      </q-card-section>
      <q-card-section>
        <h6 class="text-center text-purple">Jugadores</h6>
        <q-table
          title="Treats"
          :rows="userStore.getUserList"
          :columns="columns"
          row-key="_id"
          selection="multiple"
          v-model:selected="selected"
          :filter="filter"
        >
          <template v-slot:top-right>
            <q-input
              borderless
              dense
              debounce="300"
              v-model="filter"
              placeholder="Buscar"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <div class="text-center">
      <q-btn
        type="submit"
        :color="props.accion === 'save' ? 'green' : 'warning'"
        icon="ion-save"
        size="xl"
        class="q-mt-xl"
      />
    </div>
  </q-form>
</template>

<script setup>
import { useCampaing } from "src/stores/useCampaign";
import { useUser } from "src/stores/useUser";
import { onMounted, ref, defineProps } from "vue";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
const props = defineProps({
  accion: String,
});

const router = useRouter();
const campaignStore = useCampaing();
const selected = ref([]);
const filter = ref("");
const userStore = useUser();
const rows = ref();
const $q = useQuasar();
const header = {
  headers: {
    token: userStore.getToken,
  },
};

const columns = [
  {
    name: "nombre",
    align: "center",
    label: "Nombre",
    field: "nombre",
    sortable: true,
  },
];
function submit() {
  if (props.accion === "save") {
    selected.value.forEach((s) => {
      campaignStore.getCampaign.jugadores.push({ userId: s._id });
    });

    api
      .post("/create-campaign", campaignStore.getCampaign, header)
      .then((res) => {
        $q.notify({
          message: res.data.message,
          color: "green",
          icon: "check",
          position: "bottom",
        });
        campaignStore.resetCampaign;
        router.push("/campains");
      })

      .catch((error) => {
        console.log(error);
      });
  }

  if (props.accion === "edit") {
  }
}
function confirmCreate() {
  $q.dialog({
    title: `¿Crear Campaña: ${campaignStore.getCampaign.nombre}?`,
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      createCampaign();
    })
    .onCancel(() => {});
}

onMounted(() => {
  userStore.fillUserListFromDB();
  rows.value = userStore.getUserList;
});
</script>

<style></style>
