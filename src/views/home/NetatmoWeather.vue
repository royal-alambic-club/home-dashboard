<template>
  <!-- eslint-disable -->
  <h1>Netatmo</h1>
  <CRow>
   <CCol :md="6" >
      <CCard class="mb-4">
        <CCardHeader> Line Chart </CCardHeader>
        <CCardBody>
          <CRow>
          <CCol sm="6">test1
                    <CFormSelect
            aria-label="Select"
            :options="[ 'test', 'test2', 'test3' ]"
          >
          </CFormSelect>
          </CCol>
          <CCol sm="6">test2
                    <CFormSelect
            aria-label="Select"
            :options="[ 'test', 'test2', 'test3' ]"
          >
          </CFormSelect>
          </CCol>
              <!-- <CButtonGroup
                  class="float-end me-3"
                  role="group"
                  aria-label="Basic outlined example"
                >
                  <CButton color="secondary" variant="outline">Day</CButton>
                  <CButton color="secondary" variant="outline" active
                    >Month</CButton
                  >
                  <CButton color="secondary" variant="outline">Year</CButton>
                </CButtonGroup> -->
          <CChartLine :wrapper="false" :data="netatmoInsideTemperature" />
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  {{ netatmoInsideTemperature }}
</template>

<script src="./NetatmoWeather.js"></script>
