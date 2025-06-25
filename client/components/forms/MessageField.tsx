export const MessageField = ({
  input,
  setInput,
  disabled,
}: {
  input: string;
  setInput: (input: string) => void;
  disabled: boolean;
}) => {
  return (
    <>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="メッセージを入力"
        rows={1}
        className="flex-1 border rounded-full px-4 py-2 mr-2 focus:outline-none focus:ring"
      />
      <button
        type="submit"
        disabled={disabled || !input.trim()}
        className="bg-primary text-white rounded-full px-6 py-2 disabled:opacity-50"
      >
        送信
      </button>
    </>
  )
}