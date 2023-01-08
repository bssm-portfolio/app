type InputVarient = "primary";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  varient?: InputVarient;
}

const getInputCss = (varient: InputVarient) => {
  return `
    p-2.5
    h-9
    rounded 
    font-inter
    text-sm
    border-0.5
    border-primary-border_gray
  `;
};

export default function Input({
  varient = "primary",
  onClick,
  children,
  className = "",
  ...props
}: InputProps) {
  return (
    <input className={`${className} ${getInputCss(varient)}`} {...props} />
  );
}
