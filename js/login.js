document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    const validCredentials = {
        'admin': 'winning23',
        'dancun': 'kisemei'
    };
    
    if (validCredentials[username] === password) {
        localStorage.setItem('user', username);
        window.location.href = 'index.html';
    } else {
        errorMessage.textContent = 'Invalid username or password';
        setTimeout(() => {
            errorMessage.textContent = '';
        }, 3000);
    }
});
