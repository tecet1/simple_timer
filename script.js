// 요소 선택
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');

let totalSeconds = 300; // 초기 5분 (5 * 60)
let timerInterval;
let isRunning = false;

// 입력 값으로 totalSeconds 설정
function setInitialTime() {
    const min = parseInt(minutesInput.value) || 0;
    const sec = parseInt(secondsInput.value) || 0;
    totalSeconds = (min * 60) + sec;
    updateDisplay();
}

// 화면 업데이트 함수
function updateDisplay() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    display.textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// 타이머 시작 함수
function startTimer() {
    if (isRunning || totalSeconds <= 0) return;

    isRunning = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
    
    // 1초마다 실행
    timerInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            display.textContent = "종료!";
            startBtn.disabled = true; // 재시작 방지
            stopBtn.disabled = true;
            // 알람 소리 재생 코드 (브라우저 정책상 복잡해져서 생략)
            return;
        }
        totalSeconds--;
        updateDisplay();
    }, 1000);
}

// 타이머 정지 함수
function stopTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

// 타이머 초기화 함수
function resetTimer() {
    stopTimer();
    setInitialTime();
    startBtn.disabled = false; 
    stopBtn.disabled = true;
    display.textContent = '05:00'; // 초기값으로 되돌리기
}

// 이벤트 리스너 연결
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

// 입력 필드 변경 시 시간 업데이트
minutesInput.addEventListener('change', setInitialTime);
secondsInput.addEventListener('change', setInitialTime);

// 페이지 로드 시 초기 화면 설정
resetTimer();