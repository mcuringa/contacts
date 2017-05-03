// contactform.js

var ContactForm =
{
  contact: new Contact(),
  oninit: function(vnode) 
  {
    if(vnode.attrs.id)
    {
      ContactForm.contact = contacts.get(vnode.attrs.id);
      return;
    }
    ContactForm.contact = new Contact();
    m.route.set("/new");
  },
  view: function() 
  {
    var deleteCss = "";
    if(ContactForm.contact.id == 0) 
      deleteCss = "disabled";
    return m("section#contact-form", 
      m("form#the_code-form.active",
      [
        m("h4", "Contact Form",
          m("button.btn btn-danger",
          {
            onclick: ()=>
            {
              contacts.delete(ContactForm.contact);
              ContactForm.contact = new Contact();
              m.route.set("/new");
            },
            style: "float: right",
            class: deleteCss
          },
          "delete")),

        m("div.form-group",
          m("label","first name"),
          m("input.form-control", {
            placeholder: "first name", 
            value: ContactForm.contact.firstName,
            oninput: m.withAttr("value", (v)=> 
              { 
                ContactForm.contact.firstName = v; 
              })
          })),


        m("div.form-group",
          m("label","last name"),
          m("input.form-control", {
            placeholder: "last name", 
            value: ContactForm.contact.lastName,
            oninput: m.withAttr("value", (v)=> { ContactForm.contact.lastName = v; })
          })),
        m("div.form-group",
          m("label","email"),
          m("input.form-control", {
            placeholder: "email", 
            value: ContactForm.contact.email,
            oninput: m.withAttr("value", (v)=> { ContactForm.contact.email = v; })
          })),
        m("strong", "languages"), 
        m(LangBoxes),
        m(AddressFields),
        m("div.form-group",
          [
            m("button.btn btn-success btn-lg", 
              {
                type: "button",
                onclick: ()=>{contacts.save(ContactForm.contact);}
              },
              "Save Contact"),
            m("button.btn btn-warning btn-lg",
              {
                type: "button",
                onclick: ()=> {
                  contacts.save(ContactForm.contact);
                  ContactForm.contact = new Contact();
                }
              },
              "Save & Add")
         ])
      ])
    );
  }
};

var AddressFields =
{
  view: function()
  {
    return m("fieldset",
    [
      m("legend", "Address",
        m("button.btn btn-xs btn-primary", 
        {
          type: "button",
          style: "float: right",
          onclick: ()=> { ContactForm.contact.addresses.push(new Address); }
        },
        "add address")
      ),
      ContactForm.contact.addresses.map((a)=>
      {
        return m("div.address.grid.well.well-sm", 
          m("div.row", 
          [
            m("div.form-group.col-md-12",
              m("label","street"),
              m("input.form-control", {
                placeholder: "street address", 
                value: a.street1,
                oninput: m.withAttr("value", (v)=> { a.street1 = v; })
              })),

            m("div.form-group.col-md-12",
              m("input.form-control", {
                placeholder: "apt or suite #, etc", 
                value: a.street2,
                oninput: m.withAttr("value", (v)=> { a.street2 = v; })
              })),

            m("div.form-group.col-md-12",
              m("label","city"),
              m("input.form-control", {
                placeholder: "city", 
                value: a.city,
                oninput: m.withAttr("value", (v)=> { a.city = v; })
              })),

            m("div.form-group.col-md-6",
              m("label","state"),
              m("input.form-control", {
                placeholder: "e.g. AK, NY, ...", 
                value: a.state,
                oninput: m.withAttr("value", (v)=> { a.state = v; })
              })),
            
            m("div.form-group.col-md-4",
              m("label","zip"),
              m("input.form-control", {
                placeholder: "street address", 
                value: a.zip,
                oninput: m.withAttr("value", (v)=> { a.zip = v; })
              })),
          ]
        ));

      })

    ]);
  }

};

var LangBoxes = 
{
  view: function()
  {
    return m("div.grid well", 
    [
      ,
      m("div.row",
      _.keys(Contact.languages)
        .map((key)=>
        {
          var checked = null;
          if(ContactForm.contact.langs[key])
            checked="checked";

          return m("div.col-md-3", [
            m("input",
            {
              name: "langs",
              checked: checked,
              type: "checkbox",
              value: key,
              onclick: ()=>{
                if(ContactForm.contact.langs[key])
                  ContactForm.contact.langs[key] = null;
                else
                  ContactForm.contact.langs[key] = true;
              }
            }),
            m("span", Contact.languages[key])
            ]);
        })
      )
      
    ]);
  }
};