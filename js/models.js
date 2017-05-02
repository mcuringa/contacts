// models.js
// var _ = require("./underscore-min.js");

var Contact = function(initialValues)
{
  if(!initialValues)
    initialValues = {};

  this.id = initialValues.id || 0;
  this.firstName = initialValues.firstName || "";
  this.lastName = initialValues.lastName || "";
  this.email = initialValues.email || "";
  this.phone = initialValues.phone || "";
  this.langs = initialValues.langs || {};

  this.addresses = [];
  if(initialValues.addresses)
  {
    this.addresses = initialValues.addresses.map((a)=>{return new Address(a);});
  }
  
  //meta-data
  this.created = initialValues.created || new Date();
  this.modified = initialValues.modified || new Date();

};
// var a = {firstName: "Matt", lastName: "Curinga"};
// var matt = new Contact(a);

Contact.prototype.getFullName = function()
{
  return this.firstName + " " + this.lastName;
};

Contact.languages = 
{

  en: "English",
  es: "Spanish",
  ch: "Chinese",
  ru: "Russian",
  ko: "Korean", 
  ar: "Arabic",
  fr: "French"
}

var Address = function(data)
{
  if(!data)
    data = {};
  
  this.street1 = data.street1 || "";
  this.street2 = data.street2 || "";
  this.city = data.city || "";
  this.state = data.state || "";
  this.zip = data.zip || "";
  this.country = data.country || "";
}


var contacts =
{
  nextId: 1,
  db: {}, //key: contact.id, value: contact

  init:  _.once(function()
  {

    contacts.db = {};
    contacts.nextId = 1;

    if(!localStorage.contacts)
      return;
    var jsonData = JSON.parse(localStorage.contacts);
    if(!jsonData)
      return;
    for(var i =0;i<jsonData.length;i++)
    {
      var c = new Contact(jsonData[i]);
      contacts.db[c.id] = c;
      if(c.id >= contacts.nextId)
      {
        contacts.nextId = c.id + 1;
      }
    }
  }),  
  store: function()
  {
    localStorage.contacts = JSON.stringify(contacts.findAll());
  },
  
  save: function(contact)
  {
    if(contact.id == 0)
    {
      contact.id = contacts.nextId;
      contacts.nextId++;
    }
    
    contacts.db[String(contact.id)] = contact;
    contacts.store();
  },
  
  findAll: function()
  {
    contacts.init();
    return _.values(contacts.db);
  },
  
  delete: function(contact)
  {
    delete contacts.db[contact.id];
    contacts.store();
  },
  
  get: function(id)
  {
    return contacts.db[id];
  }
};
