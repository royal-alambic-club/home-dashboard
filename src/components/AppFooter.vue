<template>
  <CFooter>
    <div>
      <!-- <a
        href="https://avatars.githubusercontent.com/u/18704039?s=88&v=4"
        target="_blank"
      /> -->
      <span class="ms-1">
        &copy; {{ new Date().getFullYear() }}
        <a href="https://github.com/royal-alambic-club"> RAC</a>
      </span>
    </div>
    <div class="ms-auto">
      <span class="me-1">
        Powered by : JS Mowgli & CoreUI VUEJS
        <a href="https://github.com/jsthibault">
          <!-- <CIcon :icon="cibGithub" size="xl" /> -->
        </a>
      </span>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'AppFooter',
}
</script>
