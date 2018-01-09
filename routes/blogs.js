
var con=require('../database');
const jwt=require('jsonwebtoken');
var async      = require('async');
module.exports=(router)=>{


  router.post('/newBlog',(req,res)=>{

    //es.send('test');

       var sql = "INSERT INTO blog (title,body,createdBy,createdAt) VALUES ('"+req.body.title+"', '"+req.body.body+"','"+req.body.createdBy+"','"+Date.now()+"')";
          con.query(sql, function (err, result) {
            if (err) throw err;
             //res.json(result);
              res.json({ success: true, message: 'inserted one by kkk' });
            console.log("1 record inserted");
          });
  });

  router.post('/commentStatus',(req,res)=>{
   //res.json({blog_id:req.body.blog_id,user_id:req.body.user_id});
   if(req.body.status==1){
     con.query("SELECT likes FROM blog WHERE id = '"+req.body.blog_id+"'", function (err, result) {
      if (err) throw err;
      var likes =result[0].likes+1;
       res.json({blog_id:likes});
    });

   }else{
     con.query("SELECT dislikes FROM blog WHERE id = '"+req.body.blog_id+"'", function (err, result) {
      if (err) throw err;
      var dislikes =result[0].dislikes+1;
       res.json({blog_id:dislikes});
     });
   }
    //res.send('test');

      //  var sql = "INSERT INTO commentStatus (blog_id,user_id,status) VALUES ('"+req.body.blog_id+"', '"+req.body.user_id+"','"+req.body.status+"')";
      //     con.query(sql, function (err, result) {
      //       if (err) throw err;
      //        //res.json(result);
      //         res.json({ success: true, message: 'inserted one by kkk' });
      //       console.log("1 record inserted");
      //     });
  });

  router.get('/allBlogs',(req,res)=>{

    //res.send('test');


      //     async.waterfall([
      //     function (wCb) {
      //       //  connection.connect();
      //         // wCB is a callback function. Call it when you want to move to the
      //         // next function in the waterfall
      //         wCb();
      //     },
      //     function (wCB) {
      //         con.query('SELECT * FROM blog', function(err, pages, fields) {
      //             if (err) {
      //
      //                 return wCB(err);
      //             } else {
      //
      //                 wCB(null, pages);
      //             }
      //         });
      //     },
      //     function (pages, wCB) {
      //
      //         async.map(pages, function (page, mCB) {
      //
      //             con.query(
      //                 'SELECT * FROM commentStatus WHERE blog_id = ?',
      //                 page.id,
      //                 function(err, sections, fields) {
      //                     if (err) return mCB(err);
      //                      console.log(JSON.stringify(sections));
      //                     page.sections = JSON.stringify(sections);
      //                     mCB();
      //                 }
      //             );
      //         }, function (err) {
      //
      //             if (err) {
      //                 wCB(err);
      //             } else {
      //
      //                 wCB(null, pages);
      //             }
      //         });
      //     }
      // ], function (err, pages) {
      //   if (err) throw err;
      //     console.log(pages);
      // });


      var return_data = {};
        var blog_id=2;
         async.parallel([
            function(parallel_done) {
                con.query("SELECT * FROM commentStatus where blog_id='"+blog_id+"'", function (err, results, fields){
                    if (err) return parallel_done(err);
                    return_data.table1 = results;
                    parallel_done();
                });
            },
            function(parallel_done) {
                con.query("SELECT * FROM blog", function (err, results, fields){
                    if (err) return parallel_done(err);
                    return_data.table2 = results;
                    parallel_done();
                });
            }
         ], function(err) {
              if (err) console.log(err);

              res.send(return_data);
         });

  });
  function getColour(blog_id,  callback)
  {
      con.query("SELECT * FROM commentStatus where blog_id='"+blog_id+"'", function (err, result2, fields)
      {
          if (err)
              callback(err,null);
          else
              callback(null,JSON.stringify(result2));

      });

  }
  router.get('/singleBlog/:id', (req, res) => {
    //res.send('test');
    con.query("SELECT * FROM blog where id='"+req.params.id+"'", function (err, result, fields) {

      if (err) throw err;
      console.log(result);
     // res.end(JSON.stringify(result));
       res.json({ success: true, blog: result[0] });
    });

  });

  router.put('/updateBlog', (req, res) => {
    // Check if id was provided
    if (!req.body.id) {
      res.json({ success: false, message: 'No blog id provided' }); // Return error message
    } else {


      var sql = "UPDATE blog SET title = '"+req.body.title+"',body = '"+req.body.body+"' WHERE id = '"+req.body.id+"'";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
        res.json({ success: true, message: 'Blog Updated!' });
      });

    }

  });

  router.delete('/deleteBlog/:id', (req, res) => {
    // Check if ID was provided in parameters
    if (!req.params.id) {
      res.json({ success: false, message: 'No id provided' }); // Return error message
    } else {

      var id=req.params.id;
      console.log(id);



         var sql = "DELETE FROM blog WHERE id = '"+id+"'";
         con.query(sql, function (err, result) {
           if (err) throw err;
           console.log("Number of records deleted: " + result.affectedRows);
          // res.json(result);
          res.json({ success: true, message: 'Blog deleted!' });
         });

    }

  });

	return router;
}
