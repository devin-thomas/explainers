import { useMemo, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  CssBaseline,
  Divider,
  IconButton,
  Paper,
  Stack,
  ThemeProvider,
  Tooltip,
  Typography,
  alpha,
  createTheme,
  useTheme,
} from "@mui/material";
import {
  ArrowForwardRounded,
  BuildRounded,
  CheckCircleRounded,
  CloudDownloadRounded,
  CodeRounded,
  ContentCopyRounded,
  DarkModeRounded,
  DescriptionRounded,
  FolderRounded,
  Inventory2Rounded,
  LightModeRounded,
  LockRounded,
  PlayArrowRounded,
  TerminalRounded,
  WarningAmberRounded,
} from "@mui/icons-material";

/* =============================================================================
   NPM & NPX — A beginner-first mental model
   Dark by default, mobile-first, Material UI, no runtime data fetching.
   ============================================================================= */

type Mode = "dark" | "light";
type GoalId = "start" | "dependency" | "devDependency" | "script" | "oneOff" | "cleanInstall";
type FileId = "package" | "lock" | "modules";

function useAppTheme(mode: Mode) {
  return useMemo(
    () =>
      createTheme({
        palette:
          mode === "dark"
            ? {
                mode: "dark",
                primary: { main: "#C4B5FD", contrastText: "#21143D" },
                secondary: { main: "#7DD3FC", contrastText: "#082F49" },
                background: { default: "#0D0D12", paper: "#17171F" },
                text: { primary: "#F4F0FA", secondary: "#B8B1C5" },
                success: { main: "#86EFAC" },
                warning: { main: "#FDBA74" },
                divider: "rgba(255,255,255,0.11)",
              }
            : {
                mode: "light",
                primary: { main: "#6941C6", contrastText: "#FFFFFF" },
                secondary: { main: "#0369A1", contrastText: "#FFFFFF" },
                background: { default: "#F8F7FC", paper: "#FFFFFF" },
                text: { primary: "#1C1823", secondary: "#625B6D" },
                success: { main: "#15803D" },
                warning: { main: "#C2410C" },
                divider: "rgba(28,24,35,0.12)",
              },
        shape: { borderRadius: 18 },
        typography: {
          fontFamily:
            'Inter, Roboto, "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
          h1: { fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 0.98 },
          h2: { fontWeight: 760, letterSpacing: "-0.025em" },
          h3: { fontWeight: 730, letterSpacing: "-0.02em" },
          h4: { fontWeight: 720, letterSpacing: "-0.015em" },
          h5: { fontWeight: 700 },
          h6: { fontWeight: 700 },
          button: { textTransform: "none", fontWeight: 750 },
        },
        components: {
          MuiButton: {
            styleOverrides: { root: { borderRadius: 999, minHeight: 42 } },
          },
          MuiCard: {
            styleOverrides: { root: { backgroundImage: "none" } },
          },
          MuiChip: {
            styleOverrides: { root: { fontWeight: 700 } },
          },
          MuiAppBar: {
            styleOverrides: { root: { backgroundImage: "none" } },
          },
        },
      }),
    [mode]
  );
}

const GOALS: Record<
  GoalId,
  { label: string; command: string; answer: string; detail: string; accent: "npm" | "npx" }
> = {
  start: {
    label: "Start a package.json",
    command: "npm init -y",
    answer: "Use npm",
    detail: "Creates a starter package.json in the folder you are currently inside.",
    accent: "npm",
  },
  dependency: {
    label: "Add a library my app needs",
    command: "npm install express",
    answer: "Use npm",
    detail: "Installs Express locally and records it under dependencies.",
    accent: "npm",
  },
  devDependency: {
    label: "Add a development-only tool",
    command: "npm install -D vite",
    answer: "Use npm",
    detail: "Installs Vite locally and records it under devDependencies.",
    accent: "npm",
  },
  script: {
    label: "Run a script from package.json",
    command: "npm run dev",
    answer: "Use npm",
    detail: "Looks up the dev entry inside the scripts section and runs its command.",
    accent: "npm",
  },
  oneOff: {
    label: "Run a package tool without a global install",
    command: "npx create-vite@latest my-app",
    answer: "Use npx",
    detail: "Runs the package's command. It can use a local copy or fetch one for this run.",
    accent: "npx",
  },
  cleanInstall: {
    label: "Rebuild dependencies exactly from the lockfile",
    command: "npm ci",
    answer: "Use npm",
    detail: "Designed for clean, repeatable installs such as CI, deployment, or a fresh machine.",
    accent: "npm",
  },
};

const FILES: Record<FileId, { title: string; icon: React.ReactNode; summary: string; body: string; rule: string }> = {
  package: {
    title: "package.json",
    icon: <DescriptionRounded />,
    summary: "The project's manifest and command menu.",
    body: "It records the project name, dependencies, development dependencies, scripts, and other settings. Humans edit it, and npm updates it when packages are added or removed.",
    rule: "Commit this file to Git.",
  },
  lock: {
    title: "package-lock.json",
    icon: <LockRounded />,
    summary: "The exact dependency receipt.",
    body: "It records the precise versions and dependency tree npm resolved. This helps teammates, CI, and deployments reproduce the same install instead of resolving a slightly different tree.",
    rule: "Usually commit this file too.",
  },
  modules: {
    title: "node_modules/",
    icon: <FolderRounded />,
    summary: "The downloaded package warehouse.",
    body: "This directory contains the actual installed package files. It can become very large because it includes your direct dependencies and the dependencies they need.",
    rule: "Do not commit it; recreate it with npm install or npm ci.",
  },
};

const PACKAGE_JSON = `{
  "name": "tiny-site",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^19.0.0"
  },
  "devDependencies": {
    "vite": "^7.0.0"
  }
}`;

const WORKFLOW = [
  { command: "node --version", text: "Confirm Node.js is installed." },
  { command: "npm --version", text: "Confirm npm is available." },
  { command: "npm init -y", text: "Create package.json for a new project." },
  { command: "npm install", text: "Install everything already listed in package.json." },
  { command: "npm run dev", text: "Run the project's development script." },
];

function CodeBlock({ code, label }: { code: string; label?: string }) {
  const theme = useTheme();
  const [copied, setCopied] = useState(false);
  const dark = theme.palette.mode === "dark";

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Paper
      elevation={0}
      sx={{
        overflow: "hidden",
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: dark ? "#09090D" : "#F1EEF7",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 1.5, py: 0.8, borderBottom: `1px solid ${theme.palette.divider}` }}
      >
        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 750 }}>
          {label ?? "terminal"}
        </Typography>
        <Tooltip title={copied ? "Copied" : "Copy"}>
          <IconButton size="small" onClick={copy} aria-label={`Copy ${label ?? "code"}`}>
            {copied ? <CheckCircleRounded fontSize="small" /> : <ContentCopyRounded fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Stack>
      <Box
        component="pre"
        sx={{
          m: 0,
          p: { xs: 2, sm: 2.5 },
          overflowX: "auto",
          fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
          fontSize: { xs: 12.5, sm: 13.5 },
          lineHeight: 1.7,
          color: "text.primary",
          whiteSpace: "pre",
        }}
      >
        <code>{code}</code>
      </Box>
    </Paper>
  );
}

function Section({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <Box component="section" sx={{ scrollMarginTop: 88 }}>
      <Typography
        variant="overline"
        sx={{ color: "primary.main", fontWeight: 850, letterSpacing: ".16em" }}
      >
        {eyebrow}
      </Typography>
      <Typography variant="h2" sx={{ mt: 0.5, fontSize: { xs: 30, sm: 40 } }}>
        {title}
      </Typography>
      {intro && (
        <Typography sx={{ mt: 1.5, maxWidth: 760, color: "text.secondary", fontSize: { xs: 16, sm: 18 }, lineHeight: 1.75 }}>
          {intro}
        </Typography>
      )}
      <Box sx={{ mt: 3 }}>{children}</Box>
    </Box>
  );
}

function NpmNpxComparison() {
  const theme = useTheme();
  const cards = [
    {
      name: "npm",
      icon: <Inventory2Rounded fontSize="large" />,
      headline: "Manage the project",
      text: "Install, remove, update, and record packages. It also runs scripts defined by the project.",
      commands: ["npm install axios", "npm uninstall axios", "npm run build"],
      color: theme.palette.primary.main,
    },
    {
      name: "npx",
      icon: <PlayArrowRounded fontSize="large" />,
      headline: "Execute a package tool",
      text: "Run a command supplied by an npm package without making a permanent global installation first.",
      commands: ["npx create-vite@latest", "npx eslint .", "npx wrangler deploy"],
      color: theme.palette.secondary.main,
    },
  ];

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
      {cards.map((item) => (
        <Card key={item.name} variant="outlined" sx={{ borderColor: alpha(item.color, 0.35), position: "relative", overflow: "hidden" }}>
          <Box sx={{ position: "absolute", inset: "0 auto auto 0", width: "100%", height: 4, bgcolor: item.color }} />
          <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box sx={{ display: "grid", placeItems: "center", width: 52, height: 52, borderRadius: 3, bgcolor: alpha(item.color, 0.14), color: item.color }}>
                {item.icon}
              </Box>
              <Box>
                <Typography variant="h3" sx={{ fontSize: 32 }}>{item.name}</Typography>
                <Typography color="text.secondary" fontWeight={700}>{item.headline}</Typography>
              </Box>
            </Stack>
            <Typography sx={{ mt: 2.5, color: "text.secondary", lineHeight: 1.75 }}>{item.text}</Typography>
            <Stack spacing={1} sx={{ mt: 2.5 }}>
              {item.commands.map((command) => (
                <Box key={command} sx={{ px: 1.5, py: 1.2, borderRadius: 2.5, bgcolor: alpha(item.color, 0.09), fontFamily: "monospace", fontSize: 13.5 }}>
                  {command}
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

function CommandFinder() {
  const theme = useTheme();
  const [goal, setGoal] = useState<GoalId>("dependency");
  const selected = GOALS[goal];
  const accent = selected.accent === "npm" ? theme.palette.primary.main : theme.palette.secondary.main;

  return (
    <Card variant="outlined" sx={{ borderColor: theme.palette.divider }}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography variant="h5">What are you trying to do?</Typography>
        <Typography sx={{ mt: 0.75, color: "text.secondary" }}>Pick a goal and the command becomes easier to remember.</Typography>
        <Box sx={{ mt: 2.5, display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" }, gap: 1 }}>
          {(Object.entries(GOALS) as [GoalId, (typeof GOALS)[GoalId]][]).map(([id, item]) => {
            const active = goal === id;
            return (
              <Button
                key={id}
                variant={active ? "contained" : "outlined"}
                onClick={() => setGoal(id)}
                sx={{ justifyContent: "flex-start", textAlign: "left", px: 2, py: 1.4, borderRadius: 3, minHeight: 58 }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>

        <Paper elevation={0} sx={{ mt: 2.5, p: { xs: 2.25, sm: 3 }, border: `1px solid ${alpha(accent, 0.42)}`, bgcolor: alpha(accent, 0.09) }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }}>
            <Box>
              <Chip size="small" label={selected.answer} sx={{ bgcolor: alpha(accent, 0.2), color: "text.primary" }} />
              <Typography sx={{ mt: 1.5, fontFamily: "monospace", fontSize: { xs: 17, sm: 21 }, fontWeight: 800, wordBreak: "break-word" }}>
                {selected.command}
              </Typography>
              <Typography sx={{ mt: 1, color: "text.secondary", lineHeight: 1.7 }}>{selected.detail}</Typography>
            </Box>
            <Box sx={{ display: "grid", placeItems: "center", flex: "0 0 auto", width: 54, height: 54, borderRadius: 3, bgcolor: alpha(accent, 0.16), color: accent }}>
              {selected.accent === "npm" ? <Inventory2Rounded /> : <PlayArrowRounded />}
            </Box>
          </Stack>
        </Paper>
      </CardContent>
    </Card>
  );
}

function FileAnatomy() {
  const theme = useTheme();
  const [active, setActive] = useState<FileId>("package");
  const file = FILES[active];

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(230px, .72fr) minmax(0, 1.28fr)" }, gap: 2 }}>
      <Stack spacing={1}>
        {(Object.entries(FILES) as [FileId, (typeof FILES)[FileId]][]).map(([id, item]) => (
          <Button
            key={id}
            variant={active === id ? "contained" : "outlined"}
            onClick={() => setActive(id)}
            startIcon={item.icon}
            sx={{ justifyContent: "flex-start", px: 2, py: 1.4, borderRadius: 3 }}
          >
            {item.title}
          </Button>
        ))}
      </Stack>
      <Card variant="outlined" sx={{ borderColor: theme.palette.divider }}>
        <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box sx={{ display: "grid", placeItems: "center", width: 46, height: 46, borderRadius: 2.5, bgcolor: alpha(theme.palette.primary.main, 0.13), color: "primary.main" }}>
              {file.icon}
            </Box>
            <Box>
              <Typography variant="h5">{file.title}</Typography>
              <Typography color="text.secondary">{file.summary}</Typography>
            </Box>
          </Stack>
          <Typography sx={{ mt: 2.5, color: "text.secondary", lineHeight: 1.8 }}>{file.body}</Typography>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2.5, color: "success.main" }}>
            <CheckCircleRounded fontSize="small" />
            <Typography fontWeight={750}>{file.rule}</Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

function ExplainerShell({ mode, setMode }: { mode: Mode; setMode: (mode: Mode) => void }) {
  const theme = useTheme();
  const dark = mode === "dark";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        backgroundImage: dark
          ? "radial-gradient(900px 520px at 85% -8%, rgba(196,181,253,.13), transparent), radial-gradient(760px 440px at -5% 12%, rgba(125,211,252,.08), transparent)"
          : "radial-gradient(900px 520px at 85% -8%, rgba(105,65,198,.12), transparent), radial-gradient(760px 440px at -5% 12%, rgba(3,105,161,.08), transparent)",
      }}
    >
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: alpha(theme.palette.background.default, 0.92), borderBottom: `1px solid ${theme.palette.divider}`, color: "text.primary" }}>
        <Toolbar sx={{ gap: 1.5 }}>
          <Box sx={{ display: "grid", placeItems: "center", width: 38, height: 38, borderRadius: 2.5, bgcolor: alpha(theme.palette.primary.main, 0.14), color: "primary.main" }}>
            <TerminalRounded />
          </Box>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>npm & npx</Typography>
          <Chip label="beginner" size="small" sx={{ display: { xs: "none", sm: "inline-flex" }, bgcolor: alpha(theme.palette.primary.main, 0.14), color: "primary.main" }} />
          <Tooltip title={dark ? "Switch to light mode" : "Switch to dark mode"}>
            <IconButton onClick={() => setMode(dark ? "light" : "dark")} color="inherit" aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>
              {dark ? <LightModeRounded /> : <DarkModeRounded />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Box component="header" sx={{ pt: { xs: 7, sm: 11 }, pb: { xs: 6, sm: 9 } }}>
        <Container maxWidth="lg">
          <Stack direction="row" flexWrap="wrap" gap={1}>
            <Chip icon={<Inventory2Rounded />} label="Install and manage" sx={{ bgcolor: alpha(theme.palette.primary.main, 0.13) }} />
            <Chip icon={<PlayArrowRounded />} label="Run package tools" sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.13) }} />
          </Stack>
          <Typography variant="h1" sx={{ mt: 3, maxWidth: 900, fontSize: { xs: 50, sm: 76, md: 96 } }}>
            npm installs the toolbox.
            <Box component="span" sx={{ display: "block", color: "secondary.main" }}>npx runs a tool.</Box>
          </Typography>
          <Typography sx={{ mt: 3, maxWidth: 780, color: "text.secondary", fontSize: { xs: 18, sm: 21 }, lineHeight: 1.75 }}>
            Both arrive in the Node.js ecosystem, but they solve different everyday problems. npm manages packages and project scripts. npx executes command-line programs provided by packages.
          </Typography>
          <Paper elevation={0} sx={{ mt: 4, maxWidth: 780, p: { xs: 2, sm: 2.5 }, border: `1px solid ${theme.palette.divider}`, bgcolor: alpha(theme.palette.background.paper, 0.72) }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} divider={<Divider orientation="vertical" flexItem />}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="overline" color="primary.main" fontWeight={850}>Remember</Typography>
                <Typography variant="h6">npm changes or uses the project.</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="overline" color="secondary.main" fontWeight={850}>Remember</Typography>
                <Typography variant="h6">npx launches a package command.</Typography>
              </Box>
            </Stack>
          </Paper>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 10 }}>
        <Stack spacing={{ xs: 8, sm: 11 }}>
          <Section
            eyebrow="The three-layer mental model"
            title="Node runs. npm manages. npx executes."
            intro="These names often appear together because they are parts of the same JavaScript toolchain, not because they are interchangeable."
          >
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 2 }}>
              {[
                { name: "Node.js", icon: <CodeRounded />, verb: "runs", text: "The runtime that executes JavaScript outside the browser, including servers, scripts, and build tools." },
                { name: "npm", icon: <Inventory2Rounded />, verb: "manages", text: "The package manager and project command interface normally installed with Node.js." },
                { name: "npx", icon: <PlayArrowRounded />, verb: "executes", text: "The npm-provided shortcut for running command-line programs exposed by packages." },
              ].map((item, index) => (
                <Card key={item.name} variant="outlined" sx={{ borderColor: theme.palette.divider }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "grid", placeItems: "center", width: 48, height: 48, borderRadius: 3, bgcolor: alpha(index === 2 ? theme.palette.secondary.main : theme.palette.primary.main, 0.13), color: index === 2 ? "secondary.main" : "primary.main" }}>{item.icon}</Box>
                    <Typography variant="h4" sx={{ mt: 2, fontSize: 27 }}>{item.name}</Typography>
                    <Chip size="small" label={item.verb} sx={{ mt: 1, bgcolor: alpha(index === 2 ? theme.palette.secondary.main : theme.palette.primary.main, 0.12) }} />
                    <Typography sx={{ mt: 1.5, color: "text.secondary", lineHeight: 1.7 }}>{item.text}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Section>

          <Section
            eyebrow="The core distinction"
            title="Two commands, two jobs"
            intro="They overlap because both understand npm packages, but the verb is different: manage versus execute."
          >
            <NpmNpxComparison />
          </Section>

          <Section
            eyebrow="Decision helper"
            title="Which command should I use?"
            intro="Beginners usually do not need to memorize every flag. Start by identifying the outcome you want."
          >
            <CommandFinder />
          </Section>

          <Section
            eyebrow="The package pipeline"
            title="What npm changes inside a project"
            intro="A package install is not just one mysterious download. npm reads the manifest, resolves versions, records the result, and fills the local package folder."
          >
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" }, gap: 1.5, alignItems: "stretch" }}>
              {[
                { icon: <CloudDownloadRounded />, title: "Registry", text: "npm finds the requested package and its metadata." },
                { icon: <DescriptionRounded />, title: "package.json", text: "The requested dependency range is saved here." },
                { icon: <LockRounded />, title: "package-lock.json", text: "The exact resolved dependency tree is recorded." },
                { icon: <FolderRounded />, title: "node_modules", text: "The package files are placed in the project." },
              ].map((step, index) => (
                <Card key={step.title} variant="outlined" sx={{ borderColor: theme.palette.divider }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Box sx={{ color: index % 2 === 0 ? "primary.main" : "secondary.main" }}>{step.icon}</Box>
                      {index < 3 && <ArrowForwardRounded sx={{ display: { xs: "none", md: "block" }, color: "text.secondary", opacity: 0.45 }} />}
                    </Stack>
                    <Typography variant="h6" sx={{ mt: 2 }}>{step.title}</Typography>
                    <Typography sx={{ mt: 1, color: "text.secondary", lineHeight: 1.65 }}>{step.text}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
            <Box sx={{ mt: 2.5 }}>
              <FileAnatomy />
            </Box>
            <Box sx={{ mt: 2.5, display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
              <Card variant="outlined" sx={{ borderColor: theme.palette.divider }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Typography variant="overline" color="primary.main" fontWeight={850}>Local — the default</Typography>
                  <Typography variant="h6" sx={{ mt: 0.5, fontFamily: "monospace" }}>npm install &lt;package&gt;</Typography>
                  <Typography sx={{ mt: 1, color: "text.secondary", lineHeight: 1.7 }}>Installs into this project, records the dependency, and keeps the version tied to the project. This is the normal choice.</Typography>
                </CardContent>
              </Card>
              <Card variant="outlined" sx={{ borderColor: theme.palette.divider }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Typography variant="overline" color="secondary.main" fontWeight={850}>Global — deliberate</Typography>
                  <Typography variant="h6" sx={{ mt: 0.5, fontFamily: "monospace" }}>npm install -g &lt;package&gt;</Typography>
                  <Typography sx={{ mt: 1, color: "text.secondary", lineHeight: 1.7 }}>Installs a command for use across your computer. Prefer local tools or npx unless you intentionally need a system-wide CLI.</Typography>
                </CardContent>
              </Card>
            </Box>
          </Section>

          <Section
            eyebrow="Reading package.json"
            title="The small file at the center of npm"
            intro="You do not need to understand every field. These three sections cover most beginner workflows."
          >
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1.05fr .95fr" }, gap: 2 }}>
              <CodeBlock label="package.json" code={PACKAGE_JSON} />
              <Stack spacing={1.5}>
                {[
                  { name: "scripts", icon: <TerminalRounded />, text: "Named terminal commands. Run them with npm run <name>, such as npm run dev." },
                  { name: "dependencies", icon: <Inventory2Rounded />, text: "Packages the application needs when it actually runs." },
                  { name: "devDependencies", icon: <BuildRounded />, text: "Tools mainly used to develop, test, lint, or build the application." },
                ].map((item) => (
                  <Card key={item.name} variant="outlined" sx={{ borderColor: theme.palette.divider }}>
                    <CardContent sx={{ p: 2.5 }}>
                      <Stack direction="row" spacing={1.5} alignItems="flex-start">
                        <Box sx={{ display: "grid", placeItems: "center", width: 42, height: 42, borderRadius: 2.5, bgcolor: alpha(theme.palette.primary.main, 0.12), color: "primary.main", flex: "0 0 auto" }}>{item.icon}</Box>
                        <Box>
                          <Typography variant="h6" sx={{ fontFamily: "monospace" }}>{item.name}</Typography>
                          <Typography sx={{ mt: 0.6, color: "text.secondary", lineHeight: 1.65 }}>{item.text}</Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Box>
          </Section>

          <Section
            eyebrow="A normal first session"
            title="From empty folder to running project"
            intro="The exact framework may change, but the rhythm is usually the same. Every command acts on your current folder, so location matters."
          >
            <Card variant="outlined" sx={{ borderColor: theme.palette.divider }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Stack spacing={0}>
                  {WORKFLOW.map((step, index) => (
                    <Box key={step.command}>
                      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "flex-start", sm: "center" }} sx={{ py: 2 }}>
                        <Box sx={{ display: "grid", placeItems: "center", width: 34, height: 34, borderRadius: "50%", bgcolor: alpha(theme.palette.primary.main, 0.15), color: "primary.main", fontWeight: 850, flex: "0 0 auto" }}>{index + 1}</Box>
                        <Box sx={{ minWidth: { sm: 220 }, fontFamily: "monospace", fontWeight: 800 }}>{step.command}</Box>
                        <Typography sx={{ color: "text.secondary" }}>{step.text}</Typography>
                      </Stack>
                      {index < WORKFLOW.length - 1 && <Divider />}
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Section>

          <Section
            eyebrow="Important beginner rules"
            title="Avoid the most common confusion"
          >
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
              {[
                { good: true, title: "Run commands in the project folder", text: "npm searches upward for project context. Check the folder before installing or running scripts." },
                { good: true, title: "Commit the lockfile", text: "For normal applications, package-lock.json is part of the reproducible project record." },
                { good: false, title: "Do not commit node_modules", text: "It is generated, large, and platform-sensitive. Add it to .gitignore and recreate it." },
                { good: false, title: "Do not blindly trust an npx package name", text: "npx can fetch and execute code. Verify spelling, publisher, repository, and documentation first." },
                { good: true, title: "Prefer local project tools", text: "Local versions keep teammates and CI aligned. npm scripts and npx can find local executables." },
                { good: false, title: "Avoid random sudo fixes", text: "Global permission errors are better solved with a Node version manager than by running package commands as administrator." },
              ].map((item) => (
                <Card key={item.title} variant="outlined" sx={{ borderColor: alpha(item.good ? theme.palette.success.main : theme.palette.warning.main, 0.34) }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Stack direction="row" spacing={1.5} alignItems="flex-start">
                      <Box sx={{ color: item.good ? "success.main" : "warning.main", mt: 0.2 }}>{item.good ? <CheckCircleRounded /> : <WarningAmberRounded />}</Box>
                      <Box>
                        <Typography variant="h6">{item.title}</Typography>
                        <Typography sx={{ mt: 0.8, color: "text.secondary", lineHeight: 1.65 }}>{item.text}</Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Section>

          <Section
            eyebrow="Compact reference"
            title="Commands worth recognizing"
          >
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
              <CodeBlock label="npm — project management" code={`npm init -y\nnpm install\nnpm install <package>\nnpm install -D <package>\nnpm uninstall <package>\nnpm run <script>\nnpm ci`} />
              <CodeBlock label="npx — package commands" code={`npx <package> [arguments]\nnpx create-vite@latest my-app\nnpx eslint .\nnpx wrangler deploy\n\n# npm exec is the underlying npm command\nnpm exec -- <package> [arguments]`} />
            </Box>
          </Section>

          <Box component="footer" sx={{ pt: 2, pb: 4 }}>
            <Divider sx={{ mb: 3 }} />
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }}>
              <Box>
                <Typography variant="h6">The one-line takeaway</Typography>
                <Typography sx={{ mt: 0.5, color: "text.secondary" }}>
                  Use <Box component="code" sx={{ color: "primary.main" }}>npm</Box> to manage a project; use <Box component="code" sx={{ color: "secondary.main" }}>npx</Box> to run a package's command.
                </Typography>
              </Box>
              <Stack direction="row" gap={1} flexWrap="wrap">
                <Button component="a" href="https://docs.npmjs.com/" target="_blank" rel="noreferrer" variant="outlined" startIcon={<DescriptionRounded />}>npm Docs</Button>
                <Button component="a" href="https://docs.npmjs.com/cli/commands/npx/" target="_blank" rel="noreferrer" variant="outlined" startIcon={<CodeRounded />}>npx Docs</Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default function NpmNpxExplainer() {
  const [mode, setMode] = useState<Mode>("dark");
  const theme = useAppTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ExplainerShell mode={mode} setMode={setMode} />
    </ThemeProvider>
  );
}
