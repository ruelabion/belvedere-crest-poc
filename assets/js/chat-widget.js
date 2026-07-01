(function() {
  var overlay  = document.getElementById('chatOverlay');
  var frame    = document.getElementById('chatFrame');
  var floatBtn = document.getElementById('floatingChatBtn');
  var closeBtn = document.getElementById('closeChatBtn');
  var loaded   = false;
  var chatSrc  = '/chat.html';

  function openChat() {
    if (!loaded) { frame.src = chatSrc; loaded = true; }
    overlay.classList.add('active');
    floatBtn.classList.add('chat-open');
  }
  function closeChat() {
    overlay.classList.remove('active');
    floatBtn.classList.remove('chat-open');
  }

  floatBtn.addEventListener('click', openChat);
  document.addEventListener('click', function(e) {
    var el = e.target.closest('[data-action="open-chat"]');
    if (el) { e.preventDefault(); openChat(); }
  });
  closeBtn.addEventListener('click', closeChat);
  overlay.addEventListener('click', function(e) { if (e.target === overlay) closeChat(); });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeChat(); });

  window.addEventListener('message', function(e) {
    if (e.origin !== window.location.origin) return;
    if (e.data && e.data.type === 'openContacts') {
      var transcript = (e.data.chatUserMessage || '').slice(0, 10000);
      try { sessionStorage.setItem('chatTranscript', transcript); } catch {}
      window.location.href = '/contact.html';
    }
    if (e.data && e.data.type === 'navigateTo' && e.data.url) {
      closeChat();
      window.location.href = e.data.url;
    }
  });
})();
