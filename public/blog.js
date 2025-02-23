const apiUrl = "/blog";

async function loadPosts() {
    const response = await fetch(apiUrl);
    const posts = await response.json();
    const postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = "";
    posts.forEach(post => {
        const div = document.createElement("div");
        div.classList.add("post");
        div.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <p><strong>Author:</strong> ${post.author}</p>
            <button class="delete-btn" onclick="deletePost('${post._id}')">Delete</button>
        `;
        postsContainer.appendChild(div);
    });
}

document.getElementById("blog-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    const author = document.getElementById("author").value;

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, author })
    });

    if (response.ok) {
        this.reset();
        loadPosts();
    } else {
        alert("Error adding post");
    }
});

async function deletePost(id) {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    loadPosts();
}

loadPosts();
