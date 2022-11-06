import { onCall, HttpsError, onRequest } from "firebase-functions/v2/https";
import { getClientInstance } from "./discord.js";
import { getDiscordEmoji } from "./discord-emojis/index.js";
import { defineString } from "firebase-functions/params";
import { standardizeError } from "./errorHandler.js";

const discordToken = defineString("DISCORD_TOKEN", {
  description: "The bot token for sending request to Discord REST API.",
});
const stickerGuild = defineString("GUILD", {
  description:
    "The guild ID to operate on, for example: getting emojis, sending messages.",
});

/**
 * The key for running any special commands.
 *
 * It is strongly recommended to configure your own
 * key for security reasons.
 *
 * @example C1SCC{_}V3_B@ck3nd
 */
const adminKey = defineString("ADMIN_KEY", {
  description: "The key for running any special commands.",
  default: "C1SCC{_}V3_B@ck3ndD3f@u1tP@s^2w0rd*w*",
});

const globalCache = new Map<string, string>();

/**
 * Get the emojis in a Discord guild.
 *
 * It will cache the emojis. You can pass a `X-Refresh-Cache: <ADMIN_KEY>`
 * header to force a refresh.
 *
 * ## Request
 *
 * - Should be a `GET` request.
 *
 * ## Response
 *
 * ### 200 – Success
 *
 * ```json
 * [{"id":"<:sticker_display_name:sticker_id>","url":"https://cdn.discordapp.com/emojis/sticker_id.png"}]
 * ```
 *
 * ### 405 – Method not allowed
 *
 * No response.
 */
export const getemojis = onRequest(async (req, res) => {
  const cacheKey = "getstickers::emoji";

  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  if (
    !globalCache.has(cacheKey) ||
    req.header("X-Refresh-Cache") === adminKey.value()
  ) {
    try {
      const rest = await getClientInstance(discordToken.value());

      if (req.method === "GET") {
        const stickers = await getDiscordEmoji(rest, stickerGuild.value());
        globalCache.set(cacheKey, JSON.stringify(stickers));
      }
    } catch (e) {
      res.status(500).send(standardizeError(e));
      return;
    }
  }

  res
    .header("Content-Type", "application/json")
    .send(globalCache.get(cacheKey));
});

// Adds two numbers to each other.
export const addnumbers = onCall((request) => {
  // Numbers passed from the client.
  const firstNumber = request.data.firstNumber;
  const secondNumber = request.data.secondNumber;

  // Checking that attributes are present and are numbers.
  if (!Number.isFinite(firstNumber) || !Number.isFinite(secondNumber)) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new HttpsError(
      "invalid-argument",
      "The function must be called " +
        'with two arguments "firstNumber" and "secondNumber" which ' +
        "must both be numbers."
    );
  }

  // returning result.
  return {
    firstNumber: firstNumber,
    secondNumber: secondNumber,
    operator: "+",
    operationResult: firstNumber + secondNumber,
  };
});
