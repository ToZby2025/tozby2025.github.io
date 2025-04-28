// 检查当前页面
const isMainPage = window.location.pathname.includes('main.html');
const isIndexPage = window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/');

// 祝福语列表
const blessings = [
    "祝你抽卡不歪，十连双黄！",
    "祝你学业顺利，万事顺心！",
    "祝檀健次伴你左右！",
    "愿你永远保持微笑！",
    "愿好运与你同在！",
    "愿你心想事成！",
    "愿你天天开心！",
    "愿你前程似锦！",
    "愿你平安喜乐！",
    "愿你万事如意！"
];

// 主页面验证功能
if (isIndexPage) {
    document.addEventListener('DOMContentLoaded', function() {
        const birthdayForm = document.getElementById('birthdayForm');
        if (birthdayForm) {
            birthdayForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const birthdayInput = document.getElementById('birthdayInput');
                const inputDate = new Date(birthdayInput.value);
                
                // 验证日期是否有效
                if (!birthdayInput.value) {
                    alert('请输入有效的生日日期');
                    return;
                }
                
                // 验证是否为2004年4月30日
                if (inputDate.getFullYear() === 2025 && 
                    inputDate.getMonth() === 3 && // 月份从0开始，4月是3
                    inputDate.getDate() === 30) {
                    // 跳转到祝福页面
                    window.location.href = 'main.html';
                } else {
                    alert('咳咳咳笨笨的！');
                }
            });
        }
    });
}

// 检查星星是否重叠
function isOverlapping(star1, star2) {
    const margin = 2; // 星星之间的最小间距
    const rect1 = {
        left: parseFloat(star1.style.left),
        top: parseFloat(star1.style.top),
        width: parseFloat(star1.style.width),
        height: parseFloat(star1.style.height)
    };
    const rect2 = {
        left: parseFloat(star2.style.left),
        top: parseFloat(star2.style.top),
        width: parseFloat(star2.style.width),
        height: parseFloat(star2.style.height)
    };

    return !(rect1.left + rect1.width + margin < rect2.left ||
             rect2.left + rect2.width + margin < rect1.left ||
             rect1.top + rect1.height + margin < rect2.top ||
             rect2.top + rect2.height + margin < rect1.top);
}

// 生成不重叠的位置
function generateNonOverlappingPosition(existingStars, size) {
    const maxAttempts = 200; // 最大尝试次数
    let attempts = 0;
    
    while (attempts < maxAttempts) {
        attempts++;
        
        // 生成随机位置 (留出星星大小的空间)
        const left = Math.random() * 90 + 5;
        const top = Math.random() * 90 + 5;
        
        // 检查是否在中间文字区域(40-60%)
        const isInCenter = left >= 40 && left <= 60 && top >= 35 && top <= 65;
        if (isInCenter) {
            continue; // 跳过中间区域
        }
        
        // 创建临时星星对象用于检测重叠
        const tempStar = {
            style: {
                left: `${left}%`,
                top: `${top}%`,
                width: `${size}px`,
                height: `${size}px`
            }
        };
        
        let hasOverlap = false;
        for (const star of existingStars) {
            if (isOverlapping(tempStar, star)) {
                hasOverlap = true;
                break;
            }
        }
        
        if (!hasOverlap) {
            return { left, top };
        }
    }
    
    // 如果多次尝试后仍找不到合适位置，返回随机位置(避开中间区域)
    let left, top;
    do {
        left = Math.random() * 90 + 5;
        top = Math.random() * 90 + 5;
    } while (left >= 40 && left <= 60 && top >= 35 && top <= 65);
    
    return { left, top };
}

// 祝福页面功能
function createRandomStars() {
    const container = document.getElementById('starsContainer');
    container.innerHTML = '';
    const existingStars = [];

    // 生成10-15个星星
    const starCount = Math.floor(Math.random() * 6) + 15;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('button');
        star.className = 'star-btn';
        
        // 随机大小 (30-60px)
        const size = Math.floor(Math.random() * 40) + 15;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // 生成不重叠的位置
        const position = generateNonOverlappingPosition(existingStars, size);
        star.style.position = 'absolute';
        star.style.left = `${position.left}%`;
        star.style.top = `${position.top}%`;
        
        // 随机祝福语
        const blessingIndex = Math.floor(Math.random() * blessings.length);
        star.setAttribute('data-blessing', blessings[blessingIndex]);
        
        // 点击事件
        star.addEventListener('click', function() {
            const blessingText = this.getAttribute('data-blessing');
            const blessingElement = document.createElement('div');
            blessingElement.className = 'blessing-text';
            blessingElement.textContent = blessingText;
            
            // 设置与星星相同的位置和大小
            blessingElement.style.position = 'absolute';
            blessingElement.style.left = this.style.left;
            blessingElement.style.top = this.style.top;
            blessingElement.style.width = this.style.width;
            blessingElement.style.height = this.style.height;
            
            // 随机生成好看的颜色
            const colors = [
                '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFBE0B', 
                '#FB5607', '#8338EC', '#3A86FF', '#FF006E',
                '#A0E7E5', '#B4F8C8', '#FBE7C6', '#FFAEBC'
            ];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            blessingElement.style.color = randomColor;
            
            // 文字居中显示
            blessingElement.style.display = 'flex';
            blessingElement.style.alignItems = 'center';
            blessingElement.style.justifyContent = 'center';
            blessingElement.style.fontSize = `${parseInt(this.style.width) * 0.3}px`;
            blessingElement.style.fontWeight = 'bold';
            blessingElement.style.textShadow = '1px 1px 2px rgba(0,0,0,0.5)';
            
            document.getElementById('starsContainer').appendChild(blessingElement);
            
            // 3秒后淡出消失
            setTimeout(() => {
                blessingElement.style.transition = 'opacity 1s';
                blessingElement.style.opacity = '0';
                setTimeout(() => {
                    blessingElement.remove();
                }, 1000);
            }, 3000);
        });
        
        container.appendChild(star);
        existingStars.push(star);
    }
}

// 如果当前是祝福页面，初始化功能
if (isMainPage) {
    document.addEventListener('DOMContentLoaded', function() {
        createRandomStars();
    });
}
