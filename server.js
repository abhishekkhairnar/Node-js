const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.sendFile('index.html',{root:__dirname});
});
app.get('/about',(req,res)=>{
    // whenever we serve any html file to any of the route we have either we have to give its absolute path or send the root with path
    res.sendFile('about.html',{root: __dirname});
});

// redirects

app.get('/about-me',(req,res)=>{
    res.redirect('/about');
})

// 404 page

app.use((req,res)=>{
    res.status(404).sendFile('404.html',{root:__dirname});
})
// post request to send data from frontend to backend






app.listen(3000);