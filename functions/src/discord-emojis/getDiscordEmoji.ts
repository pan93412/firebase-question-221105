import type { REST } from "@discordjs/rest";
import { DiscordAPIError } from "@discordjs/rest";
import type { APIEmoji } from 'discord-api-types/v10';
import { NoAccessToGuild } from "./index.js";
import { DiscordEmoji } from "./types/index.js";

/**
 * Get all the customized emojis of a guild.
 *
 * @param restApi The Discord.js REST API instance that has the access to the specified guild.
 * It should be the
 * @param guild The guild to fetch the emojis from.
 * @throws {NoAccessToGuild}
 */
export async function getDiscordEmoji(restApi: REST, guild: string): Promise<DiscordEmoji[]> {
  try {
    const guildEmojis = await restApi.get(`/guilds/${guild}/emojis`) as APIEmoji[];

    return guildEmojis.map(apiEmojiToDiscordEmoji);
  } catch (e) {
    if (e instanceof DiscordAPIError) {
      if (e.code === 10004) {
        throw new NoAccessToGuild(guild);
      }
    }

    throw e;
  }
}

/**
 * Convert a {@link APIEmoji} to {@link DiscordEmoji}.
 *
 * The converter is picked from
 * <https://github.com/discordjs/discord.js/blob/ff85481d3e7cd6f7c5e38edbe43b27b104e82fba/packages/discord.js/src/structures/Emoji.js#L40-L57>.
 */
function apiEmojiToDiscordEmoji(apiEmoji: APIEmoji): DiscordEmoji {
  const uniqueMessageId = (() => {
    if (apiEmoji.id) return `<${apiEmoji.animated ? 'a:' : ''}${apiEmoji.name}:${apiEmoji.id}>`;
    return encodeURIComponent(apiEmoji.name ?? "");
  })();

  const urlExt = apiEmoji.id ? (apiEmoji.animated ? 'gif' : 'png') : null;

  return {
    ...apiEmoji,
    uniqueMessageId,
    url: urlExt ? `https://cdn.discordapp.com/emojis/${apiEmoji.id}.${urlExt}` : null,
  };
}
