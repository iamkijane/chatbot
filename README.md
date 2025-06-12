![License](https://img.shields.io/badge/License-MIT-blue)
# Employment ChatBot
> 이 프로젝트는 OpenAI API를 연동한 취업 컨설팅 챗봇입니다.
> 커스텀한 프롬프트를 기반으로 다양한 취업 컨설팅 기능을 제공합니다.

![화면 기록 2025-05-30 오후 12 27 05](https://github.com/user-attachments/assets/dd0109f2-dc0d-46f8-bfb2-3cc79e4be427)

## 실행 방법
### 1. 패키지 설치
```
pip install -r requirements.txt
```
### 2. 환경 변수 파일 생성
.env 파일을 생성하거나 env.example 파일을 복사하여 사용해주세요.
```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
> [!IMPORTANT]
> API 키는 OpenAI Platform에서 발급받아야 하며 자신의 키를 입력해야 합니다.

### 3. 서버 실행
```
python3 app.py
```
