const express =  require("express")
const mongoose = require("./mongoose")
const app =      require("express")()
const User =     require("./user")
const Book =     require("./book")


app.use(express.json())  // leidzia pasint json automatiskai

app.post("/users", (req, res) => {   // url path tada callback
    const user = new User(req.body)  // sukuriam nauja useri paimam is body req
    user.save().then(() => {            // savinam nauja useri
        res.status(200).send(user)      // nusiunciam statusa ir user
    }).catch((error) => {
        res.status(400).send(error) 
    })
})

// randa visus
app.get("/users", (req, res)=>{
    User.find({}).then((users)=> {  //mongoose priima objekta nera search kriterij, jeigu funkcija runina tada turim acces i users
        res.send(users)   // graziam userius kaip respo
    }).catch((error)=> {    
        res.status(500).send(error)  //
    })
})


app.get("/users/:id", (req, res)=> { //route param
    const userID = req.params.id   // gauna id reiksme

    User.findById(userID).then((user)=> {    // ieskom pagal paduota id 
        if (!user) {                          // jeigu nera userio
            return res.status(404).send()    // nerado
        }
        res.send(user)                       // jeigu viskas gerai siunciam
    }).catch((error)=> {                    // jeigu servo psues errir
        res.status(500).send(error)
    })

})

app.delete("/users/:id", async (req, res) => {
    try{  // async reiskia funkcija grazins promise
        const user = await User.findByIdAndDelete(req.params.id) // palaukiam promise ir jo rezo is user
    if (!user) {   // jeigu nera userio 
        return res.status(404).send() // grazinam statusa
    }

    res.send(user)   // grazinamas istrintas useris
    }catch(error){
        res.sendStatus(500).send() //jheigu kazkas blogai 
    }
})


app.post("/book", (req, res) => {
    const book = new Book(req.body)
    book.save().then(()=> {
        res.status(200).send(book)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.get("/book", (req, res)=> {
    Book.find({}).then((book)=> {
        res.send(book)
    }).catch((error) => {
        res.status.send(500)
    })
})

app.get("/book/:id", (req, res)=>{
    const bookID = req.params.id 
    Book.findById(bookID).then((book) =>  {
        if (!book) {
            return res.status(404).send()
        }
        res.send(book)
    }).catch((error)=>{
        res.status(500).send()
    })
})




app.delete("/book/:id", async (req, res) => {
    try{
        const book = await Book.findByIdAndDelete(req.params.id)
    if (!book) {
        return res.status(404).send()
    }
    res.send(book)
    }catch(error){
        res.sendStatus(500).send()
    }
})

app.listen(3000, () => {   // klausom porto  ir siunciam zinute
    console.log("Server is up on port " + 3000)
})