const express=require('express')
const app=express()
var {insertarCodigo}=require('./consultas')
const port = process.env.PORT || 3000

app.use('/autenticacion',require('./routes/outc'))
app.use('/generarDatos',require('./routes/datosmeli'))
 
  
app.get('/', async (req, res) => {
  try{
    const  code  = req.query.code
     if (typeof code === "undefined") {}else{await insertarCodigo(code)}
  
     res.json({resultado: 'ok'})

    }catch(error){
      console.log(error)
      res.json({resultado: "ocurrio un error al optener el codigo"})
    }
})
   
app.use(express.static(__dirname + '/assets'))//para enviar cuerpo de formulario
app.use(express.json)
/*app.use(function(req, res, next) {
  res.status(404).redire
  res.send('404: File Not Found')
})*/

//app.use(express.urlencoded({extended: true}))
app.listen(port, () => {
    console.log('puerto: ' + port)
})           



