
var nextWidgetId = 10;

WidgetProvider = function() {
  this.widgets = [
    {_id: 1, name: 'widget 1'},
    {_id: 2, name: 'widget 2'}
  ];

  // this.fetchAllWidgets = function(cb) {
  //   cb(null, this.widgets);
  // };
  this.fetchAllWidgets = async () => {
    return this.widgets;
  };

  this.fetchWidgetById = function(id, cb) {
    var foundWidgets = this.widgets.filter(function(widget) {return widget._id == id});

    if (foundWidgets.length == 0) {
      cb('Widget not found', null);
    } else {
      cb(null, foundWidgets[0]);
    }
  };
  
  // this.insertWidget = function(widget, cb) {
  //   widget._id = nextWidgetId++;
  //   this.widgets.push(widget);

  //   cb(null, widget);
  // };
  this.insertWidget = async (widget) => {
    widget._id = nextWidgetId++;
    this.widgets.push(widget);
    return widget;
  };
  
  this.updateWidget = function(widget, cb) {
    this.fetchWidgetById(widget._id, function(error, _widget) {
      if (error) {
        cb(error, null);
      } else {
        _widget.name = widget.name;
        _widget.city = widget.city;
        _widget.state = widget.state;
    
        cb(null, _widget);
      }
    });
  };
  
  this.deleteWidget = function(id, cb) {
    this.widgets = this.widgets.filter(function(widget) {return widget._id != id});
    cb(null, {_id:id});
  };

}

exports.WidgetProvider = WidgetProvider;