// import * as functions from "firebase-functions";
import { onCall, HttpsError } from "firebase-functions/v2/https";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Adds two numbers to each other.
export const addnumbers = onCall((request) => {
  // Numbers passed from the client.
  const firstNumber = request.data.firstNumber;
  const secondNumber = request.data.secondNumber;

  // Checking that attributes are present and are numbers.
  if (!Number.isFinite(firstNumber) || !Number.isFinite(secondNumber)) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new HttpsError(
      "invalid-argument",
      "The function must be called " +
        "with two arguments \"firstNumber\" and \"secondNumber\" which " +
        "must both be numbers."
    );
  }

  // returning result.
  return {
    firstNumber: firstNumber,
    secondNumber: secondNumber,
    operator: "+",
    operationResult: firstNumber + secondNumber,
  };
});
