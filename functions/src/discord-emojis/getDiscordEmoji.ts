import { NoAccessToGuild } from "./exceptions/index.js";
import { ClientWithEmojiIntents, DiscordEmojis } from "./types/index.js";

/**
 * Get all the customized emojis of a guild.
 *
 * @param client The Discord.js client that has the access to the specified guild.
 * @param guild The guild to fetch the emojis from.
 * @throws {NoAccessToGuild}
 */
 export async function getDiscordEmoji(client: ClientWithEmojiIntents, guild: string): Promise<DiscordEmojis> {
  const guildEmojis = client.guilds.cache.get(guild);
  if (!guildEmojis) throw new NoAccessToGuild(guild);

  return guildEmojis.emojis.cache.map((emoji) => {
    return { id: emoji.toString(), url: emoji.url };
  });
}
