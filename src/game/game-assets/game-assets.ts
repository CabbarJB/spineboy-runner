import { Assets } from "pixi.js";

Assets.add({ alias: "spineboyData", src: "/assets/spine/spineboy/spineboy-pro.skel" });
Assets.add({ alias: "spineboyAtlas", src: "/assets/spine/spineboy/spineboy-pma.atlas" });
Assets.add({alias: 'bgForest', src: "/assets/spine/bg/backgroundColorForest.png"});

export async function loadAssets() {
    await Assets.load(["spineboyData", "spineboyAtlas", "bgForest"]);
}