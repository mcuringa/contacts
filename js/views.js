var root = document.body;


var Layout = 
{
  view: function(vnode) 
  {
    return m("div.container",
      m("main.grid", m("div.row",
        [
          m("div.col-md-4", m(ContactList)),
          m("div.col-md-8", vnode.children)
        ]
      )));
  }
};

var ContactList =
{
  view: function()
  {
    var t = m("div", 
      [
        m("h4","Contact List"),
        m("div.list-group", 
          contacts.findAll().map(
            (c)=>
            {
              return m("a.list-group-item",
              { 
                href: "#!/edit/" + c.id,
                onclick: ()=>{
                  ContactForm.contact = contacts.get(c.id);
                }
              },
              c.getFullName()
              );
            }
          )
        ),
      ]);
    return t;
  }
}

var AboutView =
{
  view: function() { return m("div", "hello, world.")}
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
    },
  },
  "/about/": {
    render: function(vnode) {
      return m(Layout, m(AboutView));
    }
  }
});