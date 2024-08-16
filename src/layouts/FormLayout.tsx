type Props = {
  children: React.ReactNode;
};

const FormContainer = ({ children }: Props) => {
  return (
    <div className="container py-10 flex justify-center">
      <div className="border border-slate-300 shadow-md w-full max-w-[500px] p-4">
        {children}
      </div>
    </div>
  );
};

export default FormContainer;
