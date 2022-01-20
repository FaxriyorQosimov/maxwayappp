const express = require('express') 
const cors = require('cors')
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jsonwebtoken = require('jsonwebtoken')
const config = require('config')



const app = express()
app.use(express.json())
// app.use(express.urlencoded())
app.use(cors())

mongoose.connect(config.get('mongooseUrl'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
}, () => {
    console.log("DB connected");
});


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})


const User = new mongoose.model("User", userSchema)

// Routes
app.get('/data', async (req, res) => {
    res.send({message: 'salom'})
})
app.post('/login', 
[
    check('email', 'togri parol kiriting').normalizeEmail().isEmail(),
    check('password', 'parol kiriting').exists()
],
async (req, res)=>{
    try{
        const { email, password} = req.body;
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            res.send({
                errors: errors.array(),
                message: "tizimga kirishda xatolik", id: 'error'
            })
        }

        const user = await User.findOne({email})

        
        const isMatch = await bcryptjs.compare(password, user.password)
        
        if(!isMatch) {
             res.send({message: 'xato parol, qaytadan urining', id: 'warning'})
        }
        
        if(!user) {
             res.send({message: 'foydalanuvchi topilmadi', id: "warning"})
        }else {
             res.send({message: "Muvaffaqiyatli kirish", id: 'success', user: user})
        }
        const token = jsonwebtoken.sign(
            {userId: user.id},
            jwtSecret= "faxriyor maxway mern",
            {expiresIn: '1h'}
        )

        // res.send({token, userId: user.id})


    }catch (e) {
        res.send({message: "Ma'lumotlar xato kiritilgan", id: "error"})
    }

})

app.post('/register',
[
    check('email', "xato email").isEmail(),
    check('password', "6 ta raqamdan iborat bo'lishi kerak")
        .isLength({min: 6})
],
async (req, res)=>{
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            res.send({
                errors: errors.array(),
                message: "Tizimga kirishda xatolik", id: 'error'
            })
        }
        const {name, lastName, email, password} = req.body;

        const candidate = await User.findOne({email})

        if(candidate ) {
            res.send({message: "Bunday foydalanuvchi mavjud", id: 'warning'})
        }

        const hashedPassword = await bcryptjs.hash(password, 12)
        const user = new User({email, password: hashedPassword})

        await user.save()

        res.send({message: "Muvaffaqiyatli kirish", id: 'success', auth: ''})

    }catch (e) {
        res.send({message: "Ma'lumotlar xato kiritilgan", id: 'error'})
    }

})

const PORT = config.get('port') || 9002

app.listen(PORT, () => {
    console.log("BE started at port 9002");
})