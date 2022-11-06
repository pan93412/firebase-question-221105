import { REST } from "@discordjs/rest";

let globalDiscordClient: REST | undefined;

/**
 * Get the singleton Discord instance.
 *
 * @param token The token of the bot to send API requests.
 * @returns
 */
export async function getClientInstance(token: string): Promise<
    Exclude<typeof globalDiscordClient, undefined>
> {
    if (!globalDiscordClient) {
        globalDiscordClient = new REST({ version: "10" });
    }

    return globalDiscordClient.setToken(token);
}
