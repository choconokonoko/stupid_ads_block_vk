var observer;

function removePosts() {
  chrome.storage.local.get(['remove_unofficial', 'remove_official'], (data) => {
    const posts = document.querySelectorAll('.post')
    for (const post of posts) {
      if (data.remove_unofficial) {
        const firstComment = post.querySelector('.reply')
        if (firstComment) {
          const authorHighlighted = firstComment.querySelector('.author_highlighted')
          const commentText = firstComment.querySelector('.wall_reply_text')
          const includesLink = commentText.querySelector('a')
          if (authorHighlighted && includesLink) {
            console.log('назойливый пост удален')
            post.remove()
          }
        }

      }
      if (data.remove_official) {
        // todo
      }
    }

    if (observer) {
      observer.disconnect();
    }

    observer = new MutationObserver(() => {
      removePosts();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

removePosts();