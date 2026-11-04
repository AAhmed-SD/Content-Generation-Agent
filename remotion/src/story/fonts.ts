import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const SANS = "Instrument Sans";
export const SERIF = "Instrument Serif";
export const SCRIPT = "Caveat";

loadFont({ family: SANS, url: staticFile("fonts/InstrumentSans.ttf"), weight: "400 700" });
loadFont({ family: SERIF, url: staticFile("fonts/InstrumentSerif-Regular.ttf"), style: "normal" });
loadFont({ family: SERIF, url: staticFile("fonts/InstrumentSerif-Italic.ttf"), style: "italic" });
loadFont({ family: SCRIPT, url: staticFile("fonts/Caveat.ttf"), weight: "400 700" });
