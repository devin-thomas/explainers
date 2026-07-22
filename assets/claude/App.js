import React, { useMemo, useState } from "react";
import { ThemeProvider, createTheme, CssBaseline, GlobalStyles, AppBar, Toolbar, Typography, Box, Container, Chip, Card, CardActionArea, CardContent, Collapse, LinearProgress, Grid, Stack, Divider, } from "@mui/material";
import { ExpandMore as ExpandMoreIcon, SportsEsports, VideogameAsset, MenuBook, Groups, Build, Extension, Memory as MemoryIcon, } from "@mui/icons-material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList, } from "recharts";
const GEN_LABEL = {
    "3": "Gen 3 · 8-bit",
    "4": "Gen 4 · 16-bit",
    "5": "Gen 5 · 32/64-bit",
    "6": "Gen 6 · incl. DS & PSP",
};
const GEN_COLOR = {
    "3": "#FFD740", // amber A200
    "4": "#64FFDA", // teal A200
    "5": "#FF4081", // pink A200
    "6": "#40C4FF", // light blue A200
};
const PLATFORMS = [
    { id: "nes", name: "NES / Famicom", short: "NES", gen: "3", kind: "console", year: 1983, cpu: "6502", lang: "ASM / C (cc65)",
        documentation: 95, community: 90, toolchain: 65, tooling: 85,
        blurb: "The best-documented 8-bit system in existence. The NESdev wiki maps the hardware down to the cycle, and decades of romhacks give a model plenty to pattern-match against.",
        tools: ["cc65 (C)", "6502 ASM", "Mesen debugger", "NESdev Wiki"] },
    { id: "fds", name: "Famicom Disk System", short: "FDS", gen: "3", kind: "add-on", year: 1986, cpu: "6502", lang: "ASM / C (cc65)",
        documentation: 60, community: 45, toolchain: 60, tooling: 55,
        blurb: "Shares the NES CPU and toolchain, but the disk BIOS calls and load/save quirks are thinly documented outside a handful of specialist writeups.",
        tools: ["cc65", "FDS BIOS notes", "Nintendulator-FDS"] },
    { id: "sms", name: "Sega Master System", short: "SMS", gen: "3", kind: "console", year: 1985, cpu: "Z80", lang: "ASM / C (SDCC)",
        documentation: 75, community: 60, toolchain: 65, tooling: 60,
        blurb: "SMS Power! is a genuinely excellent reference, and Z80 is one of the most AI-familiar CPUs on this whole list, but the active dev community is a fraction of the NES's.",
        tools: ["SDCC (C)", "devkitSMS", "SMS Power! wiki"] },
    { id: "a7800", name: "Atari 7800", short: "7800", gen: "3", kind: "console", year: 1986, cpu: "6502 + Maria", lang: "ASM / BASIC-like",
        documentation: 55, community: 35, toolchain: 40, tooling: 45,
        blurb: "The Maria display coprocessor is unusually fiddly to reason about, and outside AtariAge's small forum, reliable technical writeups thin out fast.",
        tools: ["7800basic", "a78 header tools", "AtariAge forums"] },
    { id: "snes", name: "SNES / Super Famicom", short: "SNES", gen: "4", kind: "console", year: 1990, cpu: "65816", lang: "ASM / C (PVSnesLib)",
        documentation: 85, community: 80, toolchain: 65, tooling: 80,
        blurb: "A huge romhacking and homebrew scene has reverse-engineered nearly everything, though the 65816's quirks and Mode 7-style tricks still reward hand-written assembly.",
        tools: ["PVSnesLib (C)", "65816 ASM", "bsnes-plus debugger"] },
    { id: "genesis", name: "Sega Genesis / Mega Drive", short: "Genesis", gen: "4", kind: "console", year: 1988, cpu: "68000", lang: "C (SGDK)",
        documentation: 88, community: 82, toolchain: 80, tooling: 80,
        blurb: "SGDK turned this into one of the most approachable retro targets around: real C, a mature build pipeline, and the 68000 is an assembly family models already know well.",
        tools: ["SGDK (C)", "68k ASM", "BlastEm debugger"] },
    { id: "segacd", name: "Sega CD / Mega-CD", short: "Sega CD", gen: "4", kind: "add-on", year: 1991, cpu: "68000 + 68000", lang: "C (partial SGDK)",
        documentation: 60, community: 50, toolchain: 60, tooling: 55,
        blurb: "Rides on Genesis tooling but adds a second CPU and CD-ROM/BIOS layer that SGDK only partially covers, so expect more manual scaffolding.",
        tools: ["SGDK (partial)", "Mode1/Mode2 loader notes"] },
    { id: "32x", name: "Sega 32X", short: "32X", gen: "4", kind: "add-on", year: 1994, cpu: "2× SH-2", lang: "C (GCC) / ASM",
        documentation: 45, community: 30, toolchain: 35, tooling: 40,
        blurb: "A short-lived dual-SH2 bolt-on with a genuinely small homebrew scene; there is a GCC-based path in, but example code and docs are sparse.",
        tools: ["SH-2 GCC toolchain", "Scattered SDKs"] },
    { id: "pce", name: "TurboGrafx-16 / PC Engine", short: "PCE", gen: "4", kind: "console", year: 1987, cpu: "HuC6280", lang: "C (HuC)",
        documentation: 65, community: 50, toolchain: 50, tooling: 55,
        blurb: "HuC gives a workable C compiler and the PCEdev wiki covers the basics well, but it's a distinctly smaller community than its 16-bit rivals.",
        tools: ["HuC (C)", "Magic Engine", "PCEdev wiki"] },
    { id: "pcecd", name: "TurboGrafx-CD / PC Engine CD", short: "PCE-CD", gen: "4", kind: "add-on", year: 1988, cpu: "HuC6280", lang: "C (HuC)",
        documentation: 55, community: 40, toolchain: 45, tooling: 45,
        blurb: "Adds CD-ROM BIOS calls on top of an already-niche base system, so documentation and working examples are noticeably thinner.",
        tools: ["HuC", "CD BIOS call references"] },
    { id: "neogeo", name: "Neo Geo AES / MVS", short: "Neo Geo", gen: "4", kind: "console", year: 1990, cpu: "68000 + Z80", lang: "ASM / C (NeoDev)",
        documentation: 60, community: 50, toolchain: 45, tooling: 50,
        blurb: "Arcade-grade hardware with a dedicated but narrow reverse-engineering community; the NeoDev SDK helps, but most real reference material is arcade-hacker folklore.",
        tools: ["NeoDev SDK", "68k ASM", "GnGeo debugger"] },
    { id: "gb", name: "Game Boy", short: "GB", gen: "4", kind: "handheld", year: 1989, cpu: "Sharp LR35902", lang: "C (GBDK) / ASM",
        documentation: 95, community: 88, toolchain: 80, tooling: 88,
        blurb: "Pan Docs is one of the finest pieces of hardware documentation ever written for any console, and GBDK-2020 plus RGBDS make this an extremely approachable, well-trodden target.",
        tools: ["GBDK-2020 (C)", "RGBDS (ASM)", "BGB debugger", "Pan Docs"] },
    { id: "gbc", name: "Game Boy Color", short: "GBC", gen: "4", kind: "handheld", year: 1998, cpu: "Sharp LR35902 (2×)", lang: "C (GBDK) / ASM",
        documentation: 90, community: 82, toolchain: 80, tooling: 82,
        blurb: "Inherits the Game Boy's excellent documentation and toolchain almost wholesale, with the double-speed mode and palette extensions well covered too.",
        tools: ["GBDK-2020", "RGBDS", "BGB debugger"] },
    { id: "gamegear", name: "Game Gear", short: "Game Gear", gen: "4", kind: "handheld", year: 1990, cpu: "Z80", lang: "ASM / C (SDCC)",
        documentation: 70, community: 55, toolchain: 60, tooling: 58,
        blurb: "Close enough to the Master System to borrow most of its tooling and docs, but with a smaller dedicated fanbase of its own.",
        tools: ["SDCC / devkitSMS", "SMS-shared tooling"] },
    { id: "lynx", name: "Atari Lynx", short: "Lynx", gen: "4", kind: "handheld", year: 1989, cpu: "65C02 + Suzy/Mikey", lang: "ASM / C (cc65)",
        documentation: 48, community: 32, toolchain: 38, tooling: 40,
        blurb: "Genuinely inventive custom chips (Suzy, Mikey) that are correspondingly obscure; a small but devoted AtariAge-centric scene is most of what exists.",
        tools: ["cc65 Lynx port", "Handy debugger"] },
    { id: "ps1", name: "PlayStation", short: "PS1", gen: "5", kind: "console", year: 1994, cpu: "MIPS R3000", lang: "C (PSn00bSDK)",
        documentation: 82, community: 78, toolchain: 70, tooling: 72,
        blurb: "Open reimplementations of Sony's original libraries (PSn00bSDK) plus a large romhacking base make this a comfortable, well-documented MIPS target.",
        tools: ["PSn00bSDK (C)", "PSXSDK", "DuckStation debugger"] },
    { id: "saturn", name: "Sega Saturn", short: "Saturn", gen: "5", kind: "console", year: 1994, cpu: "2× SH-2 + more", lang: "C (Jo Engine / Yaul)",
        documentation: 50, community: 45, toolchain: 45, tooling: 50,
        blurb: "Famously complex multi-chip architecture that even period Sega developers struggled with; modern SDKs like Jo Engine and Yaul help, but reference material stays thin.",
        tools: ["Jo Engine (C)", "Yaul SDK", "Mednafen debugger"] },
    { id: "n64", name: "Nintendo 64", short: "N64", gen: "5", kind: "console", year: 1996, cpu: "MIPS R4300i", lang: "C (libdragon)",
        documentation: 72, community: 65, toolchain: 60, tooling: 62,
        blurb: "libdragon's open-source, actively maintained SDK is a real gift here, though the reality-coprocessor microcode side of things stays genuinely hard to reason about.",
        tools: ["libdragon (C)", "GCC toolchain", "Project64 debugger"] },
    { id: "vb", name: "Virtual Boy", short: "V.Boy", gen: "5", kind: "handheld", year: 1995, cpu: "NEC V810", lang: "C (VUEngine) / ASM",
        documentation: 42, community: 28, toolchain: 38, tooling: 40,
        blurb: "A commercial dead end with a correspondingly tiny homebrew scene; VUEngine is a bright spot, but there's simply far less written knowledge to draw on.",
        tools: ["VUEngine (C)", "GCC v810 port", "Mednafen"] },
    { id: "ps2", name: "PlayStation 2", short: "PS2", gen: "6", kind: "console", year: 2000, cpu: "MIPS EE + VUs", lang: "C (PS2SDK)",
        documentation: 68, community: 65, toolchain: 55, tooling: 60,
        blurb: "PS2SDK covers the basics solidly, but truly exploiting the Emotion Engine means hand-tuning vector units, which is a much narrower, harder-documented skill.",
        tools: ["PS2SDK (C)", "PCSX2 debugger", "PS2 homebrew wiki"] },
    { id: "dreamcast", name: "Sega Dreamcast", short: "DC", gen: "6", kind: "console", year: 1998, cpu: "SH-4", lang: "C/C++ (KallistiOS)",
        documentation: 78, community: 70, toolchain: 65, tooling: 68,
        blurb: "KallistiOS is a mature, well-documented open-source SDK with a loyal community that kept building long after the console's commercial life ended.",
        tools: ["KallistiOS (C/C++)", "GCC", "Flycast / redream debugger"] },
    { id: "gamecube", name: "GameCube", short: "GC", gen: "6", kind: "console", year: 2001, cpu: "PowerPC 'Gekko'", lang: "C/C++ (devkitPPC)",
        documentation: 70, community: 62, toolchain: 62, tooling: 68,
        blurb: "devkitPPC gives a solid modern C/C++ path, and it shares a lot of tooling lineage with Wii homebrew, which keeps documentation reasonably fresh.",
        tools: ["devkitPPC (C/C++)", "Dolphin debugger"] },
    { id: "xbox", name: "Xbox (original)", short: "Xbox", gen: "6", kind: "console", year: 2001, cpu: "x86 (Celeron/Coppermine)", lang: "C/C++ (nxdk)",
        documentation: 62, community: 55, toolchain: 75, tooling: 55,
        blurb: "Plain x86 is about as AI-familiar as CPUs get, and the modern open-source nxdk toolchain is a big upgrade — but original devkit-era docs stayed proprietary, so the public knowledge base is thinner than the hardware deserves.",
        tools: ["nxdk (C/C++)", "x86 familiarity", "XQEMU debugger"] },
    { id: "gba", name: "Game Boy Advance", short: "GBA", gen: "6", kind: "handheld", year: 2001, cpu: "ARM7TDMI", lang: "C/C++ (devkitARM)",
        documentation: 95, community: 90, toolchain: 88, tooling: 90,
        blurb: "About as good as retro dev gets: devkitARM + libgba, an enormous tutorial base (GBATEK, Tonc), and ARM assembly a model has seen constantly in training.",
        tools: ["devkitARM + libgba (C)", "mGBA debugger", "GBATEK / Tonc"] },
    { id: "nds", name: "Nintendo DS", short: "DS", gen: "6", kind: "handheld", year: 2004, cpu: "2× ARM (ARM9+ARM7)", lang: "C/C++ (devkitARM + libnds)",
        documentation: 90, community: 82, toolchain: 82, tooling: 84,
        blurb: "libnds and devkitARM are excellent and actively maintained; the dual-CPU, dual-screen model adds real complexity, but it's unusually well documented for that complexity.",
        tools: ["devkitARM + libnds (C/C++)", "melonDS / DeSmuME debugger"] },
    { id: "psp", name: "PlayStation Portable", short: "PSP", gen: "6", kind: "handheld", year: 2004, cpu: "MIPS R4000-class", lang: "C/C++ (PSPSDK)",
        documentation: 82, community: 78, toolchain: 78, tooling: 80,
        blurb: "PSPSDK offers a genuinely comfortable, near-official-feeling C/C++ environment, backed by a homebrew scene that stayed active for well over a decade.",
        tools: ["PSPSDK (C/C++)", "PPSSPP debugger"] },
];
function overallOf(p) {
    return Math.round((p.documentation + p.community + p.toolchain + p.tooling) / 4);
}
function tierColor(score) {
    if (score >= 85)
        return "#69F0AE"; // green A200
    if (score >= 70)
        return "#40C4FF"; // blue A200
    if (score >= 50)
        return "#FFD740"; // amber A200
    return "#FF5252"; // red A200
}
/* ---------------------------------------------------------------
   THEME — Material Design 2, dark
--------------------------------------------------------------- */
const theme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: "#64FFDA" },
        secondary: { main: "#FF4081" },
        error: { main: "#FF5252" },
        warning: { main: "#FFD740" },
        success: { main: "#69F0AE" },
        info: { main: "#40C4FF" },
        background: { default: "#121212", paper: "#1e1e1e" },
    },
    shape: { borderRadius: 10 },
    typography: {
        fontFamily: "'Roboto', sans-serif",
        h5: { fontFamily: "'Roboto Condensed', sans-serif", fontWeight: 700 },
        h6: { fontFamily: "'Roboto Condensed', sans-serif", fontWeight: 700 },
        subtitle1: { fontFamily: "'Roboto Condensed', sans-serif", fontWeight: 700 },
        overline: { fontFamily: "'Roboto Condensed', sans-serif", letterSpacing: 1.5 },
    },
    components: {
        MuiCard: {
            styleOverrides: { root: { backgroundImage: "none" } },
        },
    },
});
const PIXEL_FONT = "'Press Start 2P', cursive";
/* ---------------------------------------------------------------
   SMALL SUBCOMPONENTS
--------------------------------------------------------------- */
function ScoreDial({ score }) {
    const color = tierColor(score);
    const size = 68;
    const stroke = 6;
    const r = (size - stroke) / 2;
    const c = 2 * Math.PI * r;
    const dash = (score / 100) * c;
    return (React.createElement(Box, { sx: { position: "relative", width: size, height: size, flexShrink: 0 } },
        React.createElement("svg", { width: size, height: size, style: { transform: "rotate(-90deg)" } },
            React.createElement("circle", { cx: size / 2, cy: size / 2, r: r, fill: "none", stroke: "rgba(255,255,255,0.08)", strokeWidth: stroke }),
            React.createElement("circle", { cx: size / 2, cy: size / 2, r: r, fill: "none", stroke: color, strokeWidth: stroke, strokeDasharray: `${dash} ${c - dash}`, strokeLinecap: "round" })),
        React.createElement(Box, { sx: {
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            } },
            React.createElement(Typography, { sx: { fontFamily: PIXEL_FONT, fontSize: 13, color } }, score))));
}
function SubBar({ label, value }) {
    return (React.createElement(Box, { sx: { mb: 1.1 } },
        React.createElement(Stack, { direction: "row", justifyContent: "space-between", sx: { mb: 0.3 } },
            React.createElement(Typography, { variant: "caption", color: "text.secondary" }, label),
            React.createElement(Typography, { variant: "caption", sx: { fontFamily: PIXEL_FONT, fontSize: 9, color: tierColor(value) } }, value)),
        React.createElement(LinearProgress, { variant: "determinate", value: value, sx: {
                height: 6,
                borderRadius: 3,
                bgcolor: "rgba(255,255,255,0.08)",
                "& .MuiLinearProgress-bar": { bgcolor: tierColor(value), borderRadius: 3 },
            } })));
}
function PlatformCard({ p }) {
    const [open, setOpen] = useState(false);
    const overall = overallOf(p);
    const genColor = GEN_COLOR[p.gen];
    return (React.createElement(Card, { sx: { overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" } },
        React.createElement(Box, { sx: { display: "flex", gap: "3px", px: 1.5, pt: 1, bgcolor: "background.paper" } }, Array.from({ length: 10 }).map((_, i) => (React.createElement(Box, { key: i, sx: {
                width: 8,
                height: 12,
                bgcolor: genColor,
                opacity: i % 3 === 0 ? 0.9 : 0.35,
                borderRadius: "1px 1px 0 0",
            } })))),
        React.createElement(CardActionArea, { onClick: () => setOpen((o) => !o) },
            React.createElement(CardContent, { sx: { pt: 1.5 } },
                React.createElement(Stack, { direction: "row", alignItems: "center", spacing: 1.5 },
                    React.createElement(ScoreDial, { score: overall }),
                    React.createElement(Box, { sx: { flexGrow: 1, minWidth: 0 } },
                        React.createElement(Stack, { direction: "row", alignItems: "center", spacing: 0.75, flexWrap: "wrap" },
                            p.kind === "handheld" ? (React.createElement(VideogameAsset, { sx: { fontSize: 18, color: genColor } })) : (React.createElement(SportsEsports, { sx: { fontSize: 18, color: genColor } })),
                            React.createElement(Typography, { variant: "subtitle1", sx: { lineHeight: 1.2 } }, p.name)),
                        React.createElement(Stack, { direction: "row", spacing: 0.75, sx: { mt: 0.5 }, flexWrap: "wrap", useFlexGap: true },
                            React.createElement(Chip, { size: "small", label: GEN_LABEL[p.gen], sx: { bgcolor: `${genColor}22`, color: genColor, fontWeight: 600 } }),
                            React.createElement(Chip, { size: "small", variant: "outlined", label: p.year }),
                            React.createElement(Chip, { size: "small", variant: "outlined", label: p.lang }))),
                    React.createElement(ExpandMoreIcon, { sx: {
                            transform: open ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.2s",
                            color: "text.secondary",
                        } })))),
        React.createElement(Collapse, { in: open, timeout: "auto", unmountOnExit: true },
            React.createElement(Divider, { sx: { borderColor: "rgba(255,255,255,0.06)" } }),
            React.createElement(CardContent, null,
                React.createElement(Typography, { variant: "body2", color: "text.secondary", sx: { mb: 2 } }, p.blurb),
                React.createElement(SubBar, { label: "Documentation", value: p.documentation }),
                React.createElement(SubBar, { label: "Community", value: p.community }),
                React.createElement(SubBar, { label: "Toolchain (C/C++ vs raw ASM)", value: p.toolchain }),
                React.createElement(SubBar, { label: "Tooling & debuggers", value: p.tooling }),
                React.createElement(Stack, { direction: "row", spacing: 0.75, sx: { mt: 1.5 }, flexWrap: "wrap", useFlexGap: true }, p.tools.map((t) => (React.createElement(Chip, { key: t, size: "small", label: t, sx: { bgcolor: "rgba(255,255,255,0.06)" } }))))))));
}
function MethodItem({ icon, title, desc }) {
    return (React.createElement(Stack, { direction: "row", spacing: 1.25, alignItems: "flex-start" },
        React.createElement(Box, { sx: { color: "primary.main", mt: 0.25 } }, icon),
        React.createElement(Box, null,
            React.createElement(Typography, { variant: "body2", sx: { fontWeight: 700 } }, title),
            React.createElement(Typography, { variant: "caption", color: "text.secondary" }, desc))));
}
/* ---------------------------------------------------------------
   MAIN APP
--------------------------------------------------------------- */
export default function App() {
    const [genFilter, setGenFilter] = useState("all");
    const [kindFilter, setKindFilter] = useState("all");
    const [sortHighFirst, setSortHighFirst] = useState(true);
    const withScores = useMemo(() => PLATFORMS.map((p) => ({ ...p, overall: overallOf(p) })), []);
    const filtered = useMemo(() => {
        let list = withScores.filter((p) => (genFilter === "all" || p.gen === genFilter) && (kindFilter === "all" || p.kind === kindFilter));
        list = [...list].sort((a, b) => sortHighFirst ? b.overall - a.overall : a.year - b.year);
        return list;
    }, [withScores, genFilter, kindFilter, sortHighFirst]);
    const genAverages = useMemo(() => {
        const buckets = { "3": [], "4": [], "5": [], "6": [] };
        withScores.forEach((p) => buckets[p.gen].push(p.overall));
        return ["3", "4", "5", "6"].map((g) => ({
            gen: GEN_LABEL[g].split(" · ")[0],
            value: Math.round(buckets[g].reduce((a, b) => a + b, 0) / buckets[g].length),
            color: GEN_COLOR[g],
        }));
    }, [withScores]);
    return (React.createElement(ThemeProvider, { theme: theme },
        React.createElement(CssBaseline, null),
        React.createElement(GlobalStyles, { styles: {
                "@import": "url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Roboto+Condensed:wght@400;700&family=Roboto:wght@300;400;500;700&display=swap')",
            } }),
        React.createElement(Box, { sx: { minHeight: "100vh", bgcolor: "background.default" } },
            React.createElement(AppBar, { position: "sticky", elevation: 2, sx: { bgcolor: "#1a1a1a" } },
                React.createElement(Toolbar, { sx: { gap: 1 } },
                    React.createElement(MemoryIcon, { sx: { color: "primary.main" } }),
                    React.createElement(Box, { sx: { flexGrow: 1 } },
                        React.createElement(Typography, { variant: "h6", sx: { fontSize: 18, lineHeight: 1.1 } }, "AI-Build Index"),
                        React.createElement(Typography, { variant: "caption", color: "text.secondary" }, "Retro consoles, ranked by AI-assist readiness")))),
            React.createElement(Container, { maxWidth: "sm", sx: { py: 3 } },
                React.createElement(Typography, { variant: "overline", sx: { color: "primary.main", fontFamily: PIXEL_FONT, fontSize: 9, letterSpacing: 2 } }, "NES \u2192 6TH GEN (WITH DS & PSP)"),
                React.createElement(Typography, { variant: "h5", sx: { mt: 1, mb: 1.5 } }, "How ready is each console for an AI co-pilot?"),
                React.createElement(Typography, { variant: "body2", color: "text.secondary", sx: { mb: 3 } }, "Every score below is an estimate of how easily a coding model could help build a real game for that hardware today \u2014 weighing public documentation, active homebrew communities, how close the toolchain gets to plain C, and the maturity of SDKs and emulator debuggers. Tap any cartridge to see the breakdown."),
                React.createElement(Card, { variant: "outlined", sx: { p: 2, mb: 3, borderColor: "rgba(255,255,255,0.08)" } },
                    React.createElement(Stack, { spacing: 1.5 },
                        React.createElement(MethodItem, { icon: React.createElement(MenuBook, { fontSize: "small" }), title: "Documentation", desc: "Wikis, disassemblies & hardware reference an AI can actually read." }),
                        React.createElement(MethodItem, { icon: React.createElement(Groups, { fontSize: "small" }), title: "Community", desc: "Active homebrew scenes and forums with working example code." }),
                        React.createElement(MethodItem, { icon: React.createElement(Build, { fontSize: "small" }), title: "Toolchain", desc: "How close to plain C/C++ vs hand-tuned assembly." }),
                        React.createElement(MethodItem, { icon: React.createElement(Extension, { fontSize: "small" }), title: "Tooling", desc: "SDKs, emulator debuggers, editor & plugin support today." }))),
                React.createElement(Typography, { variant: "subtitle1", sx: { mb: 1 } }, "Average by generation"),
                React.createElement(Box, { sx: { width: "100%", height: 150, mb: 3 } },
                    React.createElement(ResponsiveContainer, null,
                        React.createElement(BarChart, { data: genAverages, layout: "vertical", margin: { left: 8, right: 24 } },
                            React.createElement(XAxis, { type: "number", domain: [0, 100], hide: true }),
                            React.createElement(YAxis, { type: "category", dataKey: "gen", tick: { fill: "#B0BEC5", fontSize: 12, fontFamily: "Roboto Condensed" }, width: 56, axisLine: false, tickLine: false }),
                            React.createElement(Tooltip, { cursor: { fill: "rgba(255,255,255,0.04)" }, contentStyle: { background: "#242424", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }, labelStyle: { color: "#fff" } }),
                            React.createElement(Bar, { dataKey: "value", radius: [0, 6, 6, 0], barSize: 18 },
                                genAverages.map((g, i) => (React.createElement(Cell, { key: i, fill: g.color }))),
                                React.createElement(LabelList, { dataKey: "value", position: "right", fill: "#fff", fontSize: 12 }))))),
                React.createElement(Stack, { direction: "row", spacing: 1, sx: { mb: 1, overflowX: "auto", pb: 0.5 } }, ["all", "3", "4", "5", "6"].map((g) => (React.createElement(Chip, { key: g, label: g === "all" ? "All gens" : GEN_LABEL[g].split(" · ")[0], onClick: () => setGenFilter(g), color: genFilter === g ? "primary" : "default", variant: genFilter === g ? "filled" : "outlined", size: "small", sx: { flexShrink: 0 } })))),
                React.createElement(Stack, { direction: "row", spacing: 1, sx: { mb: 2, overflowX: "auto", pb: 0.5 } },
                    ["all", "console", "handheld", "add-on"].map((k) => (React.createElement(Chip, { key: k, label: k === "all" ? "All types" : k[0].toUpperCase() + k.slice(1), onClick: () => setKindFilter(k), color: kindFilter === k ? "secondary" : "default", variant: kindFilter === k ? "filled" : "outlined", size: "small", sx: { flexShrink: 0 } }))),
                    React.createElement(Chip, { label: sortHighFirst ? "Sort: score ↓" : "Sort: release year", onClick: () => setSortHighFirst((s) => !s), size: "small", sx: { flexShrink: 0, ml: "auto", bgcolor: "rgba(255,255,255,0.06)" } })),
                React.createElement(Grid, { container: true, spacing: 1.5 }, filtered.map((p) => (React.createElement(Grid, { item: true, xs: 12, key: p.id },
                    React.createElement(PlatformCard, { p: p }))))),
                React.createElement(Divider, { sx: { my: 3, borderColor: "rgba(255,255,255,0.08)" } }),
                React.createElement(Typography, { variant: "caption", color: "text.secondary" }, "Scores reflect documentation and tooling maturity circa 2026, not how hard the hardware was for human developers to master at launch. DS and PSP are 7th-gen by strict classification but are included here as requested.")))));
}
