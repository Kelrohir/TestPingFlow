<template>
  <div>
    <input 
      name="postal"
      v-model="postal"
      placeholder="Code postal"/>
    <button
      @click="getPostal">
      Search</button>
    <div  v-if="communes && communes.length">
      <table>
        <tr>
          <th>Code postal</th>
          <th>Nom</th>
          <th>Code Insee</th>
          <th>Altitude</th>
          <th>Superficie</th>
        </tr>
        <tr v-for="commune of communes">
          <td>{{commune["Code Postal"]}}</td>
          <td>{{commune.Commune}}</td>
          <td>{{commune["Code INSEE"]}}</td>
          <td>{{commune["Altitude Moyenne"]}}</td>
          <td>{{commune.Superficie}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  data () {
    return {
      postal: '',
      communes: [],
      errors: []
    }
  },
  methods: {
    getPostal (){
      if(this.postal == "")        {
        axios.get('http://localhost:8080/postal').then(response => {
          this.communes = response.data
        })
      }
      else{
        axios.get('http://localhost:8080/'+this.postal).then(response => {
          this.communes = response.data
        })
      }

    }
  },
  created (){
    axios.get('http://localhost:8080/postal').then(response => {
      this.communes = response.data
      console.log(this.communes);
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
