<template>
  <div id="app">
    <div id="busca" v-if="!isBuscando">
      <form>
          <div>
            <label>Nome cidade</label>
            <input type="text" placeholder="Informe o nome da cidade que deseja buscar" v-model="busca"/>
          </div>
          <button type="button" @click="buscarCidade(busca)">Buscar</button>
      </form>  
    </div>
    <div id="dados" v-if="dados !== null && !isBuscando">
      <div id="location" v-if="!isBuscar">
        <div>
            <h1>
                <i class='fas fa-map-marker-alt' style='font-size:28px'></i>
                {{dados.city}}
            </h1>
            <h2>
                <i class='fas fa-temperature-high' style='font-size:20px'></i>
                {{dados.temp}}&#8451;
            </h2>
            <h3>{{dados.description}}</h3>
        </div>
        <div>
            <div>
                <p>
                    <span>
                        <i class='fas fa-burn' style='font-size:17px'></i>
                        Umidade: 
                    </span>
                    <span>{{dados.humidity}}&#37;</span>
                </p>
            </div>
            <div>
                <p>
                    <span>
                        <i class='fas fa-wind' style='font-size:17px'></i>
                        Vento: 
                    </span>
                    <span>{{dados.wind_speedy}}</span>
                </p>
            </div>
            <div>
                <p>
                    <span>
                        <i class='fas fa-temperature-low' style='font-size:17px'></i>
                        Temperatura mínimo: 
                    </span>
                    <span>{{getTemperaturaMinima(dados.date)}}&#8451;</span>
                </p>
            </div>
            <div>
                <p>
                    <span>
                        <i class='fas fa-temperature-high' style='font-size:17px'></i>
                        Temperatura máxima: 
                    </span>
                    <span>{{getTemperaturaMaxima(dados.date)}}&#8451;</span>
                </p>
            </div>
        </div>
      </div>
      <div>
          <div id="forecast">
              <div v-for="item in dados.forecast" :key="item.weekday">
                  <h3>{{item.weekday}} - {{item.date}}</h3>
                  <p>{{item.description}}</p>
                  <p>
                      <span>
                          <i class='fas fa-temperature-low' style='font-size:17px'></i>
                          &nbsp;
                          {{item.min}}&#8451;
                      </span>
                  </p>
                  <p>
                      <span>
                          <i class='fas fa-temperature-high' style='font-size:17px'></i>
                          &nbsp;
                          {{item.max}}&#8451;
                      </span>
                  </p>
              </div>
          </div>    
      </div>
    </div>
    <div id="buscando" v-if="isBuscando && !isErro">
      <p>Buscando dados..</p>
    </div>
    <div id="erro" v-if="isErro">
      <p>{{erro.data.message}}</p>
    </div>
  </div>
</template>


<script>
  import api from './services/api'
  
  export default {
    name: 'App',
    data(){
      return {
        isBuscando: false,
        isErro: false,
        //dados: null,
        dados: {
          "temp": 18,
            "date": "18/11/2021",
            "time": "23:47",
            "condition_code": "28",
            "description": "Tempo nublado",
            "currently": "dia",
            "cid": "",
            "city": "São Paulo, SP",
            "img_id": "28n",
            "humidity": 89,
            "wind_speedy": "2.57 km/h",
            "sunrise": "05:12 am",
            "sunset": "06:30 pm",
            "condition_slug": "cloudly_night",
            "city_name": "São Paulo",
            "forecast": [
              {
                "date": "18/11",
                "weekday": "Qui",
                "max": 22,
                "min": 19,
                "description": "Chuva",
                "condition": "rain"
              },
              {
                "date": "19/11",
                "weekday": "Sex",
                "max": 19,
                "min": 17,
                "description": "Chuva",
                "condition": "rain"
              },
              {
                "date": "20/11",
                "weekday": "Sáb",
                "max": 17,
                "min": 15,
                "description": "Chuvas esparsas",
                "condition": "rain"
              },
              {
                "date": "21/11",
                "weekday": "Dom",
                "max": 22,
                "min": 14,
                "description": "Chuvas esparsas",
                "condition": "rain"
              },
              {
                "date": "22/11",
                "weekday": "Seg",
                "max": 28,
                "min": 14,
                "description": "Tempo nublado",
                "condition": "cloudly_day"
              },
              {
                "date": "23/11",
                "weekday": "Ter",
                "max": 31,
                "min": 17,
                "description": "Parcialmente nublado",
                "condition": "cloud"
              },
              {
                "date": "24/11",
                "weekday": "Qua",
                "max": 33,
                "min": 20,
                "description": "Tempo nublado",
                "condition": "cloudly_day"
              },
              {
                "date": "25/11",
                "weekday": "Qui",
                "max": 27,
                "min": 21,
                "description": "Chuvas esparsas",
                "condition": "rain"
              },
              {
                "date": "26/11",
                "weekday": "Sex",
                "max": 26,
                "min": 20,
                "description": "Chuva",
                "condition": "rain"
              },
              {
                "date": "27/11",
                "weekday": "Sáb",
                "max": 19,
                "min": 16,
                "description": "Chuva",
                "condition": "rain"
              }
            ],
            "latitude": -23.5329,
            "longitude": -46.6395
        },
        erro: null
      }
    },
    methods: {
      getTemperaturaMaxima(dados){
          if(dados !== undefined){
              let dados_array = dados.split("/")
              let temperatura = 0
              
              let dados_item = (dados_array[0] + '/' + dados_array[1])
              this.dados.forecast.forEach((item) => {
                  if(item.date == dados_item){
                      temperatura = item.max
                  }
              })
              
              return temperatura
          } 
      },

      getTemperaturaMinima(dados){
          if(dados !== undefined){
              let dados_array = dados.split("/")
              let temperatura = 0
              
              let dados_item = (dados_array[0] + '/' + dados_array[1])
              this.dados.forecast.forEach((item) => {
                  if(item.date == dados_item){
                      temperatura = item.min
                  }
              })
              
              return temperatura
          } 
      },
      
      buscarCidade(cidade){
          this.isBuscando = true
          this.dados = null
          api.findCidade(cidade).then((res) => {
              this.dados = res.data.results
              console.log(this.cidade)
              this.isBuscando = false
              this.busca = ''
          }).catch((err) => {
            this.isErro = true
            this.erro = err.response
          })
      }
    },
    created(){
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
        api.getDataByLocalizacao(position.coords.latitude, position.coords.longitude).then((res) => {
          this.dados = res.data.results
        }).catch((err) => {
          this.isErro = true
          this.erro = err.response
          console.log(this.erro)
        })
      })
    }
  }
</script>

<style scoped>
    #app {
        width: 100%;
        display: flex;
        gap:10px;
        flex-direction: column;
        align-items: center;
    }

    #dados {
      display:flex;
      flex-direction: column;
      gap:10px;
    }

    #location {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    #location > div > h1 {
        font-family: Abel-Regular;
    }

    #location > div > h2 {
        font-family: Abel-Regular;
    }
    
    #location > div > h3 {
        font-family: Abel-Regular;
    }
    
    #location > div > div > p {
        font-family: Cabin-Regular;
    }

    #location div > div > p :first-child{
        font-weight: 600;
    }

    #forecast {
        display:grid;
        grid-template-areas: 'div div div div';
        grid-template-columns: 25% 25% 25% 25%;
        align-items: center;
        text-align: center;
    }

    #forecast > div > h3 {
        font-family: Cabin-Regular;   
    }

    #forecast > div > p {
        font-family: Abel-Regular;
    }

    #location, #forecast, #busca {
        width: 800px;   
        background-color: white;
        padding:0px 30px 0px 30px;
    }

    #busca {
      display:flex;
      height:150px;
      justify-content: center;
      align-items: center;
      gap:5px;
    }

    #busca > form {
      width:70%;
      font-family: Cabin-Regular;  
    }

    #busca > form > button {
      margin-top:5px;
      padding:8px 15px 8px 15px;
      font-family: Cabin-Regular;  
    }
    
    #busca > form > div {
      display: flex;
      flex-direction: column;
    } 

    #busca > form > div >  input {
      padding:8px;
      font-family: Cabin-Regular;
      outline:0;
    }

    #erro {
      width: 800px;   
      background-color: #bb0000;
      color:white;
      padding:0px 30px 0px 30px;
      font-family: Cabin-Regular;
    }
</style>