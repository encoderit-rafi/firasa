type Props = {
  text?: string;
};
export default function TextSeparator({ text = "OR" }: Props) {
  return (
    <div
      className="relative w-full flex items-center text-sm text-outline
            before:content-[''] before:flex-1 before:border-t before:border-error-container
            after:content-[''] after:flex-1 after:border-t after:border-error-container"
    >
      <span className="px-3">{text}</span>
    </div>
  );
}
