const routes = [
  {
    path: "/login",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      {
        path: "/login",
        component: () => import("pages/LoginPage.vue"),
        name: "Login",
      },
      {
        path: "/create-account",
        component: () => import("pages/CreateAccount.vue"),
        name: "CreateAccount",
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        component: () => import("pages/IndexPage.vue"),
        meta: { requireAuth: true },
      },

      {
        path: "/characters",
        component: () => import("pages/MyCharacters.vue"),
        meta: { requireAuth: true },
      },
      {
        path: "/campains",
        component: () => import("pages/MyCampains.vue"),
        meta: { requireAuth: true },
      },
      {
        path: "/create-character",
        component: () => import("pages/CreateCharacter.vue"),
        meta: { requireAuth: true },
      },
      {
        path: "/watch-character/:id",
        component: () => import("pages/WathCharacter.vue"),
        meta: { requireAuth: true },
      },
      {
        path: "/create-campaign",
        component: () => import("pages/CreateCampaign.vue"),
        meta: { requireAuth: true },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
