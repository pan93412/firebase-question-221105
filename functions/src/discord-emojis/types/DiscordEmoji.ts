/**
 * The structure representing a custom Discord emoji.
 */
 export type DiscordEmoji = {
  /**
   * The ID of this emoji that can use
   * directly in the message.
   *
   * @example <:sticker_display_name:sticker_id>
   */
  id: string;

  /**
   * The URL of the emoji image.
   *
   * @example https://cdn.discordapp.com/emojis/sticker_id.png
   */
  url: string;
}

/**
 * The list stored the custom Discord emojis.
 *
 * @see {@link DiscordEmoji}
 */
export type DiscordEmojis = DiscordEmoji[];
