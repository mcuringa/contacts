// models.js

var Contact = function()
{

  this.id = 0;
  this.firstName = "";
  this.lastName = "";
  this.email = "";
  this.phone = "";
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
  data: {},
  save: function(contact)
  {
    if(contact.id == 0)
    {
      contact.id = contacts.nextId;
      contacts.contacts++;
    }
    contacts.data[contact.id+''] = contact;
  },
  
  findAll: function()
  {
    return _.values(contacts.data);
  },
  
  delete: function(contact)
  {
    contacts.data[contact.email] = null;
  },
  
  get: function(email)
  {
    return contacts.data[email];
  }
};