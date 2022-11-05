/**
 * When this Discord.js has no access to the specified guild.
 */
export class NoAccessToGuild extends Error {
  // eslint-disable-next-line require-jsdoc
  constructor(public guild: string) {
    super(`No access to the guild ${guild}.`);
    this.name = NoAccessToGuild.name;
  }
}
