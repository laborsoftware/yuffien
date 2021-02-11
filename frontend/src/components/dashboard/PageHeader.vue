<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'

export default {
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('event', ['guilds', 'currentGuild']),
    welcomeMessage() {
      const nowHours = new Date().getHours()
      const result = this.welcomeMessages.find(message => message.min < nowHours && message.max > nowHours)
      return result.description
    }
  },

  methods: {
    ...mapActions('event', ['checkGuild']),
    guildChange(id) {
      this.checkGuild(id)
      this.$router.push({ path: `/dashboard/${id}` })
    },
    guildClick() {
      console.log('click')
    }
  },

  data() {
    return {
      moment,
      welcomeMessages: [
        {
          min: 0,
          max: 4,
          description: 'İyi geceler'
        },
        {
          min: 5,
          max: 11,
          description: 'Günaydın'
        },
        {
          min: 12,
          max: 17,
          description: 'İyi öğlenler'
        },
        {
          min: 18,
          max: 24,
          description: 'İyi geceler'
        }
      ]
    }
  }
}
</script>

<template lang="pug">
    .main
        a-row(type="flex", justify="space-between")
            a-col.user(:span="12")
                .avatar 
                    a-avatar(:src="`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`" :size="72")
                .information
                    h2.title {{ this.welcomeMessage }}, {{ user.username }}
                    p.description Son girişiniz {{ moment(user.updatedAt).locale("tr").fromNow() }} gerçekleştirilmiştir.
            a-col(:span="12")
                div.select-guild
                    p.description İşlem gerçekleştirdiğiniz sunucu:
                    a-select(:default-value="`${currentGuild.id}`" showSearch = true style="width: 120px" @click="guildClick" @change="guildChange")
                        a-icon(slot="suffixIcon" type="smile")
                        a-select-option(v-for="guild in guilds" v-if= "guild.type == 1" :key="guild.id" :value="guild.id" :disabled = "guild.id == currentGuild.id")
                          a-avatar(:src="`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=128`" :size="24")
                          |  — {{guild.name}}
</template>

<style lang="scss" scoped>
.main {
  .ant-select {
    width: 50% !important;
  }
  .user {
    display: flex;
    .information {
      margin-left: 10px;
      h2.title {
        color: #fff;
        font-size: 19px;
      }
      p.description {
        color: #fff;
        font-size: 13px;
      }
    }
  }
}
</style>
