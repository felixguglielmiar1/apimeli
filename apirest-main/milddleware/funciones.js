
var {InsertaOrdenes,InsertaOrdenesItems, InsertaInformacionFacturacion,InsertaInformacionEnvios,modificaUltimaModificacion,treatimeRefreshT,treaexpiresin,treaTokenRef,treaClientID,treaSecretKey,modificaToken,modificaTokenRef,modificaTiempoExp,modificatimeRefreshT,traefechaActual,traefechaUltimaOrden, modificaOrderRecorridas}=require('../consultas')
const axios = require('axios').default
var config=require('../milddleware/config').config
var needle = require('needle')

async function  recorreJSON(resultado,fechaConsulta,tokenc,grabaFechaActualizacion){
 // console.log(resultado)
      var ordenesRecorridas,ordernesGuardadas
      ordenesRecorridas=0
      ordernesGuardadas=0
    if (typeof resultado === "undefined" || typeof resultado=== "NULL") {}else{
    ///recorro orden por orden 
    for (var i in resultado){
      if(typeof resultado[i].id === "undefined" || typeof resultado[i].id=== "NULL"){}else{
      let order_id=resultado[i].id
      let date_created=resultado[i].date_created
      let total_amount=resultado[i].total_amount
      let paid_amount=resultado[i].paid_amount
      let shipping_id_order=resultado[i].shipping.id
      let status_order=resultado[i].status
      let nickname_buyer=resultado[i].buyer.nickname
      let id_buyer=resultado[i].buyer.id
      let fecha_registro=fechaConsulta
      if(typeof shipping_id_order==='undefined'|| typeof shipping_id_order==="NULL"){shipping_id_order=""}
      ordenesRecorridas=ordenesRecorridas+1
    //grabo orden, solo que no este en el sistema, si esta actualiza solo el estado
      let result=await InsertaOrdenes(order_id,date_created,total_amount,paid_amount,shipping_id_order,status_order,nickname_buyer,id_buyer,fecha_registro)
      
      if(result.error=== false){ 
        // voy  a buscar los items de esa orden en el objeto
        let items=resultado[i].order_items
        if(typeof items === "undefined" || typeof items=== "NULL"){}else{

          for (var itm in items){ 
            //recorro la cantidad de items de la orden 
           let title= items[itm].item.title
           let sku= items[itm].item.seller_sku
           let cantidad=items[itm].quantity
           let unitprice=items[itm].unit_price		
           let fullunit_price=items[itm].full_unit_price
           //grabo solo si no estan ya grabado en la base 
           var resultadoItems= await InsertaOrdenesItems(order_id,title,sku,cantidad,unitprice,fullunit_price)
          }
          if(resultadoItems.error=== false){
            ordernesGuardadas=ordernesGuardadas+1
          }
        }
          //hago  request para buscar datos de facturacion con baso a la orden 
          let datos_fatu= await axios({
             method: 'get',
             url:config.datos_faturacion+order_id+'/billing_info' ,
             headers:{"Authorization": 'Bearer '+tokenc},
            }).then(  response  => {
               return response.data
           },error =>{return error})
           
           if(typeof datos_fatu=== "undefined" || typeof datos_fatu=== "NULL"){console.log("sin datos de facturacion")}else{
           if(typeof datos_fatu.billing_info=== "undefined" || typeof datos_fatu.billing_info=== "NULL"){console.log("sin billing_info ")}else{
           if (typeof datos_fatu.billing_info.doc_number === "undefined" || typeof datos_fatu.billing_info.doc_number=== "NULL") {}else{
           try{
            let  infoadicional,STREET_NAME, ZIP_CODE,STATE_NAME,STREET_NUMBER, CITY_NAME,COMMENT,TAXPAYER_TYPE_ID, BUSINESS_NAME, FIRST_NAME, LAST_NAME
            let order_ide=order_id
            let DOC_TYPE=datos_fatu.billing_info.doc_type
            let doc_number=datos_fatu.billing_info.doc_number
            infoadicional=datos_fatu.billing_info.additional_info
           //recorro arreglo con datos de facturacion 
            for (var k in infoadicional){
              if(infoadicional[k].type==='STREET_NAME'){STREET_NAME=infoadicional[k].value}
              if(infoadicional[k].type==='ZIP_CODE'){ZIP_CODE=infoadicional[k].value}
              if(infoadicional[k].type==='STREET_NUMBER'){STREET_NUMBER=infoadicional[k].value}
              if(infoadicional[k].type==='CITY_NAME'){CITY_NAME=infoadicional[k].value}
              if(infoadicional[k].type==='LAST_NAME'){LAST_NAME=infoadicional[k].value}
              if(infoadicional[k].type==='COMMENT'){COMMENT=infoadicional[k].value}
              if(infoadicional[k].type==='STATE_NAME'){STATE_NAME=infoadicional[k].value}
              if(infoadicional[k].type==='FIRST_NAME'){FIRST_NAME=infoadicional[k].value}
              if(infoadicional[k].type==='TAXPAYER_TYPE_ID'){TAXPAYER_TYPE_ID=infoadicional[k].value}
              if(infoadicional[k].type==='BUSINESS_NAME'){BUSINESS_NAME=infoadicional[k].value}
              }
              if(typeof TAXPAYER_TYPE_ID==='undefined'){TAXPAYER_TYPE_ID="consumidor final"}
              if(typeof BUSINESS_NAME==='undefined'){BUSINESS_NAME=" "}
             // console.log(STREET_NAME, ZIP_CODE, STATE_NAME, STREET_NUMBER, CITY_NAME,DOC_TYPE, COMMENT, doc_number,TAXPAYER_TYPE_ID, BUSINESS_NAME, FIRST_NAME, LAST_NAME, order_ide)
              //entro a grabar info, solo graba para ordenes nueva o que no tenieran registros, filtro en sp
              let datosfaturacion=await InsertaInformacionFacturacion(STREET_NAME, ZIP_CODE, STATE_NAME, STREET_NUMBER, CITY_NAME,DOC_TYPE, COMMENT, doc_number,TAXPAYER_TYPE_ID, BUSINESS_NAME, FIRST_NAME, LAST_NAME, order_ide)
              //console.log(datosfaturacion)
            }catch(error){console.log(error)}
            }
          }
        }
          //continu aqui antes de break
    //para ir a buscar la info del envio con el id de la orden o el id del envio  
              //solicita la informacion del envio 
              let datos_envio= await axios({
                method: 'get',
                url:config.informacion_envios+shipping_id_order,
                headers:{"Authorization": 'Bearer '+tokenc},
               }).then(  response  => {
                return response.data
            },error =>{return error})
            if(typeof datos_envio==='undefined'|| typeof datos_envio=="NULL"){console.log("Sin datos de envio")}else{
            if(typeof datos_envio.id==='undefined'|| typeof datos_envio.id==="NULL"){}else{
              let SHIPMENTID,orderid,addressline,streetname,streetnumber,comment_s,zipcode,city_s,stateshipment,neighborhood_s,  municipality_s,datecreated,statusshipment
             try{
              SHIPMENTID=datos_envio.id
              orderid=datos_envio.order_id
              addressline=datos_envio.receiver_address.address_line
              streetname=datos_envio.receiver_address.street_name
              streetnumber=datos_envio.receiver_address.street_number
              comment_s=datos_envio.receiver_address.comment
              zipcode=datos_envio.receiver_address.zip_code
              city_s=datos_envio.receiver_address.city.name
              stateshipment=datos_envio.receiver_address.state.name
              neighborhood_s=datos_envio.receiver_address.neighborhood.name
              municipality_s=datos_envio.receiver_address.municipality.name
              datecreated=datos_envio.date_created
              statusshipment=datos_envio.status
             // console.log(SHIPMENTID,orderid,addressline,streetname,streetnumber,comment_s,zipcode,city_s,stateshipment,neighborhood_s,  municipality_s,datecreated,statusshipment)
              let result= await InsertaInformacionEnvios(SHIPMENTID,orderid,addressline,streetname,streetnumber,comment_s,zipcode,city_s,stateshipment,neighborhood_s,  municipality_s,datecreated,statusshipment)
             // console.log(result)
             }catch(error){console.log(error)}
            }
          }
        
        
    }else{}
    
       
    }
    }///termina el for anterion pero sigue dentro de la comprobacion de que no sea undefined 
    console.log(grabaFechaActualizacion,ordenesRecorridas,ordernesGuardadas)
      if(grabaFechaActualizacion==='s'){
        if(ordenesRecorridas===ordernesGuardadas){
          //guardo como ultima fecha de actualizacion la fecha de creacion de la orden mas reciente
          fechaUltimaOrden= await traefechaUltimaOrden()
          await modificaUltimaModificacion(fechaUltimaOrden)
          await modificaOrderRecorridas(ordenesRecorridas)
          //meli solo deveuelve 51 registros, con este dato puedo comparar si apesar del rango de fechas en necesario realizar
          //otro request a la api de meli o si el mismo es menor a 51 es por que todas las ordenes ya se encuentran en el servidor local
        }
      }
  }
  }
  async function componeFechaActual(){
    var dia,mes,ano,hora,minutos
     let fechaservidor= await traefechaActual()
   //  console.log(fechaservidor)
     let fechaYhora= fechaservidor.split(' ')
  //   console.log(fechaYhora)
     let fechaCompleta=fechaYhora[0].split('-')
    // console.log(fechaCompleta)
     ano=fechaCompleta[0]
     mes=fechaCompleta[1]
     dia=fechaCompleta[2]
     let horaCompleta=fechaYhora[1].split(':')
     hora=horaCompleta[0]
     minutos=horaCompleta[1]
    //2015-07-31T00:00:00.000-00:00
  //var fechayhora= new Date()
  //let diadelano= fechayhora.getDate()
  //if(diadelano<10){
   //'' dia='0'+diadelano
  //}else{dia=diadelano}
  //let mesdelano=fechayhora.getMonth()+1
   // if (mesdelano<10){
    //   mes='0'+mesdelano}else{
     //    mes=mesdelano
    //}
  //let ano=fechayhora.getFullYear()
  //let horadeldia=fechayhora.getHours()
  //if(horadeldia<10){hora='0'+horadeldia}else{hora=horadeldia}
  var fechaActual=ano+'-'+mes+'-'+dia+'T'+hora+':'+minutos+':00.000-04:00'
  return  fechaActual 
  }
//funcion que actuliza el token, si este esta por vencer
  async function actualizaTokenAuth(){
  let expirein, timerefh,tiempoTrascurrido
 expirein = await treaexpiresin()
 //console.log(expirein)
 timerefh = await treatimeRefreshT()
 datoNow=Date.now()
 tiempoTrascurrido=(datoNow-timerefh)*0.001
 expriracion=expirein-30
// console.log(tiempoTrascurrido)
 console.log(tiempoTrascurrido>=expriracion)
if(tiempoTrascurrido>=expriracion){
  await renuevaToken()
  return true 
}else{return false}
}
async function renuevaToken(){
  var code=  await treaTokenRef()
  var client_id=await treaClientID()
  var secret_key=await treaSecretKey()
  var codeAut='refresh_token'
  var options = {
      headers: { accept: 'application/json', content_type: 'application/x-www-form-urlencoded'},
      grant_type: codeAut,
      client_id: client_id,
      client_secret: secret_key,
      refresh_token: code
     }
  
  try{
    await needle.request('post', config.oauth_url, options, { json: true }, async (err, resp) =>{
      if(err){ 
          console.log(resp.body)
          
      }else{
        if (resp.body.access_token){
          if (typeof resp.body.access_token === "undefined" || typeof resp.body.access_token === "NULL") {
            console.log(resp.body)
        
          }else{
        console.log('entro a grabar->')
        await modificaToken(resp.body.access_token)
        await modificaTokenRef(resp.body.refresh_token)
        await modificaTiempoExp(resp.body.expires_in) 
        await modificatimeRefreshT()
      
          }
      }else{console.log(resp.body)
     
          }
    }
    }) 
    }catch(e){console.log(resp.body)
      
      }
}

  module.exports={recorreJSON,componeFechaActual,actualizaTokenAuth}