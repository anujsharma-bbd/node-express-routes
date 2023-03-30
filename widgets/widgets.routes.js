
var express = require('express');
var router = express.Router();
const cors = require('cors');

var WidgetProvider = require('./widgets.service').WidgetProvider;
var widgetProvider = new WidgetProvider();


// router.get('/', function(req, res) {
//   widgetProvider.fetchAllWidgets(function(error, widgets) {
//     res.status(200).send(widgets);
//   });
// });
router.get('/', cors(), async (req, res) => {

  try {
    console.log(' *** in get widget');

    let widgets = await widgetProvider.fetchAllWidgets();
    // res.status(200).send(widgets);
    res.status(200).json(widgets);
  } catch(e) {
    res.status(500).send({error: e.message});
  }

});

router.post('/', async (req, res) => {

  console.log(' *** in adding widget');

  try {
    const widget = req.body;
    console.log('adding widget', widget);

    let insertedWidget = await widgetProvider.insertedWidget(widget);
    res.status(200).send(widget);
  } catch(e) {
    res.status(500).send({error: e.message});
  }
  
});



module.exports = router;
