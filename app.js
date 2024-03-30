const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://ishursmd:Ishu123@cluster1.lyr6lpp.mongodb.net/todolistDB");
//schema
const itemsSchema = {
  name: String,
};
//new mongoose model
const Item = mongoose.model("Item", itemsSchema);
const item1 = new Item({
  name: "Ready to rock your to-do list? Let's go!",
});
const item2 = new Item({
  name: "Ready to expand your list? Hit the + button to add new items!",
});
const item3 = new Item({
  name: "To remove, tap the checkbox!",
});
const defaultItems = [item1, item2, item3];
//new schema -- list schema
const listSchema = {
  name: String,
  items: [itemsSchema],
};
const List = mongoose.model("List", listSchema);

//our default list and items
app.get("/", function (req, res) {
  Item.find({})
    .then(function (founditems) {
      if (founditems.length === 0) {
        Item.insertMany(defaultItems)
          .then(function () {
            console.log("Successfully saved default items to DB");
          })
          .catch(function (err) {
            console.log(err);
          });
        res.redirect("/");
      } else {
        res.render("list", { listTitle: "Today", newListItems: founditems });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
});

//for customized lists
app.get("/:customListName", (req, res) => {
  const customListName = _.capitalize(req.params.customListName);
  List.findOne({ name: customListName })
    .then((foundList) => {
      if (!foundList) {
        //if list already exists
        const list = new List({
          name: customListName,
          items: defaultItems,
        });
        return list.save().then(() => {
          res.redirect("/" + customListName);
        });
      } else {
        //if the list is new
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items,
        });
      }
    })
    .catch((err) => {
      console.error("Error:", err);
    });
});
app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;
  const item = new Item({
    name: itemName,
  });
  if (listName === "Today") {
    //if we are in default today list
    item.save();
    res.redirect("/");
  } else {
    //if we are in our customized list
    List.findOne({ name: listName })
      .then((foundList) => {
        //if found then add in the foundList
        if (foundList) {
          foundList.items.push(item);
          return foundList.save();
        } else {
          throw new Error("List not found");
        }
      })
      .then(() => {
        res.redirect("/" + listName);
      })
      .catch((err) => {
        console.error(err);
      });
  }
});
app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndDelete(checkedItemId)
      .then(function () {
        console.log("Successfully deleted checked item.");
        res.redirect("/");
      })
      .catch(function (err) {
        console.log(err);
      });
  } else {
    List.findOneAndUpdate(
      { name: listName }, // Find the list by name
      { $pull: { items: { _id: checkedItemId } } } // Pull the item with the specified ID
    )
      .then(() => {
        res.redirect("/" + listName);
      })
      .catch((err) => {
        // Handle error
        console.error(err);
      });
  }
});
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
