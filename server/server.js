const express = require("express")
const app = express()
const port = process.env.PORT || 5000
const mongoose = require("mongoose")
const { MONGOURI } = require("./key")

mongoose.connect(MONGOURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

mongoose.connection.on("connected", () => {
	console.log("connected to mongo")
})
mongoose.connection.on("notconnected", (err) => {
	console.log(err)
})

app.use(express.json())

require("./models/user")
require("./models/post")
app.use(require("./routes/user"))
app.use(require("./routes/post"))
app.use(require("./routes/profile"))

app.get("/", (req, res) => {
	res.send("hellofrom")
})

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"))
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	})
}

app.listen(port, () => {
	console.log(`server is running at ${port}`)
})
