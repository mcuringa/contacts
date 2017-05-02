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