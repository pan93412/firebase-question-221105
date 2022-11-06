import { APIEmoji } from "discord-api-types/v10";

/**
 * The structure representing a custom Discord emoji.
 */
export interface DiscordEmoji extends APIEmoji {
  /**
   * The emoji ID for reference in messages.
   *
   * @example <:sticker_display_name:sticker_id>
   */
  uniqueMessageId: string;

  /**
   * The address to sticker URL.
   *
   * @example https://cdn.discordapp.com/emojis/sticker_id.png
   */
  url?: string | null;
}

/**
 * The list stored the custom Discord emojis.
 *
 * @see {@link DiscordEmoji}
 */
export type DiscordEmojis = DiscordEmoji[];
