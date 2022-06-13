const express = require('express');

const router = express.Router();

const pool = require('../database');

const {isLoggedIn} = require('../lib/auth');

router.get('/add',isLoggedIn, (req, res) => {
    res.render('links/add');
});

router.post('/add',isLoggedIn,async (req, res )=>{
    const {title,url,description}=req.body;
    const newLink = {
        title,
        url,
        description,
        user_id:req.user.id
    };
    //console.log(req.body);
    console.log(newLink);
    await pool.query('INSERT INTO links set ?',[newLink]);
    req.flash('success','links saves succefully');

    res.redirect('/links');
});
router.get('/',isLoggedIn,async (req,res)=>{
    const links = await pool.query('SELECT * FROM links where user_id = ?',[req.user.id]);
    console.log(links);
    //res.send('listas iran aca')
    res.render('links/list', {links});

})
router.get('/delete/:id',isLoggedIn,async (req,res) => {
    //console.log(req.params.id);
    //res.send('deleted');

    const {id} = req.params;
    await pool.query('DELETE FROM links WHERE id = ?',[id]);
    req.flash('success','link removed successfully');
    res.redirect('/links');
})
router.get('/edit/:id',isLoggedIn,async (req,res) =>{
    const {id} = req.params;
    const links = await pool.query('SELECT * FROM links where id = ?',[id]);

    res.render('links/edit',{link:links[0]});

    console.log(links[0]);
    //res.send('received');
})

router.post('/edit/:id', isLoggedIn ,async (req,res) => {
    const {id} = req.params;
    const { title, description , url } = req.body;
    const newLink = { 
        title,
        description,
        url
    };
    console.log(newLink);
    //res.send('UPDATED');


    await pool.query('UPDATE links set ? where id = ?', [newLink,id]);
    req.flash('success','link edited successfully')
    res.redirect('/links');

})

module.exports = router;

