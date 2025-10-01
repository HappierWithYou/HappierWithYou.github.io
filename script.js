const inputs = document.querySelectorAll('.code-input');
const unlockBtn = document.getElementById('unlockBtn');
const correctCode = '0505';
let currentIndex = 0;
let currentPage = 1;
inputs[0].focus();

function checkAllFilled() {
    const allFilled = Array.from(inputs).every(input => input.value !== '');
    unlockBtn.disabled = !allFilled;
    return allFilled;
}

function moveFocus(index) {
    if (index >= 0 && index < inputs.length) {
        currentIndex = index;
        inputs[index].focus();
    }
}

function addNumber(num) {
    if (currentIndex < inputs.length) {
        inputs[currentIndex].value = num;
        inputs[currentIndex].classList.add('filled');
        
        if (currentIndex < inputs.length - 1) {
            moveFocus(currentIndex + 1);
        } else {
            currentIndex = inputs.length;
        }
        
        checkAllFilled();
    }
}

function deleteNumber() {
    if (currentIndex >= inputs.length) {
        currentIndex = inputs.length - 1;
    }
    
    if (inputs[currentIndex].value !== '') {
        inputs[currentIndex].value = '';
        inputs[currentIndex].classList.remove('filled');
    } else if (currentIndex > 0) {
        moveFocus(currentIndex - 1);
        inputs[currentIndex].value = '';
        inputs[currentIndex].classList.remove('filled');
    }
    
    checkAllFilled();
}

function clearAll() {
    inputs.forEach(input => {
        input.value = '';
        input.classList.remove('filled');
    });
    currentIndex = 0;
    moveFocus(0);
    checkAllFilled();
}

function showPage(page){
    document.querySelectorAll(".page").forEach(page =>{
        page.style.display ="none";
    });
    
    let activePage = document.getElementById("page"+page)
    if (activePage){
        activePage.style.display="flex";
    }
}

// Event listener สำหรับ input แต่ละช่อง
inputs.forEach((input, index) => {
    // เมื่อพิมพ์
    input.addEventListener('input', (e) => {
        const value = e.target.value;
        
        // อนุญาตเฉพาะตัวเลข
        if (!/^\d$/.test(value)) {
            e.target.value = '';
            return;
        }

        e.target.classList.add('filled');
        currentIndex = index;

        // ย้ายไปช่องถัดไปอัตโนมัติ
        if (index < inputs.length - 1) {
            moveFocus(index + 1);
        } else {
            currentIndex = inputs.length;
        }

        checkAllFilled();
    });

    // เมื่อกด backspace
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            
            if (input.value !== '') {
                input.value = '';
                input.classList.remove('filled');
            } else if (index > 0) {
                moveFocus(index - 1);
                inputs[index - 1].value = '';
                inputs[index - 1].classList.remove('filled');
            }
            
            checkAllFilled();
        }
    });

    // เมื่อคลิกที่ input
    input.addEventListener('focus', () => {
        currentIndex = index;
    });

    // ป้องกันการวาง (paste)
    input.addEventListener('paste', (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
        
        for (let i = 0; i < pastedData.length && index + i < inputs.length; i++) {
            inputs[index + i].value = pastedData[i];
            inputs[index + i].classList.add('filled');
        }
        
        checkAllFilled();
    });
});

// Event listener สำหรับคีย์บอร์ดบนหน้าจอ
document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', () => {
        const keyValue = key.getAttribute('data-key');
        
        if (keyValue === 'backspace') {
            deleteNumber();
        } else if (keyValue === 'clear') {
            clearAll();
        } else {
            addNumber(keyValue);
        }
    });
});


// Event listener สำหรับปุ่มปลดล็อก
unlockBtn.addEventListener('click', () => {
    const enteredCode = Array.from(inputs).map(input => input.value).join('');
    
    if (enteredCode === correctCode) {
        inputs.forEach(input => {
            input.style.borderColor = '#28a745';
            input.style.background = '#d4edda';
            setTimeout(()=>{
                showPage(currentPage+1)
            },1000)
        });
    }
});

showPage(currentPage)
