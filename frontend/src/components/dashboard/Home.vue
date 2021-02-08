<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState('event', ['guildId']),
    ...mapGetters('event', ['guildLogs'])
  },
  methods: {
    ...mapMutations('event', ['setGuildId'])
  },
  created() {
    const guildId = this.$route.params.id
    console.log(guildId)
    this.setGuildId(guildId)
  }
}
</script>

<template lang="pug">
    a-row(:gutter="[50,50]")
        a-col#log(:span="8")
            a-affix
                a-card(title="Sunucumda neler oluyor?"  :bordered="false")
                    ul(v-for = "log in guildLogs")
                        li {{ log }}
</template>

<style lang="scss" scoped>
#log {
  padding: 0px;
  margin: 0px;
}
</style>
