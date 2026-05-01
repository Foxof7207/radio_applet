# Radio Applet

A lightweight Cinnamon desktop applet for listening to online audio streams (radio, livestreams, podcasts, etc.) directly from your taskbar.

## Features

- **Simple UI**: Click the applet icon to open a menu with all configured stations
- **Customizable Stations**: Add, edit, or remove radio stations through the settings GUI
- **Stream Support**: Works with any URL that mpv can handle (HTTP streams, HLS, YouTube streams via youtube-dl, etc.)
- **Background Playback**: Audio streams play in the background without opening additional windows
- **One-Click Control**: Easily switch between stations or stop playback
- **Smart Stream Switching**: Automatically stops the current stream when switching to a different radio.

## Default Stations

- **Lofi Girl**: Popular lofi hip-hop livestream
- **Truck Sim FM**: Relaxing background music stream

## Requirements

- **Cinnamon** 5.4+ (tested on 6.6.7)
- **mpv** media player
- **youtube-dl** (optional, for YouTube streams support)

### Installation

Install mpv (required):
```bash
sudo apt install mpv
```

Optional, for YouTube stream support:
```bash
sudo apt install youtube-dl
```


## Usage

### How to use

1. **Click the applet icon** to open the menu
2. **Select a station** from the list to start playing
3. **View current status** in the applet label (shows "Radio" when stopped or "Playing: [Station Name]" when active)
4. **Stop playback** by clicking "Stop" in the menu or selecting a different station

### Adding Custom Stations

1. Right-click the applet icon on the panel
2. Select "Configure" or "Settings"
3. In the "Radio Stations" section, click the plus button to add a new station
4. Enter the station name and stream URL
5. Click "Save" or "OK"

### Supported Stream URLs

- HTTP/HTTPS streams
- HLS (M3U8) streams
- YouTube live streams (requires youtube-dl)
- Shoutcast/Icecast servers
- Any format supported by mpv

## Known Limitations

- Audio-only playback (mpv is configured with `--no-video` flag)
- Stream information (bitrate, duration, etc.) is not displayed
