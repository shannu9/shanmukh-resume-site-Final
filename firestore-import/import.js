const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const data = require("./resume_seed_data.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

(async () => {
  try {
    for (const [collectionName, documents] of Object.entries(data)) {
      console.log(`Uploading to collection: ${collectionName}`);
      for (const doc of documents) {
        await db.collection(collectionName).add(doc);
      }
    }
    console.log("✅ Resume data imported successfully.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error importing data:", err);
    process.exit(1);
  }
})();
