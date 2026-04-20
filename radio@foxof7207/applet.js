const Applet = imports.ui.applet;
const PopupMenu = imports.ui.popupMenu;
const Settings = imports.ui.settings;
const Util = imports.misc.util;

const LOG_PREFIX = "[radio@foxof7207]";
const LABEL_DEFAULT = "Radio";
const ICON_NAME = "radio";
const TOOLTIP = "Listen to radio stations";

function RadioApplet(metadata, orientation, panel_height, instance_id) {
    this._init(metadata, orientation, panel_height, instance_id);
}

RadioApplet.prototype = {
    __proto__: Applet.TextIconApplet.prototype,

    _init: function(metadata, orientation, panel_height, instance_id) {
        try {
            this.uuid = metadata.uuid;
            this.instance_id = instance_id;
            this.currentStation = null;
            Applet.TextIconApplet.prototype._init.call(this, orientation, panel_height, instance_id);

            this.set_applet_label(LABEL_DEFAULT);
            this.set_applet_icon_name(ICON_NAME);
            this.set_applet_tooltip(TOOLTIP);

            this.menuManager = new PopupMenu.PopupMenuManager(this);
            this.menu = new Applet.AppletPopupMenu(this, orientation);
            this.menuManager.addMenu(this.menu);

            this.settings = new Settings.AppletSettings(this, this.uuid, instance_id);
            this.settings.bind("stations", "stations", this._on_settings_changed.bind(this));

            this._on_settings_changed();
        } catch (e) {
            global.logError(`${LOG_PREFIX} Error in _init: ${e}`);
        }
    },

    _on_settings_changed: function() {
        try {
            this.menu.removeAll();

            if (this.stations && this.stations.length > 0) {
                this.stations.forEach(station => {
                    let item = new PopupMenu.PopupMenuItem(station.name);
                    item.connect('activate', () => this._play_station(station));
                    this.menu.addMenuItem(item);
                });

                this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
            }

            this._add_menu_item("Stop", () => this._stop_playback());
        } catch (e) {
            global.logError(`${LOG_PREFIX} Error in _on_settings_changed: ${e}`);
        }
    },

    _add_menu_item: function(label, callback) {
        let item = new PopupMenu.PopupMenuItem(label);
        item.connect('activate', callback);
        this.menu.addMenuItem(item);
    },

    on_applet_clicked: function(event) {
        this.menu.toggle();
    },

    _play_station: function(station) {
        // Check if the same stream is already playing
        if (this.currentStation && this.currentStation.url === station.url) {
            global.log(`${LOG_PREFIX} Stream already playing: ${station.name}`);
            return;
        }
        
        // Stop previous stream if different
        if (this.currentStation) {
            try {
                Util.spawnCommandLineAsync("pkill mpv");
            } catch (e) {
                global.logError(`${LOG_PREFIX} Error stopping previous mpv: ${e}`);
            }
        }
        
        this.currentStation = station;
        this.set_applet_label(`Playing: ${station.name}`);
        
        try {
            Util.spawnCommandLineAsync(`mpv --no-video --ytdl "${station.url}"`);
        } catch (e) {
            global.logError(`${LOG_PREFIX} Error spawning mpv: ${e}`);
            this.set_applet_label(LABEL_DEFAULT);
            this.currentStation = null;
        }
    },

    _stop_playback: function() {
        this.set_applet_label(LABEL_DEFAULT);
        this.currentStation = null;
        
        try {
            Util.spawnCommandLineAsync("pkill mpv");
        } catch (e) {
            global.logError(`${LOG_PREFIX} Error stopping mpv: ${e}`);
        }
    },

    on_applet_removed_from_panel: function() {
        this._stop_playback();
        this.settings.finalize();
    }
};

function main(metadata, orientation, panel_height, instance_id) {
    try {
        return new RadioApplet(metadata, orientation, panel_height, instance_id);
    } catch (e) {
        global.logError(`${LOG_PREFIX} Error in main: ${e}`);
    }
}

