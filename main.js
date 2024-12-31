// 主题切换
const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle.querySelector('i');

// 检查本地存储中的主题设置
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('theme-light');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('theme-light');
    
    // 更新图标
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
    
    // 保存主题设置到本地存储
    localStorage.setItem('theme', 
        document.body.classList.contains('theme-light') ? 'light' : 'dark'
    );
});

// 聊天功能增强
const chatContainer = document.getElementById('chat-container');
const foldButton = chatContainer.querySelector('.fold-btn');
const chatMessages = chatContainer.querySelector('.chat-messages');
const chatInput = chatContainer.querySelector('input');
const sendButton = chatContainer.querySelector('.send-btn');

// 折叠/展开聊天框
foldButton.addEventListener('click', (e) => {
    e.stopPropagation();
    chatContainer.classList.toggle('folded');
});

// 发送消息时自动展开聊天框
function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        // 如果聊天框是折叠状态，则展开
        if (chatContainer.classList.contains('folded')) {
            chatContainer.classList.remove('folded');
        }
        
        // 添加用户消息
        addMessage(message, 'user');
        chatInput.value = '';
        
        // 显示AI正在输入状态
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'chat-message ai-message typing';
        typingIndicator.textContent = '正在输入...';
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // 模拟AI回复
        setTimeout(() => {
            typingIndicator.remove();
            addMessage('这是AI的示例回复，你可以根据需要修改回复内容。', 'ai');
        }, 1500);
    }
}

// 添加消息增强版
function addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', `${type}-message`);
    messageDiv.textContent = text;
    
    // 添加时间戳
    const timestamp = document.createElement('div');
    timestamp.className = 'text-xs text-gray-400 mt-1';
    timestamp.textContent = new Date().toLocaleTimeString();
    messageDiv.appendChild(timestamp);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// 页面滚动动画
document.querySelectorAll('section').forEach(section => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    });
    observer.observe(section);
});

// 在文件末尾添加轮播功能
class Carousel {
    constructor(element) {
        this.carousel = element;
        this.track = element.querySelector('.carousel-track');
        this.slides = [...element.querySelectorAll('.carousel-slide')];
        this.nextButton = element.querySelector('.carousel-btn.next');
        this.prevButton = element.querySelector('.carousel-btn.prev');
        this.indicators = element.querySelector('.carousel-indicators');
        
        this.currentIndex = 0;
        this.slidesCount = this.slides.length;
        
        this.init();
    }
    
    init() {
        // 创建指示器
        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('indicator');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.indicators.appendChild(dot);
        });
        
        // 添加按钮事件监听
        this.nextButton.addEventListener('click', () => this.next());
        this.prevButton.addEventListener('click', () => this.prev());
        
        // 自动播放
        this.startAutoPlay();
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlidePosition();
        this.updateIndicators();
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.slidesCount;
        this.updateSlidePosition();
        this.updateIndicators();
    }
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.slidesCount) % this.slidesCount;
        this.updateSlidePosition();
        this.updateIndicators();
    }
    
    updateSlidePosition() {
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;
    }
    
    updateIndicators() {
        const dots = [...this.indicators.children];
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    startAutoPlay() {
        setInterval(() => this.next(), 5000); // 每5秒自动播放
    }
}

// 初始化轮播
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        new Carousel(carousel);
    }
});

// 语言切换功能
let currentLang = localStorage.getItem('lang') || 'zh';
const langToggle = document.getElementById('lang-toggle');
const langText = langToggle.querySelector('.lang-text');

// 初始化语言
function initLanguage() {
    document.documentElement.lang = currentLang;
    langText.textContent = currentLang === 'zh' ? 'EN' : '中';
    updateContent();
}

// 更新页面内容
function updateContent() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.dataset.i18n;
        const keys = key.split('.');
        let translation = translations[currentLang];
        keys.forEach(k => {
            translation = translation[k];
        });
        if (translation) {
            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
}

// 切换语言
langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    localStorage.setItem('lang', currentLang);
    langText.textContent = currentLang === 'zh' ? 'EN' : '中';
    updateContent();
});

// 初始化语言设置
initLanguage(); 