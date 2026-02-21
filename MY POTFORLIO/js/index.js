// ================= THEME =================
const toggle = document.querySelector(".theme-toggle");

toggle.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark")
  );
};

if (localStorage.getItem("theme") === "true") {
  document.body.classList.add("dark");
}

// ================= PROJECT DATA =================
const projects = [
  {
    title: "Market Booth Management System",
    description:
      "A web-based system designed to manage vendor applications, booth allocation, and administrative oversight for municipal markets.",
    category: "system",
    tech: ["HTML", "CSS", "JavaScript"],
    features: [
      "Admin dashboard",
      "Vendor application management",
      "Booth allocation logic",
      "Status tracking"
    ],
    live: "https://yourliveproject.com",
    github: "https://tembanimwanda.github.io/event-website/index.html",
    image: "images/market-dashboard.png"
  },
  {
    title: "Vendor Portal",
    description:
      "A vendor-facing dashboard that allows vendors to submit applications and track booth allocation status.",
    category: "system",
    tech: ["HTML", "CSS", "JavaScript"],
    features: [
      "Vendor login",
      "Application tracking",
      "Booth status view"
    ],
    live: "",
    github: "https://github.com/yourusername/vendor-portal",
    image: "images/vendor-portal.png"
  }
];

// ================= PROJECT RENDER =================
const list = document.getElementById("projectList");

function renderProjects(data) {
  list.innerHTML = "";

  data.forEach((project, index) => {
    list.innerHTML += `
      <div class="project">
        <h4>${project.title}</h4>
        <p>${project.description.substring(0, 90)}...</p>
        <div class="project-actions">
          <button class="btn outline" onclick="openModal(${index})">Details</button>
          ${
            project.live
              ? `<a href="${project.live}" target="_blank" class="btn">Live Demo</a>`
              : ""
          }
          ${
            project.github
              ? `<a href="${project.github}" target="_blank" class="btn outline">GitHub</a>`
              : ""
          }
        </div>
      </div>
    `;
  });
}

renderProjects(projects);

// ================= FILTER =================
document.querySelectorAll(".filters button").forEach((btn) => {
  btn.onclick = () => {
    const cat = btn.dataset.filter;
    renderProjects(
      cat === "all"
        ? projects
        : projects.filter((p) => p.category === cat)
    );
  };
});

// ================= MODAL =================
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeBtn = document.getElementById("closeModal");

function openModal(index) {
  const project = projects[index];

  modalTitle.innerText = project.title;

  modalDesc.innerHTML = `
    <p>${project.description}</p>
    ${
      project.image
        ? `<img src="${project.image}" alt="${project.title}" style="width:100%;margin-top:15px;border-radius:12px;">`
        : ""
    }
    <h4>Technologies Used</h4>
    <ul>
      ${project.tech.map((t) => `<li>${t}</li>`).join("")}
    </ul>
    <h4>Key Features</h4>
    <ul>
      ${project.features.map((f) => `<li>${f}</li>`).join("")}
    </ul>
  `;

  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

closeBtn.onclick = closeModal;

modal.onclick = (e) => {
  if (e.target === modal) closeModal();
};

// ================= CONTACT =================
document.getElementById("contactForm").onsubmit = (e) => {
  e.preventDefault();

  // Grab input elements
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const msg = document.getElementById("formMsg");

  // Validate
  if (!nameInput.value || !emailInput.value || !messageInput.value) {
    msg.style.color = "red";
    msg.innerText = "Please fill all fields.";
    return;
  }

  // Demo message
  msg.style.color = "green";
  msg.innerText = "Message sent successfully (demo).";
  e.target.reset();
};

// ================= FOOTER YEAR =================
document.getElementById("year").innerText = new Date().getFullYear();

// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

// ================= SCROLL ANIMATION =================
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

sections.forEach((section) => observer.observe(section));

// ================= EDUCATION / CERTIFICATIONS =================
const certifications = [
  {
    name: "Diploma in Information Technology",
    institution: "Evelyn Hone College of Applied Arts and Commerce",
    year: "June 2024 – June 2026",
    type: "Diploma",
    certificate: "certificates/diploma-it.pdf" // path to PDF or image
  },
  {
    name: "Full Stack Web Development",
    institution: "Coursera",
    year: "2022",
    type: "Online Certification",
    certificate: "certificates/fullstack.pdf"
  },
  {
    name: "JavaScript Advanced Concepts",
    institution: "Udemy",
    year: "2023",
    type: "Online Certification",
    certificate: "certificates/js-advanced.pdf"
  }
];

function renderEducation(data) {
  const container = document.querySelector(".grid.education");
  container.innerHTML = "";

  data.forEach((cert, index) => {
    container.innerHTML += `
      <div class="edu-card">
        <h4>${cert.name}</h4>
        <p>${cert.institution} - ${cert.year}</p>
        <small>${cert.type}</small>
        ${
          cert.certificate
            ? `<button class="btn outline" onclick="openCert(${index})">View Certificate</button>`
            : ""
        }
      </div>
    `;
  });
}

renderEducation(certifications);

// ================= CERTIFICATE MODAL =================
function openCert(index) {
  const cert = certifications[index];

  modalTitle.innerText = cert.name;
  modalDesc.innerHTML = `
    <p>${cert.institution} - ${cert.year}</p>
    <small>${cert.type}</small>
    ${
      cert.certificate
        ? `<iframe src="${cert.certificate}" width="100%" height="500px" style="border:none;margin-top:15px;border-radius:12px;"></iframe>`
        : "<p>No certificate available</p>"
    }
  `;

  modal.style.display = "flex";
}

// ================= BACK TO TOP =================
const backToTop = document.getElementById("backToTop");

if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
  });

  backToTop.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}

// ================= ACTIVE NAV LINK =================
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});/* ==================================================
   FEATURES 6–10: Blog, Stats, Hero Typing Effect
================================================== */

// ================= STATS COUNTER =================
const stats = {
  projects: projects.length,
  certs: 1 // Add your certificates count here
};

function animateStats() {
  const projectsCount = document.getElementById("projectsCount");
  const certsCount = document.getElementById("certsCount");

  let p = 0, c = 0;
  const interval = setInterval(() => {
    if (p < stats.projects) projectsCount.innerText = ++p;
    if (c < stats.certs) certsCount.innerText = ++c;
    if (p >= stats.projects && c >= stats.certs) clearInterval(interval);
  }, 200);
}

animateStats();

// ================= HERO TYPING EFFECT =================
const phrases = ["Web Developer", "Dashboard Specialist", "Problem Solver"];
let i = 0, j = 0, currentPhrase = "", isDeleting = false;
const speed = 150;

function typeEffect() {
  const heroText = document.getElementById("heroTitle");
  if (!isDeleting && j < phrases[i].length) {
    currentPhrase += phrases[i][j];
    j++;
  } else if (isDeleting && j > 0) {
    currentPhrase = currentPhrase.slice(0, -1);
    j--;
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) i = (i + 1) % phrases.length;
  }
  heroText.textContent = currentPhrase;
  setTimeout(typeEffect, isDeleting ? speed / 2 : speed);
}
typeEffect();

// ================= BLOG / ARTICLES =================
const blogs = [
  {
    title: "How I Built a Market Dashboard",
    desc: "A step-by-step case study of building the Market Booth Management System.",
    link: "https://tembanimwanda.github.io/blog/market-dashboard"
  },
  {
    title: "Tips for Efficient Web Development",
    desc: "Sharing some techniques for faster and cleaner web application development.",
    link: "#"
  }
];

const blogList = document.getElementById("blogList");

function renderBlogs() {
  blogList.innerHTML = "";
  blogs.forEach((blog) => {
    blogList.innerHTML += `
      <div class="blog-card">
        <h4>${blog.title}</h4>
        <p>${blog.desc}</p>
        <a href="${blog.link}" target="_blank" class="btn outline">Read More</a>
      </div>
    `;
  });
}

renderBlogs();