import { defineStore } from "pinia";
import jwt_decode from "jwt-decode";
import { LocalStorage } from "quasar";
import { api } from "src/boot/axios";

export const useUser = defineStore("user", {
  state: () => ({
    user: "",
    token: "",
    usersList: [],
  }),
  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    getUserList: (state) => state.usersList,
  },
  actions: {
    saveUser(token) {
      localStorage.setItem("token", token);
      this.token = token;
      if (token === "") {
        this.user = "";
      } else {
        this.user = jwt_decode(token);
      }
    },
    sesionActiva() {
      const tk = LocalStorage.getItem("token");
      if (tk) {
        this.saveUser(tk);
      } else {
        this.saveUser("");
      }
    },
    fillUserListFromDB() {
      api
        .get("get-users", {
          headers: {
            token: this.getToken,
          },
        })
        .then((res) => {
          this.usersList = res.data.filter((u) => u._id !== this.user.data._id);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
