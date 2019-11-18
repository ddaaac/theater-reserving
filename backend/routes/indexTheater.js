module.exports = function(app, Theater)
{
    // theaters collection 내의 document 전체를 받아서 return
    app.get('/api/theaters', function(req,res){
        Theater.find(function(err, theaters){
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(theaters);
        })
    });

    // _id를 key값으로 해서 해당 key값을 가지는 theater data return
    app.get('/api/theaters/:theater_id', function(req, res){
        Theater.findOne({_id: req.params.theater_id}, function(err, theater){
            if(err) return res.status(500).json({error: err});
            if(!theater) return res.status(404).json({error: 'theater not found'});
            res.json(theater);
        })
    });

    // openDate를 key값으로 해서 해당 key값을 가지는 theater data return
    // 찾은 theater들을 return할때 return할 필드 값 설정 가능 0(false), 1(true)
    app.get('/api/theaters/phone_number/:openDate', function(req, res){
        Theater.find({phone_number: req.params.openDate}, {_id: 0, name: 1, openDate: 1, information: 0, block: 0, register_date: 1},  function(err, theaters){
            if(err) return res.status(500).json({error: err});
            if(theaters.length === 0) return res.status(404).json({error: 'theater not found'});
            res.json(theaters);
        })
    });

    // theater의 shcema에 따라 theater data 생성
    app.post('/api/theaters', function(req, res){
        var theater = new Theater();
        theater.name = req.body.name;
        theater.openDate = req.body.openDate;
        theater.information = req.body.information;
        theater.blcok = req.body.block;
        theater.register_date = new Date(req.body.register_date);

        theater.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }

            res.json({result: 1});

        });
    });

    // theater data를 update
    // output은 mongodb에서 update를 했을 때 출력되는 결과물
    app.put('/api/theaters/:theater_id', function(req, res){
        Theater.update({ _id: req.params.theater_id }, { $set: req.body }, function(err, output){
            if(err) res.status(500).json({ error: 'database failure' });
            console.log(output);
            if(!output.n) return res.status(404).json({ error: 'theater not found' });
            //n이 0이면 해당 key값을 가진 theater가 없다는 것이므로 not found
            res.json( { message: 'theater updated' } );
        })
        /* [ ANOTHER WAY TO UPDATE THE USER ]
                Theater.findById(req.params.theater_id, function(err, theater){
                if(err) return res.status(500).json({ error: 'database failure' });
                if(!theater) return res.status(404).json({ error: 'theater not found' });
                if(req.body.name) theater.name = req.body.name;
                if(req.body.phone_number) theater.phone_number = req.body.phone_number;
                if(req.body.register_date) theater.register_date = req.body.register_date;
                theater.save(function(err){
                    if(err) res.status(500).json({error: 'failed to update'});
                    res.json({message: 'theater updated'});
                });
            });
        */
    });

    // 해당 key값을 가지는 theater data 삭제
    app.delete('/api/theaters/:theater_id', function(req, res){
        Theater.remove({ _id: req.params.theater_id }, function(err, output){
            if(err) return res.status(500).json({ error: "database failure" });

            /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
            if(!output.result.n) return res.status(404).json({ error: "theater not found" });
            res.json({ message: "theater deleted" });
            */

            res.status(204).end();
        })
    });

}