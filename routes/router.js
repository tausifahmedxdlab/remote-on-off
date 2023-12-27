const express = require('express');
const router = express.Router();
const AppSchema = require('../models/AppModel');



router.post('/addData', async (req, res) => {

  console.log(req.body);
  const newData = new AppSchema({
    IMEI: req.body.imei,
    SIM: req.body.simNo,
    APPSTATUS: req.body.appStatus,
    RUNSTATUS: req.body.serverStatus
  });

  try {
    await AppSchema.create(newData)
    // await newData.save();
    res.json({ "Success": "true" })
    console.log("data Added Successfully")
  } catch (error) {
    console.error('Error saving data to MongoDB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

router.get('/create', (req, res) => {
  res.render('add')
})

router.get('/', async (req, res) => {
  try {
    const allusers = await AppSchema.find()
    res.render('home', {
      users: allusers,
    });
  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/getData', async (req, res) => {
  try {
    const allData = await AppSchema.find();
    res.json(allData);
  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/app-status/detail', async (req, res) => {
  const { data } = req.query;
  const dataArray = data.split('$');
  const IMEI_NO = dataArray[0];
  const R_STATUS = dataArray[1];

  try {
    const existingData = await AppSchema.findOne({ IMEI: IMEI_NO });

    if (!existingData) {
      return res.status(404).json({ error: 'Data not found' });
    }

    const C_APP_STATUS = existingData.APPSTATUS;
    existingData.RUNSTATUS = R_STATUS;
    await existingData.save();
    res.json({ success: true, message: C_APP_STATUS });
  } catch (error) {
    console.error('Error getting data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/app-command/detail', async (req, res) => {
  const { data } = req.query;
  const dataArray = data.split('/');
  const IMEI_NO = dataArray[0];
  const A_STATUS = dataArray[1];

  try {
    const existingData = await AppSchema.findOne({ IMEI: IMEI_NO });
    if (!existingData) {
      return res.status(404).json({ error: 'Data not found' });
    }

    existingData.APPSTATUS = A_STATUS;
    await existingData.save();

    res.json({ success: true, message: existingData });
  }
  catch (error) {
    console.error('Error getting or updating data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;