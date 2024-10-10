
let awaitingResumeResponse = false;
let awaitingInterviewResponse = false;
let awaitingJobResponse = false;
let awaitingMBTIResponse = false;
let awaitingCareerDevelopmentResponse = false;
let awaitingLearningDataResponse = false;
let currentQuestionIndex = 0;
let jobType = '';

const mbtiJobRecommendations = {
    'INTJ': '전략 기획자, 데이터 과학자, 프로젝트 매니저, 엔지니어, 시스템 설계자<br>',
    'INTP': '연구원, 시스템 분석가, 철학자, 교수, 소프트웨어 개발자<br>',
    'ENTJ': '경영 컨설턴트, 프로젝트 매니저, 기업 경영자, 변호사, 공공 관리자<br>',
    'ENTP': '기업가, 마케팅 매니저, 제품 개발자, 광고 기획자, 변호사<br>',
    'INFJ': '상담사, 인사 관리자, 심리학자, 사회복지사, 작가<br>',
    'INFP': '작가, 그래픽 디자이너, 예술가, 음악가, 상담사<br>',
    'ENFJ': '교육 관리자, 사회 복지사, HR 관리자, 교사, 영업 관리자<br>',
    'ENFP': '광고 기획자, 이벤트 플래너, 작가, 기자, 상담사<br>',
    'ISTJ': '회계사, 법률 전문가, 공무원, 군인, 관리 전문가<br>',
    'ISFJ': '간호사, 교사, 사회복지사, 행정 직원, 도서관 사서<br>',
    'ESTJ': '관리자, 공무원, 경찰관, 군인, 프로젝트 매니저<br>',
    'ESFJ': '고객 서비스 매니저, 판매 관리자, 간호사, 교사, 이벤트 코디네이터<br>',
    'ISTP': '기술 전문가, 공학자, 정비사, 파일럿, 응급 구조사<br>',
    'ISFP': '예술가, 요리사, 디자이너, 사진가, 수의사<br>',
    'ESTP': '영업 사원, 응급 구조사, 운동선수, 파일럿, 기업가<br>',
    'ESFP': '연예인, 여행 가이드, 이벤트 플래너, 마케팅 전문가, 영업 사원<br>'
};

const mbtiDescriptions = {
    'INTJ': '독립적이고 전략적인 사고를 가진 계획자입니다.<br> 논리적이고 창의적인 사고로 문제를 해결하며, 긴 시간 동안 집중력을 유지할 수 있습니다.<br>',
    'INTP': '논리적이고 분석적인 사색가입니다.<br> 복잡한 문제를 해결하는 능력이 뛰어나며, 독창적인 아이디어를 창출하는 데 능숙합니다.<br>',
    'ENTJ': '결단력 있고 목표 지향적인 리더입니다.<br> 효율적으로 조직을 관리하고, 명확한 비전을 가지고 사람들을 이끌어 갑니다.<br>',
    'ENTP': '창의적이고 문제 해결을 즐기는 혁신가입니다.<br> 새로운 아이디어를 제시하고, 도전적인 상황에서도 유연하게 대처할 수 있습니다.<br>',
    'INFJ': '이해심 많고 통찰력 있는 조언자입니다.<br> 사람들과 깊은 유대감을 형성하고, 그들의 문제를 해결하는 데 헌신적입니다.<br>',
    'INFP': '이상적이고 창의적인 이상주의자입니다.<br> 예술적 감각이 뛰어나며, 자신의 신념을 지키기 위해 노력합니다.<br>',
    'ENFJ': '따뜻하고 카리스마 있는 지도자입니다.<br> 사람들과의 관계를 중요시하며, 그들을 돕기 위해 노력합니다.<br>',
    'ENFP': '열정적이고 상상력이 풍부한 활력가입니다.<br> 사람들과 잘 어울리며, 다양한 분야에서 창의력을 발휘할 수 있습니다.<br>',
    'ISTJ': '신뢰할 수 있고 조직적인 관리자입니다.<br> 책임감이 강하고, 체계적으로 일을 처리하는 능력이 뛰어납니다.<br>',
    'ISFJ': '성실하고 협력적인 보호자입니다.<br> 세심한 배려와 헌신으로 주변 사람들을 돌보며, 안정감을 제공합니다.<br>',
    'ESTJ': '실용적이고 책임감 있는 관리자입니다.<br> 논리적 사고로 문제를 해결하며, 조직을 효율적으로 관리합니다.<br>',
    'ESFJ': '친절하고 사교적인 지원자입니다.<br> 사람들과의 관계를 중요시하며, 그들을 돕기 위해 최선을 다합니다.<br>',
    'ISTP': '유연하고 실용적인 장인입니다.<br> 손재주가 뛰어나며, 문제 해결에 능숙합니다.<br>',
    'ISFP': '조용하고 예술적인 장인입니다.<br> 예술적 감각이 뛰어나며, 감성적으로 세상을 바라봅니다.<br>',
    'ESTP': '적응력 있고 활동적인 문제 해결사입니다.<br> 즉각적인 결단력을 가지고, 도전적인 상황에서도 효과적으로 대처합니다.<br>n',
    'ESFP': '열정적이고 사교적인 연예인입니다.<br> 사람들과의 소통을 즐기며, 활기차고 긍정적인 에너지를 전파합니다.<br>'
};

const getChat = (message) => new Promise((resolve, reject) => {
  const userMessage = message?.trim();
  let botResponse = '';

  if (awaitingResumeResponse) {
      if (userMessage.toLowerCase() === '네' || userMessage.toLowerCase() === '예') {
          botResponse = `
          이력서 작성 가이드<br><br>

          <h3>1. 이력서 작성 전 브레인스토밍을 한다.</h3>
          <ul>
              <li>이력서에 포함될 내용을 생각해 보고, 필터링하는 프로파일링 작업을 해봅니다.</li>
              <li>백지 또는 아무 노트나 꺼내 자유롭게 자신의 경험에 대해 적어보세요.</li>
              <li>이 작업은 이력서에 어떤 내용을 포함할지 알아보는 작업입니다.</li>
          </ul><br>
          
          <h3>2. 최신 정보를 포함하세요 (예: 최근 직장, 학력 등)</h3>
          <ul>
              <li>정해진 이력서 양식에 작성하여 제출하도록 요구하는 회사도 있지만, 대부분 자유 양식을 사용하도록 허용하는 곳이 많습니다.</li>
              <li>이력서에 자신만의 개성을 담아보는 것도 좋은 방법입니다.</li>
              <li>서류 합격 경험이 많은 경력 개발자들의 모범 사례를 따르는 것도 좋은 방법입니다.</li>
          </ul><br>
          
          <h3>3. 경력 사항을 상세히 기재하세요 (예: 직무, 역할, 성과 등)</h3>
          <ul>
              <li>일반적인 사실을 적거나, 길게 작성하는 것은 피하는 것이 좋습니다.</li>
              <li>직업과 관련 없는 내용을 적는 것은 추천드리지 않습니다.</li>
          </ul><br>
          
          <h3>4. 맞춤법과 문법을 철저히 검사하세요.</h3>
          <ul>
              <li>네이버에서 제공하는 "맞춤법 검사기" 기능을 추천드립니다.</li>
          </ul><br>
          
          <h3>5. 이력서에 포함할 적절한 키워드를 사용하세요.</h3>
          <ul>
              <li>자신을 잘 표현할 수 있는 문장을 한 줄로 어필하는 것이 좋습니다.</li>
              <li>진행했던 프로젝트들이 일관성 있다면 이것을 스토리화 시켜 하나의 제목으로 사용할 수 있습니다.</li>
          </ul><br>
          
          <h3>6. PDF 형식으로 저장하고 제출하세요.</h3>
          <p>아래는 다양한 템플릿과 작성 가이드를 제공하는 몇 가지 추천 사이트입니다.</p>
          <ol>
              <li><a href="https://www.jobkorea.co.kr/Starter/PassAssay">Job Korea (잡코리아)</a></li>
              <li><a href="https://www.saramin.co.kr/zf_user/tools/resume">Saramin (사람인)</a></li>
              <li><a href="https://www.indeed.com/create-resume">Indeed (인디드)</a></li>
              <li><a href="https://www.canva.com/resumes/templates/">Canva (캔바)</a></li>
              <li><a href="https://www.freepik.com/resume-templates">Freepik</a></li>
              <li><a href="https://www.resume.com/">Resume.com</a></li>
              <li><a href="https://zety.com/resume-templates">Zety</a></li>
              <li><a href="https://templates.office.com/en-us/resumes-and-cover-letters">Microsoft Office Templates</a></li>
          </ol><br>
          
          이력서를 작성할 때 도움이 필요하면 언제든지 질문해주세요!<br>
          다른 기능이 필요하신가요? "네" "아니요"로 답변해주세요.<br>
          `;
          awaitingResumeResponse = false;
      } else if (userMessage.toLowerCase() === '아니요') {
          botResponse = '"이력서 작성 가이드", "직업 선택", "채용 공고 제공", "학습 자료 제공" 중 하나를 입력해주세요.<br>';
          awaitingResumeResponse = false;
      } else {
          botResponse = '"네" 또는 "아니요"로 답변해주세요.<br>';
      }
  } else if (awaitingInterviewResponse) {
      if (currentQuestionIndex === 0) {
          if (userMessage.toLowerCase() === '네') {
              botResponse = interviewQuestions[currentQuestionIndex];
              currentQuestionIndex++;
          } else {
              botResponse = '"이력서 작성 가이드", "직업 선택", "채용 공고 제공", "학습 자료 제공" 중에서 입력해 주시면 이에 맞는 도움을 드리겠습니다.<br>';
              awaitingInterviewResponse = false;
          }
      } else if (currentQuestionIndex === 1) {
          jobType = userMessage;
          botResponse = `좋습니다.<br> ${jobType} 직무에 관련된 가상의 회사로 지정하고 모의 면접을 진행하겠습니다.<br> ${jobType} 직무에 지원한 이유는 무엇인가요?<br>`;
          currentQuestionIndex++;
      } else {
          botResponse = interviewQuestions[currentQuestionIndex];
          currentQuestionIndex++;
          if (currentQuestionIndex >= interviewQuestions.length) {
              currentQuestionIndex = 0;
              awaitingInterviewResponse = false;
              botResponse += '도움이 되셨나요?<br> "네" "아니요"로 답변해주세요.<br>';
          }
      }
  } else if (awaitingJobResponse) {
      const jobSearchUrl = `https://www.jobkorea.co.kr/Search/?stext=${encodeURIComponent(userMessage)}`;
      botResponse = `현재 채용중인 ${userMessage} 직무에 관한 공고입니다.<br><a href="${jobSearchUrl}" target="_blank">여기를 클릭하세요</a><br>도움이 되셨나요?<br> "네" "아니요"로 답변해주세요.<br>`;
      awaitingJobResponse = false;
  } else if (awaitingMBTIResponse) {
      const mbti = userMessage.toUpperCase();
      if (mbti in mbtiJobRecommendations) {
          botResponse = `${mbtiDescriptions[mbti]}<br>추천 직업: ${mbtiJobRecommendations[mbti]}<br>도움이 되셨나요?<br> "네" "아니요"로 답변해주세요.<br>`;
          awaitingMBTIResponse = false;
      } else {
          botResponse = 'MBTI를 입력해주세요.<br>';
      }
  } else if (awaitingCareerDevelopmentResponse) {
      if (userMessage.toLowerCase() === '네') {
          botResponse = '언제든지 도움이 필요하시면 말씀해주세요.<br>"이력서 작성 가이드", "직업 선택", "채용 공고 제공", "학습 자료 제공" 중 하나를 입력해주세요.<br>';
          awaitingCareerDevelopmentResponse = false;
      } else if (userMessage.toLowerCase() === '아니요') {
          botResponse = '더 자세한 정보를 제공해드리겠습니다.<br> 학습 자료 제공에 대해 더 궁금한 것이 있으신가요?<br>';
          awaitingCareerDevelopmentResponse = false;
      } else {
          botResponse = careerDevelopmentGuide;
          awaitingCareerDevelopmentResponse = true;
      }
  } else if (awaitingLearningDataResponse) { // 학습 자료 제공
      if (userMessage.toLowerCase() === '네' || userMessage.toLowerCase() === '예') {
          botResponse = `취업 성공을 위한 꿀팁<br><br>

          <h3>1. 이력서 작성 팁</h3>
          <ul>
              <li>이력서는 지원하는 회사와 직무에 맞춰 맞춤형으로 작성하세요. 경험과 기술을 직무에 맞게 강조하는 것이 중요합니다.</li>
              <li>최신 정보를 반영하고, 직무 관련 경력과 성과를 구체적으로 작성하세요. 직무와 관련 없는 정보는 제외하는 것이 좋습니다.</li>
              <li>맞춤법과 문법을 철저히 검토하고, PDF 형식으로 저장하여 제출하세요.</li>
          </ul><br>
          
          <h3>2. 자기소개서 작성 팁</h3>
          <ul>
              <li>자소서는 지원하는 직무와 관련된 본인의 경험을 중심으로 작성하세요. 직무와 관련된 강점과 경험을 구체적으로 사례를 들어 설명하세요.</li>
              <li>진정성 있는 스토리와 구체적인 성과를 강조하여 면접관에게 강한 인상을 남기세요.</li>
          </ul><br>
          
          <h3>3. 면접 준비 팁</h3>
          <ul>
              <li>면접 전 회사의 비전과 가치를 조사하고, 회사에 대해 관심을 표현하세요.</li>
              <li>모의 면접을 통해 예상 질문에 대비하고, 답변을 자연스럽게 연습하세요.</li>
              <li>면접 시 공손한 태도와 명확한 목소리로 답변하고, 질문에 대해 논리적이고 구체적인 답변을 준비하세요.</li>
          </ul><br>
          
          <h3>4. 네트워킹 및 정보 수집</h3>
          <ul>
              <li>주변 인맥을 활용하여 다양한 취업 정보를 얻고, 관련 분야의 커뮤니티에서 활동하며 네트워킹을 구축하세요.</li>
              <li>SNS를 활용하여 자신의 전문성을 어필하고, 회사 관계자와의 네트워킹을 강화하세요.</li>
          </ul><br>
          
          <h3>5. 취업 지원 사이트 활용</h3>
          <ul>
              <li>사람인, 잡코리아, 워크넷 등 주요 취업 사이트를 활용하여 최신 채용 정보를 확인하세요.</li>
              <li>공공기관의 지원 프로그램도 적극적으로 활용해보세요.</li>
          </ul><br>
          
          취업 준비에 도움이 필요하면 언제든지 질문해주세요!<br>
          다른 기능이 필요하신가요? "네" "아니요"로 답변해주세요.<br>
          `;
          awaitingLearningDataResponse = false;
      } else if (userMessage.toLowerCase() === '아니요') {
          botResponse = '"이력서 작성 가이드", "직업 선택", "채용 공고 제공", "학습 자료 제공" 중 하나를 입력해주세요.<br>';
          awaitingLearningDataResponse = false;
      } else {
          botResponse = '"네" 또는 "아니요"로 답변해주세요.<br>';
      }
  } else {
      if (userMessage.includes('이력서 작성 가이드')) {
          botResponse = '이력서 작성 가이드에 대해 궁금하신가요?<br> 네, 아니요로 답변해주세요.<br>';
          awaitingResumeResponse = true;
      } else if (userMessage.includes('직업 선택')) {
          botResponse = 'MBTI를 입력해주세요.<br>';
          awaitingMBTIResponse = true;
      } else if (userMessage.includes('채용 공고 제공')) {
          botResponse = '당신이 희망하는 직무는 무엇인가요?<br>';
          awaitingJobResponse = true;
      } else if (userMessage.includes('학습 자료 제공')) {
          botResponse = '취업 지원과 합격에 관한 자료가 필요하신가요?<br> 네, 아니요로 답변해주세요.<br>';
          awaitingLearningDataResponse = true;
      } else {
          botResponse = '"이력서 작성 가이드", "직업 선택", "채용 공고 제공", "학습 자료 제공" 중 하나를 입력해주세요.<br>';
      }
  }

  resolve(botResponse)
});
