import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const register = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, confirmPassword , role } = req.body;

    // Validate required fields
    if (!name || !email || !password || !confirmPassword || !role) {
      res.status(400).json({
        message: "All fields are required",
      });
      return;
    }

    // Check password confirmation
    if (password !== confirmPassword) {
      res.status(400).json({
        message: "Passwords do not match",
      });
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(409).json({
        message: "Email already registered",
      });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
  const user = await User.create({
  name,
  email,
  password: hashedPassword,
  role,
});

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


export const login = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      res.status(400).json({
        message: "Email and password are required",
      });
      return;
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({
        message: "Invalid email or password",
      });
      return;
    }

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      res.status(401).json({
        message: "Invalid email or password",
      });
      return;
    }

    // Create JWT
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        message: "Email is required",
      });
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    // Create reset token
    const resetToken = jwt.sign(
      {
        userId: user._id,
        type: "password-reset",
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "15m",
      }
    );

    // Temporary response for development
    res.status(200).json({
      message: "Password reset token created",
      resetToken,
    });
  } catch (error) {
    console.error("Forgot password error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      resetToken,
      newPassword,
      confirmPassword,
    } = req.body;

    if (!resetToken || !newPassword || !confirmPassword) {
      res.status(400).json({
        message: "All fields are required",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      res.status(400).json({
        message: "Passwords do not match",
      });
      return;
    }

    if (newPassword.length < 6) {
      res.status(400).json({
        message: "Password must be at least 6 characters",
      });
      return;
    }

    // Verify reset token
    let decoded: any;

    try {
      decoded = jwt.verify(
        resetToken,
        process.env.JWT_SECRET as string
      );
    } catch (error) {
      res.status(400).json({
        message: "Invalid or expired reset token",
      });
      return;
    }

    if (decoded.type !== "password-reset") {
      res.status(400).json({
        message: "Invalid reset token",
      });
      return;
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
export const logout = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};