let jobs = [
  {
    id: 1,
    company: "Mobile First Corp",
    position: "React Native Developer",
    location: "Remote",
    type: "Full-time",
    salary: "$130k - $175k",
    description:
      "Build cross-platform mobile applications using React Native. Work on products used by millions.",
    status: "all",
  },
  {
    id: 2,
    company: "WebFlow Agency",
    position: "Web Designer",
    location: "Los Angeles, CA",
    type: "Part-time",
    salary: "$80k - $120k",
    description:
      "Create stunning web experiences for high-profile clients. Portfolio in modern UI trends required.",
    status: "all",
  },
  {
    id: 3,
    company: "DataViz Solutions",
    position: "Data Specialist",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$125k - $155k",
    description:
      "Transform complex data into compelling visualizations using D3.js and React.",
    status: "all",
  },
  {
    id: 4,
    company: "CloudFirst Inc",
    position: "Backend Developer",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$140k - $190k",
    description:
      "Design scalable backend systems using Python and AWS. Work with modern DevOps practices.",
    status: "all",
  },
  {
    id: 5,
    company: "Innovation Labs",
    position: "UI/UX Engineer",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110k - $150k",
    description:
      "Create beautiful and functional user interfaces for our suite of enterprise products.",
    status: "all",
  },
  {
    id: 6,
    company: "MegaCorp Solutions",
    position: "JS Developer",
    location: "New York, NY",
    type: "Full-time",
    salary: "$130k - $170k",
    description:
      "Develop enterprise applications with JavaScript and modern frameworks.",
    status: "all",
  },
  {
    id: 7,
    company: "Tech Startups HQ",
    position: "Frontend Lead",
    location: "San Francisco, CA",
    type: "Contract",
    salary: "$150k - $200k",
    description:
      "Lead the frontend team to build high-performance web applications.",
    status: "all",
  },
  {
    id: 8,
    company: "SoftDev Systems",
    position: "QA Engineer",
    location: "Remote",
    type: "Full-time",
    salary: "$90k - $120k",
    description:
      "Ensure the quality of software products through automated and manual testing.",
    status: "all",
  },
];

let currentTab = "all";

function updateDashboard() {
  const total = jobs.length;
  const interviewCount = jobs.filter((j) => j.status === "interview").length;
  const rejectedCount = jobs.filter((j) => j.status === "rejected").length;

  document.getElementById("total-count").innerText = total;
  document.getElementById("interview-count").innerText = interviewCount;
  document.getElementById("rejected-count").innerText = rejectedCount;
}

function filterJobs(tab) {
  currentTab = tab;
  ["all", "interview", "rejected"].forEach((t) => {
    const el = document.getElementById(`tab-${t}`);
    if (t === tab) {
      el.classList.add("btn-primary");
      el.classList.remove("bg-gray-200");
    } else {
      el.classList.remove("btn-primary");
      el.classList.add("bg-gray-200");
    }
  });

  renderJobs();
}

function changeStatus(id, newStatus) {
  const index = jobs.findIndex((j) => j.id === id);
  if (index !== -1) {
    jobs[index].status = newStatus;
    updateDashboard();
    renderJobs();
  }
}

function deleteJob(id) {
  jobs = jobs.filter((j) => j.id !== id);
  updateDashboard();
  renderJobs();
}
// renderJobs
function renderJobs() {
  const container = document.getElementById("jobs-container");
  const emptyState = document.getElementById("empty-state");
  const sectionCount = document.getElementById("section-count");

  let filtered = [];
  if (currentTab === "all") {
    filtered = jobs;
  } else {
    filtered = jobs.filter((j) => j.status === currentTab);
  }

  sectionCount.innerText = filtered.length;
  container.innerHTML = "";

  if (filtered.length === 0) {
    emptyState.classList.remove("hidden");
    emptyState.classList.add("flex");
  } else {
    emptyState.classList.add("hidden");
    emptyState.classList.remove("flex");

    filtered.forEach((job) => {
      const card = document.createElement("div");
      card.className =
        "bg-white p-6 rounded-lg shadow-sm border border-gray-100 relative group";
      card.innerHTML = `
                        <button onclick="deleteJob(${job.id})" class="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                        <div class="mb-4">
                            <h3 class="text-xl font-bold text-blue-900">${job.company}</h3>
                            <p class="font-semibold text-gray-700">${job.position}</p>
                        </div>
                        <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mb-3">
                            <span><i class="fa-solid fa-location-dot mr-1"></i> ${job.location}</span>
                            <span>• ${job.type}</span>
                            <span>• ${job.salary}</span>
                        </div>
                        <span class="inline-block bg-blue-50 text-blue-600 text-xs font-bold px-2 py-1 rounded mb-3">
                            ${job.status === "all" ? "NOT APPLIED" : job.status.toUpperCase()}
                        </span>
                        <p class="text-gray-600 text-sm mb-6">${job.description}</p>
                        <div class="flex gap-3">
                            <button onclick="changeStatus(${job.id}, 'interview')" class="btn btn-sm ${job.status === "interview" ? "btn-success text-white" : "btn-outline btn-success"}">Interview</button>
                            <button onclick="changeStatus(${job.id}, 'rejected')" class="btn btn-sm ${job.status === "rejected" ? "btn-error text-white" : "btn-outline btn-error"}">Rejected</button>
                        </div>
                    `;
      container.appendChild(card);
    });
  }
}

// Initial Load
updateDashboard();
renderJobs();
