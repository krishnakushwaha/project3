const express=require('express');
const app=express();
const router=express.Router();
const path=require('path');

const authentication=require('./routes/authentication')(router);

const blogs=require('./routes/blogs')(router);


const bodyParser=require('body-parser');

const cors=require('cors');

app.use(cors({
   
   origin:'http://localhost:4200'

}));
app.get('/',(req,res)=>{

	res.send('hello world');
});

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.use(express.static(__dirname + '/client3/dist/'));

app.use('/authentication',authentication);

app.use('/blogs',blogs);

app.get('*',(req , res)=>{

res.sendFile(path.join(__dirname + '/client3/dist/index.html'));
});
app.listen(8080,()=>{

	console.log('listening to port 8080');
})