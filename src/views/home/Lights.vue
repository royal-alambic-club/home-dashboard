<template>
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader>
          <CIcon icon="cil-Lightbulb" />
          Lumières Phillips Hue
        </CCardHeader>
        <CCardBody>
          <CRow>
            <HueLightsList></HueLightsList>
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
            <h6>Aucune lumière detecté</h6>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script src="./Lights.js"></script>
