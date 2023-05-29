"use client";

export interface IContainerProps {
  children: React.ReactNode;
}

function Container({ children }: IContainerProps) {
  return (
    <div
      className="
    max-w-[2520px] 
    max-auto 
    xl:px-20 
    md:px-10 
    sm:px-2 px-4"
    >
      {children}
    </div>
  );
}

export default Container;
