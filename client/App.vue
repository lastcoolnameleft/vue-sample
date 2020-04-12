<template lang="pug">
<div>
  .container Hello {{bundler}}
    <p><button @click="createRoom">click button to create room</button></p>

    <p>
      <button @click="joinRoom">click button to join room</button>
      <input v-model="joinRoomName" >
      <p>Room is: {{ roomName }}</p>
    </p>
    
    <p>
      <button @click="increment">Click to increment</button>
      <input v-model="count" >
      <p>count is: {{ countUnit }}</p>
    </p>
</div>
</template>
<script >
import { mapGetters, mapState, mapMutations } from 'vuex';

export default {
     sockets: {
        connect: function () {
            console.log('APP:socket connected')
        },
        news: function(data) {
            console.log('APP:received news')
            console.log(data)
        },
        gameData: function(data) {
            console.log('APP:game data')
            console.log(data)
            this.$store.commit('setRoomName', data.roomName)
            this.$store.commit('setCount', data.count)
        },
        customEmit: function (data) {
            console.log('APP:this method was fired by the socket server. eg: io.emit("customEmit", data)')
        },
        reconnect: function () {
            console.log('APP:socket RECONNECTED')
        },

    },
  computed: mapGetters([
    'count', 'countUnit', 'roomName'
  ]),
  data() {
    return {
      bundler: "Parcel",
      joinRoomName: '',
    };
  },
  methods: {
    createRoom: function(val) {
      // $socket is socket.io-client instance
      this.$socket.emit("createRoom");
    },
    joinRoom: function() {
      // $socket is socket.io-client instance
      this.$socket.emit("joinRoom", this.joinRoomName);
    },
    increment: function() {
      // $socket is socket.io-client instance
      this.$socket.emit("increment", this.roomName, this.count);
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  color: green;
}
</style>
