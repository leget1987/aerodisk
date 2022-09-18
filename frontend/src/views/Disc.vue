<template>
    <div>
            <p>Виртуальные диски системы</p>
    <v-data-table
    :headers="headers"
    :items="discs.blockdevices"
    >

    </v-data-table>
        {{discs.blockdevices}}
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'Disc',
  data () {
    return {
      headers: [
        {
          text: 'Название',
          value: 'name'
        },
        {
          text: 'Тип',
          value: 'fstype'
        }
      ]
    }
  },
  created () {
    this.$store.dispatch('Disc/fetchDiscs')
  },
  computed: {
    ...mapState('Disc', ['discs'])
  },
  methods: {
  }
}
</script>
