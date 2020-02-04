const Charts = require('../models/charts');
// const soc=require('./socket');
const soc = require('../realtime');
module.exports = function(server,io)  {
    var that={};
    server.put('/Charts/:id', (req, res, next) => {
        if (!req.is('application/json')) {
            return next(
                new errors.InvalidContentError("Expects 'application/json'"),
            );
        }
        let data = req.body || {},
        opts = {
            new: true
        }
        if (!data._id) {
            data = Object.assign({}, data, { _id: req.params._id });
        }
        Charts.findOneAndUpdate(data._id, {
            Legend: req.body.Legend,
            Value: req.body.Value,
            Month: req.body.Month,
        }, {new: true}).then(chart => {
            console.log('sdfdsfsdfsfsffsdfsdfds');
            //io.register('connect')
            soc.getIO().emit('update','asdnvsandbvsa');
            res.send(200, chart)
        })
        .catch(err => {
            console.log('failed')
            res.send(500, err)
        })
    });
    /**
     * LIST
     */
    // Get Charts
  server.get('/Charts', async (req, res, next) => {
    try {
      const charts = await Charts.find({});
      res.send(charts);
      next();
    //   io.on('connection',(socket)=>{
    //         socket.emit('get','get request socket msg.');
    //   })
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });
  // Get Single Customer
  server.get('/Charts/:id', async (req, res, next) => {
    try {
      const charts = await Charts.findById(req.params.id);
      res.send(charts);
      next();
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(
          `There is no customer with the id of ${req.params.id}`
        )
      );
    }
  });
}
