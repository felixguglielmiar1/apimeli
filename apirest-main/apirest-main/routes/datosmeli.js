const express= require('express')
const router= express.Router()
const axios = require('axios').default
var config=require('../milddleware/config').config
var {treaToken,treaIDIdentificacion,modificaIdTest,modificanicknameTest,modificastatusTest,modificapasswordTest,modificaIdUser,modificanicknameUser,traeUltimaModificacion, traefechaModificaEstatus}=require('../consultas');
var{recorreJSON,componeFechaActual,actualizaTokenAuth}=require('../milddleware/funciones')
 

router.get('/optenerUsuarioTest', async (req,res)=>{
    var tokenc=  await treaToken()
   
    try{
     axios({
      method: 'post',
      url: config.user_test,
      headers:{"Authorization": 'Bearer '+tokenc, 'Content-Type':'application/json'},
      data: {
        site_id: config.site_id
      }}).then( async response  => {
        
        if(typeof response.data === "undefined" ){console.log("data undefined")}else{
          if (response.data.nickname){
            if (typeof response.data.nickname === "undefined" || typeof response.data.nickname === "NULL") {console.log('Json devulto con formato que no corresponde')}else{
          console.log('entro a grabar->')
          
         await  modificaIdTest(response.data.id)
         await  modificanicknameTest(response.data.nickname)
         await  modificapasswordTest(response.data.password)
         await  modificastatusTest(response.data.site_status)
          console.log('Usuario Test generado')
            }
        }else{console.log("nickname no existe o esta vacio")}
      
      }},error=>{
        console.log(error,'------>','error devuelto al hacer el request')
        })
        res.json({Result: 'request ejecutado, para mas informacion ver logs de API.'})

      }catch(e){console.log(e,'---->','Error capturado')
      res.json({Result: 'Error capturado por bloque, para mas informacion ver logs de API.'})}
      
    })

  
router.get('/optenerDatosMe', async (req,res)=>{
        var tokenc=  await treaToken()
        var urlGet=config.informacion_cuenta
        try{
         axios({
          method: 'get',
          url:urlGet ,
          headers:{"Authorization": 'Bearer '+tokenc},
         }).then(async response => {
        
            if(typeof response.data === "undefined" ){console.log("data undefined")}else{
              if (response.data.nickname){
                if (typeof response.data.nickname === "undefined" || typeof response.data.nickname === "NULL") {console.log('Json devulto con formato que no corresponde')}else{
              console.log('entro a grabar->')
              console.log(response.data.nickname)
             await  modificaIdUser(response.data.id)
             await  modificanicknameUser(response.data.nickname)
                }
            }else{console.log("nickname no existe o esta vacio")}
          
          }
   
        },error =>{console.log(error,'------>','error devuelto al hacer el request')})
        res.json({Result: 'request ejecutado, para mas informacion ver logs de API.'})
      }catch(e){ console.log(e,'---->','Error capturado')
        res.json({Result: 'Error capturado por bloque, para mas informacion ver logs de API.'})}

        })




router.get('/optenerOrdenesDeVentaPorFecha', async (req,res)=>{
             let resultaToken= await actualizaTokenAuth()
             console.log(resultaToken,'-->antes de entrar al if')
             if (resultaToken===false){
              var tokenc=  await treaToken()
              var id_seller=await treaIDIdentificacion()
              var ultimaActualizacion=await traeUltimaModificacion()
              var fechaActual=await componeFechaActual()
              
             // var urlGet= config.ordenes_recientes+id_seller+'&order.date_created.from='+'2021-06-14T07:00:00.000-03:00'+'&order.date_created.to='+'2021-06-14T12:00:00.000-03:00'
            var urlGet= config.ordenes_recientes+id_seller+'&order.date_created.from='+ultimaActualizacion+'&order.date_created.to='+fechaActual
              console.log(urlGet)
              try{
               var resultado=await axios({
                method: 'get',
                url: urlGet,
                headers:{"Authorization": 'Bearer '+tokenc},
               }).then(response => {
                return response.data.results
                
              },error =>{console.log(error)})}catch(e){ console.log(e)}
              //console.log('fuera del request')
              await recorreJSON(resultado,fechaActual,tokenc,'s') 
             //console.log(resultado) 
              res.json({resultado: "ejecutado"})}else{
                res.json({resultado: "Regenerando Token"})
              }
              })
router.get('/optenerOrdenesDeVentaPorId', async (req,res)=>{
                var tokenc=  await treaToken()
                var id_order='4628244178' 
               var urlGet= ' https://api.mercadolibre.com/orders/'+id_order
                console.log(urlGet)
                try{
                 axios({
                  method: 'get',
                  url:urlGet ,
                  headers:{"Authorization": 'Bearer '+tokenc},
                 }).then(response => {
                    var resultado=response.data.order_items[0].item.id
                  //  console.log(resultado)
                },error =>{console.log(error)})}catch(e){ console.log(e)}
               
                res.json({resultado: "ejecutado"})
                })              
router.get('/optenerdatosFacturacion', async (req,res)=>{
                  var tokenc=  await treaToken()
                  var id_order='4628244178' 
                 var urlGet= ' https://api.mercadolibre.com/orders/'+id_order+'/billing_info'
                  console.log(urlGet)
                  try{
                   axios({
                    method: 'get',
                    url:urlGet ,
                    headers:{"Authorization": 'Bearer '+tokenc},
                   }).then(response => {
                      var resultado=response.data.billing_info.additional_info
                      console.log(resultado)
                      for (i in resultado){
                        console.log('----info------')
                        console.log(resultado[i])
                        if (resultado[i].type==='FIRST_NAME'){console.log('entro-----')}

                      }
                      
                    
                  },error =>{console.log(error)})}catch(e){ console.log(e)}
                 
                  res.json({resultado: "ejecutado"})
                  })              
router.get('/optenerdatosEnvio', async (req,res)=>{
                    var tokenc=  await treaToken()
                    var SHIPMENT_ID=''//se optiene de la orden 
                   var urlGet= 'https://api.mercadolibre.com/shipments/'+SHIPMENT_ID
                    console.log(urlGet)
                    try{
                     axios({
                      method: 'get',
                      url:urlGet ,
                      headers:{"Authorization": 'Bearer '+tokenc},
                     }).then(response => {
                        var resultado=response.data
                        console.log(resultado)
                    },error =>{console.log(error)})}catch(e){ console.log(e)}
                   
                    res.json({resultado: "ejecutado"})
                    })    

 router.get('/refrescarEstado', async (req,res)=>{
                     let fechaMod=await traefechaModificaEstatus()
                     if(fechaMod===''){
                      console.log("sin ordenes a actualizar estado") 
                      res.json({resultado: "ejecutado"})
                     }else{
                     console.log('entro',fechaMod)
                     let resultaToken=await actualizaTokenAuth()
                     if (resultaToken===false){
              var tokenc=  await treaToken()
              var id_seller=await treaIDIdentificacion()
              var fechaActual=await componeFechaActual()
              //console.log('token',tokenc)
             // var urlGet= config.ordenes_recientes+id_seller+'&order.date_created.from='+'2021-06-14T07:00:00.000-03:00'+'&order.date_created.to='+'2021-06-14T12:00:00.000-03:00'
            var urlGet= config.ordenes_recientes+id_seller+'&order.date_created.from='+fechaMod+'&order.date_created.to='+fechaActual
              console.log(urlGet)
              try{
               var resultado=await axios({
                method: 'get',
                url: urlGet,
                headers:{"Authorization": 'Bearer '+tokenc},
               }).then(response => {
                return response.data.results
                
              },error =>{console.log(error)})}catch(e){ console.log(e)}
              //console.log('fuera del request')
               await recorreJSON(resultado,fechaActual,tokenc,'n') 
             //console.log(resultado) 
              res.json({resultado: "ejecutado"})}else {

                res.json({resultado: "Regenerando Token"})
              }
 }})
router.get('/prueba', async (req,res)=>{   
  
             //  let fecha= await componeFechaActual()
             //   console.log(fecha,"ahora")
            //    setTimeout(()=>{console.log("3 segundos despues")} ,3000)
            console.log("hacen llamado t")
                res.json({resultado: "ejecutado"})})      

module.exports= router