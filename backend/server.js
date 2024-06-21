const express = require('express');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const userRouter = require('./routes/userRouter')
const applicationRouter = require('./routes/applicationRouter')
const jobRouter = require('./routes/jobRouter')
const resumeRouter = require('./routes/resumeRouter')
const sequelize = require('./database')
const ErrorHandler = require('./middleware/error');



const app = express();
dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//middlewares
app.use(cors({
   origin: [process.env.FRONTEND_URL],
   methods: ['GET','PUT','DELETE','POST'],
   credentials:true,
}));
app.use(cookieparser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"./tmp/",
}))

app.use('/api/user' , userRouter);
app.use('/api/application' , applicationRouter);
app.use('/api/job' , jobRouter);
app.use('/api/resume' , resumeRouter);
const PORT = process.env.PORT || 4000

app.use(ErrorHandler);


app.get("/", (req, res) => {
  res.json("Hey");
}); 
//server
app.listen({ port: PORT }, async () => {
  console.log(`Server running on port ${PORT}`)
  
})
