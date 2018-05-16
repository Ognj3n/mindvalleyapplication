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
    <div v-if="!rolesBool">
    <label>Board size:</label>
    <select  v-model="selected" @change="clear">
      <option v-for="type in boardSize" :value="type.num">{{type.type}}</option>
    </select>
  </div>
    <button @click="clear" v-if="!rolesBool">Reset</button>
    <div v-if="rolesBool">
      <h5>Who plays first?</h5>
      <div @click="whoPlaysFirst('leMe')">Le me</div>
      <div @click="whoPlaysFirst('leScript')">Le script</div>
    </div>
    <div v-if="!rolesBool">
    <h3>{{title}}</h3>
<table id="board">
    <tr v-for="n in selected" :data-position="n">
      <td v-for="m in selected" @click="react" :data-position="m"></td>
    </tr>
  </tbody>
</table>
  </div>
  </div>
</template>

<script>
export default {
  data (){
    return {
      title: 'Tic Tac Toe',
      selected:3,
      choseType:true,
      rolesBool:true,
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
      winningStream:{},
      numOfWinningCombinations:0,
      playsFirst:null,
      movesLeft: 9
    }
  },
  methods:{
    react: function(e){
      console.log(this.movesLeft);
      if(this.movesLeft==1)
      return alert('end');
      //meaning field is already played
      if(this.players[0].moves.includes(e.target) || this.players[1].moves.includes(e.target))
      return false;
      var target = e.target;
      var player = this.helper ? 1 : 0;
      this.players[player].moves.push(target);
      this.helper = !this.helper;
      target.className = this.players[player].playerType;

      this.movesLeft--;
      if(this.helper==this.playsFirst)
      this.playMove();

      //this.checkWinner();

    },
    clear: function(){
      var selectedTds = document.getElementsByTagName("td");
      for(var o = 0;o<selectedTds.length;o++){
        selectedTds[o].className='';
      }
      this.helper = false;
      for(var u = 0;u<2;u++)
      this.players[u].moves = [];
      this.rolesBool=true;
      this.movesLeft = this.selected * this.selected;
      //setTimeout(this.generateWinningStream, 50);
    },
    generateWinningStream: function(){
      var cnt = 0;
      var helperArray = [];
      for(var o = 0;o<=this.boardSize.length;o++){
        for(var property in this.boardSize[o]){
          if(property == 'num')
          if(this.boardSize[o].num==this.selected)
          this.numOfWinningCombinations = this.boardSize[o].solutions;
        }
      }
        for(var t = 0; t<this.numOfWinningCombinations;t++){
        this.winningStream[t]=[];
        switch(true){
          case (t == 0):

          for(var k = 0; k<this.selected;k++){
            this.winningStream[t][k]=document.getElementsByTagName('tr')[k].childNodes[k];
          }
          break;
          case (t == 1):
          var j = this.selected-1;
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

          var table = document.getElementById("board");
          for (var row = 0; row < this.selected; ++row) {
          if (table.rows[row].cells.length > cnt) {
              this.winningStream[t].push(table.rows[row].cells[cnt]);
            }
          }
          cnt++;
          break;
        }
      }
    },
    whoPlaysFirst: function(playa){
      this.rolesBool=false;
      setTimeout(this.generateWinningStream, 50);

      if(playa=='leScript'){
        this.playsFirst= false;
        return setTimeout(this.playMove, 70);
      }
      this.playsFirst= true;
    },
    playMove: function(){
      var el = this.prepareTheMove();
      el.click();
    },
    prepareTheMove: function(){
      var array = this.winningStream;
      var moves = this.players[this.helper ? 1 : 0].moves;
      var objectKeys = Object.keys(array);
      for(var i=0;i<moves.length;i++){
        if(Object.keys(array).length)
        for(var e=0;e<=objectKeys.length;e++){
          //searching only for the possible winning combinations, meaning where only opponent's moves are present
          if (typeof array[objectKeys[e]] != 'undefined')
          if(array[objectKeys[e]].includes(moves[i])){
            delete array[objectKeys[e]];
          }
        }
      }

      var movesOpponent = this.players[!this.helper ? 1 : 0].moves;
      for(var i=0;i<movesOpponent.length;i++){
        //check if there are any opponent moves
        if(Object.keys(array).length){
          for(var e=0;e<=Object.keys(array).reduce((a, b) => array[a] > array[b] ? a : b);e++){
            //searching only for the possible winning combinations, meaning where only opponent's moves are present
            if (typeof array[e] != 'undefined')
            if(array[e].includes(movesOpponent[i])){
              array[e].splice(array[e].indexOf(movesOpponent[i]),1);
            }
          }
        }else{
          //last move when script plays first
          return new Array(document.querySelector("td:not([class])"));
        }
      }

      objectKeys = Object.keys(array);

      var sortable = [];
      for (var key in array) {
        sortable.push(array[key]);
      }

      sortable.sort(function(a, b) {
        return a.length - b.length;
      });
      //check if all elements are the same, then play random
      var length = sortable.length;
      var check = sortable[0].length;
      for(var i=0;i<length;i++) {
        //if not all the moves are same return the most critical one
        if(sortable[i].length!=check && length>1){
          return sortable[0][Math.floor(Math.random()*sortable[0].length)]
        }else if(length==1){
          //returning the last non played field
          return document.querySelector("td:not([class])");
        }

      }
      //return random element
      return sortable[Math.floor(Math.random()*length)][Math.floor(Math.random()*sortable[0].length)]
      //console.log(sortable);
    },
    checkWinner: function(){
      loop:
      for(var i=0;i<2;i++){
        for(var e=0;e<this.numOfWinningCombinations;e++){
          if(this.players[i].moves.sort().join(',') === this.winningStream[e].sort().join(',')){
            alert('winner is '+ this.players[i].playerType);
            break loop;
            this.clear();
          }
        }
      }
    }
  }
}
</script>
