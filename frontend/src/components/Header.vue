<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState('auth', ['user'])
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
    
</template>

<style></style>
