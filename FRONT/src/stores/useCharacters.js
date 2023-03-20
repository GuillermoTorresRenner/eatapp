import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { useUser } from "./useUser";
const user = useUser();
const header = {
  headers: {
    token: user.getToken,
  },
};

export const useCharacter = defineStore("characters", {
  state: () => ({
    character: {
      avatar: "",
      userId: "",
      identidad: {
        nombre: "",
        descripcion: "",
      },
      aspectos: {
        principal: "",
        complicacion: "",
        aspecto1: "",
        aspecto2: "",
        aspecto3: "",
      },
      fate: {
        puntos: 3,
        recuperacion: 3,
      },
      estilos: {
        cauto: 0,
        furtivo: 0,
        ingenioso: 0,
        llamativo: 0,
        rapido: 0,
        vigoroso: 0,
      },
      proezas: {
        proeza1: "",
        proeza2: "",
        proeza3: "",
        proeza4: "",
        proeza5: "",
      },
      stress: {
        stress1: false,
        stress2: false,
        stress3: false,
      },
      consecuencias: {
        consecuencia2: {
          consecuencia2: false,
          descripcion: "",
        },
        consecuencia4: {
          consecuencia4: false,
          descripcion: "",
        },
        consecuencia6: {
          consecuencia6: false,
          descripcion: "",
        },
      },
    },
    characterslist: [],
  }),
  getters: {
    getCharactersList: (state) => state.characterslist,
    getCharacter: (state) => state.character,
  },
  actions: {
    createCharacter(character) {
      this.character = character;
    },
    fillCharacterListFromDB() {
      api
        .get(`get-characters/${user.getUser.data._id}`, header)
        .then((res) => {
          console.log(res);
          this.characterslist = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    findCharacterById(id) {
      this.character = this.characterslist.filter((c) => c._id === id)[0];
    },

    resetCharacter() {
      this.character = {
        avatar: "",
        userId: "",
        identidad: {
          nombre: "",
          descripcion: "",
        },
        aspectos: {
          principal: "",
          complicacion: "",
          aspecto1: "",
          aspecto2: "",
          aspecto3: "",
        },
        fate: {
          puntos: 3,
          recuperacion: 3,
        },
        estilos: {
          cauto: 0,
          furtivo: 0,
          ingenioso: 0,
          llamativo: 0,
          rapido: 0,
          vigoroso: 0,
        },
        proezas: {
          proeza1: "",
          proeza2: "",
          proeza3: "",
          proeza4: "",
          proeza5: "",
        },
        stress: {
          stress1: false,
          stress2: false,
          stress3: false,
        },
        consecuencias: {
          consecuencia2: {
            consecuencia2: false,
            descripcion: "",
          },
          consecuencia4: {
            consecuencia4: false,
            descripcion: "",
          },
          consecuencia6: {
            consecuencia6: false,
            descripcion: "",
          },
        },
      };
    },
  },
});
