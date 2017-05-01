// models.js

var Contact = function()
{

  this.id = 0;
  this.firstName = "";
  this.lastName = "";
  this.email = "";
  this.phone = "";
  
  //meta-data
  this.created = new Date();
  this.modified = new Date();

  this.getFullName = function()
  {
    return this.firstName + " " + this.lastName;
  }

};


var contacts =
{
  nextId: 1,
  db: {}, //key: contact.id, value: contact
  
  save: function(contact)
  {
    if(contact.id == 0)
    {
      contact.id = contacts.nextId;
      contacts.nextId++;
    }
    
    contacts.db[String(contact.id)] = contact;
  },
  
  findAll: function()
  {
    return _.values(contacts.db);
  },
  
  delete: function(contact)
  {
    contacts.db[contact.email] = null;
  },
  
  get: function(id)
  {
    return contacts.db[id];
  }
};
