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
}

// -----------------------------------------------------------------
// Appel de la fonction
// -----------------------------------------------------------------
setupViewer();
