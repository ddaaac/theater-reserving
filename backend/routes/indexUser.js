module.exports = function(app, User)
{
    // users collection 내의 document 전체를 받아서 return
    app.get('/api/users', function(req,res){
        User.find(function(err, users){
            if(err) return res.status(500).send({error: 'database failure'});
            console.log(users);
            res.json(users);
        })
    });

    // _id를 key값으로 해서 해당 key값을 가지는 user data return
    app.get('/api/users/:user_id', function(req, res){
        User.findOne({_id: req.params.user_id}, function(err, user){
            if(err) return res.status(500).json({error: err});
            if(!user) return res.status(404).json({error: 'user not found'});
            res.json(user);
        })
    });

    // serial_number를 key값으로 해서 해당 key값을 가지는 user data return
    // 찾은 user들을 return할때 return할 필드 값 설정 가능 0(false), 1(true)
    app.get('/api/users/phone_number/:serial_number', function(req, res){
        User.find({phone_number: req.params.serial_number}, {_id: 0, name: 1, serial_number: 1, register_date: 1},  function(err, users){
            if(err) return res.status(500).json({error: err});
            if(users.length === 0) return res.status(404).json({error: 'user not found'});
            res.json(users);
        })
    });

    // user의 shcema에 따라 user data 생성
    app.post('/api/users', function(req, res){
        var user = new User();
        user.name = req.body.name;
        user.phone_number = req.body.phone_number;
        user.serial_number = req.body.serial_number;
        user.register_date = new Date(req.body.register_date);

        user.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }

            res.json({result: 1});

        });
    });

    // user data를 update
    // output은 mongodb에서 update를 했을 때 출력되는 결과물
    app.put('/api/users/:user_id', function(req, res){
        User.update({ _id: req.params.user_id }, { $set: req.body }, function(err, output){
            if(err) res.status(500).json({ error: 'database failure' });
            console.log(output);
            if(!output.n) return res.status(404).json({ error: 'user not found' });
            //n이 0이면 해당 key값을 가진 user가 없다는 것이므로 not found
            res.json( { message: 'user updated' } );
        })
        /* [ ANOTHER WAY TO UPDATE THE USER ]
                User.findById(req.params.user_id, function(err, user){
                if(err) return res.status(500).json({ error: 'database failure' });
                if(!user) return res.status(404).json({ error: 'user not found' });
                if(req.body.name) user.name = req.body.name;
                if(req.body.phone_number) user.phone_number = req.body.phone_number;
                if(req.body.register_date) user.register_date = req.body.register_date;
                user.save(function(err){
                    if(err) res.status(500).json({error: 'failed to update'});
                    res.json({message: 'user updated'});
                });
            });
        */
    });

    // 해당 key값을 가지는 user data 삭제
    app.delete('/api/users/:user_id', function(req, res){
        User.remove({ _id: req.params.user_id }, function(err, output){
            if(err) return res.status(500).json({ error: "database failure" });

            /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
            if(!output.result.n) return res.status(404).json({ error: "user not found" });
            res.json({ message: "user deleted" });
            */

            res.status(204).end();
        })
    });

}