import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
    page,

    onPageChange,
  totalElements,
  totalPages,
  size,
  last,
  label = "items",
}) {
  const start =
    totalElements === 0 ? 0 : page * size + 1;

  const end = Math.min(
    (page + 1) * size,
    totalElements
  );

  return (
    <div className="flex items-center justify-between px-5 py-3.5 border-t border-white/[0.05]">
      <span className="text-xs text-white/30">
        Showing {start}-{end} of {totalElements} {label}
      </span>

      <div className="flex gap-1.5">
        {/* Previous */}
        <button
          disabled={page === 0}
          onClick={() => onPageChange(page - 1)}
          className={`text-xs px-3 py-1.5 rounded-lg border ${
            page === 0
              ? "opacity-40 cursor-not-allowed bg-white/[0.02] border-white/[0.05]"
              : "text-white/40 bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.07]"
          }`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`text-xs px-3 py-1.5 rounded-lg ${
              page === i
                ? "bg-orange-500/15 text-orange-300 border border-orange-500/25"
                : "text-white/40 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07]"
            }`}
          >
            {i + 1}
          </button>
        ))}

        {/* Next */}
        <button
          disabled={last}
          onClick={() => onPageChange(page + 1)}
          className={`text-xs px-3 py-1.5 rounded-lg border ${
            last
              ? "opacity-40 cursor-not-allowed bg-white/[0.02] border-white/[0.05]"
              : "text-white/40 bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.07]"
          }`}
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}