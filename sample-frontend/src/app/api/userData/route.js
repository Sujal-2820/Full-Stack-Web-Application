// GET all, POST any

// api/userData/route.js

import UserData from "../../../models/userData";
import Connection from "../../../database/config";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await Connection(request);

    const body = await request.json();

    const token = request.cookies.get("token");

    // Extract the value from the token object
    const tokenValue = token ? token.value : null;

    // Check if the token value is present
    if (!tokenValue) {
      throw new Error("Authorization token missing");
    }

    // Verify the token using only its value
    const decodedToken = jwt.verify(tokenValue, process.env.JWT_SECRET);
    const userID = decodedToken.userId;

    const { title, category, description, imageURL } = body;

    const newUserData = new UserData({
      title,
      category,
      description,
      imageURL,
      userID,
    });

    await newUserData.save();

    return NextResponse.json(
      { message: "User data created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error while creating user data:", error.message);
    return NextResponse.json(
      { message: "Error creating user data", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await Connection(request);

    const token = request.cookies.get("token");

    // Extract the value from the token object
    const tokenValue = token ? token.value : null;

    // Check if the token value is present
    if (!tokenValue) {
      throw new Error("Authorization token missing");
    }

    // Verify the token using only its value
    const decodedToken = jwt.verify(tokenValue, process.env.JWT_SECRET);
    const userID = decodedToken.userId;
    const username = decodedToken.username;

    console.log(username);
    const filter = { userID: userID };
    const allUserData = await UserData.find(filter);

    const responseData = {
      username: username,
      userData: allUserData
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.log("Error while fetching user data:", error.message);
    return NextResponse.json(
      { message: "Error fetching user data", error: error.message },
      { status: 500 }
    );
  }
}
