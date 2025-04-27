// 生日验证功能
document.getElementById('birthdayForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const birthdayInput = document.getElementById('birthdayInput');
    const inputDate = new Date(birthdayInput.value);
    
    // 验证日期是否有效
    if (!birthdayInput.value) {
        alert('请输入有效的生日日期');
        return;
    }
    
    // 验证是否为2004年4月30日
    if (inputDate.getFullYear() === 2004 && 
        inputDate.getMonth() === 3 && // 月份从0开始，4月是3
        inputDate.getDate() === 30) {
        // 跳转到祝福页面
        window.location.href = 'main.html';
    } else {
        alert('咳咳咳笨笨的！');
    }
});

// 祝福语列表
const blessings = [
    "愿你健康快乐每一天！",
    "愿你的梦想都能实现！",
    "愿你被幸福围绕！",
    "愿你永远保持微笑！",
    "愿好运常伴你左右！",
    "愿你心想事成！",
    "愿你天天开心！",
    "愿你前程似锦！",
    "愿你平安喜乐！",
    "愿你万事如意！"
];

// 生成随机星星
function createRandomStars() {
    const container = document.getElementById('starsContainer');
    container.innerHTML = '';
    container.style.position = 'relative';
    container.style.width = '100%';
    container.style.height = '400px';
    container.style.margin = '40px 0';

    // 随机生成5-10个星星
    const starCount = Math.floor(Math.random() * 6) + 5;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('button');
        star.className = 'star-btn';
        
        // 随机大小 (40-100px)
        const size = Math.floor(Math.random() * 61) + 40;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // 随机位置
        const left = Math.random() * 80;
        const top = Math.random() * 80;
        star.style.position = 'absolute';
        star.style.left = `${left}%`;
        star.style.top = `${top}%`;
        
        // 随机祝福语
        const blessingIndex = Math.floor(Math.random() * blessings.length);
        star.setAttribute('data-blessing', blessings[blessingIndex]);
        
        // 点击事件
        star.addEventListener('click', function() {
            alert(this.getAttribute('data-blessing'));
        });
        
        container.appendChild(star);
    }
}

// 祝福页面功能（将在main.html加载后执行）
function initBlessingPage() {
    createRandomStars();
}

// 如果当前是祝福页面，初始化功能
if (window.location.pathname.includes('main.html')) {
    document.addEventListener('DOMContentLoaded', initBlessingPage);
}
