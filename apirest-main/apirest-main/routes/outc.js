const express= require('express')
const router= express.Router()
var needle = require('needle')
var config=require('../milddleware/config').config
var { traerCodigo,modificaToken,modificaTokenRef,modificaTiempoExp,treaClientID,treaSecretKey,traeRedirect,  treaTokenRef,modificatimeRefreshT}=require('../consultas');
router.get('/optenerCodigo', async (req,res)=>{
    var ClientID=await treaClientID()
    var redirectU=await traeRedirect()
    console.log(config.auth_url+'?response_type=code&client_id='+ClientID+'&redirect_uri='+redirectU)
    res.redirect(config.auth_url+'?response_type=code&client_id='+ClientID+'&redirect_uri='+redirectU)
  })

router.get('/optenerToken', async (req,res)=>{
    var code=  await traerCodigo()
    var client_id=await treaClientID()
    var secret_key=await treaSecretKey()
    var redirect_uri=await traeRedirect()
    var codeAut='authorization_code'
    var options = {
        headers: { accept: 'application/json', content_type: 'application/x-www-form-urlencoded'},
        grant_type: codeAut,
        client_id: client_id,
        client_secret: secret_key,
        code: code,
        redirect_uri: redirect_uri
       }
    
    try{
    
      needle.request('post', config.oauth_url, options, { json: true }, async (err, resp)=> {
        console.log(resp.body)
        if(err){ 
            console.log(err)
            res.json({Resultado: 'Error al intentar generar el token, consulte con soporte'})
        }else{
          if (resp.body.access_token){
            if (typeof resp.body.access_token === "undefined" || typeof resp.body.access_token === "NULL") {res.json({Resultado: resp.body})}else{
          console.log('entro a grabar->')
          await modificaToken(resp.body.access_token)
          await modificaTokenRef(resp.body.refresh_token)
          await modificaTiempoExp(resp.body.expires_in) 
          await modificatimeRefreshT()
       res.json({Resultado: 'ok'})
            }
        }else{console.log(resp.body)
            res.json({Resultado: 'Error al intentar generar el token, consulte con soporte'})}
      }
      }) 
      }catch(e){ console.log(e)
        res.json({Resultado: 'Error al intentar generar el token, consulte con soporte'})}
    })

router.get('/refrescarToken', async (req,res)=>{
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
      needle.request('post', config.oauth_url, options, { json: true }, async (err, resp) =>{
        if(err){ 
            console.log(resp.body)
            res.json({Resultado: 'Error al intentar re-generar el token, consulte con soporte'})
        }else{
          if (resp.body.access_token){
            if (typeof resp.body.access_token === "undefined" || typeof resp.body.access_token === "NULL") {
              console.log(resp.body)
             res.json({Resultado: 'Error al intentar re-generar el token, consulte con soporte'})
            }else{
           //   console.log(resp.body)
          console.log('entro a grabar->')
          await modificaToken(resp.body.access_token)
          await modificaTokenRef(resp.body.refresh_token)
          await modificaTiempoExp(resp.body.expires_in) 
          await modificatimeRefreshT()
          res.json({Resultado: 'ok'})
            }
        }else{console.log(resp.body)
            res.json({Resultado: 'Error al intentar re-generar el token, consulte con soporte'})}
      }
      }) 
      }catch(e){console.log(resp.body)
        res.json({Resultado: 'Error al intentar re-generar el token, consulte con soporte'})}
    })

module.exports= router