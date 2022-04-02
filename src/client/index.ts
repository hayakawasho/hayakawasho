import { createSceneManager } from "./sceneManager";
import { DefaultPage } from "@/components/page";
import { router, define, require, lake } from "@/foundation";

import { withSvelte } from "./withSvelte";
import Sns from "./components/Sns/index.svelte";
import Glworld from "./components/Glworld/index.svelte";
// import Test from './components/Test/Test.svelte'
//

export function initApp() {
  const { goto } = createSceneManager();

  define("Sns", withSvelte(Sns));
  define("Glworld", withSvelte(Glworld));

  console.log(lake, "lake");

  router
    .route("*", () => {
      goto(DefaultPage.exec());
    })
    .exec();
}
