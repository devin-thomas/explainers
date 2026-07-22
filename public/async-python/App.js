import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState, useEffect, useCallback } from "react";
import { createTheme, ThemeProvider, CssBaseline, useMediaQuery, useTheme, alpha, } from "@mui/material";
import { AppBar, Toolbar, Box, Container, Typography, IconButton, Stack, Chip, Card, CardContent, Divider, Button, Accordion, AccordionSummary, AccordionDetails, Grid, Paper, Tooltip, } from "@mui/material";
import { DarkModeRounded, LightModeRounded, ExpandMoreRounded, BoltRounded, PlayArrowRounded, RestartAltRounded, CheckCircleRounded, CancelRounded, LightbulbRounded, CoffeeRounded, HourglassEmptyRounded, MemoryRounded, StorageRounded, } from "@mui/icons-material";
/* =============================================================================
   ASYNC IN PYTHON — A Beginner's Mental Model
   Single-file Material Design 3 (Material You) explainer.
   - Purple-forward palette (no orange / no yellow)
   - Full light + dark mode
   - Mobile responsive
   ============================================================================= */
/* -----------------------------------------------------------------------------
   1. THEME — Material 3 tonal palette, purple primary + teal/pink accents
   -------------------------------------------------------------------------- */
function useAppTheme(mode) {
    return useMemo(() => createTheme({
        palette: mode === "dark"
            ? {
                mode: "dark",
                primary: { main: "#D0BCFF", contrastText: "#381E72" },
                secondary: { main: "#CCC2DC", contrastText: "#332D41" },
                background: { default: "#141218", paper: "#1D1B20" },
                text: { primary: "#E6E0E9", secondary: "#CAC4D0" },
                success: { main: "#7FD1B9" },
                error: { main: "#F2B8B5" },
                divider: "rgba(202,196,208,0.16)",
            }
            : {
                mode: "light",
                primary: { main: "#6750A4", contrastText: "#FFFFFF" },
                secondary: { main: "#625B71", contrastText: "#FFFFFF" },
                background: { default: "#FEF7FF", paper: "#FFFFFF" },
                text: { primary: "#1D1B20", secondary: "#49454F" },
                success: { main: "#0F766E" },
                error: { main: "#B3261E" },
                divider: "rgba(29,27,32,0.12)",
            },
        shape: { borderRadius: 16 },
        typography: {
            fontFamily: 'Roboto, "Segoe UI", system-ui, -apple-system, Helvetica, Arial, sans-serif',
            h1: { fontWeight: 700, letterSpacing: "-0.02em" },
            h2: { fontWeight: 700, letterSpacing: "-0.01em" },
            h3: { fontWeight: 600 },
            h4: { fontWeight: 600 },
            h5: { fontWeight: 600 },
            h6: { fontWeight: 600 },
            button: { textTransform: "none", fontWeight: 600 },
        },
        components: {
            MuiButton: {
                styleOverrides: { root: { borderRadius: 999, paddingInline: 20 } },
            },
            MuiCard: {
                styleOverrides: {
                    root: { borderRadius: 20, backgroundImage: "none" },
                },
            },
            MuiAppBar: {
                styleOverrides: { root: { backgroundImage: "none" } },
            },
            MuiChip: {
                styleOverrides: { root: { fontWeight: 600, borderRadius: 8 } },
            },
        },
    }), [mode]);
}
/* -----------------------------------------------------------------------------
   2. LIGHTWEIGHT PYTHON CODE BLOCK (dependency-free syntax highlighting)
   -------------------------------------------------------------------------- */
const PY_KEYWORDS = "async|await|def|return|import|from|for|in|if|else|elif|while|with|as|None|True|False|and|or|not|class|try|except|finally|raise|yield|lambda|pass|break|continue|global";
const PY_BUILTINS = "print|range|len|list|dict|set|int|str|float|enumerate|open|sum";
function escapeHtml(s) {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
function highlightPython(code, dark) {
    const c = dark
        ? {
            kw: "#D0BCFF",
            str: "#7FD1B9",
            com: "#8E8B98",
            num: "#F0A6CA",
            fn: "#9EC5FF",
        }
        : {
            kw: "#6750A4",
            str: "#0F766E",
            com: "#6B7280",
            num: "#A80D62",
            fn: "#1D4ED8",
        };
    const escaped = escapeHtml(code);
    // Single combined pass so replacements never nest inside each other.
    const re = new RegExp("(#.*$)" + // comments
        "|('''[\\s\\S]*?'''|\"\"\"[\\s\\S]*?\"\"\")" + // triple strings
        "|(\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*')" + // strings
        `|\\b(${PY_KEYWORDS})\\b` + // keywords
        `|\\b(${PY_BUILTINS})\\b` + // builtins
        "|\\b(\\d+\\.?\\d*)\\b", // numbers
    "gm");
    return escaped.replace(re, (_m, com, tri, str, kw, fn, num) => {
        if (com)
            return `<span style="color:${c.com};font-style:italic">${com}</span>`;
        if (tri)
            return `<span style="color:${c.str}">${tri}</span>`;
        if (str)
            return `<span style="color:${c.str}">${str}</span>`;
        if (kw)
            return `<span style="color:${c.kw};font-weight:600">${kw}</span>`;
        if (fn)
            return `<span style="color:${c.fn}">${fn}</span>`;
        if (num)
            return `<span style="color:${c.num}">${num}</span>`;
        return _m;
    });
}
function CodeBlock({ code, label }) {
    const theme = useTheme();
    const dark = theme.palette.mode === "dark";
    const html = useMemo(() => highlightPython(code.trim(), dark), [code, dark]);
    return (_jsxs(Paper, { elevation: 0, sx: {
            borderRadius: 3,
            overflow: "hidden",
            border: `1px solid ${theme.palette.divider}`,
            bgcolor: dark ? "#0F0D13" : "#F4EFF7",
        }, children: [label && (_jsxs(Box, { sx: {
                    px: 2,
                    py: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    bgcolor: alpha(theme.palette.primary.main, dark ? 0.12 : 0.08),
                }, children: [_jsx(Box, { sx: { display: "flex", gap: 0.75 }, children: ["#F2B8B5", "#D0BCFF", "#7FD1B9"].map((c) => (_jsx(Box, { sx: { width: 11, height: 11, borderRadius: "50%", bgcolor: c } }, c))) }), _jsx(Typography, { variant: "caption", sx: { fontFamily: "monospace", opacity: 0.75, ml: 0.5 }, children: label })] })), _jsx(Box, { component: "pre", sx: {
                    m: 0,
                    p: { xs: 2, sm: 2.5 },
                    overflowX: "auto",
                    fontFamily: '"Fira Code", "JetBrains Mono", Consolas, Menlo, monospace',
                    fontSize: { xs: 12.5, sm: 13.5 },
                    lineHeight: 1.7,
                    color: theme.palette.text.primary,
                }, children: _jsx("code", { dangerouslySetInnerHTML: { __html: html } }) })] }));
}
/* -----------------------------------------------------------------------------
   3. SECTION WRAPPER
   -------------------------------------------------------------------------- */
function Section({ eyebrow, title, children, icon, }) {
    const theme = useTheme();
    return (_jsxs(Box, { component: "section", sx: { scrollMarginTop: 88 }, children: [_jsxs(Stack, { direction: "row", spacing: 1.5, alignItems: "center", sx: { mb: 1 }, children: [icon && (_jsx(Box, { sx: {
                            display: "grid",
                            placeItems: "center",
                            width: 40,
                            height: 40,
                            borderRadius: 2.5,
                            color: theme.palette.primary.main,
                            bgcolor: alpha(theme.palette.primary.main, 0.14),
                        }, children: icon })), _jsx(Typography, { variant: "overline", sx: { color: theme.palette.primary.main, fontWeight: 700, letterSpacing: 1.2 }, children: eyebrow })] }), _jsx(Typography, { variant: "h4", sx: { mb: 2.5, fontSize: { xs: 24, sm: 30 } }, children: title }), children] }));
}
const TASKS = [
    { name: "fetch_user()", color: "#D0BCFF" },
    { name: "fetch_orders()", color: "#7FD1B9" },
    { name: "fetch_prices()", color: "#F0A6CA" },
];
const STEP = 900; // ms per "second" of simulated wait
function TimelineDemo() {
    const theme = useTheme();
    const [running, setRunning] = useState(false);
    const [progress, setProgress] = useState(0); // 0..1
    const play = useCallback(() => {
        setProgress(0);
        setRunning(true);
    }, []);
    const reset = useCallback(() => {
        setRunning(false);
        setProgress(0);
    }, []);
    useEffect(() => {
        if (!running)
            return;
        const start = performance.now();
        const total = STEP * 3.2; // full animation length
        let raf = 0;
        const tick = (now) => {
            const p = Math.min(1, (now - start) / total);
            setProgress(p);
            if (p < 1)
                raf = requestAnimationFrame(tick);
            else
                setRunning(false);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [running]);
    const Bar = ({ task, offset, width, fill, }) => (_jsx(Box, { sx: {
            position: "absolute",
            left: `${offset * 100}%`,
            width: `${width * 100}%`,
            height: 26,
            borderRadius: 999,
            bgcolor: alpha(task.color, 0.22),
            border: `1px solid ${alpha(task.color, 0.5)}`,
            overflow: "hidden",
        }, children: _jsx(Box, { sx: {
                height: "100%",
                width: `${Math.max(0, Math.min(1, fill)) * 100}%`,
                bgcolor: task.color,
                transition: "none",
            } }) }));
    // Sync: tasks are sequential, each spans 1/3 of the track.
    // Async: tasks all start at ~0 and overlap (they wait together).
    return (_jsx(Card, { variant: "outlined", sx: { borderColor: theme.palette.divider }, children: _jsxs(CardContent, { sx: { p: { xs: 2, sm: 3 } }, children: [_jsxs(Stack, { direction: { xs: "column", sm: "row" }, spacing: 2, alignItems: { xs: "stretch", sm: "center" }, justifyContent: "space-between", sx: { mb: 3 }, children: [_jsxs(Box, { children: [_jsx(Typography, { variant: "h6", children: "See the waiting overlap" }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Three tasks that each spend ~1s waiting on the network." })] }), _jsxs(Stack, { direction: "row", spacing: 1, children: [_jsx(Button, { variant: "contained", startIcon: _jsx(PlayArrowRounded, {}), onClick: play, disabled: running, children: running ? "Running…" : "Run" }), _jsx(Button, { variant: "outlined", startIcon: _jsx(RestartAltRounded, {}), onClick: reset, children: "Reset" })] })] }), _jsx(Typography, { variant: "subtitle2", sx: { mb: 1 }, children: "\uD83D\uDC22 Synchronous \u2014 one after another (~3s total)" }), _jsx(Box, { sx: {
                        position: "relative",
                        height: 26 * 3 + 16,
                        mb: 3,
                    }, children: TASKS.map((t, i) => {
                        const offset = i / 3;
                        const width = 1 / 3;
                        // this task fills only while the global progress is within its window
                        const local = (progress - offset) / width;
                        return (_jsx(Box, { sx: { position: "relative", height: 26, mb: "8px" }, children: _jsx(Bar, { task: t, offset: offset, width: width, fill: local }) }, t.name));
                    }) }), _jsx(Typography, { variant: "subtitle2", sx: { mb: 1 }, children: "\u26A1 Asynchronous \u2014 waiting happens together (~1s total)" }), _jsx(Box, { sx: { position: "relative", height: 26 * 3 + 16 }, children: TASKS.map((t) => {
                        const width = 1 / 3; // same real work, but they run concurrently
                        const local = progress / width; // all start immediately
                        return (_jsx(Box, { sx: { position: "relative", height: 26, mb: "8px" }, children: _jsx(Bar, { task: t, offset: 0, width: width, fill: local }) }, t.name));
                    }) }), _jsx(Stack, { direction: "row", flexWrap: "wrap", gap: 1, sx: { mt: 2.5 }, children: TASKS.map((t) => (_jsx(Chip, { size: "small", label: t.name, sx: {
                            fontFamily: "monospace",
                            bgcolor: alpha(t.color, 0.18),
                            color: theme.palette.text.primary,
                            border: `1px solid ${alpha(t.color, 0.5)}`,
                        } }, t.name))) })] }) }));
}
/* -----------------------------------------------------------------------------
   5. DATA — vocabulary + gotchas
   -------------------------------------------------------------------------- */
const VOCAB = [
    {
        term: "async def",
        plain: "Marks a function as pausable.",
        detail: "Writing `async def` creates a coroutine function. Calling it does NOT run the code — it hands you a coroutine object that only runs when awaited or given to the event loop.",
    },
    {
        term: "await",
        plain: "\"Pause me here, wake me when this is done.\"",
        detail: "await tells Python: this line will take a while (usually waiting on something outside the program). While it waits, hand control back so other coroutines can run. You can only use await inside an async def.",
    },
    {
        term: "coroutine",
        plain: "A function that can pause and resume.",
        detail: "Think of it as a bookmarked task. It runs, hits an await, saves its place, lets others go, then continues later exactly where it left off.",
    },
    {
        term: "event loop",
        plain: "The traffic cop that runs everything.",
        detail: "A single loop that keeps a list of ready coroutines, runs one until it hits an await, then switches to the next. asyncio.run() starts this loop for you.",
    },
    {
        term: "asyncio.gather",
        plain: "Start several tasks at once, wait for all.",
        detail: "Instead of awaiting tasks one by one, gather kicks them all off together and waits for the whole batch — this is where the time savings come from.",
    },
];
const GOTCHAS = [
    { good: false, text: "Using time.sleep() inside async code — it freezes the whole loop." },
    { good: true, text: "Use await asyncio.sleep() so other tasks keep running while you wait." },
    { good: false, text: "Forgetting to await — you'll get a 'coroutine was never awaited' warning and nothing happens." },
    { good: false, text: "Reaching for async to speed up heavy math — it won't. That's CPU-bound work." },
    { good: true, text: "Use asyncio.gather() to run independent waits at the same time." },
    { good: true, text: "One clean entry point: asyncio.run(main())." },
];
/* -----------------------------------------------------------------------------
   6. MAIN APP
   -------------------------------------------------------------------------- */
export default function App() {
    const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
    const [mode, setMode] = useState("dark");
    useEffect(() => {
        // default to dark, but respect a light system pref on first load
        if (!prefersDark)
            setMode("light");
    }, []); // eslint-disable-line
    const theme = useAppTheme(mode);
    return (_jsxs(ThemeProvider, { theme: theme, children: [_jsx(CssBaseline, {}), _jsx(ExplainerShell, { mode: mode, setMode: setMode })] }));
}
function ExplainerShell({ mode, setMode, }) {
    const theme = useTheme();
    const dark = mode === "dark";
    return (_jsxs(Box, { sx: {
            minHeight: "100vh",
            bgcolor: "background.default",
            backgroundImage: dark
                ? "radial-gradient(1200px 600px at 100% -10%, rgba(208,188,255,0.10), transparent), radial-gradient(900px 500px at -10% 10%, rgba(127,209,185,0.06), transparent)"
                : "radial-gradient(1200px 600px at 100% -10%, rgba(103,80,164,0.10), transparent), radial-gradient(900px 500px at -10% 10%, rgba(15,118,110,0.06), transparent)",
        }, children: [_jsx(AppBar, { position: "sticky", elevation: 0, sx: {
                    bgcolor: alpha(theme.palette.background.default, 0.7),
                    backdropFilter: "blur(12px)",
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    color: "text.primary",
                }, children: _jsxs(Toolbar, { sx: { gap: 1.5 }, children: [_jsx(Box, { sx: {
                                display: "grid",
                                placeItems: "center",
                                width: 36,
                                height: 36,
                                borderRadius: 2,
                                bgcolor: alpha(theme.palette.primary.main, 0.16),
                                color: theme.palette.primary.main,
                            }, children: _jsx(BoltRounded, {}) }), _jsx(Typography, { variant: "h6", sx: { flexGrow: 1, fontWeight: 700 }, children: "async in Python" }), _jsx(Chip, { size: "small", label: "beginner", sx: {
                                display: { xs: "none", sm: "inline-flex" },
                                bgcolor: alpha(theme.palette.primary.main, 0.14),
                                color: theme.palette.primary.main,
                            } }), _jsx(Tooltip, { title: dark ? "Switch to light" : "Switch to dark", children: _jsx(IconButton, { onClick: () => setMode(dark ? "light" : "dark"), color: "inherit", children: dark ? _jsx(LightModeRounded, {}) : _jsx(DarkModeRounded, {}) }) })] }) }), _jsx(Box, { component: "header", sx: { pt: { xs: 6, sm: 10 }, pb: { xs: 4, sm: 6 } }, children: _jsxs(Container, { maxWidth: "md", children: [_jsx(Chip, { icon: _jsx(CoffeeRounded, {}), label: "No web frameworks. Just scripts + logic.", sx: {
                                mb: 3,
                                py: 2,
                                bgcolor: alpha(theme.palette.secondary.main, 0.16),
                                color: "text.primary",
                            } }), _jsxs(Typography, { variant: "h1", sx: { fontSize: { xs: 36, sm: 56 }, lineHeight: 1.05, mb: 2 }, children: ["Async is just", " ", _jsx(Box, { component: "span", sx: { color: theme.palette.primary.main }, children: "smart waiting" }), "."] }), _jsxs(Typography, { variant: "h6", color: "text.secondary", sx: { fontWeight: 400, maxWidth: 640 }, children: ["Your program spends a lot of its life ", _jsx("em", { children: "waiting" }), " \u2014 for a file, a network reply, a timer. Async lets it do other useful things during that wait instead of standing still. That's the whole idea."] })] }) }), _jsx(Container, { maxWidth: "md", sx: { pb: 12 }, children: _jsxs(Stack, { spacing: { xs: 6, sm: 8 }, children: [_jsxs(Section, { eyebrow: "The problem", title: "What is async actually solving?", icon: _jsx(HourglassEmptyRounded, {}), children: [_jsx(Typography, { sx: { mb: 2.5 }, color: "text.secondary", children: "Imagine making breakfast. You put toast in the toaster (2 min), then start the kettle (3 min), then crack some eggs. You don't stand frozen staring at the toaster until it pops \u2014 you use that waiting time to do the next thing." }), _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsx(Card, { variant: "outlined", sx: { height: "100%", borderColor: theme.palette.divider }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "subtitle1", sx: { mb: 1 }, children: "\uD83D\uDC22 Synchronous cook" }), _jsxs(Typography, { variant: "body2", color: "text.secondary", children: ["Start toast \u2192 ", _jsx("b", { children: "stare at it" }), " for 2 min \u2192 then start kettle \u2192 ", _jsx("b", { children: "stare" }), " for 3 min \u2192 then eggs. Total: slow, lots of dead time."] })] }) }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsx(Card, { variant: "outlined", sx: { height: "100%", borderColor: theme.palette.divider }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "subtitle1", sx: { mb: 1 }, children: "\u26A1 Asynchronous cook" }), _jsxs(Typography, { variant: "body2", color: "text.secondary", children: ["Start toast, ", _jsx("b", { children: "while it waits" }), " start the kettle,", " ", _jsx("b", { children: "while both wait" }), " crack eggs. The waiting overlaps. Same food, far less total time."] })] }) }) })] }), _jsx(Box, { sx: {
                                        mt: 2.5,
                                        p: 2,
                                        borderRadius: 3,
                                        bgcolor: alpha(theme.palette.primary.main, 0.10),
                                        border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                                    }, children: _jsxs(Typography, { variant: "body2", children: [_jsx("b", { children: "Key point:" }), " async doesn't do things ", _jsx("i", { children: "at the same instant" }), " ", "(that's parallelism). It's a single cook being clever about", " ", _jsx("i", { children: "waiting" }), ". One worker, no idle time."] }) })] }), _jsxs(Section, { eyebrow: "See it move", title: "Watch the waiting overlap", icon: _jsx(BoltRounded, {}), children: [_jsxs(Typography, { sx: { mb: 2.5 }, color: "text.secondary", children: ["Press ", _jsx("b", { children: "Run" }), ". Both rows do the exact same three tasks \u2014 the only difference is whether they wait one-at-a-time or together."] }), _jsx(TimelineDemo, {})] }), _jsxs(Section, { eyebrow: "Your first script", title: "The smallest async program", icon: _jsx(PlayArrowRounded, {}), children: [_jsxs(Typography, { sx: { mb: 2.5 }, color: "text.secondary", children: ["Three ingredients: ", _jsx("code", { children: "async def" }), " to make a pausable function, ", _jsx("code", { children: "await" }), " to mark the waiting spot, and", " ", _jsx("code", { children: "asyncio.run()" }), " to start the engine."] }), _jsx(CodeBlock, { label: "hello_async.py", code: `import asyncio

async def make_tea():
    print("Kettle on...")
    await asyncio.sleep(3)      # <- the "waiting" moment
    print("Tea is ready!")

async def make_toast():
    print("Toaster on...")
    await asyncio.sleep(2)
    print("Toast is ready!")

async def main():
    # await one, then the other (still sequential here)
    await make_tea()
    await make_toast()

asyncio.run(main())            # starts the event loop` }), _jsx(Typography, { variant: "body2", color: "text.secondary", sx: { mt: 2 }, children: "Run this and it takes ~5 seconds (3 + 2). We awaited them one after another, so we haven't saved any time yet. That's the next step. \uD83D\uDC47" })] }), _jsxs(Section, { eyebrow: "The payoff", title: "Run them together with gather()", icon: _jsx(BoltRounded, {}), children: [_jsxs(Typography, { sx: { mb: 2.5 }, color: "text.secondary", children: [_jsx("code", { children: "asyncio.gather()" }), " starts every task immediately and waits for the whole group. Now the 3s and 2s waits overlap."] }), _jsx(CodeBlock, { label: "breakfast.py", code: `import asyncio

async def make_tea():
    print("Kettle on...")
    await asyncio.sleep(3)
    print("Tea is ready!")

async def make_toast():
    print("Toaster on...")
    await asyncio.sleep(2)
    print("Toast is ready!")

async def main():
    # kick BOTH off at once, wait for both to finish
    await asyncio.gather(
        make_tea(),
        make_toast(),
    )

asyncio.run(main())            # now takes ~3s, not ~5s` }), _jsx(Box, { sx: {
                                        mt: 2,
                                        p: 2,
                                        borderRadius: 3,
                                        bgcolor: alpha(theme.palette.success.main, 0.12),
                                        border: `1px solid ${alpha(theme.palette.success.main, 0.35)}`,
                                    }, children: _jsxs(Typography, { variant: "body2", children: ["\u23F1\uFE0F Total time drops to about ", _jsx("b", { children: "3 seconds" }), " \u2014 the length of the", " ", _jsx("i", { children: "longest" }), " wait, not the ", _jsx("i", { children: "sum" }), " of all waits."] }) })] }), _jsx(Section, { eyebrow: "The words", title: "Five terms, in plain English", icon: _jsx(LightbulbRounded, {}), children: _jsx(Stack, { spacing: 1.25, children: VOCAB.map((v) => (_jsxs(Accordion, { disableGutters: true, elevation: 0, sx: {
                                        borderRadius: 3,
                                        border: `1px solid ${theme.palette.divider}`,
                                        "&:before": { display: "none" },
                                        bgcolor: "background.paper",
                                        overflow: "hidden",
                                    }, children: [_jsx(AccordionSummary, { expandIcon: _jsx(ExpandMoreRounded, {}), children: _jsxs(Stack, { direction: { xs: "column", sm: "row" }, spacing: { xs: 0.5, sm: 2 }, alignItems: { xs: "flex-start", sm: "center" }, children: [_jsx(Chip, { label: v.term, size: "small", sx: {
                                                            fontFamily: "monospace",
                                                            bgcolor: alpha(theme.palette.primary.main, 0.16),
                                                            color: theme.palette.primary.main,
                                                        } }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: v.plain })] }) }), _jsx(AccordionDetails, { children: _jsx(Typography, { variant: "body2", color: "text.secondary", children: v.detail }) })] }, v.term))) }) }), _jsxs(Section, { eyebrow: "The #1 beginner trap", title: "asyncio.sleep vs time.sleep", icon: _jsx(HourglassEmptyRounded, {}), children: [_jsxs(Typography, { sx: { mb: 2.5 }, color: "text.secondary", children: ["They look similar but behave oppositely.", " ", _jsx("code", { children: "time.sleep()" }), " is a ", _jsx("i", { children: "blocking" }), " wait \u2014 it freezes the entire event loop, so nothing else can run. It's like the cook taking a nap in front of the toaster."] }), _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsx(CodeBlock, { label: "\u274C freezes everything", code: `import asyncio, time

async def task(name):
    print(name, "start")
    time.sleep(2)     # BLOCKS the loop
    print(name, "done")

async def main():
    await asyncio.gather(task("A"), task("B"))

# Takes ~4s — B can't start
# until A's nap is over.
asyncio.run(main())` }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsx(CodeBlock, { label: "\u2705 cooperates", code: `import asyncio

async def task(name):
    print(name, "start")
    await asyncio.sleep(2)   # yields!
    print(name, "done")

async def main():
    await asyncio.gather(task("A"), task("B"))

# Takes ~2s — both wait
# at the same time.
asyncio.run(main())` }) })] })] }), _jsx(Section, { eyebrow: "When to reach for it", title: "I/O-bound? Yes. CPU-bound? No.", icon: _jsx(MemoryRounded, {}), children: _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsx(Card, { variant: "outlined", sx: { height: "100%", borderColor: alpha(theme.palette.success.main, 0.4) }, children: _jsxs(CardContent, { children: [_jsxs(Stack, { direction: "row", spacing: 1, alignItems: "center", sx: { mb: 1.5 }, children: [_jsx(StorageRounded, { sx: { color: theme.palette.success.main } }), _jsxs(Typography, { variant: "subtitle1", children: ["\u2705 Great for ", _jsx("b", { children: "I/O-bound" }), " work"] })] }), _jsxs(Typography, { variant: "body2", color: "text.secondary", children: ["Work that spends its time ", _jsx("i", { children: "waiting" }), " on something else:"] }), _jsx(Stack, { sx: { mt: 1.5 }, spacing: 0.75, children: [
                                                            "Downloading many files / API calls",
                                                            "Reading lots of files from disk",
                                                            "Querying a database",
                                                            "Talking to hardware or a socket",
                                                        ].map((t) => (_jsxs(Stack, { direction: "row", spacing: 1, alignItems: "center", children: [_jsx(CheckCircleRounded, { fontSize: "small", sx: { color: theme.palette.success.main } }), _jsx(Typography, { variant: "body2", children: t })] }, t))) })] }) }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsx(Card, { variant: "outlined", sx: { height: "100%", borderColor: alpha(theme.palette.error.main, 0.4) }, children: _jsxs(CardContent, { children: [_jsxs(Stack, { direction: "row", spacing: 1, alignItems: "center", sx: { mb: 1.5 }, children: [_jsx(MemoryRounded, { sx: { color: theme.palette.error.main } }), _jsxs(Typography, { variant: "subtitle1", children: ["\u274C Won't help ", _jsx("b", { children: "CPU-bound" }), " work"] })] }), _jsxs(Typography, { variant: "body2", color: "text.secondary", children: ["Work that keeps the processor ", _jsx("i", { children: "busy" }), ", never waiting:"] }), _jsx(Stack, { sx: { mt: 1.5 }, spacing: 0.75, children: [
                                                            "Crunching big math / number loops",
                                                            "Resizing or processing images",
                                                            "Training an ML model",
                                                            "Heavy data transforms",
                                                        ].map((t) => (_jsxs(Stack, { direction: "row", spacing: 1, alignItems: "center", children: [_jsx(CancelRounded, { fontSize: "small", sx: { color: theme.palette.error.main } }), _jsx(Typography, { variant: "body2", children: t })] }, t))) }), _jsx(Typography, { variant: "caption", color: "text.secondary", sx: { display: "block", mt: 1.5 }, children: "For those, use multiprocessing instead \u2014 real parallel cooks." })] }) }) })] }) }), _jsx(Section, { eyebrow: "Cheat sheet", title: "Do's and don'ts", icon: _jsx(CheckCircleRounded, {}), children: _jsx(Stack, { spacing: 1.25, children: GOTCHAS.map((g) => (_jsxs(Paper, { variant: "outlined", sx: {
                                        p: 1.75,
                                        borderRadius: 3,
                                        display: "flex",
                                        gap: 1.5,
                                        alignItems: "center",
                                        borderColor: alpha(g.good ? theme.palette.success.main : theme.palette.error.main, 0.4),
                                        bgcolor: alpha(g.good ? theme.palette.success.main : theme.palette.error.main, 0.07),
                                    }, children: [g.good ? (_jsx(CheckCircleRounded, { sx: { color: theme.palette.success.main } })) : (_jsx(CancelRounded, { sx: { color: theme.palette.error.main } })), _jsx(Typography, { variant: "body2", children: g.text })] }, g.text))) }) }), _jsx(Section, { eyebrow: "Remember this", title: "The one-sentence mental model", icon: _jsx(LightbulbRounded, {}), children: _jsx(Card, { sx: {
                                    borderRadius: 5,
                                    p: { xs: 1, sm: 2 },
                                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.18)}, ${alpha(theme.palette.secondary.main, 0.10)})`,
                                    border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                                }, children: _jsxs(CardContent, { children: [_jsxs(Typography, { variant: "h5", sx: { fontWeight: 700, lineHeight: 1.4 }, children: ["\u201CA single worker that never stands still \u2014", " ", _jsx(Box, { component: "span", sx: { color: theme.palette.primary.main }, children: "when one task pauses to wait, it starts another" }), ", and comes back the moment the wait is over.\u201D"] }), _jsx(Divider, { sx: { my: 2.5 } }), _jsxs(Typography, { variant: "body2", color: "text.secondary", children: ["If you remember only that, everything else \u2014", " ", _jsx("code", { children: "async def" }), ", ", _jsx("code", { children: "await" }), ",", " ", _jsx("code", { children: "gather" }), ", the event loop \u2014 is just the vocabulary Python uses to make it happen."] })] }) }) })] }) }), _jsx(Box, { component: "footer", sx: {
                    borderTop: `1px solid ${theme.palette.divider}`,
                    py: 4,
                    textAlign: "center",
                }, children: _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Built with React + TypeScript + Vite + Material\u00A03 \u00B7 async in Python explainer" }) })] }));
}
