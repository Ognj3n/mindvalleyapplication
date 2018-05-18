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
      stop: false,
      helperWinningStream: {},
      safe:false
    }
  },
  methods:{
    react: function(e){
      if(this.stop==true)
      return false;
      //meaning field is already played
      if(this.players[0].moves.includes(e.target) || this.players[1].moves.includes(e.target))
      return false;
      var target = e.target;
      var player = this.helper ? 1 : 0;
      this.players[player].moves.push(target);
      this.helper = !this.helper;
      target.className = this.players[player].playerType;

      if(this.players[this.helper ? 1 : 0].moves.length+this.players[!this.helper ? 1 : 0].moves.length == 4)
      this.safe = true;

      this.checkWinner();
      if(this.helper==this.playsFirst)
      this.playMove();

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
      this.stop = false;
      this.safe = false;
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
        this.helperWinningStream[t]=[];
        switch(true){
          case (t == 0):

          for(var k = 0; k<this.selected;k++){
            this.winningStream[t][k]=document.getElementsByTagName('tr')[k].childNodes[k];
            this.helperWinningStream[t][k]=document.getElementsByTagName('tr')[k].childNodes[k];
          }
          break;
          case (t == 1):
          var j = this.selected-1;
          loop:
          for(var k = 0; k<this.selected;k++){
            while(j>=0){
              this.winningStream[t][k]=document.getElementsByTagName('tr')[k].childNodes[j];
              this.helperWinningStream[t][k]=document.getElementsByTagName('tr')[k].childNodes[j];
              j--;
              continue loop;
            }
          }
          break;
          case (t <= (this.selected+1)):
          for(var k = 0; k<this.selected;k++){
              this.winningStream[t][k]=document.getElementsByTagName('tr')[t-2].childNodes[k];
              this.helperWinningStream[t][k]=document.getElementsByTagName('tr')[t-2].childNodes[k];
          }
          break;
          default:

          var table = document.getElementById("board");
          for (var row = 0; row < this.selected; ++row) {
          if (table.rows[row].cells.length > cnt) {
              this.winningStream[t].push(table.rows[row].cells[cnt]);
              this.helperWinningStream[t].push(table.rows[row].cells[cnt]);
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

      if(typeof el=='object' && Object.keys(el).length==1){
        el[0].click();
      }

      el.click();
    },
    prepareTheMove: function(){

      var array = this.winningStream;

      //check if it's first move for opponent
      if(this.helper==this.playsFirst && document.getElementsByClassName("X").length==1 && this.selected!=4 && this.playsFirst==true){
        //check if user played on diagonal fields and not the central element
        if((array[0].includes(document.getElementsByClassName("X")[0]) || array[1].includes(document.getElementsByClassName("X")[0])) && (!(array[0].includes(document.getElementsByClassName("X")[0]) && array[1].includes(document.getElementsByClassName("X")[0]))))
        {
          return array[0].filter(function(n) {
            return array[1].indexOf(n) > -1;
          })[0];
      }else if((array[0].includes(document.getElementsByClassName("X")[0]) && array[1].includes(document.getElementsByClassName("X")[0]))){

         var first = Math.floor(Math.random()*2);
         var second = array[first].splice(Math.round(this.selected/2)-1,1);
         return array[first][Math.round(Math.random()*(array[first].length-1))];
         //return array[first][0];
      }
      }

      var moves = this.players[this.helper ? 1 : 0].moves;
      var objectKeys = Object.keys(array);

      Array.prototype.diff = function(a) {
        return this.filter(function(i) {return a.indexOf(i) < 0;});
      };

      //if user is playing first and either of diagonals is played within first three moves, do cross
      if(this.playsFirst==true && this.selected==3 && this.safe==false){
        var help = [];
        var helpCross = [];
        for(var g=0;g<Object.keys(this.helperWinningStream).length;g++){
          if(g>1 && this.helperWinningStream[g].includes(document.getElementsByClassName("O")[0]))
          helpCross.push(this.helperWinningStream[g]);
          innerloop:
          for(var k=0;k<this.helperWinningStream[g].length;k++){
            if(this.helperWinningStream[g][k].classList.value==''){
              help.push(g.toString());
              break innerloop;
            }
          }
        }
        var diff = Object.keys(this.helperWinningStream).diff(help);

        if(diff.length==1 && (parseInt(diff[0])==0 || parseInt(diff[0])==1)){

          helpCross[0].splice(1,1);

          helpCross[1].splice(1,1);

          var rand = Math.round(Math.random()*1);

          this.safe = true;
          return helpCross[rand][rand];
        }

      }

      //check if there is a winning move for the script

      for(var i = 0;i<Object.keys(this.helperWinningStream).length;i++){

        if(typeof this.helperWinningStream[i] != 'undefined')
        if(this.helperWinningStream[i].diff(moves).length==1){

          for(var g=0;g<this.helperWinningStream[i].length;g++){
              if(this.helperWinningStream[i][g].classList.value==''){
                return this.helperWinningStream[i][g];

              }
          }
        }
      }

      for(var i=0;i<moves.length;i++){
        if(Object.keys(array).length)
        for(var e=0;e<=objectKeys.length;e++){
          //searching only for the possible winning combinations, meaning where only opponent's moves are present
          if (typeof array[objectKeys[e]] != 'undefined'){
            if(array[objectKeys[e]].includes(moves[i])){
              delete array[objectKeys[e]];
            }
          }
        }
      }


      var movesOpponent = this.players[!this.helper ? 1 : 0].moves;

      for(var i=0;i<movesOpponent.length;i++){
        //check if there are any opponent moves
        if(Object.keys(array).length){
          for(var e=0;e<=objectKeys.length;e++){
            //searching only for the possible winning combinations, meaning where only opponent's moves are present
            if (typeof array[objectKeys[e]] != 'undefined')
            if(array[objectKeys[e]].includes(movesOpponent[i])){
              array[objectKeys[e]].splice(array[objectKeys[e]].indexOf(movesOpponent[i]),1);
            }
          }
        }else{
          //last move when script plays first
          return new Array(document.querySelector("td:not([class])"));
        }
      }


      for(var i = 0;i<Object.keys(this.helperWinningStream).length;i++){

        if(typeof this.helperWinningStream[i] != 'undefined')
        if(this.helperWinningStream[i].diff(movesOpponent).length==1){

          for(var g=0;g<this.helperWinningStream[i].length;g++){
              if(this.helperWinningStream[i][g].classList.value==''){
                return this.helperWinningStream[i][g];

              }
          }
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
    },
    checkWinner: function(){

        for(var e=0;e<Object.keys(this.helperWinningStream).length;e++){
          var holdMoves = [];
          var lengthO = this.helperWinningStream[e].length;
          for(var g=0;g<lengthO;g++){
            holdMoves.push(this.helperWinningStream[e][g].classList.value);
          }
          var first = holdMoves[0];
          if(holdMoves.every(function(element) {
            if(element=='' || element==null || element=='undefined')
            return false;
            return element === first;
          })){
            alert('winner is '+ first);
            this.stop = true;
          }

        }

    }
  }
}
</script>
