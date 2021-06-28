const rest=require('./coneccionSQL')


function insertarCodigo(CODIGO) {  

  const result =  rest.rest.executeQuery(
    `
    update config set valor_cfg=@cod
    where grupo_cfg='AUTENTICACION' and clave_cfg='CODIGO'
        `,
        [{
            name: 'cod',
            type: 'varchar',
            value: CODIGO
        }]

    )
    console.log("QUERY RESULT: ", result.data)
  } 

  async function  modificaToken(Token) {  

    const result = await rest.rest.executeQuery(
      `
      update config set valor_cfg=@Token
      where grupo_cfg='AUTENTICACION' and clave_cfg='access_token'
          `,
          [{
              name: 'Token',
              type: 'varchar',
              value: Token
          }]
  
      )
      console.log("QUERY RESULT: ", result.data)
    } 

    async function modificaTokenRef(Token) {  

      const result =  await rest.rest.executeQuery(
        `
        update config set valor_cfg=@Token
        where grupo_cfg='AUTENTICACION' and clave_cfg='refresh_token'
            `,
            [{
                name: 'Token',
                type: 'varchar',
                value: Token
            }]
    
        )
        console.log("QUERY RESULT: ", result.data)
      } 
 async function modificatimeRefreshT() {  

        const result =  await rest.rest.executeQuery(
          `
          update config set valor_cfg=@time
          where grupo_cfg='AUTENTICACION' and clave_cfg='timeRefreshT'
              `,
              [{
                  name: 'time',
                  type: 'varchar',
                  value: Date.now()
              }]
      
          )
          console.log("QUERY RESULT: ", result.data)
        } 
      async  function modificaTiempoExp(time) {  

        const result =  await rest.rest.executeQuery(
          `
          update config set valor_cfg=@time
          where grupo_cfg='AUTENTICACION' and clave_cfg='expires_in'
              `,
              [{
                  name: 'time',
                  type: 'varchar',
                  value: time
              }]
      
          )
          console.log("QUERY RESULT: ", result.data)
        } 
        async function   treaToken(){
          const result =  await rest.rest.executeQuery(
            `
           select valor_cfg from config
            where grupo_cfg=@AUTENTICACION and clave_cfg=@access
                `,
                [{
                    name: 'AUTENTICACION',
                    type: 'varchar',
                    value: 'AUTENTICACION'
                },{
                  name: 'access',
                  type: 'varchar',
                  value: 'access_token'
              }]
            )
            
            var access=String(result.data[0][0].valor_cfg)
            return access
        }

        async function   treaTokenRef(){
          const result =  await rest.rest.executeQuery(
            `
           select valor_cfg from config
            where grupo_cfg=@AUTENTICACION and clave_cfg=@refresh
                `,
                [{
                    name: 'AUTENTICACION',
                    type: 'varchar',
                    value: 'AUTENTICACION'
                },{
                  name: 'refresh',
                  type: 'varchar',
                  value: 'refresh_token'
              }]
            )
            
            var refresh=String(result.data[0][0].valor_cfg)
            return refresh
        }


 async function   treatimeRefreshT(){
          const result =  await rest.rest.executeQuery(
            `
           select valor_cfg from config
            where grupo_cfg=@AUTENTICACION and clave_cfg=@timeRefreshT
                `,
                [{
                    name: 'AUTENTICACION',
                    type: 'varchar',
                    value: 'AUTENTICACION'
                },{
                  name: 'timeRefreshT',
                  type: 'varchar',
                  value: 'timeRefreshT'
              }]
            )
            
            var refresh=String(result.data[0][0].valor_cfg)
            return refresh
        }
async function   treaexpiresin(){
  
          const result =  await rest.rest.executeQuery(
            `
           select valor_cfg from config
            where grupo_cfg=@AUTENTICACION and clave_cfg=@expiresin
                `,
                [{
                    name: 'AUTENTICACION',
                    type: 'varchar',
                    value: 'AUTENTICACION'
                },{
                  name: 'expiresin',
                  type: 'varchar',
                  value: 'expires_in'
              }]
            )
           
            var refresh=String(result.data[0][0].valor_cfg)
            return refresh
        }
          
 async function   traerCodigo(){
    const result =  await rest.rest.executeQuery(
      `
     select valor_cfg from config
      where grupo_cfg=@AUTENTICACION and clave_cfg=@clave
          `,
          [{
              name: 'AUTENTICACION',
              type: 'varchar',
              value: 'AUTENTICACION'
          },{
            name: 'clave',
            type: 'varchar',
            value: 'CODIGO'
        }]
      )
      
      var CODIGOseg=String(result.data[0][0].valor_cfg)
      return CODIGOseg
      
  }
  async function   traerUsuarioTest(){
    const result =  await rest.rest.executeQuery(
      `
     select valor_cfg from config
      where grupo_cfg=@TEST and clave_cfg=@nickname
          `,
          [{
              name: 'TEST',
              type: 'varchar',
              value: 'TEST'
          },{
            name: 'nickname',
            type: 'varchar',
            value: 'nickname'
        }]
      )
      
      var nickname=String(result.data[0][0].valor_cfg)
      return nickname
      
  }
  async function   traerPasswordTest(){
    const result =  await rest.rest.executeQuery(
      `
     select valor_cfg from config
      where grupo_cfg=@TEST and clave_cfg=@password
          `,
          [{
              name: 'TEST',
              type: 'varchar',
              value: 'TEST'
          },{
            name: 'password',
            type: 'varchar',
            value: 'password'
        }]
      )
      
      var password=String(result.data[0][0].valor_cfg)
      return password
      
  }
  async function   traeridTest(){
    const result =  await rest.rest.executeQuery(
      `
     select valor_cfg from config
      where grupo_cfg=@TEST and clave_cfg=@id
          `,
          [{
              name: 'TEST',
              type: 'varchar',
              value: 'TEST'
          },{
            name: 'id',
            type: 'varchar',
            value: 'id'
        }]
      )
      
      var id=String(result.data[0][0].valor_cfg)
      return id
      
  }
  async function   treaClientID(){
    const result =  await rest.rest.executeQuery(
      `
     select valor_cfg from config
      where grupo_cfg=@AUTENTICACION and clave_cfg=@clientid
          `,
          [{
              name: 'AUTENTICACION',
              type: 'varchar',
              value: 'AUTENTICACION'
          },{
            name: 'clientid',
            type: 'varchar',
            value: 'client_id'
        }]
      )
      
      var clientId=String(result.data[0][0].valor_cfg)
      return clientId
  }

  async function   treaIDIdentificacion(){
    const result =  await rest.rest.executeQuery(
      `
     select valor_cfg from config
      where grupo_cfg=@IDENTIFICACION and clave_cfg=@clientid
          `,
          [{
              name: 'IDENTIFICACION',
              type: 'varchar',
              value: 'IDENTIFICACION'
          },{
            name: 'clientid',
            type: 'varchar',
            value: 'id'
        }]
      )
      
      var clientId=String(result.data[0][0].valor_cfg)
      return clientId
  }

  async function   treaSecretKey(){
    const result =  await rest.rest.executeQuery(
      `
     select valor_cfg from config
      where grupo_cfg=@AUTENTICACION and clave_cfg=@SecretKey
          `,
          [{
              name: 'AUTENTICACION',
              type: 'varchar',
              value: 'AUTENTICACION'
          },{
            name: 'SecretKey',
            type: 'varchar',
            value: 'secret_key'
        }]
      )
      
      var SecretKey=String(result.data[0][0].valor_cfg)
      return SecretKey
  }
  async function   traeRedirect(){
    const result =  await rest.rest.executeQuery(
      `
     select valor_cfg from config
      where grupo_cfg=@AUTENTICACION and clave_cfg=@Redirect
          `,
          [{
              name: 'AUTENTICACION',
              type: 'varchar',
              value: 'AUTENTICACION'
          },{
            name: 'Redirect',
            type: 'varchar',
            value: 'redirect_uri'
        }]
      )
      
      var Redirect=String(result.data[0][0].valor_cfg)
      return Redirect
  }
  async function   traeUltimaModificacion(){
    const result =  await rest.rest.executeQuery(
      `
     select valor_cfg from config
      where grupo_cfg=@CONTROL and clave_cfg=@ultima
          `,
          [{
              name: 'CONTROL',
              type: 'varchar',
              value: 'CONTROL'
          },{
            name: 'ultima',
            type: 'varchar',
            value: 'ultima_actualizacion'
        }]
      )
      
      var ultima=String(result.data[0][0].valor_cfg)
      return ultima
  }
async function   traefechaModificaEstatus(){
    const result =  await rest.rest.executeQuery(
      `
     select TOP 1 date_created from dbo.ordenes
     where status_order NOT IN ('paid', 'cancelled')
     ORDER BY date_created asc
          `
      )
      if (typeof result.data[0][0] === "undefined" || typeof result.data[0][0]== "NULL"||typeof result.data[0][0]=="" ) {
        return ''}
        else{
      var fechaMod=String(result.data[0][0].date_created)
      return fechaMod}
  }
async function   traefechaUltimaOrden(){
    const result =  await rest.rest.executeQuery(
      `
     select TOP 1 date_created from dbo.ordenes
     ORDER BY date_created desc
          `
      )
      if (typeof result.data[0][0] === "undefined" || typeof result.data[0][0]== "NULL"||typeof result.data[0][0]=="" ) {
        return ''}
        else{
      var fechaMod=String(result.data[0][0].date_created)
      return fechaMod}
  } 

async function   traefechaActual(){
    const result =  await rest.rest.executeQuery(
      `
      select convert(varchar,GETDATE(),20) as fechaActual
          `
      )
      if (typeof result.data[0][0] === "undefined" || typeof result.data[0][0]== "NULL"||typeof result.data[0][0]=="" ) {
        return ''}
        else{
      var fechaActualL=String(result.data[0][0].fechaActual)
      return fechaActualL}
  }

async function  modificaUltimaModificacion(fechaModificacion) {  

    const result = await rest.rest.executeQuery(
      `
      update config set valor_cfg=@fecha
      where grupo_cfg='CONTROL' and clave_cfg='ultima_actualizacion'
          `,
          [{
              name: 'fecha',
              type: 'varchar',
              value: fechaModificacion
          }]
  
      )
      console.log("QUERY RESULT: ", result)
    } 
async function  modificaOrderRecorridas(cantidad) {  

      const result = await rest.rest.executeQuery(
        `
        update config set valor_cfg=@cantidad
        where grupo_cfg='CONTROL' and clave_cfg='ORDENES_RECORRIDAS'
            `,
            [{
                name: 'cantidad',
                type: 'varchar',
                value: cantidad
            }]
    
        )
        console.log("QUERY RESULT: ", result)
      } 


async function  modificaIdTest(id) {  

    const result = await rest.rest.executeQuery(
      `
      update config set valor_cfg=@id
      where grupo_cfg='TEST' and clave_cfg='id'
          `,
          [{
              name: 'id',
              type: 'varchar',
              value: id
          }]
  
      )
      console.log("QUERY RESULT: ", result.data)
    } 
  
async function  modificaIdUser(id) {  

  const result = await rest.rest.executeQuery(
    `
    update config set valor_cfg=@id
    where grupo_cfg='IDENTIFICACION' and clave_cfg='id'
        `,
        [{
            name: 'id',
            type: 'varchar',
            value: id
        }]

    )
    console.log("QUERY RESULT: ", result.data)
  } 
async function  modificanicknameTest(nickname) {  

      const result = await rest.rest.executeQuery(
        `
        update config set valor_cfg=@nickname
        where grupo_cfg='TEST' and clave_cfg='nickname'
            `,
            [{
                name: 'nickname',
                type: 'varchar',
                value: nickname
            }]
    
        )
        console.log("QUERY RESULT: ", result.data)
      } 
async function  modificanicknameUser(nickname) {  

        const result = await rest.rest.executeQuery(
          `
          update config set valor_cfg=@nickname
          where grupo_cfg='IDENTIFICACION' and clave_cfg='usuario'
              `,
              [{
                  name: 'nickname',
                  type: 'varchar',
                  value: nickname
              }]
      
          )
          console.log("QUERY RESULT: ", result.data)
        } 
      
async function  modificapasswordTest(password) {  

        const result = await rest.rest.executeQuery(
          `
          update config set valor_cfg=@password
          where grupo_cfg='TEST' and clave_cfg='password'
              `,
              [{
                  name: 'password',
                  type: 'varchar',
                  value: password
              }]
      
          )
          console.log("QUERY RESULT: ", result.data)
        }

async function  modificastatusTest(status) {  

          const result = await rest.rest.executeQuery(
            `
            update config set valor_cfg=@status
            where grupo_cfg='TEST' and clave_cfg='site_status'
                `,
                [{
                    name: 'status',
                    type: 'varchar',
                    value: status
                }]
        
            )
            console.log("QUERY RESULT: ", result.data)
          }
 async function  InsertaOrdenes(orderid,datecreated,totalamount_order,paidamount_order,shippingid_order,statusorder,nicknamebuyer,idbuyer,fecharegistro){  

  const result = await rest.rest.executeStoredProcedure('SP_ORDENES', null, {
    order_id: orderid,
    date_created: datecreated, 
    total_amount_order: totalamount_order,
    paid_amount_order: paidamount_order,
    shipping_id_order: shippingid_order,
    status_order: statusorder,
    nickname_buyer: nicknamebuyer,
    id_buyer: idbuyer,
    fecha_registro: fecharegistro
});

//print the result
return result
            }

async function  InsertaOrdenesItems(order_iditem,titleitem,sellersku,quantiti,unitprice,full_unitprice){  

              const result = await rest.rest.executeStoredProcedure('SP_ORDENES_items', null, {
                order_id_item : order_iditem,
                title_item  :titleitem,
                seller_sku	:sellersku,
                quantity: quantiti,
               unit_price	:unitprice,
               full_unit_price :full_unitprice
            });
            return result
                        }

async function  InsertaInformacionFacturacion(STREETNAME, ZIPCODE, STATENAME, STREETNUMBER, CITYNAME,DOCTYPE, COMMENTe, docnumber,TAXPAYERTYPE_ID, BUSINESSNAME, FIRSTNAME, LASTNAME, orderide){  

                          const result = await rest.rest.executeStoredProcedure('SP_ORDENES_FACTURACION', null, {
                            STREET_NAME: STREETNAME,
                            ZIP_CODE:	ZIPCODE,
                            STATE_NAME:	STATENAME,
                            STREET_NUMBER: STREETNUMBER,
                            CITY_NAME :CITYNAME,
                            DOC_TYPE : DOCTYPE,
                            COMMENT:COMMENTe,
                            doc_number	:docnumber,
                            TAXPAYER_TYPE_ID :TAXPAYERTYPE_ID,
                            BUSINESS_NAME :BUSINESSNAME,
                            FIRST_NAME :FIRSTNAME,
                            LAST_NAME:LASTNAME,
                            order_id: orderide
                        });
                        return result
                                    }


async function  InsertaInformacionEnvios(SHIPMENTID,orderid,addressline,streetname,streetnumber,comment_s,zipcode,city_s,stateshipment,neighborhood_s,  municipality_s,datecreated,statusshipment,logistic_typee){  

                                      const result = await rest.rest.executeStoredProcedure('SP_ORDENES_ENVIOS', null, {
                                        SHIPMENT_ID: SHIPMENTID,
                                        order_id:	orderid,
                                        address_line: addressline,
                                        street_name: streetname,
                                        street_number: streetnumber,
                                        comment:comment_s,
                                        zip_code:zipcode,
                                        city:city_s,
                                        state:stateshipment,
                                        neighborhood:neighborhood_s,
                                        municipality:municipality_s,
                                        date_created:datecreated,
                                        status: statusshipment,
                                        logistic_type: logistic_typee
                                    });
                                    return result
                                                }
            
                        
module.exports= {insertarCodigo, traerCodigo,modificaToken,modificaTokenRef,modificaTiempoExp, treaTokenRef, modificaIdTest,modificanicknameTest,modificapasswordTest,modificastatusTest,treaToken,traerUsuarioTest,traerPasswordTest,traeridTest,treaClientID,treaSecretKey,traeRedirect,treaIDIdentificacion,modificaIdUser,modificanicknameUser,traeUltimaModificacion,InsertaOrdenes,InsertaOrdenesItems,InsertaInformacionFacturacion,InsertaInformacionEnvios,modificaUltimaModificacion,modificatimeRefreshT,treatimeRefreshT,treaexpiresin,traefechaModificaEstatus,traefechaActual,traefechaUltimaOrden,modificaOrderRecorridas}
