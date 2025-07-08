
import { useState } from "react";
import { motion } from "framer-motion";
import { FaFileUpload } from "react-icons/fa";

export default function AIToolPage() {
  const [industry, setIndustry] = useState("");
  const [fields, setFields] = useState([]);
  const [file, setFile] = useState(null);
  const [useAI, setUseAI] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [agree, setAgree] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const industryFieldsMap = {
    Warehouse: ["Product Name", "Sales Volume", "Stock Level", "Category"],
    Healthcare: ["Patient ID", "Diagnosis", "Treatment Cost", "Outcome"],
    Retail: ["Item", "Revenue", "Discount", "Customer Segment"]
  };

  const handleIndustryChange = (e) => {
    const selected = e.target.value;
    setIndustry(selected);
    setFields(industryFieldsMap[selected] || []);
    setSubmitted(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !industry) {
      alert("Please complete all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("industry", industry);
    formData.append("use_ai", useAI);

    if (useAI) {
      if (!apiKey || !agree) {
        alert("Please provide API key and agree to terms.");
        return;
      }
      formData.append("gpt_api_key", apiKey);
    }

    try {
      const res = await fetch("https://ai-report-2.onrender.com/generate-report/", {
        method: "POST",
        body: formData
      });

      if (!res.ok) throw new Error("Failed to generate report");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "AI_Insights_Report.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();

      setSubmitted(true);
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong while generating the report.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-4">
          AI Business Insight Tool
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold">Select Industry:</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={industry}
              onChange={handleIndustryChange}
              required
            >
              <option value="">-- Choose Industry --</option>
              <option value="Warehouse">Warehouse</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Retail">Retail</option>
            </select>
          </div>

          {fields.length > 0 && (
            <div>
              <label className="block font-semibold mb-1">Required Fields:</label>
              <ul className="list-disc list-inside text-gray-700">
                {fields.map((field, index) => (
                  <li key={index}>{field}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <label className="block font-semibold mb-1">Upload CSV File (≤100 records):</label>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={useAI}
                onChange={() => setUseAI(!useAI)}
              />
              Use AI-enhanced analysis (requires OpenAI GPT API Key)
            </label>

            {useAI && (
              <>
                <input
                  type="text"
                  placeholder="Enter your GPT API Key"
                  className="w-full border px-3 py-2 rounded"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  required
                />
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={() => setAgree(!agree)}
                    required
                  />
                  I agree to provide my API key for one-time secure use
                </label>
              </>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Generate PDF Report
          </button>
        </form>

        {submitted && (
          <div className="mt-6 text-green-700 font-medium text-center">
            File submitted successfully! Your PDF report will be downloaded shortly.
          </div>
        )}
      </div>
    </div>
  );
}
