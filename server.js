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

const commands = [
  {
    name: "socials",
    description: "Mostra as redes sociais da ONYX e-Sports."
  },
  {
    name: "site",
    description: "Mostra o site oficial da ONYX e-Sports."
  },
  {
    name: "staff",
    description: "Mostra informações da Staff."
  },
  {
    name: "parceria",
    description: "Informações sobre parcerias com a ONYX."
  }
];

app.use(express.json());

/*
 * API DO DASHBOARD
 */
app.get("/api/config", (req, res) => {
  res.json({
    clientId: CLIENT_ID,
    invite: INVITE_URL,
    commands: commands,
    servers: "—"
  });
});


/*
 * ROTA DE LOGIN DISCORD
 *
 * Por enquanto redireciona para o OAuth2.
 * O login completo será adicionado depois.
 */
app.get("/auth/discord", (req, res) => {

  const redirectUri =
    "https://onyx-bot-dashboard.onrender.com/auth/discord";

  const oauthUrl =
    "https://discord.com/oauth2/authorize" +
    `?client_id=${CLIENT_ID}` +
    "&response_type=code" +
    "&redirect_uri=" +
    encodeURIComponent(redirectUri) +
    "&scope=identify%20guilds";

  res.redirect(oauthUrl);
});


/*
 * FICHEIROS DO SITE
 */
app.use(express.static(__dirname));


/*
 * HOME
 */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


/*
 * 404
 */
app.use((req, res) => {
  res.status(404).send("Not Found");
});


/*
 * INICIAR SERVIDOR
 */
app.listen(PORT, "0.0.0.0", () => {
  console.log(`ONYX Dashboard online na porta ${PORT}`);
  console.log(`Porta: ${PORT}`);
});
