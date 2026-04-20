# Radio Applet

A Cinnamon applet for listening to radio stations.

## Dependencies

- `mpv` media player

Install with: `sudo apt install mpv` (on Ubuntu/Debian/Mint)

## Installation

1. Copy the `radio@foxof7207` folder to `~/.local/share/cinnamon/applets/`
2. Restart Cinnamon (Alt+F2, type 'r', Enter) or reload applets.
3. Right-click on the panel > Applets > Find "radio" > Add to panel.

## Usage

- Click the applet to open the menu.
- Select a station to start playing in the background.
- Select "Stop" to stop playback.
- Right-click the applet and select "Configure" to add, edit, or remove radio stations.

## Development

- Edit `applet.js` for functionality.
- Modify `settings-schema.json` for settings.
- Update `metadata.json` for metadata.