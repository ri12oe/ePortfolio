// Add new posts at the top. Fields: id (unique), date (ISO), tag, text,
// optional image + alt, optional link { url, label }, optional likes (starting count).
window.BLOG_AUTHOR = {
  name: "Mario Espinoza-Gutierrez",
  handle: "@ri12oe",
  avatar: "images/me.webp",
};

window.BLOG_POSTS = [
  {
    id: "mira-and-mx",
    date: "2026-10-06T09:00:00-04:00",
    tag: "Updates",
    text: "Two projects are now in progress: Mira, a mobile app that helps caregivers set up daily routines, and mX, a personal AI assistant with its own backend.\nCheck them out on the Projects page.",
    image: "images/Dot-mascot.webp",
    alt: "Mira mascot, Dot",
    link: { url: "project.html", label: "See my projects" },
    likes: 3,
  },
  {
    id: "maro-language",
    date: "2026-09-28T18:30:00-04:00",
    tag: "Projects",
    text: "Here's a project that I created last semester called Maro. A simple, readable programming language written in Java with a lexer, parser, AST, interpreter and a REPL.",
    image: "images/Maro.webp",
    alt: "Maro language running in a terminal",
    link: { url: "https://github.com/ri12oe/Maro", label: "Source code on GitHub" },
    likes: 5,
  },
  {
    id: "honors-reflection",
    date: "2026-09-15T12:00:00-04:00",
    tag: "Honors",
    text: "Working on the Honors Page. A reflection on my experiences and achievements in the Honors program. Almost completed of the overall ePortfolio.",
    link: { url: "honors.html", label: "Read my honors page" },
    likes: 2,
  },
  {
    id: "learning-in-public",
    date: "2026-09-02T20:15:00-04:00",
    tag: "Thoughts",
    text: "Hello world! I'm starting this blog to share what I'm building and learning. Expect short updates, project notes and the occasional lesson learned the hard way.",
    likes: 1,
  },
];