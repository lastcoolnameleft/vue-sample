<template lang="pug">
<div>
  .container Hello {{bundler}}
    <p><button @click="createRoom">click button to create room</button></p>

    <p>
      <button @click="joinRoom">click button to join room</button>
      <input v-model="gameData.roomName" >
      <p>Room is: {{ gameData.roomName }}</p>
    </p>
    
    <p>
      <button @click="increment">Click to increment</button>
      <input v-model="gameData.i" >
      <p>i is: {{ gameData.i }}</p>
    </p>
</div>
</template>
<script >
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
            this.gameData = data
        },
        customEmit: function (data) {
            console.log('APP:this method was fired by the socket server. eg: io.emit("customEmit", data)')
        },
        disconnect: function(reason) {
            console.log('DISCONNECT! REASON: ' + reason)
        },
        reconnect: function(attemptNumber) {
            console.log('RECONNECT' + attemptNumber)
        },
        reconnecting: function(attemptNumber) {
            console.log('RECONNECTING' + attemptNumber)
        },

    },
 
  data() {
    return {
      gameData: {
        roomName: '',
        i: '',
      },
      bundler: "Parcel",
    };
  },
  methods: {
    createRoom: function(val) {
      // $socket is socket.io-client instance
      this.$socket.emit("createRoom");
    },
    joinRoom: function() {
      // $socket is socket.io-client instance
      this.$socket.emit("joinRoom", this.gameData.roomName);
    },
    increment: function() {
      // $socket is socket.io-client instance
      this.$socket.emit("increment", this.gameData.roomName, this.gameData.i);
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  color: green;
}
</style>
