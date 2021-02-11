<script>
import { mapState } from 'vuex'
import GuildsList from '../../components/dashboard/GuildsList'
import CategoryList from '../../components/dashboard/CategoryList'
import PageHeader from '../../components/dashboard/PageHeader'
export default {
  computed: {
    ...mapState('event', ['currentGuild'])
  },

  components: {
    appGuildsList: GuildsList,
    appCategoryList: CategoryList,
    appPageHeader: PageHeader
  }
}
</script>

<template lang="pug">

#dashboard
  div(v-if="!currentGuild")
    app-guilds-list

  div(v-else)
    app-page-header
    app-category-list

</template>
