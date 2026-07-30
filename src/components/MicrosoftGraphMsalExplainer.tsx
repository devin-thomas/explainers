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
  Toolbar,
  Tooltip,
  Typography,
  alpha,
  createTheme,
  useTheme,
} from "@mui/material";
import {
  AdminPanelSettingsRounded,
  ApiRounded,
  ArrowForwardRounded,
  CheckCircleRounded,
  CloudRounded,
  CodeRounded,
  ContentCopyRounded,
  DarkModeRounded,
  DevicesRounded,
  HubRounded,
  KeyRounded,
  LightModeRounded,
  LockRounded,
  LoginRounded,
  MailRounded,
  PersonRounded,
  SecurityRounded,
  StorageRounded,
  SyncRounded,
  WarningAmberRounded,
} from "@mui/icons-material";

/* =============================================================================
   MICROSOFT GRAPH & MSAL — Identity, tokens, permissions, and API calls
   Dark by default, mobile-first, Material UI, green visual system, no serif type.
   ============================================================================= */

type Mode = "dark" | "light";
type FlowId = "browser" | "device" | "service";
type TokenId = "id" | "access" | "cache";
type PermissionId = "delegated" | "application";

function useAppTheme(mode: Mode) {
  return useMemo(
    () =>
      createTheme({
        palette:
          mode === "dark"
            ? {
                mode: "dark",
                primary: { main: "#6EE7A8", contrastText: "#052E1A" },
                secondary: { main: "#BEF264", contrastText: "#1A2E05" },
                background: { default: "#07110D", paper: "#0F1D17" },
                text: { primary: "#F2FBF5", secondary: "#A8BDAF" },
                success: { main: "#86EFAC" },
                warning: { main: "#FDE68A" },
                divider: "rgba(220,252,231,0.12)",
              }
            : {
                mode: "light",
                primary: { main: "#137A45", contrastText: "#FFFFFF" },
                secondary: { main: "#4D7C0F", contrastText: "#FFFFFF" },
                background: { default: "#F3FBF6", paper: "#FFFFFF" },
                text: { primary: "#102019", secondary: "#53665B" },
                success: { main: "#15803D" },
                warning: { main: "#A16207" },
                divider: "rgba(16,32,25,0.12)",
              },
        shape: { borderRadius: 18 },
        typography: {
          fontFamily:
            'Inter, Roboto, "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
          h1: { fontWeight: 850, letterSpacing: "-0.05em", lineHeight: 0.96 },
          h2: { fontWeight: 800, letterSpacing: "-0.035em" },
          h3: { fontWeight: 760, letterSpacing: "-0.025em" },
          h4: { fontWeight: 740, letterSpacing: "-0.02em" },
          h5: { fontWeight: 720 },
          h6: { fontWeight: 710 },
          button: { textTransform: "none", fontWeight: 780 },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              "html, body": {
                fontFamily:
                  'Inter, Roboto, "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
              },
              "button, input, textarea, select": { fontFamily: "inherit" },
              code: {
                fontFamily:
                  '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, ui-monospace, monospace',
              },
            },
          },
          MuiButton: {
            styleOverrides: { root: { borderRadius: 999, minHeight: 42 } },
          },
          MuiCard: {
            styleOverrides: { root: { backgroundImage: "none" } },
          },
          MuiChip: {
            styleOverrides: { root: { fontWeight: 720 } },
          },
          MuiAppBar: {
            styleOverrides: { root: { backgroundImage: "none" } },
          },
        },
      }),
    [mode]
  );
}

const FLOWS: Record<
  FlowId,
  {
    label: string;
    useWhen: string;
    identity: string;
    mechanism: string;
    permission: string;
    caution: string;
    icon: React.ReactNode;
  }
> = {
  browser: {
    label: "Interactive app",
    useWhen: "A web, desktop, or mobile app can open a browser for sign-in.",
    identity: "A signed-in user",
    mechanism: "Authorization code flow with PKCE",
    permission: "Delegated permissions",
    caution: "Do not place a client secret in browser or mobile code.",
    icon: <LoginRounded />,
  },
  device: {
    label: "CLI or headless tool",
    useWhen: "The app cannot host a normal sign-in page, but a user is present.",
    identity: "A signed-in user",
    mechanism: "Device authorization flow",
    permission: "Delegated permissions",
    caution: "The user signs in on a separate browser using the shown code.",
    icon: <DevicesRounded />,
  },
  service: {
    label: "Background service",
    useWhen: "A daemon or scheduled job must run with no user present.",
    identity: "The application itself",
    mechanism: "Client credentials flow",
    permission: "Application permissions",
    caution: "Use a certificate or protected secret and expect admin consent.",
    icon: <CloudRounded />,
  },
};

const TOKENS: Record<
  TokenId,
  { label: string; purpose: string; destination: string; rule: string; icon: React.ReactNode }
> = {
  id: {
    label: "ID token",
    purpose: "Tells the client application who signed in.",
    destination: "Your application",
    rule: "Use it for sign-in context—not as the credential for Microsoft Graph.",
    icon: <PersonRounded />,
  },
  access: {
    label: "Access token",
    purpose: "Authorizes a call to a protected API for a specific audience and permission set.",
    destination: "Microsoft Graph",
    rule: "Send it as a bearer token in the Authorization header.",
    icon: <KeyRounded />,
  },
  cache: {
    label: "MSAL token cache",
    purpose: "Stores account and token state so MSAL can renew access without unnecessary prompts.",
    destination: "Your application storage",
    rule: "Ask MSAL for a token silently before starting another interactive sign-in.",
    icon: <StorageRounded />,
  },
};

const PERMISSIONS: Record<
  PermissionId,
  {
    label: string;
    actor: string;
    example: string;
    consent: string;
    limit: string;
    icon: React.ReactNode;
  }
> = {
  delegated: {
    label: "Delegated",
    actor: "The app acts with a signed-in user.",
    example: "Mail.Read can read mail the signed-in user is allowed to access.",
    consent: "The user or an administrator consents, depending on policy and sensitivity.",
    limit: "The app cannot exceed the user's own access.",
    icon: <PersonRounded />,
  },
  application: {
    label: "Application",
    actor: "The app acts as itself with no user present.",
    example: "Mail.Read application permission can reach mailboxes across the organization.",
    consent: "Administrator consent is required.",
    limit: "The permission is powerful; constrain it with policy and least privilege.",
    icon: <AdminPanelSettingsRounded />,
  },
};

const DEVICE_CODE_PYTHON = `import msal
import requests

SCOPES = ["Mail.Read"]

app = msal.PublicClientApplication(
    client_id=CLIENT_ID,
    authority="https://login.microsoftonline.com/common",
    token_cache=cache,
)

accounts = app.get_accounts()
result = (
    app.acquire_token_silent(SCOPES, account=accounts[0])
    if accounts
    else None
)

if not result:
    flow = app.initiate_device_flow(scopes=SCOPES)
    print(flow["message"])
    result = app.acquire_token_by_device_flow(flow)

response = requests.get(
    "https://graph.microsoft.com/v1.0/me/messages?$top=10",
    headers={"Authorization": f"Bearer {result['access_token']}"},
    timeout=30,
)
response.raise_for_status()
messages = response.json()["value"]`;

const GRAPH_REQUEST = `GET https://graph.microsoft.com/v1.0/me/messages
    ?$select=subject,from,receivedDateTime
    &$orderby=receivedDateTime desc
    &$top=10

Authorization: Bearer <access_token>
Accept: application/json`;

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
        bgcolor: dark ? "#030A07" : "#EAF5EE",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 1.5, py: 0.8, borderBottom: `1px solid ${theme.palette.divider}` }}
      >
        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 760 }}>
          {label ?? "code"}
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
          fontFamily:
            '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, ui-monospace, monospace',
          fontSize: { xs: 12.5, sm: 13.5 },
          lineHeight: 1.72,
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
        sx={{ color: "primary.main", fontWeight: 880, letterSpacing: ".16em" }}
      >
        {eyebrow}
      </Typography>
      <Typography variant="h2" sx={{ mt: 0.5, fontSize: { xs: 30, sm: 40 } }}>
        {title}
      </Typography>
      {intro && (
        <Typography
          sx={{
            mt: 1.5,
            maxWidth: 800,
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

function ResponsibilityCards() {
  const theme = useTheme();
  const cards = [
    {
      name: "MSAL",
      eyebrow: "Identity client",
      icon: <KeyRounded fontSize="large" />,
      color: theme.palette.primary.main,
      verb: "gets tokens",
      text: "MSAL talks to the Microsoft identity platform. It starts sign-in, requests consent, acquires tokens, caches them, and tries silent renewal.",
      does: ["Sign users in", "Acquire access tokens", "Maintain token cache"],
      doesNot: "It does not read mail, calendars, files, or users by itself.",
    },
    {
      name: "Microsoft Graph",
      eyebrow: "Data API",
      icon: <HubRounded fontSize="large" />,
      color: theme.palette.secondary.main,
      verb: "uses tokens",
      text: "Microsoft Graph is the API surface for Microsoft 365 and Microsoft Entra data. It receives an access token and evaluates what that token permits.",
      does: ["Read and send mail", "Work with files and calendars", "Query users and groups"],
      doesNot: "It does not run your app's sign-in interface or token cache.",
    },
  ];

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
      {cards.map((item) => (
        <Card
          key={item.name}
          variant="outlined"
          sx={{ borderColor: alpha(item.color, 0.38), position: "relative", overflow: "hidden" }}
        >
          <Box sx={{ position: "absolute", inset: "0 auto auto 0", width: "100%", height: 4, bgcolor: item.color }} />
          <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  display: "grid",
                  placeItems: "center",
                  width: 54,
                  height: 54,
                  borderRadius: 3,
                  bgcolor: alpha(item.color, 0.14),
                  color: item.color,
                }}
              >
                {item.icon}
              </Box>
              <Box>
                <Typography variant="overline" sx={{ color: item.color, fontWeight: 850 }}>
                  {item.eyebrow}
                </Typography>
                <Typography variant="h3" sx={{ fontSize: 34 }}>
                  {item.name} <Box component="span" sx={{ color: item.color }}>{item.verb}</Box>
                </Typography>
              </Box>
            </Stack>
            <Typography sx={{ mt: 2.5, color: "text.secondary", lineHeight: 1.75 }}>
              {item.text}
            </Typography>
            <Stack spacing={1.1} sx={{ mt: 2.5 }}>
              {item.does.map((line) => (
                <Stack key={line} direction="row" spacing={1} alignItems="center">
                  <CheckCircleRounded fontSize="small" sx={{ color: item.color }} />
                  <Typography fontWeight={680}>{line}</Typography>
                </Stack>
              ))}
            </Stack>
            <Paper
              elevation={0}
              sx={{ mt: 2.5, p: 1.6, bgcolor: alpha(item.color, 0.08), border: `1px solid ${alpha(item.color, 0.18)}` }}
            >
              <Typography sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                <Box component="strong" sx={{ color: "text.primary" }}>Boundary:</Box> {item.doesNot}
              </Typography>
            </Paper>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

function TokenExplorer() {
  const theme = useTheme();
  const [active, setActive] = useState<TokenId>("access");
  const token = TOKENS[active];

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(220px,.7fr) minmax(0,1.3fr)" }, gap: 2 }}>
      <Stack spacing={1}>
        {(Object.entries(TOKENS) as [TokenId, (typeof TOKENS)[TokenId]][]).map(([id, item]) => (
          <Button
            key={id}
            variant={active === id ? "contained" : "outlined"}
            onClick={() => setActive(id)}
            startIcon={item.icon}
            sx={{ justifyContent: "flex-start", px: 2, py: 1.4, borderRadius: 3 }}
          >
            {item.label}
          </Button>
        ))}
      </Stack>
      <Card variant="outlined" sx={{ borderColor: theme.palette.divider }}>
        <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                display: "grid",
                placeItems: "center",
                width: 48,
                height: 48,
                borderRadius: 2.5,
                bgcolor: alpha(theme.palette.primary.main, 0.13),
                color: "primary.main",
              }}
            >
              {token.icon}
            </Box>
            <Box>
              <Typography variant="h5">{token.label}</Typography>
              <Typography color="text.secondary">Destination: {token.destination}</Typography>
            </Box>
          </Stack>
          <Typography sx={{ mt: 2.5, color: "text.secondary", lineHeight: 1.8 }}>
            {token.purpose}
          </Typography>
          <Paper
            elevation={0}
            sx={{
              mt: 2.5,
              p: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.08),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.24)}`,
            }}
          >
            <Typography fontWeight={760}>{token.rule}</Typography>
          </Paper>
        </CardContent>
      </Card>
    </Box>
  );
}

function PermissionExplorer() {
  const theme = useTheme();
  const [active, setActive] = useState<PermissionId>("delegated");
  const permission = PERMISSIONS[active];

  return (
    <Card variant="outlined" sx={{ borderColor: theme.palette.divider }}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography variant="h5">Who is the app acting as?</Typography>
        <Typography sx={{ mt: 0.75, color: "text.secondary" }}>
          This decision controls the permission type, consent model, and token flow.
        </Typography>
        <Box sx={{ mt: 2.5, display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1 }}>
          {(Object.entries(PERMISSIONS) as [PermissionId, (typeof PERMISSIONS)[PermissionId]][]).map(([id, item]) => (
            <Button
              key={id}
              variant={active === id ? "contained" : "outlined"}
              onClick={() => setActive(id)}
              startIcon={item.icon}
              sx={{ justifyContent: "flex-start", px: 2, py: 1.4, borderRadius: 3 }}
            >
              {item.label} permissions
            </Button>
          ))}
        </Box>
        <Paper
          elevation={0}
          sx={{
            mt: 2.5,
            p: { xs: 2.25, sm: 3 },
            border: `1px solid ${alpha(theme.palette.primary.main, 0.36)}`,
            bgcolor: alpha(theme.palette.primary.main, 0.08),
          }}
        >
          <Stack direction={{ xs: "column", md: "row" }} spacing={2.5}>
            <Box sx={{ flex: 1 }}>
              <Chip label={`${permission.label} permission`} size="small" />
              <Typography variant="h5" sx={{ mt: 1.5 }}>{permission.actor}</Typography>
              <Typography sx={{ mt: 1, color: "text.secondary", lineHeight: 1.7 }}>
                {permission.example}
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" } }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="overline" color="primary.main" fontWeight={850}>Consent</Typography>
              <Typography sx={{ lineHeight: 1.65 }}>{permission.consent}</Typography>
              <Typography variant="overline" color="secondary.main" fontWeight={850} sx={{ display: "block", mt: 1.5 }}>
                Security boundary
              </Typography>
              <Typography sx={{ lineHeight: 1.65 }}>{permission.limit}</Typography>
            </Box>
          </Stack>
        </Paper>
      </CardContent>
    </Card>
  );
}

function FlowExplorer() {
  const theme = useTheme();
  const [active, setActive] = useState<FlowId>("device");
  const flow = FLOWS[active];

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: ".8fr 1.2fr" }, gap: 2 }}>
      <Stack spacing={1}>
        {(Object.entries(FLOWS) as [FlowId, (typeof FLOWS)[FlowId]][]).map(([id, item]) => (
          <Button
            key={id}
            variant={active === id ? "contained" : "outlined"}
            onClick={() => setActive(id)}
            startIcon={item.icon}
            sx={{ justifyContent: "flex-start", px: 2, py: 1.5, borderRadius: 3 }}
          >
            {item.label}
          </Button>
        ))}
      </Stack>
      <Card variant="outlined" sx={{ borderColor: theme.palette.divider }}>
        <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                display: "grid",
                placeItems: "center",
                width: 48,
                height: 48,
                borderRadius: 2.5,
                bgcolor: alpha(theme.palette.primary.main, 0.13),
                color: "primary.main",
              }}
            >
              {flow.icon}
            </Box>
            <Box>
              <Typography variant="h5">{flow.label}</Typography>
              <Typography color="text.secondary">{flow.useWhen}</Typography>
            </Box>
          </Stack>
          <Box sx={{ mt: 2.5, display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1.5 }}>
            {[
              ["Identity", flow.identity],
              ["Flow", flow.mechanism],
              ["Permission type", flow.permission],
            ].map(([label, value]) => (
              <Paper key={label} elevation={0} sx={{ p: 1.7, bgcolor: alpha(theme.palette.primary.main, 0.07) }}>
                <Typography variant="overline" color="primary.main" fontWeight={850}>{label}</Typography>
                <Typography fontWeight={720}>{value}</Typography>
              </Paper>
            ))}
          </Box>
          <Stack direction="row" spacing={1.2} alignItems="flex-start" sx={{ mt: 2.5, color: "warning.main" }}>
            <WarningAmberRounded fontSize="small" sx={{ mt: 0.2 }} />
            <Typography sx={{ color: "text.secondary", lineHeight: 1.65 }}>{flow.caution}</Typography>
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
          ? "radial-gradient(900px 520px at 88% -8%, rgba(110,231,168,.14), transparent), radial-gradient(780px 460px at -6% 14%, rgba(190,242,100,.08), transparent)"
          : "radial-gradient(900px 520px at 88% -8%, rgba(19,122,69,.12), transparent), radial-gradient(780px 460px at -6% 14%, rgba(77,124,15,.08), transparent)",
      }}
    >
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: alpha(theme.palette.background.default, 0.92),
          borderBottom: `1px solid ${theme.palette.divider}`,
          color: "text.primary",
          backdropFilter: "blur(14px)",
        }}
      >
        <Toolbar sx={{ gap: 1.5 }}>
          <Box
            sx={{
              display: "grid",
              placeItems: "center",
              width: 38,
              height: 38,
              borderRadius: 2.5,
              bgcolor: alpha(theme.palette.primary.main, 0.14),
              color: "primary.main",
            }}
          >
            <HubRounded />
          </Box>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Microsoft Graph & MSAL</Typography>
          <Chip
            label="identity + API"
            size="small"
            sx={{
              display: { xs: "none", sm: "inline-flex" },
              bgcolor: alpha(theme.palette.primary.main, 0.14),
              color: "primary.main",
            }}
          />
          <Tooltip title={dark ? "Switch to light mode" : "Switch to dark mode"}>
            <IconButton
              onClick={() => setMode(dark ? "light" : "dark")}
              color="inherit"
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {dark ? <LightModeRounded /> : <DarkModeRounded />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Box component="header" sx={{ pt: { xs: 7, sm: 10 }, pb: { xs: 6, sm: 9 } }}>
        <Container maxWidth="lg">
          <Stack direction="row" flexWrap="wrap" gap={1}>
            <Chip icon={<KeyRounded />} label="MSAL acquires tokens" sx={{ bgcolor: alpha(theme.palette.primary.main, 0.13) }} />
            <Chip icon={<ApiRounded />} label="Graph exposes data" sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.13) }} />
          </Stack>
          <Typography variant="h1" sx={{ mt: 3, maxWidth: 920, fontSize: { xs: 48, sm: 72, md: 92 } }}>
            Microsoft Graph & MSAL
          </Typography>
          <Typography variant="h2" sx={{ mt: 2, maxWidth: 920, fontSize: { xs: 32, sm: 48, md: 60 } }}>
            One opens the door.
            <Box component="span" sx={{ display: "block", color: "secondary.main" }}>
              The other reaches the data.
            </Box>
          </Typography>
          <Typography sx={{ mt: 3, maxWidth: 800, color: "text.secondary", fontSize: { xs: 18, sm: 21 }, lineHeight: 1.75 }}>
            MSAL handles the identity conversation with Microsoft Entra ID. Microsoft Graph is the API your application calls afterward to work with mail, calendars, files, users, groups, and other Microsoft 365 resources.
          </Typography>
          <Paper
            elevation={0}
            sx={{
              mt: 4,
              maxWidth: 840,
              p: { xs: 2, sm: 2.5 },
              border: `1px solid ${theme.palette.divider}`,
              bgcolor: alpha(theme.palette.background.paper, 0.72),
            }}
          >
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} divider={<Divider orientation="vertical" flexItem />}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="overline" color="primary.main" fontWeight={880}>MSAL question</Typography>
                <Typography variant="h6">“May this app receive a token?”</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="overline" color="secondary.main" fontWeight={880}>Graph question</Typography>
                <Typography variant="h6">“What may this token do?”</Typography>
              </Box>
            </Stack>
          </Paper>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 10 }}>
        <Stack spacing={{ xs: 8, sm: 11 }}>
          <Section
            eyebrow="The mental model"
            title="Identity first, API second"
            intro="Microsoft Graph and MSAL are often introduced together because a protected API needs a token. They are partners, not interchangeable layers."
          >
            <ResponsibilityCards />
          </Section>

          <Section
            eyebrow="The complete trip"
            title="From app registration to Microsoft 365 data"
            intro="Every successful request crosses the same major boundaries, even when the programming language or user interface changes."
          >
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(5, 1fr)" }, gap: 1.5 }}>
              {[
                { icon: <LockRounded />, title: "1. Register", text: "Microsoft Entra gives the app a client ID and stores its redirect URIs and permissions." },
                { icon: <LoginRounded />, title: "2. Sign in", text: "MSAL starts the appropriate OAuth or OpenID Connect flow." },
                { icon: <SecurityRounded />, title: "3. Consent", text: "The user or administrator approves the requested access when required." },
                { icon: <KeyRounded />, title: "4. Token", text: "MSAL returns and caches an access token intended for Microsoft Graph." },
                { icon: <ApiRounded />, title: "5. Call Graph", text: "The app sends the token and receives only the data the permission allows." },
              ].map((step, index) => (
                <Card key={step.title} variant="outlined" sx={{ borderColor: theme.palette.divider }}>
                  <CardContent sx={{ p: 2.35 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Box sx={{ color: index % 2 === 0 ? "primary.main" : "secondary.main" }}>{step.icon}</Box>
                      {index < 4 && (
                        <ArrowForwardRounded sx={{ display: { xs: "none", md: "block" }, color: "text.secondary", opacity: 0.42 }} />
                      )}
                    </Stack>
                    <Typography variant="h6" sx={{ mt: 2 }}>{step.title}</Typography>
                    <Typography sx={{ mt: 1, color: "text.secondary", lineHeight: 1.65 }}>{step.text}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Section>

          <Section
            eyebrow="Token anatomy"
            title="Not every token does the same job"
            intro="The most common integration bug is treating any token-shaped string as if it belongs in a Graph request."
          >
            <TokenExplorer />
          </Section>

          <Section
            eyebrow="Authorization"
            title="Delegated versus application permissions"
            intro="Choose the identity the app represents before choosing scopes. That decision is more important than the SDK or language."
          >
            <PermissionExplorer />
            <Box sx={{ mt: 2, display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3,1fr)" }, gap: 2 }}>
              {[
                { name: "User.Read", text: "Read the signed-in user's basic profile. A common first delegated permission." },
                { name: "Mail.Read", text: "Read mail without sending or modifying it. Appropriate for a read-only importer." },
                { name: "Mail.ReadWrite", text: "Read and change mail. Do not request it when Mail.Read is enough." },
              ].map((item) => (
                <Card key={item.name} variant="outlined" sx={{ borderColor: theme.palette.divider }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Typography variant="h6" sx={{ fontFamily: '"SFMono-Regular", Consolas, ui-monospace, monospace', color: "primary.main" }}>
                      {item.name}
                    </Typography>
                    <Typography sx={{ mt: 1, color: "text.secondary", lineHeight: 1.65 }}>{item.text}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Section>

          <Section
            eyebrow="Pick the flow"
            title="The app shape determines how MSAL signs in"
            intro="Device code is excellent for local command-line tooling, but it is not the universal default. Match the flow to whether a user is present and whether the client can safely hold credentials."
          >
            <FlowExplorer />
          </Section>

          <Section
            eyebrow="A real request"
            title="What a Microsoft Graph call actually looks like"
            intro="Graph uses a single service root, versioned endpoints, resource paths, OData query options, and a bearer access token."
          >
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1.05fr .95fr" }, gap: 2 }}>
              <CodeBlock label="HTTP — latest 10 messages" code={GRAPH_REQUEST} />
              <Stack spacing={1.5}>
                {[
                  { label: "Service root", value: "https://graph.microsoft.com", text: "The Microsoft Graph host." },
                  { label: "Version", value: "/v1.0", text: "The stable API surface. Use /beta only when you accept preview change risk." },
                  { label: "Resource", value: "/me/messages", text: "The signed-in user's mailbox messages, so this is a delegated scenario." },
                  { label: "Query", value: "$select, $orderby, $top", text: "Ask for only the fields and rows the app needs." },
                ].map((item) => (
                  <Card key={item.label} variant="outlined" sx={{ borderColor: theme.palette.divider }}>
                    <CardContent sx={{ p: 2.2 }}>
                      <Typography variant="overline" color="primary.main" fontWeight={850}>{item.label}</Typography>
                      <Typography sx={{ fontFamily: '"SFMono-Regular", Consolas, ui-monospace, monospace', fontWeight: 760, wordBreak: "break-word" }}>
                        {item.value}
                      </Typography>
                      <Typography sx={{ mt: 0.6, color: "text.secondary", lineHeight: 1.55 }}>{item.text}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Box>
          </Section>

          <Section
            eyebrow="Practical pattern"
            title="A local Outlook importer with device-code sign-in"
            intro="This is the basic shape behind a read-only tool that lets a user sign in, then imports a small set of messages. Production code still needs durable encrypted cache storage, structured error handling, pagination, throttling handling, and logging."
          >
            <CodeBlock label="Python — MSAL then Microsoft Graph" code={DEVICE_CODE_PYTHON} />
            <Box sx={{ mt: 2, display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3,1fr)" }, gap: 2 }}>
              {[
                { icon: <SyncRounded />, title: "Try silent first", text: "Reuse the cached account and token state before prompting the user again." },
                { icon: <MailRounded />, title: "Request Mail.Read", text: "A read-only importer does not need permission to send, delete, or modify messages." },
                { icon: <SecurityRounded />, title: "Treat tokens as secrets", text: "Keep token caches out of Git, logs, screenshots, and client-visible diagnostics." },
              ].map((item) => (
                <Card key={item.title} variant="outlined" sx={{ borderColor: theme.palette.divider }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ color: "primary.main" }}>{item.icon}</Box>
                    <Typography variant="h6" sx={{ mt: 1.5 }}>{item.title}</Typography>
                    <Typography sx={{ mt: 0.8, color: "text.secondary", lineHeight: 1.65 }}>{item.text}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Section>

          <Section
            eyebrow="Failure patterns"
            title="The mistakes that make Graph feel harder than it is"
          >
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
              {[
                { good: false, title: "Sending an ID token to Graph", text: "Graph expects an access token whose audience and permissions match the API." },
                { good: false, title: "Putting a client secret in a public client", text: "Browser, mobile, desktop, and CLI code cannot keep an embedded secret confidential." },
                { good: false, title: "Requesting broad permissions first", text: "Start with the least privilege that supports the feature, then expand deliberately." },
                { good: false, title: "Ignoring the MSAL cache", text: "Repeated interactive prompts create a poor experience and unnecessary auth traffic." },
                { good: false, title: "Assuming consent equals access forever", text: "Conditional Access, admin policy, revoked consent, password changes, and account state can still block a request." },
                { good: false, title: "Treating /beta as production-stable", text: "Preview APIs can change. Prefer /v1.0 unless a required feature exists only in beta." },
                { good: true, title: "Inspect the actual Graph error", text: "Status code, response body, request-id, and Retry-After often identify the real permission or throttling problem." },
                { good: true, title: "Separate identity from data logic", text: "Keep token acquisition in one boundary and Graph request/response handling in another." },
              ].map((item) => (
                <Card
                  key={item.title}
                  variant="outlined"
                  sx={{ borderColor: alpha(item.good ? theme.palette.success.main : theme.palette.warning.main, 0.34) }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Stack direction="row" spacing={1.5} alignItems="flex-start">
                      <Box sx={{ color: item.good ? "success.main" : "warning.main", mt: 0.2 }}>
                        {item.good ? <CheckCircleRounded /> : <WarningAmberRounded />}
                      </Box>
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
            title="The nouns worth keeping straight"
          >
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
              {[
                { term: "Microsoft Entra ID", definition: "The identity and authorization platform that signs in users and issues tokens." },
                { term: "App registration", definition: "The configuration record for a client ID, redirect URIs, supported accounts, credentials, and requested permissions." },
                { term: "MSAL", definition: "The language-specific client library that performs supported token flows and token caching." },
                { term: "Microsoft Graph", definition: "The REST API surface for Microsoft 365 and Microsoft Entra resources." },
                { term: "Scope", definition: "A delegated permission requested on behalf of a user, such as Mail.Read." },
                { term: "Application permission", definition: "An app-only privilege used without a signed-in user and granted by an administrator." },
              ].map((item) => (
                <Card key={item.term} variant="outlined" sx={{ borderColor: theme.palette.divider }}>
                  <CardContent sx={{ p: 2.35 }}>
                    <Typography variant="h6" color="primary.main">{item.term}</Typography>
                    <Typography sx={{ mt: 0.8, color: "text.secondary", lineHeight: 1.65 }}>{item.definition}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Section>

          <Box component="footer" sx={{ pt: 2, pb: 4 }}>
            <Divider sx={{ mb: 3 }} />
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", md: "center" }}
            >
              <Box>
                <Typography variant="h6">The one-line takeaway</Typography>
                <Typography sx={{ mt: 0.5, color: "text.secondary", maxWidth: 720 }}>
                  Use <Box component="code" sx={{ color: "primary.main" }}>MSAL</Box> to acquire and cache the right access token; use that token with <Box component="code" sx={{ color: "secondary.main" }}>Microsoft Graph</Box> to request only the Microsoft 365 data the app is authorized to use.
                </Typography>
              </Box>
              <Stack direction="row" gap={1} flexWrap="wrap">
                <Button
                  component="a"
                  href="https://learn.microsoft.com/en-us/entra/identity-platform/msal-overview"
                  target="_blank"
                  rel="noreferrer"
                  variant="outlined"
                  startIcon={<KeyRounded />}
                >
                  MSAL Docs
                </Button>
                <Button
                  component="a"
                  href="https://learn.microsoft.com/en-us/graph/overview"
                  target="_blank"
                  rel="noreferrer"
                  variant="outlined"
                  startIcon={<ApiRounded />}
                >
                  Graph Docs
                </Button>
                <Button
                  component="a"
                  href="https://learn.microsoft.com/en-us/graph/permissions-overview"
                  target="_blank"
                  rel="noreferrer"
                  variant="outlined"
                  startIcon={<CodeRounded />}
                >
                  Permissions
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default function MicrosoftGraphMsalExplainer() {
  const [mode, setMode] = useState<Mode>("dark");
  const theme = useAppTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ExplainerShell mode={mode} setMode={setMode} />
    </ThemeProvider>
  );
}
