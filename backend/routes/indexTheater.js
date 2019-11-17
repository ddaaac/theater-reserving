module.exports = function(app, Theater)
{
    // Theaters collection 내의 document 전체를 받아서 return
    app.get('/api/Theaters', function(req,res){
        Theater.find(function(err, Theaters){
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(Theaters);
        })
    });

    // _id를 key값으로 해서 해당 key값을 가지는 Theater data return
    app.get('/api/Theaters/:Theater_id', function(req, res){
        Theater.findOne({_id: req.params.Theater_id}, function(err, Theater){
            if(err) return res.status(500).json({error: err});
            if(!Theater) return res.status(404).json({error: 'Theater not found'});
            res.json(Theater);
        })
    });

    // phone_number를 key값으로 해서 해당 key값을 가지는 Theater data return
    // 찾은 Theater들을 return할때 return할 필드 값 설정 가능 0(false), 1(true)
    app.get('/api/Theaters/phone_number/:phone_number', function(req, res){
        Theater.find({phone_number: req.params.phone_number}, {_id: 0, name: 1, register_date: 1},  function(err, Theaters){
            if(err) return res.status(500).json({error: err});
            if(Theaters.length === 0) return res.status(404).json({error: 'Theater not found'});
            res.json(Theaters);
        })
    });

    // Theater의 shcema에 따라 Theater data 생성
    app.post('/api/Theaters', function(req, res){
        var Theater = new Theater();
        Theater.name = req.body.name;
        Theater.phone_number = req.body.phone_number;
        Theater.register_date = new Date(req.body.register_date);

        Theater.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }

            res.json({result: 1});

        });
    });

    // Theater data를 update
    // output은 mongodb에서 update를 했을 때 출력되는 결과물
    app.put('/api/Theaters/:Theater_id', function(req, res){
        Theater.update({ _id: req.params.Theater_id }, { $set: req.body }, function(err, output){
            if(err) res.status(500).json({ error: 'database failure' });
            console.log(output);
            if(!output.n) return res.status(404).json({ error: 'Theater not found' });
            //n이 0이면 해당 key값을 가진 Theater가 없다는 것이므로 not found
            res.json( { message: 'Theater updated' } );
        })
        /* [ ANOTHER WAY TO UPDATE THE Theater ]
                Theater.findById(req.params.Theater_id, function(err, Theater){
                if(err) return res.status(500).json({ error: 'database failure' });
                if(!Theater) return res.status(404).json({ error: 'Theater not found' });
                if(req.body.name) Theater.name = req.body.name;
                if(req.body.phone_number) Theater.phone_number = req.body.phone_number;
                if(req.body.register_date) Theater.register_date = req.body.register_date;
                Theater.save(function(err){
                    if(err) res.status(500).json({error: 'failed to update'});
                    res.json({message: 'Theater updated'});
                });
            });
        */
    });

    // 해당 key값을 가지는 Theater data 삭제
    app.delete('/api/Theaters/:Theater_id', function(req, res){
        Theater.remove({ _id: req.params.Theater_id }, function(err, output){
            if(err) return res.status(500).json({ error: "database failure" });

            /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
            if(!output.result.n) return res.status(404).json({ error: "Theater not found" });
            res.json({ message: "Theater deleted" });
            */

            res.status(204).end();
        })
    });

}