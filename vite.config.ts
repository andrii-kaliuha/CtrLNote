// // import { defineConfig } from "vite";
// // import react from "@vitejs/plugin-react";
// // import tailwindcss from "@tailwindcss/vite";

// // // https://vite.dev/config/
// // export default defineConfig({
// //   plugins: [react(), tailwindcss()],

// //   base: "/CtrLNote/",
// // });

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";
// import { VitePWA } from "vite-plugin-pwa";

// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//     VitePWA({
//       registerType: "autoUpdate",
//       devOptions: {
//         enabled: true, // Дозволяє тестувати PWA під час розробки
//       },
//       manifest: {
//         name: "CtrLNote",
//         short_name: "CtrLNote",
//         description: "My Notes Application",
//         theme_color: "#ffffff",
//         // Секцію icons поки що можна не додавати або лишити порожньою
//       },
//     }),
//   ],
//   base: "/CtrLNote/",
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "CtrLNote",
        short_name: "CtrLNote",
        description: "My Notes Application",
        theme_color: "#0f172a",
        background_color: "#0f172a",
        display: "standalone",
        start_url: "/CtrLNote/",
        scope: "/CtrLNote/",
        icons: [
          {
            src: "/CtrLNote/icons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/CtrLNote/icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  base: "/CtrLNote/",
});
