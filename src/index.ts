// -----------------------------------------------------------------
// Importations
// -----------------------------------------------------------------

import {
  ViewerApp,
  AssetManagerPlugin,
  GBufferPlugin,
  timeout,
  ProgressivePlugin,
  TonemapPlugin,
  SSRPlugin,
  SSAOPlugin,
  DiamondPlugin,
  FrameFadePlugin,
  GLTFAnimationPlugin,
  GroundPlugin,
  BloomPlugin,
  TemporalAAPlugin,
  AnisotropyPlugin,
  GammaCorrectionPlugin,
  // addBasePlugins, // ne pas importer
  ITexture,
  TweakpaneUiPlugin,
  AssetManagerBasicPopupPlugin,
  CanvasSnipperPlugin,
  IViewerPlugin,

  // Color, // Import THREE.js internals
  // Texture, // Import THREE.js internals
} from "webgi";
import "./styles.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// -----------------------------------------------------------------
// Création de la fonction Asynchrone
// -----------------------------------------------------------------

async function setupViewer() {
  // ---------- Initialize the viewer ----------
  const viewer = new ViewerApp({
    canvas: document.getElementById("webgi-canvas") as HTMLCanvasElement,
    useRgbm: false,
  });

  // ---------- Add some plugins ----------
  const manager = await viewer.addPlugin(AssetManagerPlugin);

  //
  const camera = viewer.scene.activeCamera;
  const position = camera.position;
  const target = camera.target;
  //

  // ---------- Add a popup(in HTML) ----------
  // with download progress when any asset is downloading.
  await viewer.addPlugin(AssetManagerBasicPopupPlugin);

  // ---------- Add plugins individually ----------
  await viewer.addPlugin(GBufferPlugin);
  await viewer.addPlugin(new ProgressivePlugin(32));
  await viewer.addPlugin(new TonemapPlugin(!viewer.useRgbm));
  await viewer.addPlugin(GammaCorrectionPlugin);
  await viewer.addPlugin(SSRPlugin);
  await viewer.addPlugin(SSAOPlugin);
  //   await viewer.addPlugin(DiamondPlugin);
  //   await viewer.addPlugin(FrameFadePlugin);
  //   await viewer.addPlugin(GLTFAnimationPlugin);
  //   await viewer.addPlugin(GroundPlugin);
  await viewer.addPlugin(BloomPlugin);
  //   await viewer.addPlugin(TemporalAAPlugin);
  //   await viewer.addPlugin(AnisotropyPlugin);
  // and many more...

  // or use this to add all main ones at once.
  // await addBasePlugins(viewer); // on a désactiver l'import initial

  // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
  await viewer.addPlugin(CanvasSnipperPlugin);

  // This must be called once after all plugins are added.
  viewer.renderer.refreshPipeline();

  // Import and add a GLB file.
  await viewer.load("./assets/drill.glb");

  // Load an environment map if not set in the glb file
  // await viewer.setEnvironmentMap((await manager.importer!.importSinglePath<ITexture>("./assets/environment.hdr"))!);

  // Add some UI for tweak and testing.
  const uiPlugin = await viewer.addPlugin(TweakpaneUiPlugin);
  // Add plugins to the UI to see their settings.
  uiPlugin.setupPlugins<IViewerPlugin>(TonemapPlugin, CanvasSnipperPlugin);

  //
  function setupScrollanimation() {
    const tl = gsap.timeline();

    // FIRST SECTION

    //   tl.to(position, {
    //     x: -3.8257862265,
    //     y: -2.2493996515,
    //     z: 7.5526914841,
    //     scrollTrigger: {
    //       trigger: ".second",
    //       start: "top bottom",
    //       end: "top top",
    //       scrub: true,
    //       immediateRender: true,
    //     },
    //     onUpdate,
    //   })

    //     .to(".section--one--container", {
    //       xPercent: "-150",
    //       opacity: 0,
    //       scrollTrigger: {
    //         trigger: ".second",
    //         start: "top bottom",
    //         end: "top 80%",
    //         scrub: 1,
    //         immediateRender: false,
    //       },
    //     })
    //     .to(target, {
    //       x: -1.37,
    //       y: 1.99,
    //       z: -0.37,
    //       scrollTrigger: {
    //         trigger: ".second",
    //         start: "top bottom",
    //         end: "top top",
    //         scrub: true,
    //         immediateRender: false,
    //       },
    //     })

    //     // LAST SECTION

    //     .to(position, {
    //       x: -3.4,
    //       y: 9.6,
    //       z: 1.71,
    //       scrollTrigger: {
    //         trigger: ".third",
    //         start: "top bottom",
    //         end: "top top",
    //         scrub: true,
    //         immediateRender: false,
    //       },
    //       onUpdate,
    //     })

    //     .to(target, {
    //       x: -1.5,
    //       y: 2.13,
    //       z: -0.4,
    //       scrollTrigger: {
    //         trigger: ".third",
    //         start: "top bottom",
    //         end: "top top",
    //         scrub: true,
    //         immediateRender: false,
    //       },
    //     });
    // }

    // -----------------------
    // first section
    // -----------------------

    tl.to(position, {
      //   // -----------------------
      //   // second section
      //   // -----------------------

      //   .to(position, {
      x: 3.2097185381,
      y: -4.0532794149,
      z: -6.0816965715,
      scrollTrigger: {
        trigger: ".second",
        start: "top bottom",
        end: "top top",
        immediateRender: false,
        scrub: true,
      },
      onUpdate,
    })

      .to(".section--one--container", {
        xPercent: -150,
        opacity: 0,
        scrollTrigger: {
          trigger: ".second",
          start: "top bottom",
          end: "top 80%",
          immediateRender: false,
          scrub: 1,
        },
      })

      .to(target, {
        x: -0.5640163703,
        y: 0.1310943071,
        z: -0.738582469,
        scrollTrigger: {
          trigger: ".second",
          start: "top bottom",
          end: "top top",
          immediateRender: false,
          scrub: true,
        },
      })

      // -----------------------
      // third section
      // -----------------------

      .to(position, {
        x: -2.7201034832,
        y: -0.4980321668,
        z: 1.4638919974,
        scrollTrigger: {
          trigger: ".third",
          start: "top bottom",
          end: "top top",
          // markers: true,
          immediateRender: false,
          scrub: true,
        },
        onUpdate,
      })
      .to(target, {
        x: -0.7171929084,
        y: 1.3947002455,
        z: -0.4978809638,
        scrollTrigger: {
          trigger: ".third",
          start: "top bottom",
          end: "top top",
          // markers: true,
          immediateRender: false,
          scrub: true,
        },
      });
  }

  setupScrollanimation();

  // WEBGI UPDATE
  let needsUpdate = true;

  function onUpdate() {
    needsUpdate = true;
    viewer.renderer.resetShadows();
  }

  viewer.addEventListener("preFrame", () => {
    if (needsUpdate) {
      camera.positionUpdated(true);
      camera.targetUpdated(true);
      needsUpdate = false;
    }
  });
}

// -----------------------------------------------------------------
// -----------------------------------------------------------------

// ---------- Add plugins individually ----------

// -----------------------------------------------------------------
// Appel de la fonction
// -----------------------------------------------------------------
setupViewer();
