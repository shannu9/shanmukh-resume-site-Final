const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

const serviceAccount = require("./serviceAccountKey.json");
const data = require("./resume_seed_data.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
console.log("Using project:", admin.app().options.credential.projectId);

const db = admin.firestore();

async function addWithRetry(collectionName, docData, retries = 3) {
  while (retries > 0) {
    try {
      await db.collection(collectionName).add(docData);
      return;
    } catch (err) {
      console.error(`❌ Failed to add to ${collectionName}:`, err.message);
      retries--;
      if (retries > 0) {
        console.log(`🔁 Retrying... (${retries} retries left)`);
        await new Promise(res => setTimeout(res, 1000));
      } else {
        console.log(`🚨 Giving up on:`, docData);
      }
    }
  }
}

(async () => {
  try {
    for (const [collectionName, documents] of Object.entries(data)) {
      console.log(`📁 Uploading to collection: ${collectionName}`);
      for (const doc of documents) {
        await addWithRetry(collectionName, doc);
      }
    }
    console.log("✅ Resume data imported successfully.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Unexpected error during import:", err);
    process.exit(1);
  }
})();
