import { getDiscordEmoji, checkClient, Client, GatewayIntentBits } from "..";
import assert from "node:assert";

const token = process.env.DISCORD_TOKEN;
if (!token) console.error("you have to specify a TOKEN.");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildEmojisAndStickers],
});
assert.ok(checkClient(client));

client.on("ready", async () => {
  await getDiscordEmoji(client, "789853024168050702").then(console.log);
  client.destroy();
})

await client.login(token);
