<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import moment from 'moment'
export default {
  computed: {
    ...mapGetters('event', ['guildLogs']),
    ...mapState('event', ['categories'])
  },
  methods: {
    ...mapActions('event', ['getCategories'])
  },
  created() {
    this.getCategories()
  },
  data() {
    return {
      moment
    }
  }
}
</script>

<template lang="pug">
  #category-list
    a-row(:gutter="[50,50]")
      a-col.information-header(:span="24")
        
      a-col(:span="24")
        h1 Sunucumda neler oluyor?
        a-timeline(pending="Sunucu dinleniyor" :reverse="true")
          a-timeline-item(v-for = "log in guildLogs" :key = "log.id") {{ log }}


      a-col(:span="24")
        h1 Kategoriler
      a-col#log(:span="8" v-for = "category in categories" :key="category._id")
        a-card(:title="`${category.name}`" :bordered="false")
          ul
            li(v-for = "command in category.commands")
              h3 {{ command.name }}
              p {{ command.description }}
              p {{ moment(command.updatedAt).locale("tr").fromNow() }}, {{ command.createdUser.nickname }} tarafından oluşturuldu.
            //- a-affix
            //-     a-card(title="Sunucumda neler oluyor?"  :bordered="false")
            //-         ul(v-for = "log in guildLogs")
            //-             li {{ log }}
                
</template>

<style lang="scss" scoped>
#category-list {
  h1 {
    color: #fff;
    margin-bottom: 0px;
  }
  .ant-timeline {
    color: #fff;
    padding: 10px;
  }
}
#log {
  padding: 0px;
  margin: 0px;
}
</style>
