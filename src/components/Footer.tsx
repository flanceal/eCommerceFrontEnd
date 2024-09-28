export function Footer() {
  return (
    <footer
      className={
        'bg-zinc-200 flex justify-center items-center w-full py-10 mt-auto'
      }
    >
      <div
        className={
          'grid grid-cols-1 sm:grid-cols-2 mx-auto lg:grid-cols-3 gap-10 lg:gap-20'
        }
      >
        <div className={'flex flex-col justify-center sm:justify-start gap-1'}>
          <h6 className={'text-lg font-medium'}>Help</h6>
          <span className={'hover:underline font-medium'}>
            Terms and conditions
          </span>
          <span className={'hover:underline font-medium'}>
            Shipping conditions
          </span>
          <span className={'hover:underline font-medium'}>Product Return</span>
          <span className={'hover:underline font-medium'}>Privacy Policy</span>
          <span className={'hover:underline font-medium'}>Cookie Policy</span>
        </div>
        <div className={'flex flex-col gap-1'}>
          <h6 className={'text-lg font-medium'}>About</h6>
          <span className={'hover:underline font-medium'}>Who we are</span>
          <span className={'hover:underline font-medium'}>Our story</span>
          <span className={'hover:underline font-medium'}>Our factory</span>
          <span className={'hover:underline font-medium'}>
            Our sustainability goals
          </span>
        </div>
        <div
          className={
            'flex flex-col gap-1 sm:col-span-2 lg:col-span-1 sm:items-center'
          }
        >
          <h6 className={'text-lg font-medium'}>Contacts</h6>
          <span className={'hover:underline font-medium'}>All Contacts</span>
        </div>
      </div>
    </footer>
  );
}
