/* eslint-disable */
const api_url         = process.env.VUE_APP_HUE_BRIDGE_URL;
const hue_app_token   = process.env.VUE_APP_HUE_TOKEN;
const group_regex     = /(^[a-zA-Z ]*)([ \d]*\d$)/
const hue_color_model = [
  "LCT015" 
]
const icon_map        = [
  ["manger", "dinerroom.svg"],
  ["salon", "livingroom.svg"],
  ["bain", "bathroom.svg"],
  ["cuisine", "kitchen.svg"],
  ["chambre", "bedroom.svg"],
  ["coucher", "bedroom.svg"],
  ["couloir", "corridor.svg"],
  ["bureau", "office.svg"]
]

class HueLight {
  constructor(name, on, id, bright, model_id) {
    this.label    = name;
    this.on       = on;
    this.value    = id;
    this.model_id = model_id;
    this.is_color = hue_color_model.includes(this.model_id);
    this.bright   = bright;
    this.icon     = null;

    for (let [icon_name, icon_path] of  icon_map  ) {
      if (this.label.toLowerCase().includes(icon_name)) {
        console.log("match " + this.label.toLowerCase() + " " + icon_name)
        this.icon = require("../../assets/icons/rooms/" + icon_path); 
      }
    }
  }

  switchState() {
    let url = new URL('/api/' + hue_app_token + '/lights/' + this.value + '/state', 'http://' + api_url);
    this.on = !this.on;
    fetch(url.toString(), {
      method: 'PUT',
      body: JSON.stringify({
        on: this.on,
      })
    })
      .then((response) => {
        if (response.status != 200) {
          throw new Error(response.json());
        }
        return (response.json());
      })
      .catch((error) => { 
        console.log(error);
        return false;
      });
    return true;
  }

  changeBright() {
    let url = new URL('/api/' + hue_app_token + '/lights/' + this.value + '/state', 'http://' + api_url);
    fetch(url.toString(), {
      method: 'PUT',
      body: JSON.stringify({
        bri: new Number(this.bright)
      })
    })
      .then((response) => {
        if (response.status != 200) {
          throw new Error(response.json());
        }
        return (response.json());
      })
      .catch((error) => { 
        console.log(error);
        return false;
      });
    return true;
  }

  // Here we check if the light has been changed by another application and we change what have been changed
  updateLight(updatedLight) {
    this.label  = this.label == updatedLight['name'] ? this.label : updatedLight['name'];
    this.on     = this.on == updatedLight['state']['on'] ? this.on : updatedLight['state']['on'];
    this.bright = this.bright == updatedLight['state']['bri'] ? this.bright : updatedLight['state']['bri'];
  }
}

class HueLightGroup {
  constructor(name, on, bright, model_id) {
    this.label    = name;
    this.on       = on;
    this.value    = '-1';
    this.model_id = model_id;
    this.is_color = hue_color_model.includes(this.model_id);
    this.bright   = bright;
    this.group    = [];

    let light = new HueLight(name + "(Tout)", this.on, this.value, this.bright, this.is_color);
    this.group.push(light);
    this.icon = light.icon;
  }

  // if one light of the group is on, the all selected button will be on
  switchState() {
    this.on   = !this.on;
    if (this.value !== '-1') {
      let light = this.group.find(element => element.value === this.value);
      light.on  = !this.on;
      light.switchState();
    }
    else {
      for (let light of this.group) {
        if (light.value != '-1') {
          light.on = !this.on;
          light.switchState();
        }
        else {
          light.on = this.on;
        }
      }
    }
  }

  addLight(light) {
    this.group.push(light);
    if (light.on === true) {
      this.on = true;
      this.group[0].on = true;
    }
    if (this.bright < light.bright) {
      this.bright = light.bright;
      this.group[0].bright = light.bright;
    }
  }

  // We want that for the all selected button we got the biggest bright of the group
  changeBright() {
    if (this.value !== '-1') {
      let light         = this.group.find(element => element.value === this.value);
      let bigestBright  = 0;
      light.bright      = this.bright;
      light.changeBright();
      for (let light of this.group) {
        if (bigestBright < light.bright) {
          bigestBright = light.bright;
        }
      }
      this.group[0].bright = bigestBright;
    }
    else {
      for (let light of this.group) {
        if (light.value !== '-1') {
          light.bright = this.bright;
          light.changeBright();
        }
        else {
          light.bright = this.bright;
        }
      }
    }
  }

  updateSelectedLight() {
    const onLight = this.group.find(element => element.on === true && element.value != '-1');
    let topLight  = this.group[0];
    if (onLight == null) {
      topLight.on = false;
    }
    else {
      topLight.on = true;
    }
    const light   = this.group.find(element => element.value === this.value);
    this.value    = light.value;
    this.on       = light.on;
    this.model_id = light.model_id;
    this.is_color = hue_color_model.includes(this.model_id);
    this.bright   = light.bright;
  }
}

export default {
  created: function () {
    this.initHueLightsMap();
    console.log(this.hue_lights_map);
    this.interval = setInterval(() => {
      this.updateLightsMap();
    }, 5000);
  },
  beforeUnmount() {
    if (this.interval) {
      clearIntervall(this.interval)
      this.interval = undefined
    }
  },
  data() {
    return {
      hue_lights_map: new Map(),
      interval: null,
    }
  },
  methods: {
    initHueLightsMap: function () {
      let reg_res = [];
      let url     = new URL('/api/' + hue_app_token + '/lights', 'http://' + api_url);

      fetch(url.toString())
        .then((response) => {
          if (response.status != 200) {
            throw new Error(response.json());
          }
          return (response.json());
        })
        .then((data) => {
          for (var light in data) {
            // Here if a light that finished by a digit we gonna try to put this light in a light group, bc we supposed there is another light with another digit
            if ((reg_res = data[light]['name'].match(group_regex)) != null) {
              if (this.hue_lights_map.get(reg_res[1])) {
                let hueLight = new HueLight(data[light]['name'], data[light]['state']['on'], light, data[light]['state']['bri'], data[light]['modelid']);
                this.hue_lights_map.get(reg_res[1]).addLight(hueLight);
              }
              else {
                let hueLightGroup = new HueLightGroup(reg_res[1], data[light]['state']['on'], data[light]['state']['bri'], data[light]['modelid'], []);
                let hueLight      = new HueLight(data[light]['name'], data[light]['state']['on'], light, data[light]['state']['bri'], data[light]['modelid']);
                hueLightGroup.addLight(hueLight);
                this.hue_lights_map.set(reg_res[1], hueLightGroup);
              }
            }
            else {
              let hueLight = new HueLight(data[light]['name'], data[light]['state']['on'], light, data[light]['state']['bri'], data[light]['modelid']);
              this.hue_lights_map.set(light, hueLight);
            }
          }
        })
        .catch((error) => { 
          console.log(error);
          return false;
        });
        return true
    },
    updateLightsMap: function () {
      let reg_res = [];
      let url     = new URL('/api/' + hue_app_token + '/lights', 'http://' + api_url);

      fetch(url.toString())
        .then((response) => {
          if (response.status != 200) {
            throw new Error(response.json());
          }
          return (response.json());
        })
        .then((data) => {
          for (var light in data) {
            if ((reg_res = data[light]['name'].match(group_regex)) != null) {
              let tmpGroupLight = this.hue_lights_map.get(reg_res[1]);

              for (let lightFromGroup of tmpGroupLight.group) {
                if (lightFromGroup.value !== '-1') {
                  lightFromGroup.updateLight(data[lightFromGroup.value]);
                }
              }
              tmpGroupLight.updateSelectedLight();
            }
            else {
              this.hue_lights_map.get(light).updateLight(data[light]);
            }
          }
          return true;
        })
        .catch((error) => { 
          console.log(error);
          return false;
        });
      return true;
    },
  },
  computed: {},
}
