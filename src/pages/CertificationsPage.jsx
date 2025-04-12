import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";

/* SEO Metadata (for index.html head):
  <title>Certifications – Shanmukh Sri Surya Gopi</title>
  <meta name="description" content="Explore professional certifications earned by Shanmukh in data, cloud, Salesforce, Tableau, and more.">
  <meta name="keywords" content="Certifications, Shanmukh, Salesforce, Tableau, MBA, Cloud, Python">
*/

export default function CertificationsPage() {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    const fetchCerts = async () => {
      const snap = await getDocs(collection(db, "certifications"));
      const data = snap.docs.map(doc => doc.data());
      setCerts(data);
    };
    fetchCerts();
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#f3f4f6] to-[#e0f7fa] min-h-screen py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">📜 Certifications</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {certs.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-white/80 p-5 rounded-xl shadow border border-gray-200 text-center"
          >
            {c.imageUrl && (
              <img
                src={c.imageUrl}
                alt={c.title}
                className="h-48 w-full object-contain mb-3 rounded"
              />
            )}
            <h2 className="text-lg font-semibold text-gray-800">{c.title}</h2>
            <p className="text-sm text-gray-600">{c.issuer}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
