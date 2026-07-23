import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  CssBaseline,
  Divider,
  IconButton,
  Link,
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
  AutoAwesomeRounded,
  BackupRounded,
  CheckCircleRounded,
  CloudDoneRounded,
  CloudOffRounded,
  CodeRounded,
  ComputerRounded,
  ContentCopyRounded,
  DarkModeRounded,
  DataObjectRounded,
  DnsRounded,
  FolderCopyRounded,
  HubRounded,
  KeyRounded,
  LightModeRounded,
  LockRounded,
  PublishRounded,
  ScheduleRounded,
  SecurityRounded,
  StorageRounded,
  SyncRounded,
  TerminalRounded,
  WarningAmberRounded,
} from "@mui/icons-material";

type Mode = "dark" | "light";
type ArchitectureId = "official" | "selfHosted";
type UseCaseId = "backup" | "agent" | "publish" | "team";

const RESEARCH_DATE = "July 23, 2026";

const SOURCES = [
  {
    label: "Obsidian Headless",
    detail: "Official overview, open-beta status, Node.js requirement, and service scope.",
    url: "https://obsidian.md/help/headless",
  },
  {
    label: "Headless Sync",
    detail: "Official setup, commands, modes, conflict strategies, and same-device warning.",
    url: "https://obsidian.md/help/sync/headless",
  },
  {
    label: "Headless Publish",
    detail: "Official publishing workflow for CI pipelines and scheduled automation.",
    url: "https://obsidian.md/help/publish/headless",
  },
  {
    label: "Obsidian Sync",
    detail: "Official hosted Sync product, features, plans, storage, and cross-platform support.",
    url: "https://obsidian.md/sync",
  },
  {
    label: "Sync security and privacy",
    detail: "Encryption model, hosting regions, server identification, and security limitations.",
    url: "https://obsidian.md/help/Obsidian%20Sync/Security%20and%20privacy",
  },
  {
    label: "Syncing for teams",
    detail: "Shared-vault behavior, team limits, and the absence of an official on-premises Sync server.",
    url: "https://obsidian.md/help/teams/sync",
  },
  {
    label: "Obsidian Sync security audits",
    detail: "Cure53 and Trail of Bits audit summary and remediation disclosures.",
    url: "https://obsidian.md/blog/cure53-tob-sync-audits/",
  },
  {
    label: "Headless Sync launch changelog",
    detail: "Official February 27, 2026 release entry for headless Sync operation.",
    url: "https://obsidian.md/changelog/2026-02-27-sync/",
  },
  {
    label: "obsidian-headless on GitHub",
    detail: "Official package repository and command reference.",
    url: "https://github.com/obsidianmd/obsidian-headless",
  },
  {
    label: "Self-hosted LiveSync",
    detail: "Representative community-maintained self-hosted sync approach using CouchDB, object storage, or WebRTC.",
    url: "https://community.obsidian.md/plugins/obsidian-livesync",
  },
];

const USE_CASES: Record<
  UseCaseId,
  {
    label: string;
    icon: React.ReactNode;
    title: string;
    outcome: string;
    flow: string[];
    caution: string;
    command: string;
  }
> = {
  backup: {
    label: "Remote backup",
    icon: <BackupRounded />,
    title: "Keep an always-on server copy",
    outcome:
      "A small Linux server, NAS, or VM continuously receives the latest encrypted Sync changes, then a separate backup process snapshots the local Markdown files.",
    flow: ["Obsidian devices", "Obsidian Sync", "Headless client", "Backup or Git job"],
    caution:
      "Sync is not itself a backup. Keep independent snapshots or versioned copies so deletion and corruption are recoverable outside the Sync history window.",
    command: "ob sync --continuous",
  },
  agent: {
    label: "AI or automation",
    icon: <AutoAwesomeRounded />,
    title: "Give tools a narrow vault workspace",
    outcome:
      "The server holds a synchronized folder that an agent, script, indexer, or scheduled task can read and update without receiving access to your whole desktop computer.",
    flow: ["Obsidian devices", "Obsidian Sync", "Headless vault folder", "Agent or script"],
    caution:
      "The agent can still read whatever plaintext files exist in that server folder. Use a dedicated vault, least-privilege account, and scoped filesystem permissions.",
    command: "ob sync --continuous",
  },
  publish: {
    label: "Automated publishing",
    icon: <PublishRounded />,
    title: "Publish on a schedule or in CI",
    outcome:
      "A pipeline can sync the vault, preview publish changes, and push selected notes to an Obsidian Publish site without opening the desktop app.",
    flow: ["Vault changes", "Headless Sync", "Publish dry run", "Obsidian Publish"],
    caution:
      "Headless Publish requires an active Publish subscription and publishes according to frontmatter and include/exclude settings.",
    command: "ob publish --dry-run && ob publish --yes",
  },
  team: {
    label: "Team integration",
    icon: <HubRounded />,
    title: "Feed a shared vault into other systems",
    outcome:
      "A shared team vault can be mirrored onto a server that powers search, documentation builds, internal bots, analytics, or other downstream tools.",
    flow: ["Team vault", "Obsidian Sync", "Headless server copy", "Internal toolchain"],
    caution:
      "Shared vaults are not Google Docs-style live co-editing. Every collaborator needs Sync, and the official team limit is currently 20 collaborators.",
    command: "ob sync --continuous",
  },
};

function useAppTheme(mode: Mode) {
  return useMemo(
    () =>
      createTheme({
        palette:
          mode === "dark"
            ? {
                mode: "dark",
                primary: { main: "#A78BFA", contrastText: "#1F1537" },
                secondary: { main: "#67E8F9", contrastText: "#083344" },
                background: { default: "#0D0D12", paper: "#17171F" },
                text: { primary: "#F5F3FF", secondary: "#B8B3C7" },
                success: { main: "#86EFAC" },
                warning: { main: "#FDBA74" },
                error: { main: "#FDA4AF" },
                divider: "rgba(255,255,255,0.11)",
              }
            : {
                mode: "light",
                primary: { main: "#6D28D9", contrastText: "#FFFFFF" },
                secondary: { main: "#0E7490", contrastText: "#FFFFFF" },
                background: { default: "#F8F7FC", paper: "#FFFFFF" },
                text: { primary: "#1C1823", secondary: "#625B6D" },
                success: { main: "#15803D" },
                warning: { main: "#C2410C" },
                error: { main: "#BE123C" },
                divider: "rgba(28,24,35,0.12)",
              },
        shape: { borderRadius: 18 },
        typography: {
          fontFamily:
            'Inter, Roboto, "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
          h1: { fontWeight: 850, letterSpacing: "-0.045em", lineHeight: 0.98 },
          h2: { fontWeight: 780, letterSpacing: "-0.03em" },
          h3: { fontWeight: 750, letterSpacing: "-0.022em" },
          h4: { fontWeight: 730, letterSpacing: "-0.018em" },
          h5: { fontWeight: 720 },
          h6: { fontWeight: 720 },
          button: { textTransform: "none", fontWeight: 760 },
        },
        components: {
          MuiButton: {
            styleOverrides: { root: { borderRadius: 999, minHeight: 42 } },
          },
          MuiCard: {
            styleOverrides: { root: { backgroundImage: "none" } },
          },
          MuiChip: {
            styleOverrides: { root: { fontWeight: 720 } },
          },
        },
      }),
    [mode]
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
    <Box component="section" sx={{ scrollMarginTop: 92 }}>
      <Typography
        variant="overline"
        sx={{ color: "primary.main", fontWeight: 900, letterSpacing: ".16em" }}
      >
        {eyebrow}
      </Typography>
      <Typography variant="h2" sx={{ mt: 0.5, fontSize: { xs: 31, sm: 42 } }}>
        {title}
      </Typography>
      {intro && (
        <Typography
          sx={{
            mt: 1.5,
            maxWidth: 820,
            color: "text.secondary",
            fontSize: { xs: 16, sm: 18 },
            lineHeight: 1.75,
          }}
        >
          {intro}
        </Typography>
      )}
      <Box sx={{ mt: 3 }}>{children}</Box>
    </Box>
  );
}

function CodeBlock({ code, label = "terminal" }: { code: string; label?: string }) {
  const theme = useTheme();
  const [copied, setCopied] = useState(false);

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
        bgcolor: theme.palette.mode === "dark" ? "#09090D" : "#F1EEF7",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 1.5, py: 0.8, borderBottom: `1px solid ${theme.palette.divider}` }}
      >
        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 800 }}>
          {label}
        </Typography>
        <Tooltip title={copied ? "Copied" : "Copy"}>
          <IconButton size="small" onClick={copy} aria-label={`Copy ${label}`}>
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
          color: "text.primary",
          fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
          fontSize: { xs: 12.5, sm: 13.5 },
          lineHeight: 1.75,
          whiteSpace: "pre",
        }}
      >
        <code>{code}</code>
      </Box>
    </Paper>
  );
}

function MeaningCards() {
  const theme = useTheme();
  const meanings = [
    {
      icon: <TerminalRounded />,
      title: "Obsidian Headless",
      label: "Runs on your server",
      body:
        "An official standalone command-line client. It connects a server-side folder to Obsidian Sync or Obsidian Publish without launching the desktop app.",
      verdict: "This is the new official server-friendly piece.",
      accent: theme.palette.primary.main,
    },
    {
      icon: <CloudDoneRounded />,
      title: "Obsidian Sync servers",
      label: "Run by Obsidian",
      body:
        "The hosted backend that stores remote vault data and moves encrypted changes between clients. Obsidian currently hosts this infrastructure in regional data centers.",
      verdict: "You use it; you do not operate it.",
      accent: theme.palette.secondary.main,
    },
    {
      icon: <StorageRounded />,
      title: "Self-hosted sync server",
      label: "Run by you",
      body:
        "A community or generic file-sync system such as LiveSync, Git, Syncthing, Nextcloud, or another server-backed workflow.",
      verdict: "This is separate from official Obsidian Sync.",
      accent: theme.palette.warning.main,
    },
  ];

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "repeat(3, 1fr)" }, gap: 2 }}>
      {meanings.map((item) => (
        <Card key={item.title} variant="outlined" sx={{ borderColor: alpha(item.accent, 0.34) }}>
          <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
            <Box
              sx={{
                display: "grid",
                placeItems: "center",
                width: 48,
                height: 48,
                borderRadius: 3,
                color: item.accent,
                bgcolor: alpha(item.accent, 0.12),
              }}
            >
              {item.icon}
            </Box>
            <Typography variant="h5" sx={{ mt: 2.2 }}>
              {item.title}
            </Typography>
            <Typography sx={{ mt: 0.4, color: item.accent, fontWeight: 800 }}>
              {item.label}
            </Typography>
            <Typography sx={{ mt: 1.5, color: "text.secondary", lineHeight: 1.75 }}>
              {item.body}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography sx={{ fontWeight: 800 }}>{item.verdict}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

function ArchitectureExplorer() {
  const theme = useTheme();
  const [architecture, setArchitecture] = useState<ArchitectureId>("official");

  const official = architecture === "official";
  const nodes = official
    ? [
        { label: "Laptop / phone", icon: <ComputerRounded /> },
        { label: "Obsidian Sync", icon: <CloudDoneRounded /> },
        { label: "Headless client", icon: <TerminalRounded /> },
        { label: "Automation", icon: <AutoAwesomeRounded /> },
      ]
    : [
        { label: "Laptop / phone", icon: <ComputerRounded /> },
        { label: "Community plugin", icon: <CodeRounded /> },
        { label: "Your sync server", icon: <DnsRounded /> },
        { label: "Your storage", icon: <StorageRounded /> },
      ];

  const accent = official ? theme.palette.primary.main : theme.palette.warning.main;

  return (
    <Card variant="outlined" sx={{ borderColor: theme.palette.divider }}>
      <CardContent sx={{ p: { xs: 2.2, sm: 3.2 } }}>
        <Stack direction={{ xs: "column", sm: "row" }} gap={1}>
          <Button
            variant={official ? "contained" : "outlined"}
            onClick={() => setArchitecture("official")}
            startIcon={<CloudDoneRounded />}
          >
            Official Headless + Sync
          </Button>
          <Button
            variant={!official ? "contained" : "outlined"}
            color="warning"
            onClick={() => setArchitecture("selfHosted")}
            startIcon={<DnsRounded />}
          >
            Community self-hosting
          </Button>
        </Stack>

        <Box
          sx={{
            mt: 3,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(7, minmax(0,1fr))" },
            alignItems: "center",
            gap: { xs: 1, md: 1.2 },
          }}
        >
          {nodes.map((node, index) => (
            <Box key={node.label} sx={{ display: "contents" }}>
              <Paper
                elevation={0}
                sx={{
                  minHeight: 116,
                  p: 2,
                  display: "grid",
                  placeItems: "center",
                  textAlign: "center",
                  border: `1px solid ${alpha(accent, 0.34)}`,
                  bgcolor: alpha(accent, 0.075),
                }}
              >
                <Box sx={{ color: accent }}>{node.icon}</Box>
                <Typography sx={{ mt: 1, fontWeight: 800, lineHeight: 1.25 }}>{node.label}</Typography>
              </Paper>
              {index < nodes.length - 1 && (
                <Typography
                  aria-hidden="true"
                  sx={{
                    textAlign: "center",
                    color: accent,
                    fontSize: 24,
                    transform: { xs: "rotate(90deg)", md: "none" },
                  }}
                >
                  →
                </Typography>
              )}
            </Box>
          ))}
        </Box>

        <Alert
          severity={official ? "info" : "warning"}
          icon={official ? <LockRounded /> : <WarningAmberRounded />}
          sx={{ mt: 3 }}
        >
          {official
            ? "Your server runs an official Sync client, but the remote Sync backend still belongs to Obsidian. Headless does not turn your machine into an Obsidian Sync server."
            : "You operate more of the stack, but reliability, mobile behavior, authentication, conflict handling, upgrades, and backups become your responsibility."}
        </Alert>
      </CardContent>
    </Card>
  );
}

function UseCaseExplorer() {
  const theme = useTheme();
  const [active, setActive] = useState<UseCaseId>("agent");
  const item = USE_CASES[active];

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "280px minmax(0,1fr)" }, gap: 2 }}>
      <Stack spacing={1}>
        {(Object.entries(USE_CASES) as [UseCaseId, (typeof USE_CASES)[UseCaseId]][]).map(([id, option]) => (
          <Button
            key={id}
            variant={active === id ? "contained" : "outlined"}
            onClick={() => setActive(id)}
            startIcon={option.icon}
            sx={{ justifyContent: "flex-start", px: 2, py: 1.4, borderRadius: 3 }}
          >
            {option.label}
          </Button>
        ))}
      </Stack>

      <Card variant="outlined" sx={{ borderColor: theme.palette.divider }}>
        <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
          <Typography variant="h4" sx={{ fontSize: { xs: 25, sm: 31 } }}>
            {item.title}
          </Typography>
          <Typography sx={{ mt: 1.5, color: "text.secondary", lineHeight: 1.8 }}>
            {item.outcome}
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            divider={<Typography sx={{ color: "primary.main", fontWeight: 900 }}>→</Typography>}
            spacing={1}
            alignItems={{ xs: "stretch", sm: "center" }}
            sx={{ mt: 3 }}
          >
            {item.flow.map((step) => (
              <Paper
                key={step}
                elevation={0}
                sx={{
                  flex: 1,
                  px: 1.4,
                  py: 1.2,
                  textAlign: "center",
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.28)}`,
                  bgcolor: alpha(theme.palette.primary.main, 0.07),
                  fontWeight: 780,
                }}
              >
                {step}
              </Paper>
            ))}
          </Stack>

          <Alert severity="warning" sx={{ mt: 3 }}>
            {item.caution}
          </Alert>
          <Box sx={{ mt: 2.5 }}>
            <CodeBlock code={item.command} label="key command" />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

function ComparisonTable() {
  const theme = useTheme();
  const rows = [
    {
      path: "Official Headless + Sync",
      best: "Reliable official sync on an always-on machine",
      control: "You control the client and local files; Obsidian controls the Sync backend",
      mobile: "Strong",
      effort: "Low–medium",
      caveat: "Paid Sync; no official on-prem backend",
    },
    {
      path: "Community self-hosted sync",
      best: "Owning the sync infrastructure",
      control: "You control the server, storage, and deployment",
      mobile: "Varies by project",
      effort: "Medium–high",
      caveat: "Community support and operational burden",
    },
    {
      path: "Generic file sync",
      best: "Simple folder replication with tools you already use",
      control: "Depends on provider or self-hosting setup",
      mobile: "Uneven",
      effort: "Low–medium",
      caveat: "Conflict and hidden-config behavior need care",
    },
    {
      path: "Git-based vault",
      best: "Versioned text workflows and developer teams",
      control: "High",
      mobile: "Usually awkward",
      effort: "Medium",
      caveat: "Not real-time sync; merge conflicts are visible work",
    },
  ];

  return (
    <Box sx={{ overflowX: "auto", border: `1px solid ${theme.palette.divider}`, borderRadius: 4 }}>
      <Box component="table" sx={{ width: "100%", minWidth: 860, borderCollapse: "collapse" }}>
        <Box component="thead">
          <Box component="tr" sx={{ bgcolor: alpha(theme.palette.primary.main, 0.08) }}>
            {["Path", "Best for", "Control boundary", "Mobile", "Effort", "Main caveat"].map((heading) => (
              <Box
                key={heading}
                component="th"
                sx={{
                  p: 2,
                  textAlign: "left",
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  color: "text.secondary",
                  fontSize: 13,
                  letterSpacing: ".05em",
                  textTransform: "uppercase",
                }}
              >
                {heading}
              </Box>
            ))}
          </Box>
        </Box>
        <Box component="tbody">
          {rows.map((row) => (
            <Box component="tr" key={row.path}>
              {[row.path, row.best, row.control, row.mobile, row.effort, row.caveat].map((cell, index) => (
                <Box
                  key={`${row.path}-${index}`}
                  component={index === 0 ? "th" : "td"}
                  scope={index === 0 ? "row" : undefined}
                  sx={{
                    p: 2,
                    textAlign: "left",
                    verticalAlign: "top",
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    color: index === 0 ? "text.primary" : "text.secondary",
                    fontWeight: index === 0 ? 800 : 500,
                    lineHeight: 1.55,
                  }}
                >
                  {cell}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function Timeline() {
  const theme = useTheme();
  const events = [
    {
      date: "2020",
      title: "Obsidian Sync launches",
      body: "Obsidian provides a hosted remote-vault service so local Markdown files can move between devices.",
    },
    {
      date: "Aug 2025",
      title: "Sync encryption upgrade",
      body: "Obsidian ships a cryptographic update later reviewed as part of independent security work.",
    },
    {
      date: "Feb 27, 2026",
      title: "Headless Sync becomes public",
      body: "Servers and CI systems can use official Sync and Publish services without running the Electron desktop app.",
    },
    {
      date: "May 2026",
      title: "Sync audit reports published",
      body: "Obsidian publishes Cure53 and Trail of Bits findings, remediations, and documented remaining trade-offs.",
    },
  ];

  return (
    <Stack spacing={0}>
      {events.map((event, index) => (
        <Stack key={event.date} direction="row" spacing={2.2}>
          <Stack alignItems="center">
            <Box
              sx={{
                width: 18,
                height: 18,
                mt: 0.4,
                borderRadius: "50%",
                bgcolor: index === events.length - 1 ? "primary.main" : "background.paper",
                border: `4px solid ${alpha(theme.palette.primary.main, 0.5)}`,
              }}
            />
            {index < events.length - 1 && (
              <Box sx={{ width: 2, minHeight: 94, flex: 1, bgcolor: alpha(theme.palette.primary.main, 0.28) }} />
            )}
          </Stack>
          <Box sx={{ pb: index < events.length - 1 ? 3 : 0 }}>
            <Chip size="small" label={event.date} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.12), color: "primary.main" }} />
            <Typography variant="h5" sx={{ mt: 1.2 }}>
              {event.title}
            </Typography>
            <Typography sx={{ mt: 0.8, maxWidth: 760, color: "text.secondary", lineHeight: 1.75 }}>
              {event.body}
            </Typography>
          </Box>
        </Stack>
      ))}
    </Stack>
  );
}

function LimitCards() {
  const theme = useTheme();
  const limits = [
    {
      icon: <CloudOffRounded />,
      title: "Not an on-prem Sync backend",
      body:
        "Obsidian Headless is a client. Obsidian’s official documentation still says there is no on-premises Obsidian Sync server.",
    },
    {
      icon: <DataObjectRounded />,
      title: "Not the full desktop app",
      body:
        "Headless currently exposes Sync and Publish services. It does not provide the complete Obsidian interface, graph, plugin runtime, or desktop CLI command surface.",
    },
    {
      icon: <KeyRounded />,
      title: "Subscriptions still apply",
      body:
        "Headless Sync requires an active Sync subscription. Headless Publish requires an active Publish subscription.",
    },
    {
      icon: <WarningAmberRounded />,
      title: "Open beta means operational caution",
      body:
        "Back up first, pin and test versions, and avoid running desktop Sync and Headless Sync against the same local vault on one device.",
    },
    {
      icon: <SecurityRounded />,
      title: "Encrypted remote does not mean zero metadata",
      body:
        "End-to-end encryption protects note contents, but Obsidian documents limited metadata and integrity trade-offs needed to operate Sync.",
    },
    {
      icon: <FolderCopyRounded />,
      title: "The server copy is plaintext after sync",
      body:
        "Once decrypted onto your server, the local vault folder is readable to accounts and processes that have filesystem access.",
    },
  ];

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
      {limits.map((item) => (
        <Card key={item.title} variant="outlined" sx={{ borderColor: theme.palette.divider }}>
          <CardContent sx={{ p: 2.7 }}>
            <Stack direction="row" spacing={1.5} alignItems="flex-start">
              <Box
                sx={{
                  flex: "0 0 auto",
                  display: "grid",
                  placeItems: "center",
                  width: 44,
                  height: 44,
                  borderRadius: 2.5,
                  color: "warning.main",
                  bgcolor: alpha(theme.palette.warning.main, 0.12),
                }}
              >
                {item.icon}
              </Box>
              <Box>
                <Typography variant="h6">{item.title}</Typography>
                <Typography sx={{ mt: 0.8, color: "text.secondary", lineHeight: 1.7 }}>
                  {item.body}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

function SourceLedger() {
  const theme = useTheme();

  return (
    <Stack spacing={1.2}>
      {SOURCES.map((source, index) => (
        <Paper
          key={source.url}
          elevation={0}
          sx={{
            p: 2,
            display: "grid",
            gridTemplateColumns: { xs: "auto 1fr", sm: "54px minmax(0,1fr) auto" },
            gap: 1.5,
            alignItems: "center",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box
            sx={{
              display: "grid",
              placeItems: "center",
              width: 38,
              height: 38,
              borderRadius: 2.2,
              bgcolor: alpha(theme.palette.primary.main, 0.11),
              color: "primary.main",
              fontWeight: 900,
            }}
          >
            {index + 1}
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 820 }}>{source.label}</Typography>
            <Typography sx={{ mt: 0.3, color: "text.secondary", lineHeight: 1.55 }}>
              {source.detail}
            </Typography>
          </Box>
          <Link
            href={source.url}
            target="_blank"
            rel="noreferrer"
            underline="hover"
            sx={{ gridColumn: { xs: "2", sm: "auto" }, fontWeight: 800 }}
          >
            Open source ↗
          </Link>
        </Paper>
      ))}
    </Stack>
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
          ? "radial-gradient(900px 560px at 88% -8%, rgba(124,58,237,.18), transparent), radial-gradient(720px 460px at -6% 10%, rgba(34,211,238,.08), transparent)"
          : "radial-gradient(900px 560px at 88% -8%, rgba(109,40,217,.13), transparent), radial-gradient(720px 460px at -6% 10%, rgba(14,116,144,.08), transparent)",
      }}
    >
      <Box
        component="header"
        sx={{
          borderTop: `1px solid ${theme.palette.divider}`,
          borderBottom: `1px solid ${theme.palette.divider}`,
          bgcolor: alpha(theme.palette.background.default, 0.78),
        }}
      >
        <Container maxWidth="lg" sx={{ py: { xs: 5, sm: 7 } }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={2}>
            <Box sx={{ maxWidth: 840 }}>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                <Chip icon={<TerminalRounded />} label="Official open beta" sx={{ bgcolor: alpha(theme.palette.primary.main, 0.13) }} />
                <Chip icon={<SyncRounded />} label="Sync + Publish" sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.12) }} />
              </Stack>
              <Typography variant="h2" sx={{ mt: 3, fontSize: { xs: 38, sm: 58, md: 72 } }}>
                Obsidian can live on a server now.
              </Typography>
              <Typography sx={{ mt: 2.5, maxWidth: 790, color: "text.secondary", fontSize: { xs: 17, sm: 20 }, lineHeight: 1.75 }}>
                The official Headless client can keep a vault synchronized on an always-on machine and feed backups, publishing pipelines, agents, and team tools. The key detail: it runs <em>on</em> your server, but it is not a self-hosted Obsidian Sync server.
              </Typography>
            </Box>
            <Tooltip title={dark ? "Switch to light mode" : "Switch to dark mode"}>
              <IconButton
                onClick={() => setMode(dark ? "light" : "dark")}
                color="inherit"
                aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
                sx={{ border: `1px solid ${theme.palette.divider}`, bgcolor: alpha(theme.palette.background.paper, 0.7) }}
              >
                {dark ? <LightModeRounded /> : <DarkModeRounded />}
              </IconButton>
            </Tooltip>
          </Stack>

          <Paper
            elevation={0}
            sx={{
              mt: 4,
              p: { xs: 2.2, sm: 2.7 },
              border: `1px solid ${alpha(theme.palette.primary.main, 0.34)}`,
              bgcolor: alpha(theme.palette.primary.main, 0.075),
            }}
          >
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2.2} divider={<Divider orientation="vertical" flexItem />}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="overline" color="primary.main" fontWeight={900}>Mental model</Typography>
                <Typography variant="h6">Headless is a client without a screen.</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="overline" color="secondary.main" fontWeight={900}>Control boundary</Typography>
                <Typography variant="h6">Official Sync remains an Obsidian-hosted service.</Typography>
              </Box>
            </Stack>
          </Paper>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 7, sm: 10 } }}>
        <Stack spacing={{ xs: 8, sm: 11 }}>
          <Section
            eyebrow="Start with the vocabulary"
            title="Three different things get called an “Obsidian server.”"
            intro="Most confusion disappears once you separate the machine running the client, the hosted Sync backend, and community self-hosted alternatives."
          >
            <MeaningCards />
          </Section>

          <Section
            eyebrow="Architecture"
            title="Official headless operation is not the same as self-hosting Sync."
            intro="Both approaches can place a vault on a server. The ownership boundary, compatibility, maintenance burden, and failure modes are different."
          >
            <ArchitectureExplorer />
          </Section>

          <Section
            eyebrow="What changed"
            title="Obsidian moved from desktop-only operation to a real server client."
            intro="Before Headless, official automation usually meant keeping the desktop app running, wrapping Electron in a virtual display, or switching to an unofficial sync path."
          >
            <Timeline />
          </Section>

          <Section
            eyebrow="Practical uses"
            title="The server becomes a bridge between your vault and other systems."
            intro="Choose a goal to see the data flow, the central command, and the most important operational warning."
          >
            <UseCaseExplorer />
          </Section>

          <Section
            eyebrow="Setup sketch"
            title="The official path is intentionally small."
            intro="Install the standalone package, authenticate, connect a local folder to a remote vault, then run one-time or continuous sync."
          >
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1.08fr .92fr" }, gap: 2 }}>
              <CodeBlock
                code={`# Requires Node.js 22 or later
npm install -g obsidian-headless

# Sign in to your Obsidian account
ob login

# See available remote vaults
ob sync-list-remote

# Connect the current folder to a remote vault
mkdir -p ~/vaults/knowledge
cd ~/vaults/knowledge
ob sync-setup --vault "Knowledge"

# Keep the server copy current
ob sync --continuous`}
                label="headless sync"
              />
              <Stack spacing={2}>
                {[
                  {
                    icon: <ScheduleRounded />,
                    title: "One-time or continuous",
                    body: "Run `ob sync` for a single pass or add `--continuous` to watch for changes.",
                  },
                  {
                    icon: <SyncRounded />,
                    title: "Choose the direction",
                    body: "Bidirectional is the default; pull-only and mirror-remote modes support safer downstream systems.",
                  },
                  {
                    icon: <LockRounded />,
                    title: "Same Sync protections",
                    body: "Headless Sync uses the same encryption and privacy model as the desktop Sync client.",
                  },
                ].map((item) => (
                  <Paper
                    key={item.title}
                    elevation={0}
                    sx={{ p: 2.2, border: `1px solid ${theme.palette.divider}` }}
                  >
                    <Stack direction="row" spacing={1.5}>
                      <Box sx={{ color: "primary.main" }}>{item.icon}</Box>
                      <Box>
                        <Typography fontWeight={820}>{item.title}</Typography>
                        <Typography sx={{ mt: 0.5, color: "text.secondary", lineHeight: 1.65 }}>
                          {item.body}
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Box>
          </Section>

          <Section
            eyebrow="Choose a path"
            title="The best “server” depends on which control you actually need."
            intro="Do you need an official always-on client, ownership of the sync backend, ordinary folder replication, or a developer-oriented version-control workflow?"
          >
            <ComparisonTable />
          </Section>

          <Section
            eyebrow="Limits and cautions"
            title="Headless solves the missing-screen problem—not every server problem."
            intro="It is a focused bridge to Obsidian services. Treat beta software, decrypted server files, subscriptions, and the official hosting boundary as explicit design constraints."
          >
            <LimitCards />
          </Section>

          <Section
            eyebrow="Bottom line"
            title="Use Headless when you want official Sync on an unattended machine."
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3.5 },
                border: `1px solid ${alpha(theme.palette.success.main, 0.34)}`,
                bgcolor: alpha(theme.palette.success.main, 0.075),
              }}
            >
              <Stack direction={{ xs: "column", md: "row" }} spacing={2.5} alignItems={{ xs: "flex-start", md: "center" }}>
                <Box
                  sx={{
                    display: "grid",
                    placeItems: "center",
                    width: 58,
                    height: 58,
                    flex: "0 0 auto",
                    borderRadius: 3,
                    bgcolor: alpha(theme.palette.success.main, 0.14),
                    color: "success.main",
                  }}
                >
                  <CheckCircleRounded fontSize="large" />
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontSize: { xs: 25, sm: 31 } }}>
                    The new capability is an official server-side client, not an official server you host.
                  </Typography>
                  <Typography sx={{ mt: 1.2, maxWidth: 900, color: "text.secondary", lineHeight: 1.8 }}>
                    That is enough to unlock continuous vault mirrors, remote backups, automated publishing, and agent workflows while staying inside Obsidian Sync. Choose a community self-hosted stack only when owning the backend matters more than official compatibility and lower maintenance.
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Section>

          <Section
            eyebrow="Sources"
            title="Research ledger and freshness"
            intro={`Claims were checked against official Obsidian documentation and representative community tooling. Research cutoff: ${RESEARCH_DATE}. Product status, pricing, limits, and beta behavior may change.`}
          >
            <SourceLedger />
          </Section>
        </Stack>
      </Container>
    </Box>
  );
}

export default function ObsidianServersExplainer() {
  const [mode, setMode] = useState<Mode>("dark");
  const theme = useAppTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ExplainerShell mode={mode} setMode={setMode} />
    </ThemeProvider>
  );
}
