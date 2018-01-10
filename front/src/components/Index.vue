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
        </tr>
        <tr v-for="commune of communes">
          <td>{{commune.Code_postal}}</td>
          <td>{{commune.Nom_commune}}</td>
          <td>{{commune.Code_commune_INSEE}}</td>
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
