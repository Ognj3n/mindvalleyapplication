<style>

</style>
<template>
  <div id="content" class="content">
    <h1>{{this.msg}}</h1>
    <h4>Original json:</h4><a :href=this.jsonUrl target="_blank">{{this.jsonUrl}}</a>
    <hr>
    <h1>Main Data</h1>
    <hr>
      <div id="main_data">
        <img class="pull-left" :src="this.data.main_data.picture"></img><br>
        <div><h5>Name:</h5>{{this.data.main_data.name}}<br></div>
        <div><h5>Title:</h5>{{this.data.main_data.title}}<br></div>
        <div><h5>Address:</h5>
        <div v-for="(address_item,index) in this.data.main_data.address">
          <span v-if="index == 'country'">{{address_item}}</span>
          <span v-else>{{address_item}},</span>
        </div>
        </div>
        <div><h5>Email Address:</h5>{{this.data.main_data.email_address}}<br></div>
        <div><h5>Phone Number:</h5>{{this.data.main_data.phone_number}}<br></div>
        <div><h5>Date of Birth:</h5>{{this.data.main_data.date_of_birth}}<br></div>
        <div><h5>Place of Birth:</h5>{{this.data.main_data.place_of_birth}}<br></div>
      </div>
    <h1>Skills</h1>
    <hr>
    <div id="skills">

      <ul v-for="(skill,index) in this.data.skills">
        <li >{{skill.skill}}</li>

      </ul>
    </div>
    <h1>Employment History</h1>
    <hr>
    <div id="employment_history">

      <div v-for="employment in this.data.employment_history">
        <div><h5>Employment Type:</h5>{{employment.employment_type}}</div>
        <div><h5>Company Name:</h5>{{employment.employer_name}}</div>
        <div><h5>Period:</h5>{{employment.period}}</div>
        <div><h5>Title:</h5>{{employment.title}}</div>
        <div><h5>Location:</h5>{{employment.location}}</div>
        <div>
          <h5>
        Duties:
        </h5>
        <ul v-for="duty in employment.duties">
          <li>{{duty}}</li>
        </ul>
      </div>
        <hr>
      </div>
    </div>
    <h1>Education</h1>
    <hr>
    <div id="education">
      <h3>Formal:</h3>
      <hr>
      <div v-for="(education,index) in this.data.education.formal">


            <div><h5>Institution:</h5>{{education.institution}}</div>
            <div><h5>Period:</h5>{{education.period}}</div>
            <div><h5>Title:</h5>{{education.title}}</div>
            <div><h5>About:</h5>{{education.about}}</div>
            <hr>
      </div>

      <h3>Informal:</h3>
      <hr>
        <div v-for="(education,index) in this.data.education.infomal">


          <div><h5>Institution:</h5>{{education.institution}}</div>
          <div><h5>Period:</h5>{{education.period}}</div>
          <div><h5>Title:</h5>{{education.title}}</div>
          <div><h5>About:</h5>{{education.about}}</div>
          <hr>

      </div>
    </div>

    <h1>Hobbies:</h1>
    <hr>
      <ul v-for="(hobbie,index) in this.data.hobbies">
        <li>{{hobbie.hobby}}</li>

      </ul>
      <hr>
      <ul v-for="(link,index) in this.data.useful_links">
        <h5>{{link.name}}:</h5><li><a :href=link.link target="_blank">{{link.link}}</a></li>

      </ul>
      <hr>
      <h1>To Mindvalley</h1>
      <div>{{this.data.additional_to_mindvally.message}}</div>
      <!--/div-->
    </div>
  </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Ognjen\'s CV',
      data: {},
      jsonUrl : "https://api.myjson.com/bins/uuhs2"
    }
  },beforeMount:function(){
    axios.get(this.jsonUrl)
                        .then(response => {
                             this.data = response.data;

                        })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
