// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  // پنل ادمین روی 3001 (پورت 3000 مال سایت اصلی و callback درگاه پرداخت است)
  devServer: {
    port: 3001,
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE ?? "http://localhost:8000/api/admin-panel",
    },
  },

  app: {
    head: {
      htmlAttrs: {
        dir: "rtl",
        lang: "fa",
      },
      link: [
        {
          rel: "preload",
          as: "font",
          type: "font/woff2",
          href: "/fonts/Vazir.woff2",
          crossorigin: "",
        },
      ],
      script: [
        {
          // قبل از اولین رندر تم را اعمال می‌کند تا فلش لایت‌مود در دارک‌مود حذف شود
          innerHTML:
            "(function(){try{var t=localStorage.getItem('theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);document.documentElement.style.colorScheme=t;}catch(e){}})();",
        },
      ],
    },
  },

  css: ["~/assets/css/main.css"],
  
  
  modules:['@formkit/nuxt'],

  build: {
    transpile: ["vue-toastification"],
  },
});
