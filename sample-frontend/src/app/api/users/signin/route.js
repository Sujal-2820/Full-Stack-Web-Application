// src/pages/api/signin/route.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../../../models/user'; // Adjust path as necessary
import Connection from '../../../../database/config'; // Adjust path as necessary
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await Connection(request); // Ensure the database connection is established

    const body = await request.json();

    const { email, password } = body;


    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json({ message: 'User does not exist' }, { status: 404 });
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    // Authentication successful, generate token
    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Set cookie with token
    const response = NextResponse.json({ message: 'Authentication successful' });
    response.cookies.set('token', token, { httpOnly: true });

    return response;
  } catch (error) {
    console.log('Error while signing in:', error.message);
    return NextResponse.json({ message: 'Error signing in', error: error.message }, { status: 500 });
  }
}
