const express = require("express")

const router = express.Router();
const BL = require("../models/BLModel");


router.get("/", async (req, res)=>{
    console.log('get')
    // console.log("Accept header", req.header('Accept'));
    if(req.header('Accept') !== "application/json"){
        res.status(415).send();
    }

    try {
        let bluelocks = await BL.find();

        let BLCollection = {
            items: bluelocks,
            _links: {
                self: {
                    href: `${process.env.BASE_URI}BL/`
                },
                collection: {
                    href: `${process.env.BASE_URI}BL/`
                }
            },
            pagination: "idk"
        }

        res.json(BLCollection);
    } catch {
        res.status(500).send()
    }
})
//detail
router.get("/:_id", async (req, res)=>{
    try {
        let bluelock = await BL.findById(req.params._id)
        if (bluelock == null) {
            res.status(404).send();
        } else {
            res.json(bluelock)
        }
    }catch{
        res.status(415).send();
    }


})

//middleware for headers in post
router.post("/", async (req, res, next) => {

    if(req.header("Content-Type") != "application/json" && req.header("Content-Type") != "application/x-www-form-urlencoded"){
        res.status(400).send();
    } else{
        next();
    }
})

//middleware against empty values post
router.post("/", async (req, res, next) => {

    if(req.body.player && req.body.jersey_number && req.body.weapon){
        next();
    } else{
        res.status(400).send();
    }
})


router.post("/", async (req, res)=>{

    let bluelock = BL ({
        player: req.body.player,
        jersey_number:req.body.jersey_number,
        weapon: req.body.weapon
    })
    try {
        await bluelock.save();

        res.status(201).send();
    } catch {
        res.status(500).send();
    }
})

//middleware for headers in put
router.put("/:_id", async (req, res, next) => {
    console.log("put")
    if(req.header("Content-Type") != "application/json" && req.header("Content-Type") != "application/x-www-form-urlencoded"){
        res.status(400).send();

    } else{
        next();
    }
})

//middleware against empty values put
router.put("/:_id", async (req, res, next) => {

    if(req.body.player && req.body.jersey_number && req.body.weapon){
        next();
    } else{
        res.status(400).send();
    }
})

router.put("/:_id", async (req, res) => {

    let bluelock = await BL.findOneAndUpdate(req.params,
        {
            player: req.body.player,
            jersey_number: req.body.jersey_number,
            weapon: req.body.weapon
        })

    try {
        bluelock.save();

        res.status(203).send();
    } catch {
        res.status(500).send();
    }
})

router.delete("/:_id", async (req, res)=>{
    console.log('delete')
    try {
        await BL.findByIdAndDelete(req.params._id);

        res.status(204).send();
    } catch {
        res.status(404).send();
    }

})

router.options("/", (req, res)=>{
    console.log('option')
   res.setHeader("Allow", "GET, POST, OPTIONS");
   res.send("");
})

router.options("/:_id", async (req, res)=>{
    res.set({
        'Allow': "GET, PUT, DELETE, OPTIONS"
    }).send()
})

module.exports = router;
