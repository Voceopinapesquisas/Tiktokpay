document.addEventListener('DOMContentLoaded', function () {
  const questions = [
      "Como você avalia sua experiência geral no TikTok?",
      "Com que frequência você usa o TikTok?",
      "Qual recurso você mais gosta no TikTok?",
      "Como você classifica a qualidade dos vídeos recomendados?",
      "O que você acha da interface do TikTok?",
      "Você prefere vídeos curtos ou longos?",
      "Você cria conteúdo no TikTok?",
      "O que você acha dos anúncios no TikTok?",
      "Você usa o TikTok para aprender algo novo?",
      "Você recomendaria o TikTok para seus amigos?"
  ];

  const answers = [
      ["😍 Excelente", "😊 Boa", "😐 Regular", "😔 Ruim"],
      ["🔥 Várias vezes ao dia", "⏱️ Uma vez por dia", "📅 Algumas vezes por semana", "🕒 Raramente"],
      ["🎬 Efeitos de vídeo", "🎵 Músicas/Sons", "🌟 Desafios/Trends", "💬 Comentários"],
      ["🏆 Muito relevantes", "👍 Bons", "🔄 Moderados", "👎 Irrelevantes"],
      ["✨ Intuitiva", "👌 Fácil de usar", "🤔 Um pouco confusa", "😵 Complicada"],
      ["⚡ Muito curtos (< 15s)", "🔎 Curtos (15-30s)", "⏱️ Médios (30s-1min)", "🎬 Longos (> 1min)"],
      ["🎥 Frequentemente", "📱 Ocasionalmente", "👀 Raramente", "🙅 Nunca"],
      ["👍 Interessantes", "😐 Toleráveis", "⏩ Pulo sempre", "😡 Irritantes"],
      ["🧠 Frequentemente", "📚 Às vezes", "🤷 Raramente", "❌ Nunca"],
      ["💯 Com certeza", "👍 Provavelmente sim", "🤔 Talvez", "🚫 Não recomendaria"]
  ];

  let currentSurvey = 0;
  let balance = 0;
  const totalSurveys = questions.length;

  const questionTitle = document.getElementById('question-title');
  const optionsContainer = document.getElementById('options-container');
  const continueBtn = document.getElementById('continue-btn');
  const currentSurveyElement = document.getElementById('currentSurvey');
  const totalSurveysElement = document.getElementById('totalSurveys');
  const balanceElement = document.querySelector('.balance');
  const withdrawBtns = document.querySelectorAll('.withdraw-btn, .withdraw-btn-large'); // Captura os dois botões de saque
  const progressBar = document.querySelector('.progress');

  totalSurveysElement.textContent = totalSurveys;

  function loadQuestion() {
      if (currentSurvey >= totalSurveys) {
          document.getElementById('survey-content').style.display = 'none';
          document.getElementById('completion-message').style.display = 'block';
          document.getElementById('total-balance').textContent = balance;

          // Habilita os botões de saque ao finalizar todas as pesquisas
          withdrawBtns.forEach(btn => btn.disabled = false);
          return;
      }

      questionTitle.textContent = questions[currentSurvey];
      optionsContainer.innerHTML = '';

      answers[currentSurvey].forEach(answer => {
          const optionItem = document.createElement('div');
          optionItem.className = 'option-item';
          optionItem.innerHTML = `
              <div class="emoji">${answer.split(" ")[0]}</div>
              <div class="option-text">${answer.substring(2)}</div>
              <div class="checkbox"></div>
          `;
          
          optionItem.addEventListener('click', function () {
              document.querySelectorAll('.option-item').forEach(opt => opt.classList.remove('selected'));
              this.classList.add('selected');
              continueBtn.disabled = false;
          });

          optionsContainer.appendChild(optionItem);
      });

      currentSurveyElement.textContent = currentSurvey + 1;
      progressBar.style.width = `${(currentSurvey / totalSurveys) * 100}%`;
  }

  continueBtn.addEventListener('click', function () {
      if (currentSurvey < totalSurveys) {
          currentSurvey++;
          balance += 10; // Adiciona saldo por cada pesquisa concluída
          balanceElement.textContent = `R$ ${balance}`;
          continueBtn.disabled = true;
          loadQuestion();
      }
  });

  // Redireciona para sacar.html ao clicar em qualquer botão de saque
  withdrawBtns.forEach(btn => {
      btn.addEventListener('click', function () {
          window.location.href = "sacar.html";
      });
  });

  loadQuestion();
});
