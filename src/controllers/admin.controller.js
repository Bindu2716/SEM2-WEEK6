import bcrypt from 'bcryptjs';
import Admin from '../models/admin.model.js';
export const signUpAdmin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    
    // Check if the user already exists
    const user = await Admin.findOne({ userName });
    if (user) {
      return res.status(400).json({ error: "User Already Exists" });
    }
    
    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    
    const newUser = new Admin({
      userName,
      password: hashPassword,
    });
    
    // Save the new user
    await newUser.save();
    console.log("New Admin Created");
    
    res.status(201).json({
      _id: newUser._id,
      userName: newUser.userName,
    });
    
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logInAdmin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    
    // Find the user by username
    const user = await Admin.findOne({ userName });
    
    // Check if user exists and password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ success: false, error: "Invalid Username or Password" });
    }

    console.log("Admin Logged In", user);
    res.status(200).json({ success: true, userName: user.userName });
    
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const logoutAdmin = (req, res) => {
  try {
    console.log("Admin Logged Out");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
