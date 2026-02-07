const blogs = {
	"night-walks": {
		title: "A Night Walk Through Unknown Cities",
		tag: "Night Walks",
		image: "images/nightWalks_Card1.png",
		content: `
		When the streets empty and the noise of the day slowly fades, cities begin to show a quieter and more honest side of themselves. Night walks are not about reaching a destination or following a route. They are about slowing down and observing the city when it is no longer trying to impress anyone.

		Under the glow of streetlights, familiar places start to feel different. Shadows stretch longer, neon signs flicker softly, and the usual rush disappears. Every sound feels clearer — footsteps echo, distant traffic hums, and occasional conversations float through the air. Even areas you have visited many times feel unfamiliar at night.

		Walking through unknown cities after dark creates a strange sense of connection. You notice small details that daylight hides — closed shop shutters, empty benches, lights glowing from apartment windows, and streets that seem to pause and breathe. There is no pressure to move fast or check the time. The city allows you to exist without expectations.

		Night walks turn into personal conversations with places. They offer moments of reflection, calm, and curiosity. In those quiet hours, you don’t just walk through a city — you listen to it, understand it, and carry a piece of it with you when the night ends.
		`,
	},
	nature: {
		title: "Finding Silence in the Mountains",
		tag: "Nature",
		image: "images/nature_Card2.png",
		content: `
		High above the noise of cities and daily routines, the mountains offer something rare — genuine silence. This silence is not empty or uncomfortable; instead, it feels calm, grounding, and deeply refreshing. The moment you step into the mountains, life naturally begins to slow down.

		Surrounded by towering peaks, fresh air, and open skies, everyday distractions lose their importance. The sound of wind moving through trees, distant birds calling, and your own steady breathing becomes more noticeable. These natural sounds replace the constant background noise of traffic, notifications, and conversations.
		
		Time feels different in the mountains. Hours pass without urgency, and there is no pressure to rush from one place to another. Walking along narrow trails or simply sitting and observing the landscape encourages reflection. Thoughts become clearer, and the mind feels lighter with every step.
		
		Finding silence in the mountains is not just about escaping noise — it is about reconnecting with yourself. In that peaceful environment, you listen more carefully, feel more present, and return with a sense of balance that stays long after the journey ends.
		`,
	},
	cafes: {
		title: "Cafés, Conversations, and Foreign Mornings",
		tag: "Stories",
		image: "images/cafes_card3.png",
		content: `
		In unfamiliar cities, small cafés often become the first place where the day truly begins. Instead of alarms and schedules, mornings are guided by the smell of coffee, quiet chatter, and the rhythm of people starting their routines. These cafés feel personal, even when you are thousands of kilometers away from home.

		Sitting by a window or a small corner table, you observe life moving at its own pace. Conversations flow in languages you may not understand, yet they feel comforting rather than distant. Laughter, gestures, and expressions communicate more than words ever could.
		
		Cafés have a unique way of making strangers feel included without effort. You are not required to explain who you are or where you come from. For a brief moment, you belong simply by being there — sharing the same space, the same warmth, and the same quiet morning energy.
		
		These foreign mornings stay in memory long after the trip ends. Not because of famous landmarks, but because of simple moments — a warm cup of coffee, a familiar smile, and the feeling of being at ease in an unfamiliar place.
		`,
	},
	roadtrip: {
		title: "Roads That Changed Me",
		tag: "Destinations",
		image: "images/roadTrip_Card4.png",
		content: `
		Road trips are less about reaching a destination and more about everything that happens along the way. Long stretches of road, unexpected stops, and changing landscapes slowly shift the way you think and feel. With every passing mile, the rush of daily life fades into the background.

		Wrong turns often turn into the most memorable moments. A missed exit can lead to a quiet village, a scenic viewpoint, or an unplanned conversation with strangers. These moments, unplanned and imperfect, are what make road trips meaningful and personal.
		
		Being on the road creates space for reflection. With music playing softly and the horizon stretching ahead, thoughts settle naturally. You begin to notice how movement itself brings clarity, allowing you to understand things you never had time to process before.
		
		Even after the journey ends, the road stays with you. The experiences, lessons, and memories continue to shape the way you see new places and new paths in life. Some journeys may stop, but their impact never truly ends.
		`,
	},
	photoessay: {
		title: "Shadows, Streets, and City Silence",
		tag: "Photo Essays",
		image: "images/photoEssays_card5.png",
		content: `
		Cities reveal a different personality once the rush fades away. After the noise of traffic and crowds settles, streets begin to breathe again. The silence feels heavy but calm, offering a rare pause in places usually defined by constant movement.

		As evening sets in, shadows stretch across buildings and sidewalks, creating quiet patterns that often go unnoticed during the day. Empty streets, dim lights, and reflections on glass capture moments that feel personal and honest. These scenes tell stories without words.
		
		A photo essay preserves these in-between moments. It focuses on stillness rather than speed, and emotion rather than action. Through simple frames of streets and shadows, the city’s quieter side comes alive.
		
		In this silence, details start to matter more. A lone streetlight, a closed shop, or a passing figure becomes meaningful. These are the moments that define the city beyond its crowds and chaos.
		`,
	},
	coastal: {
		title: "Where the Road Meets the Sea",
		tag: "Destinations",
		image: "images/destinations_card6.png",
		content: `
		Coastal roads have a way of changing the pace of life without asking permission. As the road curves alongside the sea, time seems to slow down, and every turn offers a new horizon. The constant presence of water creates a calm rhythm — waves moving in and out, sunlight reflecting off the surface, and the sound of wind blending with the ocean.

		Driving along the coast is less about reaching a destination and more about being present in the journey. Salt fills the air, windows stay open longer than planned, and even short stops feel meaningful. Small villages, quiet beaches, and roadside cafés appear unexpectedly, inviting you to pause and take everything in.
		
		There is a sense of lightness that comes with coastal travel. Problems feel smaller, thoughts feel clearer, and the road ahead feels open and forgiving. Where land ends and sea begins, movement feels freer — not rushed, not forced — just guided by the horizon and the endless blue beside it.
		`,
	},
};

// LOAD BLOG
const params = new URLSearchParams(window.location.search);
const postId = params.get("post");

// LIKE SYSTEM
const likeBtn = document.getElementById("likeBtn");
const likeCount = document.getElementById("likeCount");

let likes = Number(localStorage.getItem(postId + "_likes")) || 0;
likeCount.textContent = likes;

likeBtn.addEventListener("click", () => {
	likes++;
	localStorage.setItem(postId + "_likes", likes);
	likeCount.textContent = likes;
});

// COMMENTS SYSTEM
const commentForm = document.getElementById("commentForm");
const commentsList = document.getElementById("commentsList");
const commentCount = document.getElementById("commentCount");

let comments = JSON.parse(localStorage.getItem(postId + "_comments")) || [];

function renderComments() {
	commentsList.innerHTML = "";
	commentCount.textContent = comments.length;

	comments.forEach((c, index) => {
		const div = document.createElement("div");
		div.className = "comment";
		div.innerHTML = `
			<strong>${c.name}</strong>
			<p>${c.text}</p>
			<button class="delete-btn">🗑 Delete</button>
		`;

		div.querySelector(".delete-btn").addEventListener("click", () => {
			comments.splice(index, 1);
			localStorage.setItem(postId + "_comments", JSON.stringify(comments));
			renderComments();
		});

		commentsList.appendChild(div);
	});
}

renderComments();

commentForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const name = document.getElementById("username").value.trim();
	const text = document.getElementById("commentText").value.trim();

	if (!name || !text) return;

	comments.push({ name, text });
	localStorage.setItem(postId + "_comments", JSON.stringify(comments));

	commentForm.reset();
	renderComments();
});

// Merge stored blogs
const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
const allBlogs = { ...blogs }; // start with hardcoded blogs
storedBlogs.forEach((b) => {
	allBlogs[b.id] = b;
});

// Populate the page
const dynamicBlog = allBlogs[postId];

if (dynamicBlog) {
	document.getElementById("blogTitle").innerText = dynamicBlog.title;
	document.getElementById("blogTag").innerText = dynamicBlog.tag;
	document.getElementById("blogImage").src = dynamicBlog.image;
	document.getElementById("blogText").innerHTML = dynamicBlog.content
		.trim()
		.replace(/\n/g, "<br><br>");
} else {
	document.getElementById("blogTitle").innerText = "Blog not found";
	document.getElementById("blogText").innerText =
		"Sorry, this blog does not exist.";
	document.getElementById("blogImage").style.display = "none";
}
