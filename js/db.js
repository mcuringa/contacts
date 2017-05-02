//db.js
var db = db || {};

db._data = {};
db._collections = {};

db.initialize = _.once(function()
{
    console.log("initializing application data");
    for(var i = 0; i <data.length; i++)
    {
        db.save(data[i]);
    }
});

db.Sequence = function(name) 
{
  this.name = name;
  this.current = 0;
  this.next = function(model)
  {
    var i = this.current();
    i++;
    return i;
  };
};


db.Collection = function(name)
{
  this.sequence = new db.Sequence(name);
};



db.model = function(obj, name)
{
    obj.clazz = obj.constructor.name;
    if(_(name).isUndefined() || _(name).isNull() || _(name).isEmpty())
        obj.model = obj.clazz.toLowerCase();
    else
        obj.model = name;

    if(_.isUndefined(obj.id) || obj.id == 0)
        obj.id = Sequence.next(obj.model);

};


db.load = function(json)
{
    var obj = $.parseJSON(json);
    if("clazz" in obj)
        obj =  eval("$.extend(new " + obj.clazz + "(), obj);");

    return obj;

};

db.table = function(model)
{
    if(_.isUndefined(db._data[model]))
    {
        console.log("creating new table for: " + model);
        db._data[model] = {};
    }

    return db._data[model];
};


db.filter = function(model, filter)
{
    var list = _.items(db.table(model));
    if(_.isDefined(filter))
        return list;

    return _.where(list, filter);

};

db.save = function(item)
{
    var t = db.table(item.model);

    if(_.isUndefined(item.id) || _.isNaN(item.id) || item.id == 0)
        item.id = Sequence.next(item.model);
    t[item.id] = item;
};

db.saveAll = function(list)
{
    if(_.size(list) == 0)
        return;
    
    _.each(list, db.save);
};

db.get = function(name, id)
{
    var t = db.table(name);
    return t[id];
};


