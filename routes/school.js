const router = require('express').Router();
const School = require('../models/School');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');


//GET all Users
// Only for Admins
router.post("/add", verifyTokenAndAuthorization,  async (req,res) => {
    const newData = new School(req.body);

    try{
        const savedData = await newData.save();
         res.status(200).json(savedData);
     } catch(err){
         res.status(500).json(err)
     }
});

router.get("/all", verifyTokenAndAdmin, async (req, res) => {
    const qState = req.query.state;
    const qDist = req.query.district;
    const qBlock = req.query.block;
    const qCluster = req.query.cluster;
    try{
        let data;
        if(qState){
            data = await School.find({
                state: {
                    $in: [qState],
                },
            });
        } else if(qBlock){
            data = await School.find({
                block: {
                    $in: [qBlock],
                },
            });
        } else if(qDist){
            data = await School.find({
                district: {
                    $in: [qDist],
                },
            });
        } else if(qCluster){
            data = await School.find({
                cluster: {
                    $in: [qCluster],
                },
            });
        } else if(qDist && qState){
            data = await School.find({
                state: {
                    $in: [qState],
                },
                district: {
                    $in: [qDist],
                },
            });
        } else if(qDist && qBlock){
            data = await School.find({
                district: {
                    $in: [qDist],
                },
                block: {
                    $in: [qBlock],
                },
            });
        }  else if(qDist && qBlock && qCluster){
            data = await School.find({
                district: {
                    $in: [qDist],
                },
                block: {
                    $in: [qBlock],
                },
                cluster: {
                    $in: [qCluster],
                },
            });
        } else if( qState && qDist && qBlock && qCluster){
            data = await School.find({
                state: {
                    $in: [qState]
                },
                district: {
                    $in: [qDist],
                },
                block: {
                    $in: [qBlock],
                },
                cluster: {
                    $in: [qCluster],
                },
            });
        }
        else {
            data = School.find();
        }
        res.status(200).send(data);
    } catch(err) {
        res.status(500).send(err);
    }
    
});

router.put("/:id", verifyTokenAndAuthorization,  async (req,res) => {
    

    try{ 
       const updatedData = await School.findByIdAndUpdate(req.param.id, 
        {
            $set: req.body,
        }, {new: true});
        res.status(200).json(updatedData);
    } catch(err){
        res.status(500).json(err)
    }
});

router.delete("/:id", verifyTokenAndAdmin, async (req,res) => {
    try {
        await School.findByIdAndDelete(req.params.id);
        res.status(200).json("Data has been deleted...");
    } catch(error){ res.status(500).json(error)}
});

router.get("/find/:userId",verifyTokenAndAuthorization, async (req,res) => {
    try {
        const schoolData = await School.find({userId : req.params.userId});
       

        res.status(200).json(schoolData);
    } catch(error){ res.status(500).json(error)}
});




module.exports = router;
