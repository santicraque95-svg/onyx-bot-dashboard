const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

const CLIENT_ID = "1546280417949253703";

const INVITE_URL =
  `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}` +
  `&permissions=8` +
  `&integration_type=0` +
  `&scope=bot%20applications.commands`;

// Todos os comandos do bot
const commands = [
  {
    name: "slowmode",
    description: "Define o slowmode de um canal."
  },
  {
    name: "socials",
    description: "Envia as redes sociais da Onyx e-Sports."
  },
  {
    name: "staff",
    description: "Envia o painel da Staff da Onyx e-Sports."
  },
  {
    name: "tickets",
    description: "Envia o painel de tickets da Onyx e-Sports."
  },
  {
    name: "tryout",
    description: "Abre um tryout de Rocket League."
  },
  {
    name: "votacao",
    description: "Cria uma votação."
  },
  {
    name: "parceria",
    description: "Envia o painel de candidaturas para parcerias."
  },
  {
    name: "recrutamento",
    description: "Envia o painel de recrutamento de jogadores."
  },
  {
    name: "recrutamento-staff",
    description: "Envia o painel de recrutamento para Staff."
  },
  {
    name: "regras",
    description: "Envia as regras da Onyx e-Sports."
  },
  {
    name: "resultado",
    description: "Regista o resultado de uma partida."
  },
  {
    name: "scrim",
    description: "Procura/agenda um scrim de Rocket League."
  },
  {
    name: "site",
    description: "Envia o site oficial da Onyx e-Sports."
  },
  {
    name: "anunciar",
    description: "Publica um anúncio da Onyx e-Sports."
  },
  {
    name: "booster",
    description: "Envia o painel de benefícios dos Boosters da Onyx e-Sports."
  },
  {
    name: "cargo",
    description: "Adiciona ou remove um cargo de um membro."
  },
  {
    name: "info",
    description: "Envia informações sobre a Onyx e-Sports."
  },
  {
    name: "manutencao",
    description: "Anuncia uma manutenção do servidor."
  },
  {
    name: "match",
    description: "Marca uma partida de Rocket League."
  },
  {
    name: "nick",
    description: "Altera o nickname de um membro."
  }
];

app.use(express.json());


// ==========================================
// API DO DASHBOARD
// ==========================================

app.get("/api/config", (req, res) => {
  res.json({
    clientId: CLIENT_ID,
    invite: INVITE_URL,
    commands: commands,
    servers: "—"
  });
});


// ==========================================
// LOGIN COM DISCORD
// ==========================================

app.get("/auth/discord", (req, res) => {

  const redirectUri =
    "https://onyx-bot-dashboard.onrender.com/auth/discord";

  const oauthUrl =
    "https://discord.com/oauth2/authorize" +
    `?client_id=${CLIENT_ID}` +
    "&response_type=code" +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    "&scope=identify%20guilds";

  res.redirect(oauthUrl);
});


// ==========================================
// FICHEIROS DO SITE
// ==========================================

app.use(express.static(__dirname));


// ==========================================
// PÁGINA PRINCIPAL
// ==========================================

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


// ==========================================
// ERRO 404
// ==========================================

app.use((req, res) => {
  res.status(404).send("Not Found");
});


// ==========================================
// INICIAR SERVIDOR
// ==========================================

app.listen(PORT, "0.0.0.0", () => {
  console.log("=================================");
  console.log("ONYX DASHBOARD ONLINE");
  console.log(`Porta: ${PORT}`);
  console.log(`Comandos: ${commands.length}`);
  console.log("=================================");
});
