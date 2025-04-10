export default function SubjectsPage() {
  const subjects = ["Business Analytics", "Data Science", "Cloud Computing", "Project Management"];
  return (
    <div className="bg-gradient-to-br from-[#f3f4f6] to-[#e0f7fa] min-h-screen py-10 px-4 bg-emoji-pattern">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">📚 Subjects</h1>
      <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {subjects.map(subject => (
          <div key={subject} className="bg-white/70 backdrop-blur-sm shadow rounded-2xl p-4 text-center text-gray-800 text-lg font-semibold">
            {subject}
          </div>
        ))}
      </div>
    </div>
  );
}
