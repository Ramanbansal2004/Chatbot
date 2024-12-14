const express = require('express');
const router= express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Notes= require('../models/Notes')
router.get('/fetchallnotes',fetchuser, async (req, res) => {
        try {
            const notes = await Notes.find({user: req.user.id});
            res.json(notes);
            console.log(notes);
        } catch(error){
            console.error(error.message);
            res.status(500).send("Some error occured");
        }
    })

router.post('/addnotes',fetchuser, [
    body('description', 'Description must have atleast 5 chracters').isLength({min: 5}),
], async (req, res) => {
        try {
            const {title, description, tag} = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.send({ errors: errors.array()});
            }
            const note= new Notes({title, description, tag, user: req.user.id})
            const savedNote = await note.save()
            res.json(savedNote);
            } catch(error){
                console.error(error.message);
                res.status(500).send("Some error occured");
            }
        
    })

router.put('/updatenote/:id',fetchuser, [
        body('description', 'Description must have atleast 5 chracters').isLength({min: 5}),
    ], async (req, res) => {
        try {
            const {title, description, tag} = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.send({ errors: errors.array()});
            }
            let newNote= {}
            if(title){newNote.title = title};
            if(description){newNote.description = description};
            if(tag){newNote.tag = tag};
            let note= await Notes.findById(req.params.id);
            if(!note){return res.status(404).send("Not Found")}
            if(note.user.toString() !== req.user.id)
            {
                return res.send(401).send("Not Allowed");
            }
            note= await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
            res.json(note)
        } catch(error){
            console.error(error.message);
            res.status(500).send("Some error occured");
        }
    })
    
router.delete('/deletenote/:id',fetchuser, async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.send({ errors: errors.array()});
            }
            let note= await Notes.findById(req.params.id);
            if(!note){return res.status(404).send("Not Found")}
            if(note.user.toString() !== req.user.id)
            {
                return res.send(401).send("Not Allowed");
            }
            note= await Notes.findByIdAndDelete(req.params.id)
            res.json({"Success":"Note has been deleted", note: note})
        } catch(error){
            console.error(error.message);
            res.status(500).send("Some error occured");
        }
    })
module.exports = router
