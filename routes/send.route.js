const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const routes = express.Router();
routes.post('/uploads', (req, res)=>{
  const form = formidable({multiples: true, uploadDir: './uploads', keepExtensions: true})
  form.parse(req, (err, fields, files)=>{
    if(err){
      return res.json(err);
    }
    return res.json(files);
  })
});

routes.get('/file', (req, res)=>{
  const path = './' + req.query.path;
  if(fs.existsSync(path)){
    fs.readFile(path, (err, data)=>{
      if(err){
        console.error(err);
        res.status(400).json({error: err});
      }else{
        res.status(200).end(data);
      }
    })
  }else{
    res.status(404).json({Error: 'File is not found.'})
  }
})


routes.delete('/file', (req, res)=>{
  const form = formidable({multiples: true, uploadDir: './uploads', keepExtensions: true})
  form.parse(req, (err, fields, files)=>{
    let path = './'+fields.path
    if(fs.existsSync(path))
      fs.unlink(path, err=>{
        if(err){
          res.status(400).json(err);
        }
      })
    res.json(fields);
  })
});

module.exports = routes;
