<template>
  <div id="app">
    <div class="all-area">
      <div class="inner-wrapper maintenance-wrapper d-flex flex-column align-items-center justify-content-between p-4">
        <a href="/"><img src="assets/img/inner_logo.png" alt=""/></a>
        <div class="maintenance-area">
          <div class="container">
            <div class="row align-items-center justify-content-between">
              <div class="col-12 col-md-6 order-2 order-md-1">
                <div class="maintenance-content my-5 my-md-0">
                  <div class="alert alert-warning d-inline-flex">{{ $t('maintenance.infoMessage') }}</div>
                  <h1>{{ $t('maintenance.name') }}</h1>
                  <p class="my-3">
                    {{ $t('maintenance.description') }}
                  </p>
                </div>
              </div>
              <div class="col-12 col-sm-10 col-md-6 order-1 order-md-2 mx-auto pt-4 pt-md-0">
                <img src="/assets/images/maintenance.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bottom"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log('hello world')
  }
}
</script>
