export default function Footer() {
  return (
    <footer className="relative z-10">
      <div className="mx-auto max-w-7xl px-[5%] py-16 text-center">
        <p className="mb-2 text-base font-semibold text-slate-800">
          한동대학교 AI 혁신 센터
        </p>
        <p className="mb-4 text-sm text-slate-600">경북 포항시 북구 흥해읍 한동로 558 한동대학교</p>
        <a
          className="text-sm text-slate-600 transition-colors duration-300 hover:text-slate-900 block"
        >
          Email: ax@handong.edu
        </a>
        <a
          className="text-sm text-slate-600 transition-colors duration-300 hover:text-slate-900 block mt-2"
        >
          Tel: 054-260-1558
        </a>

      </div>
    </footer>
  );
}
