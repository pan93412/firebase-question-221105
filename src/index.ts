// import * as functions from "firebase-functions";
import { onCall, HttpsError, onRequest } from "firebase-functions/v2/https";
import { getClientInstance } from "./discord.js";
import { getDiscordEmoji } from "./discord-emojis/index.js";
import { defineString } from "firebase-functions/params";

const discordToken = defineString("DISCORD_TOKEN");
const stickerGuild = defineString("GUILD");

/**
 * Get the stickers in a Discord guild.
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
 * ```json
 * {"error":"Method not allowed"}
 * ```
 */
export const getstickers = onRequest(async (req, res) => {
  const discordClient = await getClientInstance(discordToken.value());

  if (req.method === "GET") {
    res.json(await getDiscordEmoji(discordClient, stickerGuild.value()));
  }

  res.status(405).send('{"error":"Method not allowed"}');
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
        "with two arguments \"firstNumber\" and \"secondNumber\" which " +
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
