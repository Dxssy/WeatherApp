import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import Iconos from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

export default class Wapp extends Component {
  constructor(props) {
    super(props);
    this.state = {
        //Declaración de variables
        iaVisible:true,
        temperatura:"12",
        textoTemp:"Parcialmente nublado",
        imagenTemp:"",
        viento:"20",
        lluvia:"5",
        sol:"6:34 AM",
        d1: "Lunes",
        temp1: "19",
        imaged1: "",
        d2: "Martes",
        temp2: "23",
        imaged2: "",
        d3: "Miercoles",
        temp3: "22",
        imaged3: "",
        d4: "Jueves",
        temp4: "27",
        image4: "",
        country: "",
        region: "",
        name: "",
        ciudad:"",
    };
  }

  render() {
    //Poner las acciones de los procesos
    const busqueda = () => {
        //para acceder al contenido de la variable es:
        //this.state.isVisible
        //para modificar el valor de la variable es 
        //this.setState({iaVisible:false});
        if(this.state.iaVisible)
            this.setState({iaVisible:false});
        else
            this.setState({iaVisible:true});
        
            let _this=this;

        //Temporalmente poner aqui la prog de axios
        axios.get('http://api.weatherapi.com/v1/forecast.json?key=d0b709249f724622ac2233047243101&q=Guadalajara&days=5&aqi=no&alerts=no&lang=es')
        .then(function (response) {
          // manejar respuesta exitosa
          console.log(response.data.current.temp_c);
          _this.setState({temperatura:response.data.current.temp_c});
          _this.setState({textoTemp:response.data.current.condition.text});
          _this.setState({imagenTemp:response.data.current.condition.icon});
          _this.setState({viento:response.data.current.wind_kph});
          _this.setState({lluvia:response.data.current.humidity});
          _this.setState({sol:response.data.forecast.forecastday[0].astro.sunrise});
          _this.setState({d1:response.data.forecast.forecastday[1].date});
          _this.setState({temp1:response.data.forecast.forecastday[1].day.maxtemp_c});
          _this.setState({imaged1:response.data.forecast.forecastday[1].day.condition.icon})
          _this.setState({d2:response.data.forecast.forecastday[2].date});
          _this.setState({temp2:response.data.forecast.forecastday[2].day.maxtemp_c});
          _this.setState({imaged2:response.data.forecast.forecastday[2].day.condition.icon})
          _this.setState({d3:response.data.forecast.forecastday[3].date});
          _this.setState({temp3:response.data.forecast.forecastday[3].day.maxtemp_c});
          _this.setState({imaged3:response.data.forecast.forecastday[3].day.condition.icon})
          _this.setState({d4:response.data.forecast.forecastday[4].date});
          _this.setState({temp4:response.data.forecast.forecastday[4].day.maxtemp_c});
          _this.setState({imaged4:response.data.forecast.forecastday[4].day.condition.icon})
        })
        .catch(function (error) {
          // manejar error
          console.log(error);
        })
        .finally(function () {
          // siempre sera executado
        }); 
    }
    return (
      <View>
        <ImageBackground source={require('./Imagenes/images/bg.png')}
        style={{height:800}} blurRadius={40}
        > 
            <View
            style={{
                borderWidth:0,
                borderColor:"red",
                width:300,
                height:50,
                borderRadius:40,
                backgroundColor:this.state.iaVisible?"grey":"transparent",
                opacity:0.6,
                marginTop:20,
                marginLeft:25,
            }}>
                <TextInput
                  placeholder='buscar Ciudad'
                  onChangeText={ciudad => this.setState{{ciudad}}}
                  ></TextInput>
            </View>
            <TouchableOpacity onPress={busqueda}>
                <View
                style={{
                    borderWidth:0,
                    borderColor:"red",
                    width:50,
                    height:50,
                    borderRadius:50,
                    backgroundColor:"grey",
                    opacity:0.8,
                    marginTop:-50,
                    marginLeft:275,
                }}>
                    <Iconos name="magnify" size={50}/>
                </View>
            </TouchableOpacity>
            <View>
              <Image source={this.state.imagenTemp===""?require('./Imagenes/images/partlycloudy.png'):{uri:'http:'+this.state.imagenTemp}}
              style={{
                width:200,
                height:200,
                marginTop:40,
                marginLeft:80,
              }}></Image>
              <Text style={{
                color:'white',
                fontSize:55,
                marginTop:10,
                marginLeft:155
              }}>{this.state.temperatura}°</Text>
              <Text style={{
                color:"white",
                fontSize:25,
                textAlign:"center",
              }}>{this.state.textoTemp}</Text>
            </View>

            <View>
              <Image source={require('./Imagenes/icons/wind.png')}
              style={{
                width:30,
                height:30,
                marginTop:50,
                marginLeft:30
              }}></Image>
              <Text style={{
                color:"white",
                fontSize:20,
                fontWeight:800,
                marginTop:-30,
                marginLeft:70
              }}>{this.state.viento} km</Text>
            </View>

            <View style={{
              marginTop:-80,
              marginLeft:120
            }}>
              <Image source={require('./Imagenes/icons/drop.png')}
              style={{
                width:30,
                height:30,
                marginTop:50,
                marginLeft:30
              }}></Image>
              <Text style={{
                color:"white",
                fontSize:20,
                fontWeight:800,
                marginTop:-30,
                marginLeft:70
              }}>{this.state.lluvia} %</Text>
            </View>

            <View style={{
              marginTop:-75,
              marginLeft:220
            }}>
              <Image source={require('./Imagenes/icons/sun.png')}
              style={{
                width:30,
                height:30,
                marginTop:50,
                marginLeft:30
              }}></Image>
              <Text style={{
                color:"white",
                fontSize:20,
                fontWeight:800,
                marginTop:-30,
                marginLeft:70
              }}>{this.state.sol}</Text>
            </View>

            <TouchableOpacity onPress={busqueda}>
                
            </TouchableOpacity>

            <View style={{
              borderWidth:0,
              width:400,
              height:225,
              marginTop:20,
              marginLeft:10
            }}>
                <Iconos name="calendar-blank" size={50} style={{marginLeft:20}}></Iconos>
                <Text style={{
                    color:"white",
                    fontSize:20,
                    fontWeight:800,
                    marginTop:-40,
                    marginLeft:85
                }}>Pronóstico Diario</Text>
                
                <ScrollView horizontal>
                <View>
                <TouchableOpacity style={{
                    borderWidth:0,
                    borderRadius:20,
                    width:125,
                    height:165,
                    marginTop:20,
                    marginLeft:5,
                    backgroundColor:'#114F35'
                }}>
                    <Image source={this.state.imagenTemp===""?require('./Imagenes/images/partlycloudy.png'):{uri:'http:'+this.state.imaged1}}
                style={{
                    width:70,
                    height:70,
                    marginTop:15,
                    marginLeft:27
                }}></Image>
                <Text style={{
                    color:'white',
                    fontSize:14,
                    fontWeight:800,
                    marginTop:5,
                    marginLeft:35
                }}>{this.state.d1}</Text>
                <Text style={{
                    color:'white',
                    fontSize:17,
                    fontWeight:800,
                    marginTop:5,
                    marginLeft:50
                }}>{this.state.temp1}°</Text>
                </TouchableOpacity>

                
                <TouchableOpacity style={{
                    borderWidth:0,
                    borderRadius:20,
                    width:125,
                    height:165,
                    marginTop:-165,
                    marginLeft:135,
                    backgroundColor:'#114F35'
                }}>
                    <Image source={this.state.imagenTemp===""?require('./Imagenes/images/partlycloudy.png'):{uri:'http:'+this.state.imaged2}}
                style={{
                    width:70,
                    height:70,
                    marginTop:15,
                    marginLeft:27
                }}></Image>
                <Text style={{
                    color:'white',
                    fontSize:14,
                    fontWeight:800,
                    marginTop:5,
                    marginLeft:35
                }}>{this.state.d2}</Text>
                <Text style={{
                    color:'white',
                    fontSize:17,
                    fontWeight:800,
                    marginTop:5,
                    marginLeft:50
                }}>{this.state.temp2}°</Text>
                </TouchableOpacity>

              
                <TouchableOpacity style={{
                borderWidth:0,
                borderRadius:20,
                width:125,
                height:165,
                marginTop:-165,
                marginLeft:264,
                backgroundColor:'#114F35'
                }}>
                <Image source={this.state.imagenTemp===""?require('./Imagenes/images/partlycloudy.png'):{uri:'http:'+this.state.imaged3}}
                style={{
                width:70,
                height:70,
                marginTop:15,
                marginLeft:27
                }}></Image>
                <Text style={{
                color:'white',
                fontSize:14,
                fontWeight:800,
                marginTop:5,
                marginLeft:25
                }}>{this.state.d3}</Text>
                <Text style={{
                color:'white',
                fontSize:17,
                fontWeight:800,
                marginTop:5,
                marginLeft:50
                }}>{this.state.temp3}°</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                  borderWidth: 0,
                  borderRadius: 20,
                  width: 125,
                  height: 165,
                  marginTop: -165,
                  marginLeft: 393,
                  marginRight: 20,
                  backgroundColor: '#114F35'
                }}>
                <Image source={this.state.imagenTemp===""?require('./Imagenes/images/partlycloudy.png'):{uri:'http:'+this.state.imaged4}}
                style={{
                width:70,
                height:70,
                marginTop:15,
                marginLeft:27
                }}>
                </Image>
                <Text style={{
                color:'white',
                fontSize:14,
                fontWeight:800,
                marginTop:5,
                marginLeft:25
                }}>{this.state.d4}</Text>
                <Text style={{
                color:'white',
                fontSize:17,
                fontWeight:800,
                marginTop:5,
                marginLeft:50
                }}>{this.state.temp4}°</Text>
                </TouchableOpacity>
                </View>
                </ScrollView>
            </View>
            
        </ImageBackground>
      </View>
    );
  }
}
//Declaración de los estilos 