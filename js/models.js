// models.js
var _ = require("./underscore-min.js");

var Contact = function(data)
{
  if(!data)
    data = {};
  
  this.id = data.id || 0;
  this.firstName = data.firstName || "";
  this.lastName = data.lastName || "";
  this.email = data.email || "";
  this.phone = data.phone || "";

  this.addresses = [];
  if(data.addresses)
    this.address = data.address.map(Address);
  
  //meta-data
  this.created = data.created || new Date();
  this.modified = data.modified || new Date();

};

Contact.prototpye.getFullName = function()
{
  return this.firstName + " " + this.lastName;
};

// Contact.parser = function(key, val)
// {
//   console.log(key);
//   console.log(val);
//   // if(key != "address")
//   //   return val;
  
//   // return val.map(Address);

// }


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

a = new Address();
a.country = "us";

b = new Address({street1: "222 park pl apt 3a", city: "brooklyn", state: "ny", zip: "11238"});

// console.log(JSON.stringify(a));
// console.log(JSON.stringify(b));


c = new Contact();
c.firstName = "foo";
c.lastName = "bar";

c.addresses.push(a);
c.addresses.push(b);

// console.log("'" + c + "'");
// str = JSON.stringify(c, null, '  ');
// console.log(str);

// obj = JSON.parse(str);
// console.log(obj);




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
