export default function ReadmeEmptyState() {
  return (
    <div className="w-full max-w-4xl border border-[#30363d] rounded-2xl bg-[#0d1117] shadow-lg mt-4">
      {/* Header */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-[#30363d]">
        <div className="w-5 h-5 border border-[#8b949e] rounded-sm flex items-center justify-center">
          <span className="text-[#8b949e] text-xs">📄</span>
        </div>
        <span className="text-sm text-[#c9d1d9] font-medium">README</span>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center text-center py-20 px-6">
        <div className="mb-4 text-[#8b949e] text-4xl">📘</div>

        <h2 className="text-xl font-semibold text-[#c9d1d9] mb-2">
          Add a README
        </h2>

        <p className="text-[#8b949e] mb-6 max-w-md">
          Add a README with an overview of your project.
        </p>

        <button className="bg-[#238636] hover:bg-[#2ea043] text-white px-4 py-2 rounded-md text-sm font-medium transition">
          Add a README
        </button>
      </div>
    </div>
  );
}
