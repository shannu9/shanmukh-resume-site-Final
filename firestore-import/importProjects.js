const admin = require("firebase-admin");
const fs = require("fs");

const serviceAccount = require("./serviceAccountKey.json"); // ← Your Firebase admin SDK key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const projects = JSON.parse(fs.readFileSync("Updated_Resume_Projects_With_Tags.json", "utf8"));

async function importData() {
  for (const project of projects) {
    try {
      await db.collection("projects").add(project);
      console.log(`✅ Uploaded: ${project.title}`);
    } catch (err) {
      console.error(`❌ Failed to upload ${project.title}:`, err);
    }
  }
}

importData();
