import { motion } from "framer-motion";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f4f6] to-[#e0f7fa] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          📊 Interactive Dashboards
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-200 mb-12"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">💰 Sales Performance (Tableau)</h2>
          <iframe
              src="https://public.tableau.com/views/DashboardonWebPage/Dashboard1"
              width="100%"
              height="700"
              allowFullScreen
              className="rounded-lg border"
          />

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">📈 Marketing ROI (Power BI)</h2>
          <iframe
            src="https://app.powerbi.com/view?r=YOUR_PUBLIC_LINK"
            width="100%"
            height="700"
            allowFullScreen
            className="rounded-lg border"
          ></iframe>
        </motion.div>
      </div>
    </div>
  );
}
