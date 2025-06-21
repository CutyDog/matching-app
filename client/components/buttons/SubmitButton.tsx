export default function SubmitButton({
  children,
  isSubmitting
}: {
  children: React.ReactNode,
  isSubmitting?: boolean,
}) {
  return (
    <button
      type="submit"
      className="flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-bold text-foreground shadow-sm disabled:opacity-75 disabled:cursor-not-allowed"
      style={{ backgroundColor: "oklch(58.5% .233 277.117)" }}
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
          <span>処理中...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}