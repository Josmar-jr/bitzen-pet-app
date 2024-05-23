import type { ReactNode } from "react";

interface InfoTextProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  children: ReactNode;
}

export function InfoText({ label, children, ...props }: InfoTextProps) {
  return (
    <div {...props}>
      <span className="font-medium">{label}</span>
      <p className="text-[#737373]">{children}</p>
    </div>
  );
}
