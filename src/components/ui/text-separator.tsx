type Props = {
  text?: string;
};
export default function TextSeparator({ text = "OR" }: Props) {
  return (
    <div className="text-outline before:border-error-container after:border-error-container relative flex w-full items-center text-sm before:flex-1 before:border-t before:content-[''] after:flex-1 after:border-t after:content-['']">
      <span className="px-3">{text}</span>
    </div>
  );
}
