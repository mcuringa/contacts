var root = document.body;


var Layout = 
{
  view: function(vnode) 
  {
    return m("div.container",
      m("main.grid", m("div.row",
        [
          m("div.col-md-4", m(ContactList)),
          m("div.col-md-6", vnode.children)
        ]
      )));
  }
};

var ContactList =
{
  view: function()
  {
    return m("div", 
      [
        m("h4","Contact List"),
        m("ul", 
          contacts.findAll().map(
            (c)=>
            {
              var thisContact = c;
              return m("li", m("a",
              {
                href: "#!/edit/" + c.id,
                onclick: ()=>{
                  ContactForm.contact = contacts.get(thisContact.id);
                }
              },
              c.getFullName()));
            }
          )
        ),
      ]);
  }
}

var ContactForm =
{
  contact: new Contact(),
  oninit: function(vnode) 
  {
    if(vnode.attrs.id)
      ContactForm.contact = contacts.get(vnode.attrs.id);
    else
      ContactForm.contact = new Contact();
  },
  view: function() 
  {
    console.log("view called");
    return m("section#code-form", 
      m("form#the_code-form.active",
      {
          onsubmit: function(e) 
          {
            console.log("saving");
            e.preventDefault();
            contacts.save(ContactForm.contact);
        }
      },
      [
        m("h4", "Contact Form"),
        m("div.form-group",
          m("input.form-control", {
            placeholder: "first name", 
            value: ContactForm.contact.firstName,
            oninput: m.withAttr("value", (v)=> { ContactForm.contact.firstName = v; })
          })),
        m("div.form-group",
          m("input.form-control", {
            placeholder: "last name", 
            value: ContactForm.contact.lastName,
            oninput: m.withAttr("value", (v)=> { ContactForm.contact.lastName = v; })
          })),
        m("div.form-group",
          m("input.form-control", {
            placeholder: "email", 
            value: ContactForm.contact.email,
            oninput: m.withAttr("value", (v)=> { ContactForm.contact.email = v; })
          })),
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


m.route(root,"/new", {
  "/new": {
    render: function() {
        return m(Layout, m(ContactForm));
    }
  },
  "/edit/:id": {
    render: function(vnode) {
        return m(Layout, m(ContactForm,vnode.attrs));
    }
  }
});