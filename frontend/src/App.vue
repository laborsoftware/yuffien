<script>
import { mapActions, mapState } from 'vuex'
import Footer from './components/Footer'
export default {
  components: {
    appFooter: Footer
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('event', ['loading'])
  },
  methods: {
    ...mapActions('auth', ['logout'])
  },
  data() {
    return {
      redirectURL: process.env.VUE_APP_LOCAL_API_URL
    }
  }
}
</script>
<template lang="pug">
  #app
    div.loading(v-show = "loading.show")
      a-spin(:tip="loading.message")
    a-layout#components-layout-demo-top.layout(theme='light' v-show = "!loading.show")
      a-layout-header
        a-row(type="flex" justify="space-between")
          a-col
            div.logo
              router-link(to="/") Yuffie.
          a-col
            a-menu(mode='horizontal' :style={lineHeight:"63px"})
              a-menu-item(key="oneri" icon="oneri")
                a(href="#")
                  a-icon(type="alert")
                  | {{ this.$t('home.ticket') }}
              a-menu-item(v-if="!user" key="github" icon="github")
                a( :href="redirectURL + $t('home.loginBtn.url')")
                  a-icon(type="login")
                  | {{ this.$t('home.loginBtn.name') }}
              a-menu-item(v-if="user" key="logout" icon="logout")
                a(@click="logout")
                  | {{ this.$t('home.logoutBtn.name') }}
              
                
      a-layout-content
        router-view

      a-layout-footer
        app-footer
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Poppins:300,400,500,600&display=swap');
@import 'assets/scss/global';

* {
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

html,
body {
  width: 100%;
  height: 100%;
  background-color: $thema-background-color;
}

.loading {
  text-align: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $thema-background-color;
}

h1 {
  font-weight: 700 !important;
  font-size: 32px;
  color: white;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  font-weight: 500;
}

.logo {
  z-index: 1;
  font-weight: bold;
  a {
    height: 100%;
    padding-right: 2em;
    width: 100%;
    display: block;
    color: $btn-color2;
  }
}
.ant-layout {
  min-height: 100vh;
  color: white;
}

.ant-layout-header {
  // padding: 0 calc(calc(100% - 700px) / 2);
  // padding:0 14px;
  background: $thema-background-color !important;
  height: 100%;
}

.ant-layout-content {
  align-self: center;
  padding: 4em;
  background: $thema-background-color;
  color: $text-color;

  @media (max-width: 576px) {
    padding: 1em;
  }
  width: 100%;
}

.ant-menu-item-active {
  border-bottom: 2px solid $btn-color;
}

.ant-menu-item {
  background: $thema-background-color;
  color: white;
  &:hover {
    background-color: $thema-background-color !important;
    border-bottom: 2px solid $btn-color !important;
  }
  a {
    color: white !important;
  }
}
</style>

<style lang="scss" scoped>
@import 'assets/scss/global';
</style>
