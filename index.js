const express = require("express");
const app = express();
const port = 3000;
const path = require("path"); // npm install path
// ye path module ko use krne ke liye hain jo ki file path ko handle karega


const methodOverride = require('method-override') // npm install method-override
app.use(methodOverride('_method'))

const { v4: uuidv4 } = require('uuid'); // npm install uuid
// uuidv4(); // ye unique id generate karega

app.use(express.urlencoded({ extended: true })); // ye post use krne k liye likha hain ye incode data read karega

app.set("view engine", "ejs"); // set the views engin to ejs
app.set("views", path.join(__dirname, "/views")); // set the view directory

app.use(express.static(path.join(__dirname, "public")));

// let make data

let post = [
  {
    id: uuidv4(), // ye unique id generate karega
    username: "apnacollage",
    content: "I Love Coding",
  },
  {
    id: uuidv4(),
    username: "rakeshmahato",
    content: "Hard Work",
  },
  {
    id: uuidv4(),
    username: "rakesh",
    content: "I got selected my first internship",
  },
];


// incoming  Data //==================ROUTES========================//


app.get("/posts", (req, res) => {
  // res.send("serving working well!");
  res.render("index.ejs", { post }); //index.ejs wala file ka data posts kr dega webpage mein
});

// post send the form to server

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");                        /// ye done hain get se form create ho rha hani new.ejs se file le aa rha hain
});

// new post ko accept karega // new post display hoga

app.post("/posts", (req, res) => {
  // console.log(req.body);
  const {  username, content } = req.body;
  const id = uuidv4(); // ye unique id generate karega
  post.push({ id , username, content });   // new post ko push kr diya post array mein
  res.redirect('/posts')   // push hone k baad redirect kr dega posts url mein
});

// new path by id

// app.get("/posts/:id", (req, res) => {
//   let { id } = req.params;
//   console.log(id); // ye id ko console mein print karega
//   let idPosts = post.find((p) => id === p.id);  // post.find() post wala array se find kate ka 
//   console.log(idPosts); // ye idPosts ko console mein print karega

//   res.render("show.ejs", { idPosts }); // ye show.ejs file ko render karega aur idPosts ko pass karega
// });
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let idPosts = post.find(p => p.id === id);
  if (!idPosts) {
    // Either render a 404 page or send a message
    return res.status(404).send("Post not found");
  }
  res.render("show.ejs", { idPosts });
});






//================================EDITE POST BY PATCH==================================//






app.patch("/posts/:id", (req, res) => {
  const { id } = req.params;
  const idPosts = post.find(p => p.id === id);
  if (!idPosts) {
    return res.status(404).send("Post not found");
  }
  const newContent = req.body.content;
  idPosts.content = newContent;
  res.redirect(`/posts/${id}`);
});



// edit data SUBMIT BUTTON WALA FUNCTIONLITY HAIN

app.get("/posts/:id/edit",(req,res)=>{
  let {id} = req.params;
  let idPosts = post.find((p) => id===p.id);
  // post.push(idPosts.content);
  res.render("edit.ejs", {idPosts});
 
});


// =============================== by chat gpt=================

// app.get("/posts/:id/edit", (req, res) => {
//   const { id } = req.params;
//   const idPosts = post.find(p => p.id === id);
//   if (!idPosts) {
//     return res.status(404).send("Post not found");
//   }
//   res.render("edit.ejs", { idPosts });
// });



//================================DELETE POST BY DELETE==================================//
app.delete("/posts/:id", (req,res) => {
  let { id } = req.params; // ye id ko req.params se le lega
    post = post.filter(p => p.id !== id); // ye idPosts ko filter karega aur id ke barabar wale post ko hata dega
  res.redirect("/posts"); // ye posts url mein redirect karega
  alert("Post deleted successfully!"); // ye alert message show karega

});






//======================================================================================================
app.listen(port, () => {
  console.log(`Listening the post: ${port}`);
});
