export default function MainTitle() {
  const h1Style = `
  text-5xl 
  leading-[3.75rem] 
  font-semibold
  text-white`;

  return (
    <div>
      <h1 className={h1Style}>BUSAN</h1>
      <h1 className={h1Style}>SOFTWARE MEISTER</h1>
      <h1 className={h1Style}>HIGH SCHOOL</h1>
      <hr className="text-white mt-10" />
    </div>
  );
}
