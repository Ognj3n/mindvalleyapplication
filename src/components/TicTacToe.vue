<style>

table {
  border-collapse: collapse;
  margin: auto;
  width: 40%;
  table-layout: fixed;
}

td {
  border: 6px solid #222;
}

td:after {
  content: '';
  display: block;
  margin-top: 100%;
}
table tr:first-child td {
  border-top: 0;
}
table tr td:first-child {
  border-left: 0;
}
table tr:last-child td {
  border-bottom: 0;
}
table tr td:last-child {
  border-right: 0;
}
.X {
  background-image: url('../assets/x.png');
  background-size: contain;
  background-repeat: no-repeat;
}
.O {
  background-image: url('../assets/o.png');
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
<template>
  <div class="container">
    <select v-if="choseType" v-model="selected" @change="clear">
      <option v-for="type in boardSize" :value="type.num">{{type.type}}</option>
    </select>
    <h3>{{title}}</h3>
<table id="board">
    <tr v-for="n in selected" :data-position="n">
      <td v-for="m in selected" @click="react" :data-position="m"></td>
    </tr>
  </tbody>
</table>
  </div>
</template>

<script>
export default {
  data (){
    return {
      title: 'Tic Tac Toe',
      selected:3,
      choseType:true,
      boardSize: [
        {type:'3x3',num:3},
        {type:'4x4',num:4},
        {type:'5x5',num:5}
      ],
      players: [
        {playerType:'X',moves:[]},
        {playerType:'O',moves:[]}
      ],
      helper:false,
      playsFirst: 'user'
    }
  },
  methods:{
    react: function(e){
      //meaning field is already played
      if(this.players[0].moves.includes(e.target) || this.players[1].moves.includes(e.target))
      return false;
      var player = this.helper ? 1 : 0;
      this.players[player].moves.push(e.target);
      this.helper = !this.helper;
      e.target.className = this.players[player].playerType;
    },
    clear: function(){
      var selectedTds = document.getElementsByTagName("td");
      for(var o = 0;o<selectedTds.length;o++){
        selectedTds[o].className='';
      }
      this.helper = false;
      for(var u = 0;u<2;u++)
      this.players[u].moves = [];
    }
  }
}
</script>
