<template>
  <br />
  <div
    id="Lights"
    v-for="item in hue_lights"
    v-bind:key="item.name"
    style="width: 33%"
  >
    <CFormSwitch
      size="xl"
      v-bind:id="item.name"
      v-bind:label="item.name"
      :checked="item.on == true"
      v-on:click="switchState(item.id)"
      track-by="$index"
    />
    <br />
  </div>
</template>
<script>
/* eslint-disable */
var lock_state = false;

export default {
  created: function() {
		this.getHueLightsList(),
    this.interval = setInterval(() => {
      this.getHueLightsList();
    }, 5000);
  },
  beforeDestroy() {
    if (this.interval) {
      clearIntervall(this.interval)
      this.interval = undefined
    }
  },
  data () {
    return {
      hue_lights: "[{}]",
      interval: null,
    }
  },
  methods: {
    getHueLightsList: function() {
      //console.log("http://" + api_url + "/api/" + hue_app_token + "/lights");    
      var api_url = process.env.VUE_APP_HUE_BRIDGE_URL; 
      var hue_app_token =  process.env.VUE_APP_HUE_TOKEN;

      console.log("state : " + lock_state + api_url)
      if (lock_state === false)
      {
        fetch("http://" + api_url + "/api/" + hue_app_token + "/lights")
          .then((response) => response.json())
          .then((data) => {
            var tmp_hue_light = new Array();

            for(var light in data) {
              var tmp_light = {};
              var tmp_light_name = '';
              var tmp_light_state = '';

              for (var light_description in data[light]) {
                if (light_description === 'name') {
                  // console.log(light_description);
                  // console.log(data[light][light_description]);
                  tmp_light_name = data[light][light_description];
                }
                if (light_description === 'state') {
                  // console.log(light_description);
                  // console.log(data[light][light_description]['on']);
                  tmp_light_state = data[light][light_description]['on'];
                }
                //console.log(light_description);
                //console.log(data[light]);
              }
              tmp_light = {
                  id: light,
                  name: tmp_light_name,
                  on: tmp_light_state,
              };
              tmp_hue_light.push(tmp_light);
            }
            //console.log(this.hue_lights);
            this.hue_lights = tmp_hue_light;
            console.log(this.hue_lights);
            lock_state = false;
          })
      }
    },
    switchState: function(id) {
      var api_url = process.env.VUE_APP_HUE_BRIDGE_URL; 
      var hue_app_token =  process.env.VUE_APP_HUE_TOKEN;

      if (lock_state === false)
      {
        lock_state = true
        fetch("http://" + api_url + "/api/" + hue_app_token + "/lights/" + id)
          .then((response) => response.json())
          .then((data) => {
            console.log(data['state']['on'])
            var light_state = data['state']['on'];
            if (light_state == true) {
                fetch("http://" + api_url + "/api/" + hue_app_token + "/lights/" + id + "/state", {
                  method: 'PUT',
                  body: JSON.stringify({
                    on: false
                  })
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log("on eteint");
                    lock_state = false;
                  })
            }
            else if (light_state == false) {
                fetch("http://" + api_url + "/api/" + hue_app_token + "/lights/" + id + "/state", {
                  method: 'PUT',
                  body: JSON.stringify({
                    on: true
                  })
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log("on allume");
                    lock_state = false;
                  })
            }
          })
      }
    },
    test: function(id) {
      console.log('TESTED FUNCTION' + id)
    },
  },
  computed: {
  },
}
</script>

<style>
#pagecontent {
  border: 1px solid black;
  padding: 2px;
}
</style>
