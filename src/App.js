import React, { useState, useEffect } from "react";

export default function App() {
  const naz = "Naz";

  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [finished, setFinished] = useState(false);
  const [lost, setLost] = useState(false);
  const totalRounds = 5;
  const [answer, setAnswer] = useState(null);
  const [hearts, setHearts] = useState(randomHearts());

  function randomHearts() {
    const heartsList = ["❤️","💗","💘","💖","💝","💕","💞","💓","💜","💛"];
    const correct = Math.floor(Math.random() * 5);
    return Array.from({ length: 5 }).map((_, i) => ({
      emoji: heartsList[Math.floor(Math.random() * heartsList.length)],
      correct: i === correct,
    }));
  }

  function handleClick(isCorrect) {
    if(!isCorrect){setLost(true);return;}
    setScore(s=>s+1);
    if(round<totalRounds){setRound(r=>r+1);setHearts(randomHearts());}
    else{setFinished(true);}
  }

  function restartGame(){
    setStarted(false);
    setScore(0);
    setRound(1);
    setFinished(false);
    setLost(false);
    setAnswer(null);
    setHearts(randomHearts());
  }

  useEffect(()=>{
    if(!answer)return;
    const interval=setInterval(()=>{
      const heart=document.createElement("div");
      heart.innerText="💖";
      heart.style.position="fixed";
      heart.style.left=Math.random()*100+"vw";
      heart.style.top="-10px";
      heart.style.fontSize=Math.random()*20+20+"px";
      heart.style.animation="fall 3s linear";
      heart.style.pointerEvents="none";
      document.body.appendChild(heart);
      setTimeout(()=>heart.remove(),3000);
    },150);
    return ()=>clearInterval(interval);
  },[answer]);

  useEffect(()=>{
    if(!lost)return;
    const interval=setInterval(()=>{
      const heart=document.createElement("div");
      heart.innerText="💔";
      heart.style.position="fixed";
      heart.style.left=Math.random()*100+"vw";
      heart.style.top="-10px";
      heart.style.fontSize=Math.random()*20+20+"px";
      heart.style.color="red";
      heart.style.animation="fall 3s linear";
      heart.style.pointerEvents="none";
      document.body.appendChild(heart);
      setTimeout(()=>heart.remove(),3000);
    },150);
    return ()=>clearInterval(interval);
  },[lost]);

  useEffect(()=>{
    const audio=new Audio("https://cdn.pixabay.com/download/audio/2021/09/08/audio_7ef1b1d2b4.mp3");
    audio.loop=true;
    audio.volume=0.5;
    audio.play().catch(()=>{});
    return ()=>audio.pause();
  },[]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-200 to-white p-4 text-center">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-xl w-full border border-pink-300">

        {!started&&!finished&&!lost&&<>
          <h1 className="text-3xl font-extrabold text-pink-600 mb-4">Naz için Romantik Oyun</h1>
          <p className="text-gray-700 mb-6">Hazırsan başlıyoruz... Doğru kalbi bul ve sürprizi aç! 💖</p>
          <button onClick={()=>{navigator.vibrate&&navigator.vibrate(80);setStarted(true);}} className="px-6 py-3 bg-pink-600 text-white rounded-xl shadow hover:scale-105 transition">Başla</button>
        </>}

        {started&&!finished&&!lost&&<>
          <h2 className="text-2xl font-bold text-pink-700 mb-2">Bölüm {round}/{totalRounds}</h2>
          <p className="mb-6 text-gray-600">Naz, doğru kalbi bulabilir misin? 🫶</p>
          <div className="grid grid-cols-5 gap-3 text-4xl mb-6">
            {hearts.map((h,idx)=>(<button key={idx} onClick={()=>handleClick(h.correct)} className="hover:scale-125 transition cursor-pointer">{h.emoji}</button>))}
          </div>
          <p className="text-gray-700 font-medium">Skor: {score}</p>
        </>}

        {lost&&<div>
          <h2 className="text-3xl font-bold text-red-600 mb-4">Kaybettin 😢</h2>
          <p className="text-gray-700 mb-6">Naz, üzgünüm ama yanlış kalbi seçtin.</p>
          <button onClick={restartGame} className="px-6 py-3 bg-pink-600 text-white rounded-xl shadow hover:scale-105 transition">Tekrar Başla</button>
        </div>}

        {finished&&!answer&&!lost&&<div>
          <h2 className="text-3xl font-bold text-pink-600 mb-4">Soru Zamanı 💘</h2>
          <p className="text-gray-700 mb-6 text-lg">Beni ne kadar çok seviyorsun Naz? 😳</p>
          <div className="flex flex-col gap-4 items-center">
            <button onClick={()=>setAnswer("cok")} className="px-6 py-3 bg-pink-500 text-white rounded-xl shadow hover:scale-105 transition text-lg">Çok seviyorum</button>
            <button onClick={()=>setAnswer("cokcok")} className="px-6 py-3 bg-pink-600 text-white rounded-xl shadow hover:scale-105 transition text-lg">Çok çok çok seviyorum</button>
          </div>
        </div>}

        {answer&&!lost&&<div className="animate-pulse">
          {answer==="cok"&&<><h2 className="text-3xl font-bold text-pink-600 mb-4">Ben de seni çok seviyorum Naz 💗</h2><p className="text-gray-700 text-xl mt-4">seni seviyom &lt;3</p></>}
          {answer==="cokcok"&&<><h2 className="text-3xl font-bold text-pink-600 mb-4">Ben de seni çok çok çok seviyorum Naz 💘💘💘</h2><p className="text-gray-700 text-xl mt-4">seni seviyom &lt;3</p></>}
          <button onClick={()=>setAnswer(null)} className="mt-6 px-6 py-3 bg-gray-300 text-gray-800 rounded-xl shadow hover:scale-105 transition">Geri</button>
        </div>}

      </div>
    </div>
  );
}