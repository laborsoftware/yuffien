
<script>
import {mapState,mapActions} from 'vuex'
import GuildsList from './partials/GuildsList'
import Home from './partials/Home'
export default {
  computed: {
    ...mapState("event", ["guildId"])
  },
  methods:{
    ...mapActions("auth",["login","checkGuilds"])
  },
  components:{
    appGuildsList: GuildsList,
    appHome: Home,
  },
  async created(){
    await this.login();
    await this.checkGuilds();
  }

};
</script>


<template lang="pug">
  #dashboard
    app-guilds-list(v-if="!guildId")
    app-home(v-if="guildId")

</template>









