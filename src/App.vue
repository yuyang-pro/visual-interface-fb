<template>
  <div id="app">
    <Search/>
    <div style="margin:4em 6em 0em 6em;zoom:0.8">
    <LineUp :data="data" />
    </div>

  </div>
</template>

<script>
import Search from "./components/Search.vue";
//This component is from https://github.com/lineupjs/vue-lineup
import {LineUp} from 'vue-lineup'
import bus from './bus'
import Vue from 'vue'

console.log(Search)
export default {
  name: "app",
  components: {
    Search
  },
  data: () => ({
    data: [],
  }),
  mounted() {
   this.getEventData()
   this.getAddData()
  },
  methods: {
    getEventData() {
      const that = this
      bus.$on('eventFromSearch', function(val){
        for (let i = 0; i < val.length; i++) {
          that.data.push(val[i])
        }
        console.log(that.data)
      })
    },
    getAddData(){
      const that = this
       bus.$on('eventFromAddCabinBag', function(val){
        for (let i = 0; i < val.length; i++) {
          that.data[i].CabinBag=val[i].CabinBag
          Vue.set(that.data,i,that.data[i])
        }
        console.log(that.data)
      })
      bus.$on('eventFromAddCheckedBag', function(val){
        for (let i = 0; i < val.length; i++) {
          that.data[i].CheckedBag1st=val[i].CheckedBag1st
          that.data[i].CheckedBag2nd=val[i].CheckedBag2nd
          Vue.set(that.data,i,that.data[i])
        }
        console.log(that.data)
      })
      bus.$on('eventFromAddChange', function(val){
        for (let i = 0; i < val.length; i++) {
          that.data[i].Change=val[i].Change
          Vue.set(that.data,i,that.data[i])
        }
        console.log(that.data)
      })
      bus.$on('eventFromAddCancellation', function(val){
        for (let i = 0; i < val.length; i++) {
          that.data[i].Cancellation=val[i].Cancellation
          Vue.set(that.data,i,that.data[i])
        }
        console.log(that.data)
      })
      bus.$on('eventFromAddPlaneType', function(val){
        for (let i = 0; i < val.length; i++) {
          that.data[i].PlaneType=val[i].PlaneType
          Vue.set(that.data,i,that.data[i])
        }
        console.log(that.data)
      })
      bus.$on('eventFromAddSeatChoice', function(val){
        for (let i = 0; i < val.length; i++) {
          that.data[i].SeatChoice=val[i].SeatChoice
          Vue.set(that.data,i,that.data[i])
        }
        console.log(that.data)
      })
      bus.$on('eventFromAddSeatPitch', function(val){
        for (let i = 0; i < val.length; i++) {
          that.data[i].SeatPitch=val[i].SeatPitch
          Vue.set(that.data,i,that.data[i])
        }
        console.log(that.data)
      })
      bus.$on('eventFromAddMeal', function(val){
        for (let i = 0; i < val.length; i++) {
          that.data[i].Meal=val[i].Meal
          Vue.set(that.data,i,that.data[i])
        }
        console.log(that.data)
      })
      bus.$on('eventFromAddE', function(val){
        for (let i = 0; i < val.length; i++) {
          that.data[i].Entertainment=val[i].Entertainment
          Vue.set(that.data,i,that.data[i])
        }
        console.log(that.data)
      })
      bus.$on('eventFromAddWifi', function(val){
        for (let i = 0; i < val.length; i++) {
          that.data[i].Wifi=val[i].Wifi
          Vue.set(that.data,i,that.data[i])
        }
        console.log(that.data)
      })
      bus.$on('eventFromAddPower', function(val){
        for (let i = 0; i < val.length; i++) {
          that.data[i].Power=val[i].Power
          Vue.set(that.data,i,that.data[i])
        }
        console.log(that.data)
      })
      this.$forceUpdate()
    }
  }
};
</script>


<style>
</style>