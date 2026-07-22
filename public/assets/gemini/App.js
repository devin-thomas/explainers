import React, { useState, useMemo } from 'react';
import { Gamepad2, Code2, Wrench, ChevronDown, Search, Zap } from 'lucide-react';
const consolesData = [
    // --- 6th Gen ---
    {
        id: 'gba',
        name: 'Game Boy Advance',
        generation: 6,
        type: 'Handheld',
        score: 95,
        difficulty: 'Trivial',
        languages: ['C', 'C++', 'ARM Assembly'],
        keyTools: ['devkitPro', 'libgba', 'Tonclib'],
        description: "The holy grail of homebrew and AI-assisted development. With a standard ARM CPU, flat memory model, and pure C/C++ support via devkitPro, an AI can write virtually flawless GBA code.",
        aiPros: "Massive documentation (Tonc), standard C/C++, predictable 2D memory mapping.",
        aiCons: "Hardware registers still require manual bit-shifting, which AI occasionally hallucinates."
    },
    {
        id: 'nds',
        name: 'Nintendo DS',
        generation: 6,
        type: 'Handheld',
        score: 92,
        difficulty: 'Easy',
        languages: ['C', 'C++'],
        keyTools: ['devkitPro', 'libnds', 'NightFox\'s Lib'],
        description: "Incredibly well-documented dual-ARM architecture. Standard C/C++ support and a massive homebrew community mean AI models have seen immense amounts of libnds training data.",
        aiPros: "Standard 3D pipeline (OpenGL-esque), huge C++ codebase availability.",
        aiCons: "Managing dual screens and VRAM banks requires specific architectural context AI can mix up."
    },
    {
        id: 'psp',
        name: 'PlayStation Portable',
        generation: 6,
        type: 'Handheld',
        score: 88,
        difficulty: 'Easy',
        languages: ['C', 'C++'],
        keyTools: ['pspsdk', 'GU/Gum'],
        description: "Very similar to early PC game development. The PSPSDK is mature and robust. AI easily understands its C-based graphics library (GU), which heavily mimics standard OpenGL.",
        aiPros: "OpenGL-like API, standard C++, massive amounts of open-source homebrew.",
        aiCons: "Media Engine (ME) co-processor code is sparse in training data."
    },
    {
        id: 'xbox',
        name: 'Microsoft Xbox',
        generation: 6,
        type: 'Home',
        score: 85,
        difficulty: 'Easy',
        languages: ['C', 'C++'],
        keyTools: ['nxdk', 'OpenXDK'],
        description: "Literally a Pentium III PC running a modified Windows 2000 kernel with DirectX 8. AI is exceptionally well-trained on standard x86 and early DirectX paradigms.",
        aiPros: "Standard PC architecture, x86, DirectX 8 API is universally understood by AI.",
        aiCons: "Legal/SDK availability limits open-source training data; reliant on nxdk reverse engineering."
    },
    {
        id: 'gcn',
        name: 'Nintendo GameCube',
        generation: 6,
        type: 'Home',
        score: 75,
        difficulty: 'Medium',
        languages: ['C', 'C++'],
        keyTools: ['devkitPro', 'libogc'],
        description: "PowerPC architecture with a robust open-source library (libogc). AI can generate standard 3D logic, but the GX graphics API has specific quirks that AI often confuses with standard OpenGL.",
        aiPros: "libogc is heavily documented and maintained. Standard C/C++.",
        aiCons: "GX API matrix math and TEV (Texture Environment) stages confuse LLMs."
    },
    {
        id: 'dreamcast',
        name: 'Sega Dreamcast',
        generation: 6,
        type: 'Home',
        score: 82,
        difficulty: 'Easy',
        languages: ['C', 'C++'],
        keyTools: ['KallistiOS'],
        description: "KallistiOS is a legendary, easy-to-use SDK. The Dreamcast's PowerVR GPU uses standard tile-based deferred rendering that AI can script with ease in C.",
        aiPros: "KallistiOS is essentially a standard modern OS wrapper. Very AI-friendly.",
        aiCons: "Specific SH-4 assembly optimization is largely undocumented in AI datasets."
    },
    {
        id: 'ps2',
        name: 'PlayStation 2',
        generation: 6,
        type: 'Home',
        score: 55,
        difficulty: 'Hard',
        languages: ['C', 'C++', 'MIPS Assembly'],
        keyTools: ['ps2sdk', 'vu0/vu1 macros'],
        description: "Notoriously difficult. To get real performance, you must write parallel microcode for the Vector Units (VU0/VU1) in assembly. AI struggles immensely with orchestrating this parallel architecture.",
        aiPros: "Basic C development is possible via ps2sdk for simple 2D.",
        aiCons: "Emotion Engine architecture is too alien; AI hallucinates VU microcode constantly."
    },
    // --- 5th Gen ---
    {
        id: 'ps1',
        name: 'PlayStation 1',
        generation: 5,
        type: 'Home',
        score: 80,
        difficulty: 'Medium',
        languages: ['C'],
        keyTools: ['Psy-Q', 'PSXSDK', 'Nugget'],
        description: "Highly documented C-based SDKs exist. However, the PS1 lacks floating-point math (requires fixed-point math) and lacks a Z-buffer, meaning the AI has to generate manual depth-sorting logic.",
        aiPros: "Massive homebrew scene (PSX.Dev), pure C API.",
        aiCons: "Fixed-point math and manual primitive ordering (OT) frequently trips up AI."
    },
    {
        id: 'n64',
        name: 'Nintendo 64',
        generation: 5,
        type: 'Home',
        score: 65,
        difficulty: 'Hard',
        languages: ['C'],
        keyTools: ['libdragon', 'Spicy'],
        description: "Modern open-source tools like libdragon have improved things, but the N64's RCP (Reality Co-Processor) and microcode system are complex, poorly documented, and highly prone to AI hallucination.",
        aiPros: "libdragon abstracts a lot of the pain into standard C.",
        aiCons: "Custom microcode generation by AI is practically impossible right now."
    },
    {
        id: 'saturn',
        name: 'Sega Saturn',
        generation: 5,
        type: 'Home',
        score: 45,
        difficulty: 'Nightmare',
        languages: ['C', 'Assembly'],
        keyTools: ['Jo Engine', 'SGL'],
        description: "Dual SH-2 CPUs, a custom sound processor, and a VDP that renders distorted quads instead of standard triangles. The architecture defies standard programming logic, rendering AI mostly helpless.",
        aiPros: "Jo Engine provides a 2D C wrapper that AI can somewhat use.",
        aiCons: "Quad-based 3D math and dual-CPU sync logic breaks AI context windows."
    },
    {
        id: 'gbc',
        name: 'Game Boy Color',
        generation: 5,
        type: 'Handheld',
        score: 90,
        difficulty: 'Easy',
        languages: ['C', 'Assembly (SM83)'],
        keyTools: ['GBDK-2020', 'RGBDS'],
        description: "Like the original Game Boy, but with color. GBDK-2020 is a phenomenal C compiler for it. AI models can instantly generate valid GBDK code or GB Studio JSON visual scripts.",
        aiPros: "GBDK-2020 allows pure C. Very simple memory banks.",
        aiCons: "C code is inefficient; AI struggles to optimize perfectly for the slow CPU."
    },
    {
        id: 'jaguar',
        name: 'Atari Jaguar',
        generation: 5,
        type: 'Home',
        score: 30,
        difficulty: 'Nightmare',
        languages: ['Assembly (M68k, Custom)'],
        keyTools: ['Removers Library'],
        description: "An infamous hardware disaster with multiple buggy processors (Tom, Jerry, 68000). C compilers are terribly unoptimized, forcing reliance on obscure assembly that AI has zero training on.",
        aiPros: "Standard 68k assembly is understood by AI.",
        aiCons: "The custom RISC processors have almost zero representation in LLM datasets."
    },
    {
        id: '3do',
        name: '3DO Interactive Multiplayer',
        generation: 5,
        type: 'Home',
        score: 60,
        difficulty: 'Medium',
        languages: ['C'],
        keyTools: ['3DO Portfolio OS'],
        description: "Surprisingly modern for its time, featuring an actual OS and C-based API (Portfolio). However, the community is tiny, meaning AI models lack modern homebrew training data.",
        aiPros: "C-based development, standard OS calls.",
        aiCons: "Extreme lack of online documentation and modern tooling."
    },
    {
        id: 'ngpc',
        name: 'Neo Geo Pocket Color',
        generation: 5,
        type: 'Handheld',
        score: 75,
        difficulty: 'Medium',
        languages: ['C'],
        keyTools: ['NGP SDK'],
        description: "Powered by a standard 16-bit TLCS-900H CPU. C compilers exist, but the community is small. AI can grasp the 2D sprite logic easily if guided.",
        aiPros: "Simple 2D architecture.",
        aiCons: "Obscure CPU architecture means less generic C-to-Assembly optimization from AI."
    },
    // --- 4th Gen ---
    {
        id: 'snes',
        name: 'Super Nintendo (SNES)',
        generation: 4,
        type: 'Home',
        score: 75,
        difficulty: 'Medium',
        languages: ['C', '65816 Assembly'],
        keyTools: ['PVSnesLib', 'cc65'],
        description: "The 65816 CPU is bizarre. While C compilers (PVSnesLib) exist, they are finicky. AI can write SNES C code, but manual assembly is often required for HDMA effects, which AI struggles to time correctly.",
        aiPros: "Huge community, tons of documentation.",
        aiCons: "SPC700 audio programming and HDMA timings are highly specific and hard for AI."
    },
    {
        id: 'genesis',
        name: 'Sega Genesis / Mega Drive',
        generation: 4,
        type: 'Home',
        score: 85,
        difficulty: 'Easy',
        languages: ['C', 'M68000 Assembly'],
        keyTools: ['SGDK'],
        description: "Thanks to SGDK (Sega Genesis Development Kit), this is one of the easiest retro consoles to program for. AI models know SGDK extensively and can spit out full C code for sprite handling and scrolling.",
        aiPros: "SGDK is the gold standard for retro C development. M68k is clean.",
        aiCons: "Z80 audio bridging still causes AI some headaches."
    },
    {
        id: 'gb',
        name: 'Game Boy',
        generation: 4,
        type: 'Handheld',
        score: 90,
        difficulty: 'Easy',
        languages: ['C', 'Assembly (SM83)'],
        keyTools: ['GBDK-2020', 'RGBDS', 'GB Studio'],
        description: "The easiest 8-bit platform to develop for. Whether outputting raw C for GBDK or generating visual logic trees for GB Studio, AI handles this hardware elegantly.",
        aiPros: "Extreme dataset presence. Simple 4-color palette and grid-based graphics.",
        aiCons: "AI often tries to use standard Z80 instructions that the custom SM83 CPU lacks."
    },
    {
        id: 'tg16',
        name: 'TurboGrafx-16 / PC Engine',
        generation: 4,
        type: 'Home',
        score: 70,
        difficulty: 'Medium',
        languages: ['C', 'HuC6280 Assembly'],
        keyTools: ['HuC'],
        description: "Features a modified 6502 CPU (HuC6280). The HuC C-compiler is decent, and AI can write for it, but the documentation is fragmented and often translated from Japanese.",
        aiPros: "6502-based logic is heavily ingrained in AI.",
        aiCons: "Fewer open-source examples than Sega or Nintendo."
    },
    {
        id: 'neogeo',
        name: 'Neo Geo (AES/MVS)',
        generation: 4,
        type: 'Home',
        score: 72,
        difficulty: 'Medium',
        languages: ['C', 'M68000 Assembly'],
        keyTools: ['DATlib', 'ngdevkit'],
        description: "An absolute 2D powerhouse utilizing the M68000. C development is possible, but the way the hardware draws sprites (everything is a sprite strip) requires a specific mindset AI needs prompting to understand.",
        aiPros: "Motorola 68000 assembly is well-documented.",
        aiCons: "Weird sprite-strip rendering logic instead of standard tilemaps."
    },
    {
        id: 'gg',
        name: 'Sega Game Gear',
        generation: 4,
        type: 'Handheld',
        score: 80,
        difficulty: 'Medium',
        languages: ['C', 'Z80 Assembly'],
        keyTools: ['devkitSMS'],
        description: "Essentially a portable Master System. devkitSMS makes C development straightforward. AI handles the standard Z80 architecture with ease.",
        aiPros: "devkitSMS is a solid C library. Z80 is universally understood.",
        aiCons: "Color palette and screen resolution quirks compared to Master System."
    },
    // --- 3rd Gen ---
    {
        id: 'nes',
        name: 'NES / Famicom',
        generation: 3,
        type: 'Home',
        score: 82,
        difficulty: 'Medium',
        languages: ['C', '6502 Assembly'],
        keyTools: ['cc65', 'Nesdev'],
        description: "The most documented 8-bit console in history (Nesdev). While cc65 allows C programming, performance demands often require 6502 assembly, which AI is surprisingly good at writing.",
        aiPros: "Unmatched documentation and community presence in AI training data.",
        aiCons: "AI struggles to grasp MMC/Mapper memory banking dynamically."
    },
    {
        id: 'sms',
        name: 'Sega Master System',
        generation: 3,
        type: 'Home',
        score: 80,
        difficulty: 'Medium',
        languages: ['C', 'Z80 Assembly'],
        keyTools: ['devkitSMS'],
        description: "Very standard Z80 architecture. AI can easily generate code using devkitSMS. The lack of complex memory mappers (compared to NES) actually makes it slightly simpler for an LLM to comprehend.",
        aiPros: "Standard Z80 CPU, pure C support via devkitSMS.",
        aiCons: "Smaller homebrew community means less nuanced training data than NES."
    },
    {
        id: '7800',
        name: 'Atari 7800',
        generation: 3,
        type: 'Home',
        score: 55,
        difficulty: 'Hard',
        languages: ['6502 Assembly', '7800basic'],
        keyTools: ['7800basic'],
        description: "The 'MARIA' graphics chip uses an archaic display list system instead of standard tilemaps. While '7800basic' exists, AI struggles with MARIA's logic compared to Nintendo's PPU.",
        aiPros: "7800basic abstracts a lot of the pain.",
        aiCons: "Display List architecture is very counter-intuitive for modern AI models."
    }
];
// --- Helper Functions ---
const getColorForScore = (score) => {
    if (score >= 90)
        return 'text-[#03DAC6] border-[#03DAC6]'; // Teal (Easy)
    if (score >= 75)
        return 'text-[#82B1FF] border-[#82B1FF]'; // Light Blue (Medium/Easy)
    if (score >= 50)
        return 'text-[#FFB74D] border-[#FFB74D]'; // Orange (Hard)
    return 'text-[#CF6679] border-[#CF6679]'; // Red (Nightmare)
};
const getBackgroundForScore = (score) => {
    if (score >= 90)
        return 'bg-[#03DAC6]/10';
    if (score >= 75)
        return 'bg-[#82B1FF]/10';
    if (score >= 50)
        return 'bg-[#FFB74D]/10';
    return 'bg-[#CF6679]/10';
};
// --- Components ---
const CircularScore = ({ score }) => {
    const radius = 20;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (score / 100) * circumference;
    const colorClass = getColorForScore(score).split(' ')[0]; // extract text color
    return (React.createElement("div", { className: "relative flex items-center justify-center w-14 h-14 shrink-0" },
        React.createElement("svg", { className: "transform -rotate-90 w-14 h-14", viewBox: "0 0 48 48" },
            React.createElement("circle", { cx: "24", cy: "24", r: radius, stroke: "currentColor", strokeWidth: "4", fill: "transparent", className: "text-white/10" }),
            React.createElement("circle", { cx: "24", cy: "24", r: radius, stroke: "currentColor", strokeWidth: "4", fill: "transparent", strokeDasharray: circumference, strokeDashoffset: strokeDashoffset, className: `${colorClass} transition-all duration-1000 ease-out`, strokeLinecap: "round" })),
        React.createElement("div", { className: "absolute flex flex-col items-center justify-center" },
            React.createElement("span", { className: `text-sm font-bold ${colorClass}` }, score))));
};
export default function App() {
    const [filterGen, setFilterGen] = useState('All');
    const [filterType, setFilterType] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('scoreDesc');
    // Filter and Sort Logic
    const processedData = useMemo(() => {
        let data = [...consolesData];
        // Filter
        if (filterGen !== 'All')
            data = data.filter(c => c.generation === filterGen);
        if (filterType !== 'All')
            data = data.filter(c => c.type === filterType);
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            data = data.filter(c => c.name.toLowerCase().includes(q) ||
                c.languages.some(l => l.toLowerCase().includes(q)) ||
                c.keyTools.some(t => t.toLowerCase().includes(q)));
        }
        // Sort
        data.sort((a, b) => {
            switch (sortBy) {
                case 'scoreDesc': return b.score - a.score;
                case 'scoreAsc': return a.score - b.score;
                case 'genDesc': return b.generation - a.generation;
                case 'genAsc': return a.generation - b.generation;
                default: return 0;
            }
        });
        return data;
    }, [filterGen, filterType, searchQuery, sortBy]);
    return (React.createElement(React.Fragment, null,
        React.createElement("style", { dangerouslySetInnerHTML: { __html: `
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
        body {
          font-family: 'Roboto', sans-serif;
          background-color: #121212;
          color: rgba(255, 255, 255, 0.87);
          margin: 0;
          -webkit-font-smoothing: antialiased;
        }
        /* M2 Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #121212; }
        ::-webkit-scrollbar-thumb { background: #424242; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #616161; }
      ` } }),
        React.createElement("div", { className: "min-h-screen pb-12 flex flex-col" },
            React.createElement("header", { className: "bg-[#1F1F1F] shadow-[0_4px_5px_0_rgba(0,0,0,0.14),0_1px_10px_0_rgba(0,0,0,0.12),0_2px_4px_-1px_rgba(0,0,0,0.2)] sticky top-0 z-10" },
                React.createElement("div", { className: "max-w-5xl mx-auto px-4 py-4" },
                    React.createElement("div", { className: "flex items-center gap-3 mb-2" },
                        React.createElement(Zap, { className: "text-[#BB86FC] w-7 h-7" }),
                        React.createElement("h1", { className: "text-xl font-medium tracking-wide text-white/87" }, "Retro AI-Dev Index")),
                    React.createElement("p", { className: "text-sm text-white/60 font-light max-w-2xl" }, "Evaluating consoles (Gen 3 to Gen 6) on how easily modern AI (LLMs) can automate their programming based on documentation, compilers, SDKs, and architecture complexity."))),
            React.createElement("div", { className: "max-w-5xl mx-auto px-4 w-full mt-6 mb-4 space-y-4" },
                React.createElement("div", { className: "flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between" },
                    React.createElement("div", { className: "relative w-full sm:w-72" },
                        React.createElement(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/38" }),
                        React.createElement("input", { type: "text", placeholder: "Search consoles, tools...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full bg-[#2C2C2C] text-white/87 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#BB86FC] placeholder:text-white/38 transition-all border border-transparent focus:border-[#BB86FC]" })),
                    React.createElement("div", { className: "flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar" },
                        React.createElement("select", { className: "bg-[#2C2C2C] text-sm text-white/87 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#BB86FC] cursor-pointer", value: filterGen, onChange: (e) => setFilterGen(e.target.value === 'All' ? 'All' : Number(e.target.value)) },
                            React.createElement("option", { value: "All" }, "All Gens"),
                            React.createElement("option", { value: "6" }, "6th Gen (128-bit)"),
                            React.createElement("option", { value: "5" }, "5th Gen (32/64-bit)"),
                            React.createElement("option", { value: "4" }, "4th Gen (16-bit)"),
                            React.createElement("option", { value: "3" }, "3rd Gen (8-bit)")),
                        React.createElement("select", { className: "bg-[#2C2C2C] text-sm text-white/87 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#BB86FC] cursor-pointer", value: filterType, onChange: (e) => setFilterType(e.target.value) },
                            React.createElement("option", { value: "All" }, "All Types"),
                            React.createElement("option", { value: "Home" }, "Home Console"),
                            React.createElement("option", { value: "Handheld" }, "Handheld")),
                        React.createElement("select", { className: "bg-[#2C2C2C] text-sm text-white/87 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#BB86FC] cursor-pointer", value: sortBy, onChange: (e) => setSortBy(e.target.value) },
                            React.createElement("option", { value: "scoreDesc" }, "Highest Score"),
                            React.createElement("option", { value: "scoreAsc" }, "Lowest Score"),
                            React.createElement("option", { value: "genDesc" }, "Newest First"),
                            React.createElement("option", { value: "genAsc" }, "Oldest First"))))),
            React.createElement("main", { className: "max-w-5xl mx-auto px-4 w-full flex-1" }, processedData.length === 0 ? (React.createElement("div", { className: "flex flex-col items-center justify-center py-20 text-white/38" },
                React.createElement(Gamepad2, { className: "w-12 h-12 mb-4 opacity-50" }),
                React.createElement("p", null, "No consoles match your filters."))) : (React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" }, processedData.map(console => (React.createElement("div", { key: console.id, className: "bg-[#1E1E1E] rounded shadow-[0_2px_1px_-1px_rgba(0,0,0,0.2),0_1px_1px_0_rgba(0,0,0,0.14),0_1px_3px_0_rgba(0,0,0,0.12)] flex flex-col hover:bg-[#232323] transition-colors duration-200 border border-white/5" },
                React.createElement("div", { className: "p-4 border-b border-white/5 flex gap-4 items-center" },
                    React.createElement(CircularScore, { score: console.score }),
                    React.createElement("div", null,
                        React.createElement("h2", { className: "text-lg font-medium leading-tight text-white/87 tracking-wide" }, console.name),
                        React.createElement("div", { className: "flex items-center gap-2 mt-1 text-xs text-white/60 font-medium" },
                            React.createElement("span", { className: "uppercase tracking-wider" },
                                "Gen ",
                                console.generation),
                            React.createElement("span", { className: "w-1 h-1 bg-white/38 rounded-full" }),
                            React.createElement("span", null, console.type),
                            React.createElement("span", { className: "w-1 h-1 bg-white/38 rounded-full" }),
                            React.createElement("span", { className: `${getColorForScore(console.score).split(' ')[0]} uppercase font-bold tracking-wider` }, console.difficulty)))),
                React.createElement("div", { className: "p-4 flex-1 flex flex-col gap-4 text-sm" },
                    React.createElement("p", { className: "text-white/60 leading-relaxed font-light" }, console.description),
                    React.createElement("div", { className: "mt-auto pt-2 space-y-3" },
                        React.createElement("div", { className: "flex items-start gap-2" },
                            React.createElement(Code2, { className: "w-4 h-4 text-white/38 shrink-0 mt-0.5" }),
                            React.createElement("div", { className: "flex flex-wrap gap-1.5" }, console.languages.map(lang => (React.createElement("span", { key: lang, className: "bg-[#323232] text-white/87 text-[11px] px-2 py-0.5 rounded-sm font-medium" }, lang))))),
                        React.createElement("div", { className: "flex items-start gap-2" },
                            React.createElement(Wrench, { className: "w-4 h-4 text-white/38 shrink-0 mt-0.5" }),
                            React.createElement("div", { className: "flex flex-wrap gap-1.5" }, console.keyTools.map(tool => (React.createElement("span", { key: tool, className: "border border-white/12 text-white/60 text-[11px] px-2 py-0.5 rounded-sm font-medium" }, tool))))))),
                React.createElement("details", { className: "group border-t border-white/5" },
                    React.createElement("summary", { className: "flex items-center justify-between p-4 cursor-pointer text-sm font-medium text-[#BB86FC] uppercase tracking-wide hover:bg-white/5 transition-colors select-none" },
                        "AI Breakdown",
                        React.createElement(ChevronDown, { className: "w-4 h-4 transform group-open:rotate-180 transition-transform duration-200" })),
                    React.createElement("div", { className: "p-4 pt-0 text-sm space-y-3 pb-5" },
                        React.createElement("div", { className: "bg-[#4CAF50]/10 border border-[#4CAF50]/20 rounded p-3" },
                            React.createElement("span", { className: "block text-[#4CAF50] font-bold text-xs uppercase mb-1 tracking-wider" }, "Advantage"),
                            React.createElement("p", { className: "text-white/60 font-light" }, console.aiPros)),
                        React.createElement("div", { className: "bg-[#CF6679]/10 border border-[#CF6679]/20 rounded p-3" },
                            React.createElement("span", { className: "block text-[#CF6679] font-bold text-xs uppercase mb-1 tracking-wider" }, "Friction"),
                            React.createElement("p", { className: "text-white/60 font-light" }, console.aiCons)))))))))))));
}
