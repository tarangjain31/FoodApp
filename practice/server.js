const express = require('express')
const app = express();
app.listen(3000)
app.get('/',(req,res)=>{
   // res.send("listening123")
    res.sendFile('\\Views\\Home.html',{root:__dirname}) //using relative path
})

app.get('/about',(req,res)=>{
    res.sendFile('C:\\Users\\tarang.jain\\Desktop\\Backend\\backend1\\Views\\About.html')
})

app.get('/about-us',(req,res)=>{
    res.redirect('/about')
})

app.use((req,res)=>{
    res.status(404).sendFile('C:\\Users\\tarang.jain\\Desktop\\Backend\\backend1\\Views\\404.txt')
})
//ye chalega hee chalega agar request yha aati hai to that's why we place it at the bottom
