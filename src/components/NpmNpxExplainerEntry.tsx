import { Toolbar as MuiToolbar } from "@mui/material";
import NpmNpxExplainer from "./NpmNpxExplainer";

declare global {
  // NpmNpxExplainer was generated with a Toolbar reference but no matching import.
  // Define the runtime binding for both Astro SSR and browser hydration.
  // eslint-disable-next-line no-var
  var Toolbar: typeof MuiToolbar;
}

globalThis.Toolbar = MuiToolbar;

export default NpmNpxExplainer;
