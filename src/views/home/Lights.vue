<template>
  <!-- eslint-disable -->
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader>
          <CIcon icon="cil-Lightbulb" />
          Lumières disponibles phillips hue 
        </CCardHeader>
        <CCardBody>
          <CRow>
            <HueLightsList v-bind:hue_lights="hue_lights"></HueLightsList>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader>
          <CIcon icon="cil-Lightbulb" />
          Lumières disponibles Ikea
        </CCardHeader>
        <CCardBody>
          <CRow>
            <h6> Aucune lumière detecté </h6>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
/* eslint-disable */

import HueLightsList from './HueLightsList.vue'
var test = 'test'

export default {
  test: test,
  lights: HueLightsList,
  components: {
    HueLightsList: HueLightsList,
  },
  methods: {
    test: function () {
      alert('test')
      return "test"
    },
  },
  data() {
    return {}
  },
}
</script>
