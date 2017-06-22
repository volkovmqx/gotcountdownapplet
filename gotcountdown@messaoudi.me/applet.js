const Applet = imports.ui.applet;
const Util = imports.misc.util;
const AppletDir = imports.ui.appletManager.appletMeta['gotcountdown@messaoudi.me'].path;
const GLib = imports.gi.GLib;


const TARGET_DATE = new Date(2017,6,17,01,00,00,000000).getTime();
function MyApplet(orientation, panel_height, instance_id) {
    this._init(orientation, panel_height, instance_id);
}

MyApplet.prototype = {
    __proto__: Applet.TextIconApplet.prototype,

    _init: function(orientation, panel_height, instance_id) {
        Applet.TextIconApplet.prototype._init.call(this, orientation, panel_height, instance_id);
        try {
            this.set_applet_icon_path(AppletDir + "/" + "icon.png");
            this.set_applet_tooltip("Next Episode of Game and thrones");
            this.set_applet_label(_("..."));

            var _this = this;
            GLib.timeout_add(GLib.PRIORITY_DEFAULT, 1000, function() {
              this.now = new Date().getTime();
              this.distance = TARGET_DATE - this.now;
              this.days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
              this.hours = Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              this.minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
              this.seconds = Math.floor((this.distance % (1000 * 60)) / 1000);
              this.countdown = days + "d " + hours + "h "
              + minutes + "m " + seconds + "s ";
              if (this.distance < 0) {

                this.countdown = "Season started, Enjoy !";
                _this.set_applet_label(this.countdown);
                return false;
              }
              _this.set_applet_label(this.countdown);
              return true;
            });
        }
        catch (e) {
            global.logError(e);
        };
    }
};

function main(metadata, orientation, panel_height, instance_id) {
    return new MyApplet(orientation, panel_height, instance_id);
}
