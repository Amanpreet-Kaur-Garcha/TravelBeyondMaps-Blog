/* AUTH STATE */
let isLoggedIn = localStorage.getItem("loggedIn") === "true";

function isAdmin() {
	return localStorage.getItem("loggedIn") === "true";
}

const allBlogs = {};

/* DEFAULT BLOGS */
const defaultBlogs = [
	{
		id: "night-walks",
		title: "A Night Walk Through Unknown Cities",
		tag: "Night Walks",
		image: "images/nightWalks_Card1.png",
		excerpt: "Quiet streets, glowing lights, and cities after dark.",
	},
	{
		id: "nature",
		title: "Finding Silence in the Mountains",
		tag: "Nature",
		image: "images/nature_Card2.png",
		excerpt: "High peaks, slow mornings, and real silence.",
	},
	{
		id: "cafes",
		title: "Cafés, Conversations, and Foreign Mornings",
		tag: "Stories",
		image: "images/cafes_card3.png",
		excerpt: "Coffee, strangers, and soft city mornings.",
	},
	{
		id: "roadtrip",
		title: "Roads That Changed Me",
		tag: "Destinations",
		image: "images/roadTrip_Card4.png",
		excerpt: "Journeys that mattered more than destinations.",
	},
	{
		id: "photoessay",
		title: "Shadows, Streets, and City Silence",
		tag: "Photo Essays",
		image: "images/photoEssays_card5.png",
		excerpt: "Cities in their quietest moments.",
	},
	{
		id: "coastal",
		title: "Where the Road Meets the Sea",
		tag: "Destinations",
		image: "images/destinations_card6.png",
		excerpt: "Endless roads beside endless water.",
	},
];

/* STORAGE */
let storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];

storedBlogs.forEach((b) => {
	allBlogs[b.id] = b;
});

function saveBlogs() {
	try {
		localStorage.setItem("blogs", JSON.stringify(storedBlogs));
	} catch (e) {
		alert("Storage full. Please delete old blogs.");
	}
}

/* RENDER BLOGS */
function renderStoredBlogs() {
	const container = document.querySelector(".blog-container");
	container.innerHTML = "";

	const all = [...defaultBlogs, ...storedBlogs];

	all.forEach((blog) => {
		const article = document.createElement("article");
		article.className = "blog-card";

		const isStored = storedBlogs.some((b) => b.id === blog.id);

		article.innerHTML = `
			<img src="${blog.image}" />
			<div class="blog-content">
				<span class="tag">${blog.tag}</span>
				<h3>${blog.title}</h3>
				<p>${blog.excerpt}</p>

				<div class="blog-stats">
					<span>❤️ <span class="likes">0</span></span>
					<span>💬 <span class="comments">0</span></span>
				</div>

				<div class="blog-actions">
					<a href="view.html?post=${blog.id}">Read more →</a>
					${isAdmin() && isStored ? `<button class="delete-btn" data-id="${blog.id}">🗑 Delete</button>` : ""}
				</div>
			</div>
		`;

		container.appendChild(article);

		const likeSpan = article.querySelector(".likes");
		const commentSpan = article.querySelector(".comments");

		const likes = Number(localStorage.getItem(blog.id + "_likes")) || 0;
		const comments =
			JSON.parse(localStorage.getItem(blog.id + "_comments")) || [];

		likeSpan.textContent = likes;
		commentSpan.textContent = comments.length;
	});
}

renderStoredBlogs();

/* TOAST */
const toast = document.getElementById("toast");
function showToast(message) {
	toast.textContent = message;
	toast.classList.add("show");
	setTimeout(() => toast.classList.remove("show"), 2500);
}

/* ELEMENTS */
const loginBtn = document.querySelector(".btn-login");
const loginModal = document.getElementById("loginModal");
const aboutModal = document.getElementById("aboutModal");

const loginSubmit = document.getElementById("loginSubmit");
const closeLogin = document.getElementById("closeLogin");
const closeAbout = document.getElementById("closeAbout");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginError = document.getElementById("loginError");

const navLinks = document.querySelectorAll(".nav-links a");
const categoryItems = document.querySelectorAll(".categories li");

/* =UI UPDATE */
function updateAuthUI() {
	loginBtn.textContent = isLoggedIn ? "Logout" : "Login";
}

function updateCreateBlogUI() {
	let createBtn = document.getElementById("createBlogBtn");

	if (isLoggedIn && !createBtn) {
		const btn = document.createElement("a");
		btn.id = "createBlogBtn";
		btn.textContent = "➕ Create Blog";
		btn.href = "#";
		btn.style.color = "#5eead4";

		btn.onclick = (e) => {
			e.preventDefault();
			openCreateBlogModal();
		};

		document.querySelector(".nav-links").appendChild(btn);
	}

	if (!isLoggedIn && createBtn) createBtn.remove();
}

updateAuthUI();
updateCreateBlogUI();

/* LOGIN */
loginBtn.onclick = () => {
	if (isLoggedIn) {
		localStorage.removeItem("loggedIn");
		isLoggedIn = false;
		updateAuthUI();
		updateCreateBlogUI();
		showToast("Logged out successfully");
	} else {
		loginModal.style.display = "flex";
	}
};

loginSubmit.onclick = () => {
	if (usernameInput.value === "admin" && passwordInput.value === "1234") {
		localStorage.setItem("loggedIn", "true");
		isLoggedIn = true;
		loginModal.style.display = "none";
		loginError.innerText = "";
		updateAuthUI();
		updateCreateBlogUI();
		showToast("Logged in successfully");
	} else {
		loginError.innerText = "Invalid credentials";
	}
};

closeLogin.onclick = () => (loginModal.style.display = "none");
closeAbout.onclick = () => (aboutModal.style.display = "none");

/* FILTERING */
function filterBlogs(category) {
	document.querySelectorAll(".blog-card").forEach((card) => {
		const tag = card.querySelector(".tag").innerText.toLowerCase();
		card.style.display =
			category === "latest" || category === "home" || tag === category
				? "block"
				: "none";
	});
}

categoryItems.forEach((item) => {
	item.onclick = () => {
		categoryItems.forEach((i) => i.classList.remove("active"));
		item.classList.add("active");
		filterBlogs(item.innerText.toLowerCase());
	};
});

navLinks.forEach((link) => {
	link.onclick = (e) => {
		e.preventDefault();
		if (link.innerText.toLowerCase() === "about") {
			aboutModal.style.display = "flex";
			return;
		}
		document.getElementById("blogs").scrollIntoView({ behavior: "smooth" });
		filterBlogs(link.innerText.toLowerCase());
	};
});

/* CREATE BLOG */
const createBlogModal = document.getElementById("createBlogModal");
const closeCreateBlog = document.getElementById("closeCreateBlog");
const createBlogSubmit = document.getElementById("createBlogSubmit");

const newTitle = document.getElementById("newTitle");
const newTag = document.getElementById("newTag");
const newImage = document.getElementById("newImage");
const newExcerpt = document.getElementById("newExcerpt");
const newContent = document.getElementById("newContent");

function openCreateBlogModal() {
	createBlogModal.style.display = "flex";
}

createBlogSubmit.onclick = () => {
	if (
		!newTitle.value ||
		!newTag.value ||
		!newImage.files[0] ||
		!newExcerpt.value ||
		!newContent.value
	) {
		showToast("Please fill all fields");
		return;
	}

	const file = newImage.files[0];

	const imagePath = "images/" + file.name;

	const blog = {
		id: Date.now().toString(),
		title: newTitle.value.trim(),
		tag: newTag.value.trim(),
		image: imagePath,
		excerpt: newExcerpt.value.trim(),
		content: newContent.value.trim(),
	};

	storedBlogs.unshift(blog);
	saveBlogs();

	createBlogModal.style.display = "none";
	location.reload();
};

closeCreateBlog.onclick = () => {
	createBlogModal.style.display = "none";
};

/* DELETE BLOG */
document.addEventListener("click", (e) => {
	if (e.target.classList.contains("delete-btn")) {
		storedBlogs = storedBlogs.filter((b) => b.id !== e.target.dataset.id);
		saveBlogs();
		renderStoredBlogs();
	}
});
