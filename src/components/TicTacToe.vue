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
        {type:'3x3',num:3,solutions:8},
        {type:'4x4',num:4,solutions:10},
        {type:'5x5',num:5,solutions:12}
      ],
      players: [
        {playerType:'X',moves:[]},
        {playerType:'O',moves:[]}
      ],
      helper:false,
      playsFirst: 'user',
      winningStream:{}
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
      this.generateWinningStream();
    },
    generateWinningStream: function(){
      var numOfWinningCombinations = 0;
      var cnt = 0;
      var helperArray = [];
      for(var o = 0;o<=this.boardSize.length;o++){
        for(var property in this.boardSize[o]){
          if(property == 'num')
          if(this.boardSize[o].num==this.selected)
          numOfWinningCombinations = this.boardSize[o].solutions;
        }
      }
        for(var t = 0; t<numOfWinningCombinations;t++){
        this.winningStream[t]=[];
        switch(true){
          case (t == 0):
          for(var k = 0; k<this.selected;k++){
            this.winningStream[t][k]=document.getElementsByTagName('tr')[k].childNodes[k];
          }
          break;
          case (t == 1):
          var j = 2;
          loop:
          for(var k = 0; k<this.selected;k++){
            while(j>=0){
              this.winningStream[t][k]=document.getElementsByTagName('tr')[k].childNodes[j];
              j--;
              continue loop;
            }
          }
          break;
          case (t <= (this.selected+1)):
          for(var k = 0; k<this.selected;k++){
              this.winningStream[t][k]=document.getElementsByTagName('tr')[t-2].childNodes[k];
          }
          break;
          default:



            for(var n = 0; n<this.selected;n++){
              console.log(document.getElementsByTagName('tr')[cnt].childNodes[n]);
              helperArray.push(document.getElementsByTagName('tr')[cnt].childNodes[n])
              //break;
            }
            cnt++;
          break;
        }

      }
      console.log(helperArray);
      var w= numOfWinningCombinations-this.selected;
      for(var p=0;p<this.selected;p++){
        this.winningStream[w]
        w++;
      }
      console.log(this.winningStream);
    }
  },
  mounted:function(){
        this.generateWinningStream();
  },
}
</script>
