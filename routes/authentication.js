const User = require('../models/user');
var con=require('../database');
const jwt=require('jsonwebtoken');

module.exports=(router)=>{


   router.post('/register', (req, res) => {

   	if (!req.body.email) {
      res.json({ success: false, message: 'You must provide an e-mail' }); // Return error
    } else {

    	 if (!req.body.username) {
         res.json({ success: false, message: 'You must provide a username' }); // Return error
         } else{

         	 if (!req.body.password) {
              res.json({ success: false, message: 'You must provide a password' }); // Return error
             }else{

   	           /*let user = new User({
               email: req.body.email.toLowerCase(),
               username: req.body.username.toLowerCase(),
               password: req.body.password
               });*/

	              var sql = "INSERT INTO users (email,username,password) VALUES ('"+req.body.email+"', '"+req.body.username+"','"+req.body.password+"')";
				  con.query(sql, function (err, result) {
				    if (err) throw err;
				     //res.json(result);
              res.json({ success: true, message: 'inserted one by kkk' });
				    console.log("1 record inserted");
				  });
   	        }
   	     }
   }

   });


   router.get('/checkEmail/:email', (req, res) => {
    // Check if email was provided in paramaters
    if (!req.params.email) {
      res.json({ success: false, message: 'E-mail was not provided' }); // Return error
    } else {
      // Search for user's e-mail in database;

       con.query("SELECT * FROM users WHERE email = '"+req.params.email+"'", function (err, result) {
        if (err) throw err;

         /*for (var i in result) {
            console.log('Post Titles: ', result[i]);
         }*/
          if(result[0]==undefined){
            res.json({ success: true, message: 'E-mail is available' });
          }else{
             res.json({ success: false, message: 'E-mail is already taken' });
          }
        // res.end(JSON.stringify(result));
        //res.json(result);
       // console.log(result[0]);
      });
      /*User.findOne({ email: req.params.email }, (err, user) => {
        if (err) {
          res.json({ success: false, message: err }); // Return connection error
        } else {
          // Check if user's e-mail is taken
          if (user) {
            res.json({ success: false, message: 'E-mail is already taken' }); // Return as taken e-mail
          } else {
            res.json({ success: true, message: 'E-mail is available' }); // Return as available e-mail
          }
        }
      });*/
    }
  });


   router.post('/login', (req, res) => {
    // Check if username was provided
    if (!req.body.username) {
      res.json({ success: false, message: 'No username was provided' }); // Return error
    } else {
      // Check if password was provided
      if (!req.body.password) {
        res.json({ success: false, message: 'No password was provided.' }); // Return error
      } else {

            con.query("SELECT * FROM users WHERE username = '"+req.body.username+"'", function (err, result) {
             if (err) throw err;

            if(result[0]==undefined){
              res.json({ success: true, message: 'Username does not exists' });
            }else{
               const token=jwt.sign({userId:result[0].id},'ddd',{expiresIn:'24h'});
               res.json({success : true,message:"success",token:token,user:{username:result[0].username}});
            }

          });
        //res.send('test');

      }
    }
  });


   router.use((req, res, next) => {
      const token = req.headers['authorization'];

      if (!token) {
        res.json({ success: false, message: 'No token provided' });
      } else {

        jwt.verify(token, 'ddd', (err, decoded) => {

          if (err) {
            res.json({ success: false, message: 'Token invalid: ' + err });
          } else {
            req.decoded = decoded;
            next();
          }
        });
      }
    });
    




   router.get('/profile', (req, res) => {
    //res.send(req.decoded);


          con.query("SELECT * FROM users WHERE id = '"+req.decoded.userId+"'", function (err, result) {
             if (err) throw err;
            console.log(result[0]);
            if(result[0]==undefined){
              res.json({ success: true, message: 'Username does not exists' });
            }else{

               res.json({success : true,message:"success",user:result[0]});
            }

          });
  });


	return router;
}
