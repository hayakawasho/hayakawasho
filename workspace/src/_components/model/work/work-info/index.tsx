export const WorkInfo: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ label, children }) => {
  return (
    <dl className="text-[1.1rem] pc:text-[1.2rem]">
      <dt className="backface-hidden opacity-50 overflow-hidden">
        <div className="inline-block uppercase" data-ref="infoText">
          {label}
        </div>
      </dt>
      <dd className="backface-hidden overflow-hidden">
        <div className="inline-block" data-ref="infoText">
          {children}
        </div>
      </dd>
    </dl>
  );
};
