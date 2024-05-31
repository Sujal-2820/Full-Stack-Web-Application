// GET all, POST any

// api/userData/route.js
//for dashbpoard

import UserData from "../../../../models/userData";
import Connection from "../../../../database/config";
import { NextResponse } from "next/server";


export async function GET(request) {
  try {
    await Connection(request);

    const allUserData = await UserData.find();

    const responseData = {
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

