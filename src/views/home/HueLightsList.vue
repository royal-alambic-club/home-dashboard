<template>
  <!-- eslint-disable -->
  <br />
  <div
    id="Lights"
    v-for="[id, light] in hue_lights_map"
    style="width: 33%; margin-top: 1%"
    v-bind:key="light"
  >
    <CCard>
      <CCardBody>
        <CCardTitle>
          <div v-if="light.on == true">
            <img v-if="light.icon != null" v-bind:src="light.icon" style="width: 37px"/>
              {{ light.label }}
            <img src="../../assets/icons/bulb_on.png" style="width: 25px" align="right"/>
          </div>
          <div v-else>
            <img v-if="light.icon != null" v-bind:src="light.icon" style="width: 37px"/>
              {{ light.label }}
            <img src="../../assets/icons/bulb_off.png" style="width: 25px" align="right"/>
          </div>
        </CCardTitle>
        <div style="width: 33%">         
          <CFormSwitch
            size="xl"
            v-bind:id="light.label"
            :checked="light.on == true"
            v-on:click="light.switchState()"
            track-by="$index"
            v-bind:key="light.on"
          />
        </div>
        <br />
        <div v-if="light.is_color == true">
          <CFormInput
            type="color"
            id="exampleColorInput"
            value="#563d7c"
            title="Choose your color"
          />
          <br />
        </div>
        <div v-if="light.group">
          <CFormSelect
            aria-label="Select"
            v-on:click="light.updateSelectedLight()"
            v-model="light.value"
            :options="light.group"
          >
          </CFormSelect>
          <br />
        </div>

        <input
          :disabled="light.on == false"
          track-by="$index"
          v-bind:key="light"
          type="range"
          id="vol"
          name="vol"
          min="0"
          max="254"
          v-model="light.bright"
          style="width: 100%"
          v-on:input="light.changeBright(id)"
        />
      </CCardBody>
    </CCard>
  </div>
</template>

<script src="./HueLightsList.js"></script>
