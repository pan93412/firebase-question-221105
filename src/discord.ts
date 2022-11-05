import { checkClient, Client, ClientWithEmojiIntents, GatewayIntentBits } from "./discord-emojis/index.js";
import { NonfulfilledCapability } from "./exceptions/index.js";

let globalDiscordClient: ClientWithEmojiIntents | undefined;

/**
 * Get the Discord {@link ClientWithEmojiIntents} instance that is logged in and ready to use.
 *
 * @param token The token of the bot to log in.
 * @returns The Discord {@link Client} instance that has the EmojiIntents assurance.
 */
async function createDiscordInstance(token: string): Promise<ClientWithEmojiIntents> {
    const client = new Client({
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildEmojisAndStickers],
    });

    if (!checkClient(client)) throw new NonfulfilledCapability();

    const onReadyPromise = new Promise<ClientWithEmojiIntents>((resolve) => {
        client.once("ready", () => {
            console.debug("getDiscordInstance: ready");
            resolve(client);
        });
    });

    await client.login(token);
    console.debug("getDiscordInstance: logged in");

    return onReadyPromise;
}

/**
 * Get the singleton Discord instance.
 *
 * [TODO) We don't check if the instance is valid at this moment.
 * You can revoke this instance with `{@link revokeClientInstance}`.
 *
 * @param token The token of the bot to log in.
 * @returns
 */
export async function getClientInstance(token: string): Promise<
    Exclude<typeof globalDiscordClient, undefined>
> {
    globalDiscordClient = globalDiscordClient
        ?? await createDiscordInstance(token);

    return globalDiscordClient;
}

/**
 * Revoke the singleton Discord client.
 */
export function revokeClientInstance(): void {
    globalDiscordClient = undefined;
}
