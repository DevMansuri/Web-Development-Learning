
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { findOne } = require("mongoose/lib/model");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB",{useNewUrlParser : true});

const itemsSchema = new mongoose.Schema( {
  name : String 
})

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item ({  
  name : "Welcome to todo lost"
});
const item2 = new Item ({  
  name : "Hit this to save data"
});
const item3 = new Item ({  
  name : "hit to delete data"
});

const defaultItems = [item1,item2,item3];

const listSchema= new mongoose.Schema({
  name : String,
  items :[itemsSchema]
});

const List = mongoose.model("List", listSchema);  

app.get("/", function(req, res) {
  Item.find({})
  .then(function(foundItems) {
    if(foundItems.length === 0) {
      Item.insertMany(defaultItems)
      .then(function() {
        console.log("Successfully saved data in database");
      }).catch(function(err) {
          console.log(err);
        });

    } else {
        res.render("list", {listTitle: "Today", newListItems: foundItems});
      }
  }).catch(function(err) {
    console.log(err);
  });

});

app.get("/:customListName" , function(req, res) {
  const customListName = _.capitalize(req.params.customListName);
  List.findOne({name : customListName})
  .then(function(foundList) {
    
    if(!foundList) {
      const list = new List({
        name : customListName,
        items: defaultItems
      });
      list.save();
      res.redirect("/"+customListName);
    
    }
    else {
      res.render("list", {listTitle: foundList.name, newListItems: foundList.items} );
    }
    
   }).catch(function(err) {
    console.log(err);
   });
});

app.post("/", function(req, res){
  const itemName = req.body.newItem;
  const listName = req.body.list;
  const item = new Item( {
    name : itemName
  });

  if(listName === "Today") {
    item.save();
    res.redirect("/");
  }
  else {
    List.findOne({name: listName})
    .then(function(foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/"+ listName);
    })
  }
});

app.post("/delete", function(req ,res) {
  const cheackedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if(listName === "Today") {

    Item.findByIdAndRemove(cheackedItemId).then(function(err) {
      if (!err) {
        console.log("deleted item");
      }
    }).catch(function(err) {
      console.log(err);
    });
    res.redirect("/");
  }
  else {
    List.findOneAndUpdate({name : listName},{$pull :{items:{_id:cheackedItemId}}})
    .then(function(err) {
      if (!err) {
        console.log(listName)
        

      }
    }).catch(function(err) {
      console.log(err);
    });
    res.redirect("/"+listName);
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
