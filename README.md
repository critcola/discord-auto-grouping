<a href="https://critcola.com/?utm_source=github.com&utm_medium=readme&utm_term=logo&utm_content=discord-auto-grouping&utm_campaign=development">![Logo](https://critcola.com/assets/images/crit-cola-banner.svg)</a>

# Discord Auto-grouping

Discord Auto-grouping is a Discord bot that uses discord.js to automatically group users into "subchannels" in Discord servers, eliminating the need for creating numerous group channels. It was developed out of necessity for Crit Cola to mitigate two major pitfalls with Discord: their lack of subchannels and temporary channels.

When a user enters a channel prefixed with a game controller emoji (🎮), they'll be automatically grouped into their own "subchannel" where they can be joined by the rest of their group. When the group channel empties, it will be immediately deleted.

Crit Cola is perhaps the first community on Discord to achieve auto-grouping, and we're open-sourcing the code so that other large gaming communities can benefit from it.

## Demo

See it in action and test it out for yourself in [Crit Cola's Discord](https://discord.critcola.com).

## Installation

Install [discord.js](https://github.com/hydrabolt/discord.js), ignoring dependency warnings, then run `node discord-auto-grouping.js` after setting your token in `client.login()`.

```sh
npm install discord.js --save
npm install uws --save
```

## About Crit Cola

Crit Cola is connecting and empowering the world's best players. Primarily an [Overwatch clan](https://critcola.com/?utm_source=github.com&utm_medium=readme&utm_term=overwatch-clan&utm_content=discourse-browser-share&utm_campaign=development), we're a growing community of PC gamers. Join our [Steam group](http://steamcommunity.com/groups/critcola) and follow us on [Twitter](https://twitter.com/CritColaGaming). Cheers!

## License

Discourse Auto-grouping is released under the [MIT License](LICENSE).
