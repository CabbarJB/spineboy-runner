import {Assets} from "pixi.js";

//spineboy
Assets.add({alias: "spineboyData", src: "/assets/spine/spineboy/spineboy-pro.skel"});
Assets.add({alias: "spineboyAtlas", src: "/assets/spine/spineboy/spineboy-pma.atlas"});

// background
Assets.add({alias: 'bgForest', src: "/assets/spine/bg/backgroundColorForest.png"});

//mobs
Assets.add({alias: 'mobData', src: "/assets/spine/mobs/HalloweenCreature.skel"});
Assets.add({alias: "mobAtlas", src: "/assets/spine/mobs/HalloweenCreature.atlas"});

export async function loadAssets() {
    await Assets.load(["spineboyData", "spineboyAtlas", "bgForest", "mobData", "mobAtlas"]);
};
