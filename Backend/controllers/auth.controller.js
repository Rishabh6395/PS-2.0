const userModel = require('../models/user.model')
const adminModel = require('../models/admin.model')

const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  try {
    const { fullname, email, password } = req.body;

    // validation
    if (!fullname || !fullname.firstname || !fullname.lastname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check user exists
    const isUserAlreadyExists = await userModel.findOne({ email });
    if (isUserAlreadyExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await userModel.create({
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname,
      },
      email,
      password: hashedPassword,
    });

    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    // send cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // response (no password)
    res.status(201).json({
      message: "User registered successfully",
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function registerAdmin(req, res) {
  try {
    const {fullname, email, password} = req.body;

    // validation
    if(!fullname || !fullname.firstname || !fullname.lastname || !email || !password){
      return res.status(400).json({message: "All the feilds are required!!"})
    }

    // check if the admin is already registerd or not
    const isAdminExists = await adminModel.findOne({email})
    if(isAdminExists){
      return res.status(400).json({message: "Admin is already registerd"})
    }

    // hash password
    const passwordHashed = await bcrypt.hash(password, 10);

    // create admin
    const admin = await adminModel.create({
      fullname:{
        firstname: fullname.firstname,
        lastname: fullname.lastname
      },
      email,
      password: passwordHashed
    })

    const token = jwt.sign({ id: admin._id}, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    })

    // send cookie
    res.cookie("token", token,{
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })

    // response without password:
    res.status(201).json({
      message: "Admin is successfully registed",
      _id: admin._id,
      fullname: admin.fullname,
      email: admin.email,
      password: admin.password
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function loginAdmin(req, res){
  const {email, password} = req.body;

  const admin = await adminModel.findOne({email})

  if(!admin){
    return res.status(400).json({message: "Invalid email or password"})
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password)

  if(!isPasswordValid){
    return res.status(400).json({message: "Invalid email or password"})
  }

  const token = jwt.sign({
    id: admin._id,
  },process.env.JWT_SECRET_KEY)

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  })

  
  res.status(200).json({
    message: "Admin Login successfully",
    admin: {
      _id: admin._id,
      fullname: admin.fullname,
      password: admin.password
    }
  })
}

async function logoutAdmin(req, res) {
  res.clearCookie('token')
  res.status(200).json({message: "Admin logged out successfully"})
}

async function loginUser(req, res){
    const {email, password} = req.body;

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({message: "Invalid email or password"})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(400).json({message: "Invalid email or password"})
    }

    const token = jwt.sign({
        id: user._id,

    },process.env.JWT_SECRET_KEY)

    res.cookie("token", token)

    res.status(200).json({
        message: "User login successfully",
        user: {
            _id: user._id,
            fullname: user.fullname,
            email: user.email
        }
    })
}

async function logoutUser(req, res){
  res.clearCookie("token");
  res.status(200).json({message: "User logged out successfully"});
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerAdmin,
    loginAdmin,
    logoutAdmin
}