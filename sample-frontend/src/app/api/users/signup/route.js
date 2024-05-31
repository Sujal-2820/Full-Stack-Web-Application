// api/users/signup/route.js


import bcrypt from 'bcryptjs';
import User from '../../../../models/user'; // Adjust the path as necessary
import Connection from '../../../../database/config'; // Adjust the path as necessary
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await Connection(request); // Ensure the database connection is established

    const body = await request.json();

    const { username, email, password } = body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    // Save user to database
    await newUser.save();

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.log('Error while registering user:', error.message);
    return NextResponse.json({ message: 'Error registering new user', error: error.message }, { status: 500 });
  }
}
