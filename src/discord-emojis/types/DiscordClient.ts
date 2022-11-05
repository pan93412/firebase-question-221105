import { Client, GatewayIntentBits } from 'discord.js';
import { type Nominal } from 'nominal-types';

export { Client, GatewayIntentBits };

/**
 * The client that includes the {@link GatewayIntentBits.Guilds} and
 * {@link GatewayIntentBits.GuildEmojisAndStickers} intents.
 */
export type ClientWithEmojiIntents = Nominal<'ClientWithEmojiIntents', Client>;

/**
 * Check if `client` matches the {@see ClientWithEmojiIntents} type.
 *
 * @param client The Discord.js client.
 * @returns The prove that the client is with the intents above.
 */
export function checkClient(client: Client): client is ClientWithEmojiIntents {
  const intents = client.options.intents;

  return intents.has(GatewayIntentBits.Guilds)
    && intents.has(GatewayIntentBits.GuildEmojisAndStickers);
}
