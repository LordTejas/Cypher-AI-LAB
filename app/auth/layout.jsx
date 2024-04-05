export default function Layout({ children }) {
  return (
    <main className='min-h-screen min-w-screen bg-slate-100 flex justify-center items-center'>

      <div className='w-[90vw] sm:w-[80vw] md:w-[70vh] lg:w-[60vh] xl:w-[30rem]'>
        {children}
      </div>

    </main>
  );
}