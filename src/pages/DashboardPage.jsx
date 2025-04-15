import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://public.tableau.com/javascripts/api/viz_v1.js";
    script.async = true;
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f4f6] to-[#e0f7fa] py-10 px-4 full-width-page">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10 flex items-center justify-center gap-2">
        📊 Interactive Dashboards
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-200"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">💰 Sales Performance (Tableau)</h2>

        <div ref={containerRef} className="w-full overflow-hidden">
          <div className="tableauPlaceholder" style={{ width: "100%", height: "700px" }}>
            <object className="tableauViz" style={{ width: "100%", height: "100%" }}>
              <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
              <param name="embed_code_version" value="3" />
              <param name="site_root" value="" />
              <param name="name" value="DashboardonWebPage/Dashboard1" />
              <param name="tabs" value="no" />
              <param name="toolbar" value="yes" />
              <param name="animate_transition" value="yes" />
              <param name="display_static_image" value="yes" />
              <param name="display_spinner" value="yes" />
              <param name="display_overlay" value="yes" />
              <param name="display_count" value="yes" />
              <param name="language" value="en-US" />
            </object>
          </div>
        </div>
      </motion.div>
    </div>
  );
}