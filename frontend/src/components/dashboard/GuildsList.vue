<script>
import {mapState} from 'vuex'

export default {
  computed:{
        ...mapState("auth",["guilds"]),
  }
}
</script>

<template lang="pug">
  a-row(type="flex" justify="center" :gutter="[50,30]")
    a-col.information(span="13")
      h1
        | Yönetici Olduğunuz Sunucular
      a-alert(message="Panele erişmek için sunucu seçmeniz gerekmektedir." type="warning" show-icon)

    a-col.server(span="13" v-for = "guild in guilds" v-if="guild.type != 0" :key = "guild.id" )
        div.head
          a-avatar(v-if="guild.icon" :src="`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=128`")
          div.body
            h4
              | {{ guild.name }}
        div.buttons
          router-link(:to="`/dashboard/${guild.id}`" v-if = "guild.type == 1")
            a-button.go-panel(type="primary" icon="setting") Yönetim paneli
          a-button.add-server(
            ghost
            icon="plus-circle"
            target="_blank"
            :href="`https://discord.com/oauth2/authorize?client_id=792357940383842314&permissions=8&guild_id=${guild.id}&scope=bot`"
            v-if = "guild.type == 2" ) Sunucuya ekle
           
</template>

<style scoped lang="scss">
@import 'public/assets/scss/global';


.information{
  padding:0px  !important;
}
h1 {
  text-align: center;
  color:#fff;
}
.server {
  display:flex;
  justify-content: space-between;
  border:1px dashed $btn-color2;
  margin-top:10px;
  .head {
    display:flex;
    justify-content: flex-start;
    .body {
      margin-left:10px;
      margin-top:3px;
      h4 {
        color:white;
      }
    }
  }
  .buttons {
    .go-panel {
      border-color:$btn-color2;
      background:$btn-color2;
      &:hover{
        background:$btn-color2-hover;
      }


    }
    .add-server {
      color:#fff;
      &:hover{
        border-color:$btn-color2;
        color:$btn-color2;
      }
      &:focus{
        border-color:#fff;
      }
    }
  }
}
</style>