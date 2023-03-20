import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { useUser } from "./useUser";
const user = useUser();
const header = {
  headers: {
    token: user.getToken,
  },
};

export const useCampaing = defineStore("characters", {
  state: () => ({
    campaign: {
      adminId: user.getUser.data._id,
      nombre_master: user.getUser.data.nombre,
      nombre: "",
      descripcion: "",
      notas: [],
      jugadores: [],
    },

    campaignList: [],
    campaignsInvitedList: [],
    currentCampaign: {
      adminId: "",
      nombre_master: "",
      nombre: "",
      descripcion: "",
      notas: [],
      jugadores: [],
    },
  }),
  getters: {
    getCampaign: (state) => state.campaign,
    getCampaignList: (state) => state.campaignList,
    getCampaigsInvitedList: (state) => state.campaignsInvitedList,
    getCurrentCampaign: (state) => state.currentCampaign,
  },
  actions: {
    fillCampaignListFromDB() {
      api
        .get(`get-campaigns/${user.getUser.data._id}`, header)
        .then((res) => {
          console.log(res);
          this.campaignList = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fillCampaignInvitedListFromDB() {
      api
        .get(`get-campaigns-invited/${user.getUser.data._id}`, header)
        .then((res) => {
          console.log(res);
          this.campaignsInvitedList = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    resetCampaign() {
      this.campaign = {
        adminId: user.getUser.data._id,
        nombre: "",
        descripcion: "",
        notas: [],
        jugadores: [],
      };
    },

    getCurrentCampaignFromDB(id) {
      api
        .get(`get-current-campaign/${id}`, header)
        .then((res) => {
          console.log(res);
          this.currentCampaign = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // findCharacterById(id) {
    //   this.character = this.characterslist.filter((c) => c._id === id)[0];
    // },

    // resetCharacter() {
    //   this.character = {
    //     avatar: "",
    //     userId: "",
    //     identidad: {
    //       nombre: "",
    //       descripcion: "",
    //     },
    //     aspectos: {
    //       principal: "",
    //       complicacion: "",
    //       aspecto1: "",
    //       aspecto2: "",
    //       aspecto3: "",
    //     },
    //     fate: {
    //       puntos: 3,
    //       recuperacion: 3,
    //     },
    //     estilos: {
    //       cauto: 0,
    //       furtivo: 0,
    //       ingenioso: 0,
    //       llamativo: 0,
    //       rapido: 0,
    //       vigoroso: 0,
    //     },
    //     proezas: {
    //       proeza1: "",
    //       proeza2: "",
    //       proeza3: "",
    //       proeza4: "",
    //       proeza5: "",
    //     },
    //     stress: {
    //       stress1: false,
    //       stress2: false,
    //       stress3: false,
    //     },
    //     consecuencias: {
    //       consecuencia2: {
    //         consecuencia2: false,
    //         descripcion: "",
    //       },
    //       consecuencia4: {
    //         consecuencia4: false,
    //         descripcion: "",
    //       },
    //       consecuencia6: {
    //         consecuencia6: false,
    //         descripcion: "",
    //       },
    //     },
    //   };
    // },
  },
});
