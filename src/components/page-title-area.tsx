interface PageTitleAreaProps {
  title: string;
}

export function PageTitleArea({ title }: PageTitleAreaProps) {
  return (
    <div className="border-b bg-white border-[#E6E6E6] px-6 flex items-center h-16">
      <div className="w-full max-w-[1352px] mx-auto">
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
    </div>
  );
}
