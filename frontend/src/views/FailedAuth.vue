<template lang="pug">
   a-row(type="flex" justify="center")
      a-col(span="12")
         a-result(status="403" title="403" sub-title="Bu sayfayı görüntüleme izniniz yok.")
            a-button(type="primary")
               router-link(to="/")
                  | Anasayfa

</template>

<script>
export default {}
</script>

<style lang="scss">
.ant-result {
  padding: 0px 32px;
  .ant-result-title {
    color: white;
  }
  .ant-result-subtitle {
    color: white;
  }
}
.ant-result-content {
  background-color: transparent !important;
  text-align: center;
  margin-top: 0px !important;
}
</style>
