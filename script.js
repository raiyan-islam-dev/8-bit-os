// Welcome Screen Transition Logic
document.getElementById('enter-os-btn').addEventListener('click', () => {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('desktop').classList.remove('hidden');
});

// Live Clock
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    document.getElementById('clock').textContent = `${hours}:${minutes} ${ampm}`;
}

setInterval(updateClock, 1000);
updateClock();

// Start Menu Toggle & Actions
const startBtn = document.getElementById('start-btn');
const startMenu = document.getElementById('start-menu');

startBtn.addEventListener('click', () => {
    startMenu.classList.toggle('hidden');
});

function bindStartItem(menuId, windowId) {
    document.getElementById(menuId).addEventListener('click', () => {
        document.getElementById(windowId).classList.remove('hidden');
        startMenu.classList.add('hidden');
    });
}

bindStartItem('menu-computer', 'window');
bindStartItem('menu-notepad', 'notepad-window');
bindStartItem('menu-calc', 'calc-window');

// Universal Window Dragging Logic
function makeDraggable(windowEl, titleBarEl) {
    let isDragging = false;
    let offsetX = 0, offsetY = 0;

    titleBarEl.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('close-btn')) return;
        isDragging = true;
        offsetX = e.clientX - windowEl.offsetLeft;
        offsetY = e.clientY - windowEl.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        windowEl.style.left = `${e.clientX - offsetX}px`;
        windowEl.style.top = `${e.clientY - offsetY}px`;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

// Initialize Windows
function setupWindow(iconId, windowId) {
    const icon = document.getElementById(iconId);
    const win = document.getElementById(windowId);
    const closeBtn = win.querySelector('.close-btn');
    const titleBar = win.querySelector('.title-bar');

    if (icon) {
        icon.addEventListener('click', () => win.classList.remove('hidden'));
    }
    closeBtn.addEventListener('click', () => win.classList.add('hidden'));
    makeDraggable(win, titleBar);
}

setupWindow('computer-icon', 'window');
setupWindow('notepad-icon', 'notepad-window');
setupWindow('calc-icon', 'calc-window');

// Calculator Logic
const calcScreen = document.getElementById('calc-screen');
const calcButtons = document.querySelectorAll('.calc-btn');

calcButtons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        
        if (button.id === 'calc-clear') {
            calcScreen.value = '0';
            return;
        }

        if (value === '=') {
            try {
                calcScreen.value = eval(calcScreen.value);
            } catch (err) {
                calcScreen.value = 'Error';
            }
            return;
        }

        if (calcScreen.value === '0' || calcScreen.value === 'Error') {
            calcScreen.value = value;
        } else {
            calcScreen.value += value;
        }
    });
});
