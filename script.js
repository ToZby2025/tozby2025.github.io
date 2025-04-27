// 生日验证功能
document.getElementById('birthdayForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const birthdayInput = document.getElementById('birthdayInput');
    const today = new Date();
    const inputDate = new Date(birthdayInput.value);
    
    // 验证日期是否有效
    if (!birthdayInput.value) {
        alert('请输入有效的生日日期');
        return;
    }
    
    // 验证是否为今天
    if (inputDate.getDate() === today.getDate() && 
        inputDate.getMonth() === today.getMonth()) {
        // 跳转到祝福页面
        window.location.href = 'main.html';
    } else {
        alert('今天不是您的生日哦！');
    }
});

// 祝福页面功能（将在main.html加载后执行）
function initBlessingPage() {
    const stars = document.querySelectorAll('.star-btn');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const blessing = this.getAttribute('data-blessing');
            alert(blessing);
        });
    });
}

// 如果当前是祝福页面，初始化功能
if (window.location.pathname.includes('main.html')) {
    document.addEventListener('DOMContentLoaded', initBlessingPage);
}
