import { createSceneManager } from "./sceneManager";
import { DefaultPage } from "@/components/page";
import { router } from "@/foundation";

export function initApp() {
  const { goto } = createSceneManager();

  router
    .route("*", () => {
      goto(DefaultPage.exec());
    })
    .exec();
}
