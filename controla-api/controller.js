const express=require('express')
const app=express()
const axios = require('axios').default
var cron = require('node-cron')
const port = process.env.PORT || 5000
  
app.get('/', async (req, res) => { 

  cron.schedule('*/30 8-19 * * *',async ()=>{
   let resultadoR=await axios({
      method: 'get',
      url: 'http://localhost:3000/generarDatos/optenerOrdenesDeVentaPorFecha',
     }).then( async response  => {
        console.log(response.data)
        await hacerRequestDeVuelta(response)
        },error=>{
        console.log(error,'------>','error devuelto al hacer el request')
        })
  })
  res.json({res:'ok'})
})

app.get('/RefrescarEstado', async (req, res) => { 

  cron.schedule('*/59 20-21 * * *',async ()=>{
   let resultadoR=await axios({
      method: 'get',
      url: 'http://localhost:3000/generarDatos/refrescarEstado',
     }).then( async response  => {
        console.log(response.data)
        await hacerRequestDeVuelta(response)
        },error=>{
        console.log(error,'------>','error devuelto al hacer el request')
        })
  })
  res.json({res:'ok'})
})
   
app.use(express.json)
app.listen(port, () => {
    console.log('puerto: ' + port)
})           

async function hacerRequestDeVuelta(resultado)
{
  if(typeof resultado.data === "undefined" || typeof resultado.data === "NULL"){}else{
    if(typeof resultado.data.resultado === "undefined" || typeof resultado.data.resultado === "NULL"){}else{
      if(resultado.data.resultado==='ejecutado'){}else{
        setTimeout(async ()=>{await axios({
          method: 'get',
          url: 'http://localhost:3000/generarDatos/optenerOrdenesDeVentaPorFecha',
         }).then( async response  => {
            console.log(response.data)
            },error=>{
            console.log(error,'------>','error devuelto al hacer el request')
            })} ,5000)  
  }}}
}

