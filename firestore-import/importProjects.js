const admin = require("firebase-admin");
const fs = require("fs");

// Load Firebase credentials
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Load certifications
const certifications = JSON.parse(
  fs.readFileSync("Certifications_Title_Issuer_Only.json", "utf8")
);

async function importCertifications() {
  for (const cert of certifications) {
    try {
      const query = await db.collection("certifications")
        .where("title", "==", cert.title)
        .get();

      if (query.empty) {
        await db.collection("certifications").add({
          title: cert.title,
          issuer: cert.issuer,
        });
        console.log(`✅ Added: ${cert.title}`);
      } else {
        console.log(`⏭️ Skipped (already exists): ${cert.title}`);
      }
    } catch (error) {
      console.error(`❌ Error with ${cert.title}:`, error);
    }
  }
}

importCertifications();
