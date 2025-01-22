var observer;

function removePosts() {
  chrome.storage.local.get(['remove_unofficial', 'remove_official'], (data) => {
    const posts = document.querySelectorAll('._post_content')
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
        const label = post.querySelector('div.PostHeaderSubtitle__item')
        const labelLink = post.querySelector('a.PostHeaderSubtitle__item')
        if (label) {
          if (label.innerHTML.indexOf('Реклама') >= 0) {
            console.log('рекламный пост удален')
            post.remove()
          }
        }
        if(labelLink) {
          console.log('рекламный пост удален')
          post.remove()
        }
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