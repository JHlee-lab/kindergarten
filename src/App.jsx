import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle, Clock, BookOpen, GraduationCap,
  Users, TrendingUp, Award, Landmark, Banknote, ShieldCheck,
  FileText, MessageCircle, ChevronRight
} from 'lucide-react';

import koreanKindergartenAdmin from './assets/korean_kindergarten_admin.png';
import koreanKindergartenAdminFallback from './assets/korean_kindergarten_admin_fallback.png';
import salaryGrowthKorea from './assets/salary_growth_korea.png';
import koreaEducationOffice from './assets/korea_education_office.png';
import koreanKindergartenClassroom from './assets/korean_kindergarten_classroom.png';

const App = () => {
  const [benefitDates, setBenefitDates] = useState({ start: '', end: '' });

  // 알림 목록 상태 (최대 5개 적재)
  const [notifications, setNotifications] = useState([]);
  const notificationIdRef = useRef(0);

  // 카운트다운 타이머
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 45,
    seconds: 32
  });

  // 신청자 수 상태
  const [applicantCount, setApplicantCount] = useState(89);

  useEffect(() => {
    // 혜택 기간 계산 (이번 주 월요일 ~ 오늘)
    const today = new Date();
    const day = today.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;
    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday);

    const formatDate = (d) => `${d.getMonth() + 1}월 ${d.getDate()}일`;
    setBenefitDates({
      start: formatDate(monday),
      end: formatDate(today)
    });

    // 타이머 로직
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    // 신청자 수 증가 로직
    const countInterval = setInterval(() => {
      setApplicantCount(prev => (prev < 96 ? prev + 1 : prev));
    }, 15000);

    // 랜덤 알림 생성 로직
    const names = ["김*희", "이*연", "박*준", "최*서", "정*우", "강*나", "조*훈", "윤*지", "장*호", "임*영"];
    const ages = ["20대", "30대", "40대", "50대"];

    const addNotification = () => {
      const name = names[Math.floor(Math.random() * names.length)];
      const age = ages[Math.floor(Math.random() * ages.length)];

      // 랜덤 전화번호 생성 (010-****-XXXX)
      const lastFour = Math.floor(Math.random() * 9000 + 1000); // 1000~9999
      const phone = `010-****-${lastFour}`;

      const id = notificationIdRef.current++;

      const newNoti = { id, name, age, phone };

      setNotifications(prev => {
        const updated = [newNoti, ...prev];
        return updated.slice(0, 5); // 최대 5개 유지
      });

      // 5초 후 해당 알림 제거
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 5000);
    };

    // 초기 알림 하나 생성 후 주기적으로 생성
    addNotification();
    const notificationInterval = setInterval(addNotification, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(countInterval);
      clearInterval(notificationInterval);
    };
  }, []);

  const formatNum = (num) => num.toString().padStart(2, '0');

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">

      {/* 1. 최상단 긴급 공지 바 - Scroll 시 상단 고정 (fixed) */}
      <div className="bg-slate-950 text-white fixed top-0 left-0 w-full z-[60] shadow-2xl border-b border-white/10">
        <div className="container mx-auto py-3 px-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="bg-red-600 text-[10px] md:text-xs font-black px-2 py-1 rounded animate-pulse">마감임박</span>
              <span className="text-sm md:text-base font-bold text-slate-200">파격혜택 종료까지</span>
            </div>
            <div className="flex gap-1.5 items-center font-mono text-xl md:text-2xl font-black">
              <span className="bg-white text-slate-950 rounded px-1.5 leading-tight">{formatNum(timeLeft.hours)}</span>
              <span className="text-white text-sm">:</span>
              <span className="bg-white text-slate-950 rounded px-1.5 leading-tight">{formatNum(timeLeft.minutes)}</span>
              <span className="text-white text-sm">:</span>
              <span className="bg-white text-slate-950 rounded px-1.5 leading-tight">{formatNum(timeLeft.seconds)}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
            <p className="text-sm font-bold">신청 인원 <span className="text-orange-500">{applicantCount}</span> / 100명</p>
            <div className="w-20 md:w-32 h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-1000"
                style={{ width: `${applicantCount}%` }}
              ></div>
            </div>
            <p className="text-xs font-bold text-orange-400 underline underline-offset-2">잔여 {100 - applicantCount}석</p>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content overlap with fixed header */}
      <div className="h-[140px] md:h-[80px] bg-slate-950"></div>

      {/* Added Benefit Emphasis Banner */}
      <div className="bg-slate-900 py-4 md:py-6 border-b border-white/5 relative z-40">
        <div className="container mx-auto px-4 flex items-center justify-center gap-3 md:gap-6">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-[0_0_30px_rgba(34,197,94,0.6)] animate-[bounce_1.5s_infinite]">
            <CheckCircle size={24} strokeWidth={4} className="md:w-8 md:h-8" />
          </div>
          <h2 className="text-xl md:text-3xl font-black text-green-400 leading-tight tracking-tighter drop-shadow-lg">
            시험안내 및 적중예상 <br className="md:hidden" />
            문제 무료제공
          </h2>
        </div>
      </div>

      {/* 2. 실시간 신청 알림 */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col-reverse gap-3 pointer-events-none">
        {notifications.map((noti) => (
          <div
            key={noti.id}
            className="bg-white/95 backdrop-blur shadow-2xl rounded-2xl p-4 flex items-center gap-4 border border-slate-100 animate-in slide-in-from-left duration-500 transition-all w-72 md:w-80"
          >
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shrink-0">
              <Users size={20} />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">실시간 신청 현황</p>
              <div className="text-sm font-bold text-slate-800 leading-tight">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-green-600 text-lg">{noti.name}</span>
                  <span className="text-slate-500 text-xs bg-slate-100 px-1.5 py-0.5 rounded">{noti.age}</span>
                </div>
                <p className="text-slate-600 font-mono text-xs">{noti.phone}</p>
                <p className="text-xs text-orange-500 font-bold mt-1">적중예상문제 신청완료!</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Hero Section (사용자가 첨부한 행정실 사진 반영) */}
      <header className="relative bg-gradient-to-b from-green-50 to-white pt-10 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-green-100 mb-8 transform hover:scale-105 transition-transform cursor-default">
              <span className="text-green-600 font-black">NEWS</span>
              <div className="w-px h-3 bg-slate-200"></div>
              <span className="text-xs md:text-sm font-bold text-slate-600">신문, 뉴스에서도 주목하는 유망 직종!</span>
            </div>

            <h1 className="text-3xl md:text-6xl font-black leading-tight mb-8 tracking-tight">
              누리과정 확대에 따른 <br />
              <span className="text-green-600 relative inline-block">
                유치원 행정실무사
                <span className="absolute bottom-2 left-0 w-full h-3 bg-green-200/50 -z-10"></span>
              </span> 자격 취득하세요!
            </h1>

            <p className="text-lg md:text-2xl font-bold text-slate-700 mb-10 leading-snug tracking-tight">
              국공립 18만명 & 사립 75만명 영유아 수요 폭발! <br className="hidden md:block" />
              <span className="text-orange-600 font-black">경력 단절 여성분도 충분히 가능합니다!</span>
            </p>

            <div className="relative inline-block w-full max-w-4xl rounded-[40px] overflow-hidden shadow-2xl border-[12px] border-white group">
              {/* 사용자가 업로드한 행정실 전문가 사진 (Placeholder URL로 대체하지만 alt는 정확하게 기입) */}
              <img
                src={koreanKindergartenAdmin}
                alt="첨부된 사진: 유치원 행정실에서 미소 짓는 한국인 여성 전문가"
                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700 object-cover min-h-[400px]"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = koreanKindergartenAdminFallback;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-8">
                <p className="text-white font-bold text-lg md:text-2xl drop-shadow-lg font-black italic">"내 커리어의 새로운 시작, 유치원 행정실에서"</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 4. "왜 지금 따야할까?" */}
      <section className="py-20 bg-white border-t border-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 italic text-slate-800">"왜? 지금 따야할까!!!"</h2>
            <div className="w-20 h-1.5 bg-green-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { icon: <Banknote />, title: "준공무원급", sub: "높은 급여 체계" },
              { icon: <Award />, title: "여성우대", sub: "직업 특성상 우대" },
              { icon: <Clock />, title: "쾌적한 환경", desc: "편안한 근무 여건" },
              { icon: <GraduationCap />, title: "차별 없음", desc: "나이/학별 차별 제로" },
              { icon: <TrendingUp />, title: "쉬운 취업", sub: "인력부족 수요급증" }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:bg-green-600 hover:text-white transition-all group cursor-default">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-green-600 mb-4 shadow-sm group-hover:bg-white/20 group-hover:text-white">
                  {item.icon}
                </div>
                <h4 className="text-xl font-black mb-1">{item.title}</h4>
                <p className="text-sm opacity-70 font-bold">{item.sub || item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 시험 난이도 및 경쟁률 */}
      <section className="py-20 bg-slate-900 text-white overflow-hidden relative text-center md:text-left">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <BookOpen size={400} />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
                시험 난이도 <span className="text-yellow-400 underline underline-offset-8">하(★☆☆☆☆)</span><br />
                "절대 어렵지 않습니다!"
              </h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 text-left">
                  <div className="bg-green-500 p-3 rounded-xl"><ShieldCheck size={32} /></div>
                  <div>
                    <p className="text-lg font-bold">현재 경쟁률 매우 낮음</p>
                    <p className="text-slate-400">적중예상문제 매칭률 <span className="text-green-400 font-black">93%</span></p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 text-left">
                  <div className="bg-orange-500 p-3 rounded-xl"><Users size={32} /></div>
                  <div>
                    <p className="text-lg font-bold">나이, 학력 관계없이</p>
                    <p className="text-slate-400 font-medium">누구나 취득 가능한 국가등록 민간자격</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 w-full">
              <div className="bg-white text-slate-900 p-10 rounded-[40px] shadow-2xl">
                <h3 className="text-2xl font-black text-center mb-8 italic text-green-700">활동 및 전망</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="aspect-square bg-slate-100 rounded-2xl mb-2 flex items-center justify-center overflow-hidden">
                      <img src={salaryGrowthKorea} alt="Salary Growth" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-[10px] md:text-xs font-black">연차에 따른<br />연봉 ↑</p>
                  </div>
                  <div>
                    <div className="aspect-square bg-slate-100 rounded-2xl mb-2 flex items-center justify-center overflow-hidden">
                      <img src={koreaEducationOffice} alt="Official Office" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-[10px] md:text-xs font-black">전국 교육청<br />취업 연계</p>
                  </div>
                  <div>
                    <div className="aspect-square bg-slate-100 rounded-2xl mb-2 flex items-center justify-center overflow-hidden">
                      <img src={koreanKindergartenClassroom} alt="Kindergarten Classroom" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-[10px] md:text-xs font-black">국공립&사립<br />유치원 근무</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Form Section */}
      <section id="form" className="py-20 bg-green-600 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-black/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="text-center mb-10 text-white">
            <h2 className="text-3xl md:text-5xl font-black mb-4 italic">오직 여기서만! 마지막 취득 지원</h2>
            <p className="text-xl md:text-2xl font-bold opacity-90 underline underline-offset-8 decoration-yellow-400 italic">
              혜택 지원 기간: {benefitDates.start} ~ {benefitDates.end} 마감
            </p>
          </div>

          <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-[40%] bg-slate-950 p-10 text-white flex flex-col border-b md:border-b-0 md:border-r border-white/5">
              <div>
                <div className="inline-block bg-orange-600 text-[10px] font-black px-2 py-0.5 rounded mb-4">지원자 100명 한정</div>
                <h3 className="text-4xl md:text-5xl font-black mb-10 leading-none text-yellow-400 italic animate-blink">"이 페이지를 나가면<br />자격증 자료를<br />받을 수 없습니다!"</h3>
                <ul className="space-y-6">
                  {/* 강조된 첫 번째 혜택 */}
                  <li className="flex gap-4 text-xl md:text-2xl font-black items-start text-green-400">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-lg shadow-green-500/50">
                      <CheckCircle size={20} strokeWidth={4} className="text-white" />
                    </div>
                    시험안내 및 적중예상문제 무료제공
                  </li>
                </ul>
              </div>
              <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                <p className="text-xs font-bold text-slate-400 mb-2 underline underline-offset-4">남은 신청 가능 인원</p>
                <p className="text-3xl font-black text-orange-500 font-mono tracking-tighter">{100 - applicantCount}명 남았습니다</p>
              </div>
            </div>

            <div className="md:w-[60%] bg-white">
              <iframe
                src='https://marketclub.cafe24.com/form_make/form.php?type=set&pt=wang21cc&it=397&rgb1=%231868E9&rgb2=&rgb3=&rgb4=&rgb5=&rgb6=&btn_name=%C0%FB%C1%DF+%BF%B9%BB%F3%B9%AE%C1%A6+%B9%AB%B7%E1%C1%F6%BF%F8+%B9%DE%B1%E2&tracking_gubun=&tracking_code=&tracking_label='
                width='100%'
                height='520px'
                frameBorder='0'
                title="Application Form"
              ></iframe>

              {/* 상담 절차 섹션 */}
              <div className="bg-cyan-50 rounded-3xl p-6 text-center border border-cyan-100 mt-2">
                <h5 className="text-lg font-black text-slate-700 mb-6">상담 절차</h5>
                <div className="flex items-center justify-between relative px-2">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center gap-2 relative z-10">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border border-cyan-100 text-cyan-600">
                      <FileText size={24} strokeWidth={2.5} />
                    </div>
                    <span className="text-xs font-bold text-slate-600">상담신청</span>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="text-cyan-300" size={24} strokeWidth={3} />

                  {/* Step 2 */}
                  <div className="flex flex-col items-center gap-2 relative z-10">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border border-cyan-100 text-cyan-600">
                      <CheckCircle size={24} strokeWidth={2.5} />
                    </div>
                    <span className="text-xs font-bold text-slate-600">접수완료</span>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="text-cyan-300" size={24} strokeWidth={3} />

                  {/* Step 3 */}
                  <div className="flex flex-col items-center gap-2 relative z-10">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border border-cyan-100 text-cyan-600">
                      <MessageCircle size={24} strokeWidth={2.5} />
                    </div>
                    <span className="text-xs font-bold text-slate-600">상담전화</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-slate-950 text-slate-500 py-16 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center gap-8 mb-10 grayscale opacity-50">
            <Landmark size={32} />
            <Award size={32} />
            <CheckCircle size={32} />
          </div>
          <div className="text-[10px] md:text-xs leading-relaxed space-y-4 max-w-3xl mx-auto">
            <p className="text-slate-300 font-bold">본 자격은 국무총리 산하 한국직업능력연구원의 민간등록자격(제2013-0708)입니다.</p>
            <p>주최: 유치원행정실무사 교육본부 | 자격명: 유치원행정실무사 | 자격종류: 등록민간자격 | 발급기관: 한국지식문화원</p>
            <p>자격정보: 자격기본법 규정에 따라 등록한 민간자격으로, 국가로부터 인정받은 국가자격이 아님을 고지합니다.</p>
            <div className="flex justify-center gap-6 pt-4 border-t border-white/5 font-bold">
              <a href="#" className="hover:text-white transition-colors">이용약관</a>
              <a href="#" className="hover:text-white transition-colors text-slate-300 underline underline-offset-2">개인정보처리방침</a>
              <a href="#" className="hover:text-white transition-colors">자격정보고시</a>
            </div>
            <p className="pt-8 opacity-30 tracking-tighter font-medium underline underline-offset-4 decoration-white/20">© 2026 KINDERGARTEN ADMIN MASTER. ALL RIGHTS RESERVED. <br className="md:hidden" /> PHOTO BY UNSPLASH.</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-200 mt-12 tracking-tight">유치원교육행정지원센터</h2>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-in {
          animation-duration: 0.5s;
          animation-fill-mode: both;
        }
        .slide-in-from-left {
          animation-name: slideInLeft;
        }
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}} />
    </div>
  );
};

export default App;
