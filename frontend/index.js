document.getElementById("maintenanceOverlay").style.display = "none";


document.addEventListener('DOMContentLoaded', function () {
    // Sidebar Toggle Logic
    const menuBtn = document.getElementById("menuBtn");
    const closeBtn = document.getElementById("closeBtn");
    const sidebar = document.getElementById("sidebar");

    // Open sidebar on menu button click
    menuBtn.addEventListener("click", () => {
        sidebar.classList.add("open");
    });

    // Close sidebar on close button click
    closeBtn.addEventListener("click", () => {
        sidebar.classList.remove("open");
    });

    // Close sidebar if clicked outside of it (but not if click is on menuBtn or its children)
    window.addEventListener("click", (event) => {
        if (!sidebar.contains(event.target) && !menuBtn.contains(event.target)) {
            sidebar.classList.remove("open");
        }
    });

    // Close sidebar when a link inside it is clicked
    document.querySelectorAll(".sidebar nav a").forEach((link) => {
        link.addEventListener("click", () => {
            sidebar.classList.remove("open");
        });
    });
});

// Smooth scroll to top (if you're using it)
window.scrollToTop = function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

  function delayedScrollTo(targetId, delay = 200) {
    setTimeout(() => {
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, delay); // delay in milliseconds
  }

  document.getElementById("btna").addEventListener("click", function (e) {
    e.preventDefault();
    delayedScrollTo("#srh", 300); // 600ms delay
  });

  document.getElementById("btnb").addEventListener("click", function (e) {
    e.preventDefault();
    delayedScrollTo("#hlt", 300);
  });

  document.getElementById("btnc").addEventListener("click", function (e) {
    e.preventDefault();
    delayedScrollTo("#hlt", 300);
  });

  document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        } else {
          entry.target.classList.remove('animate'); // so it resets
        }
      });
    }, { threshold: 0.1 });

    observer.observe(heroSection);
  });





  document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.why-card');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        } else {
          entry.target.classList.remove('animate');
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));
  });

  


const destinations = [
  {
    img: "https://i.pinimg.com/736x/67/01/76/670176768de739cfe75862f2ddff03ca.jpg",
    title: "Manali, Himachal Pradesh",
    desc: "Snowy peaks, scenic valleys, and adventure sports. Great all year round."
  },
  {
    img: "https://i.pinimg.com/736x/e4/65/f4/e465f418beb085079a95c8d2d2d2f3a2.jpg",
    title: "Varanasi, Uttar Pradesh",
    desc: "Spiritual capital with ghats and Ganga aarti. Best from November to March."
  },
  {
    img: "https://i.pinimg.com/736x/39/31/f2/3931f2be8a79a86afe47018e7d57c55d.jpg",
    title: "Ladakh, India",
    desc: "Stunning mountains, monasteries, and adventure. Best from May to September."
  },
  {
    img: "https://i.pinimg.com/736x/39/43/c8/3943c85d15ed05a791d4530a9e075138.jpg",
    title: "Lakshadweep, India",
    desc: "Turquoise lagoons and coral reefs. Ideal from October to March for water sports."
  },
  
  {
    img: "https://i.pinimg.com/736x/cd/ba/30/cdba306917f2ea6ab15127ecea31f41f.jpg",
    title: "Andaman Islands",
    desc: "Beaches, scuba diving, and history. Best between November and April."
  },
  {
    img: "https://i.pinimg.com/736x/f8/d6/6a/f8d66ad8354396d7169119f2e8893a47.jpg",
    title: "Jaipur, Rajasthan",
    desc: "Forts, palaces, and vibrant culture. Ideal in winter from October to March."
  },
  {
    img: "https://i.pinimg.com/736x/6d/21/dd/6d21dd6213bd2471b016ac9a5f69bd76.jpg",
    title: "Rishikesh, Uttarakhand",
    desc: "Yoga capital, rafting, and peaceful retreats. Great from September to April."
  },
  {
    img: "https://i.pinimg.com/736x/10/e9/3f/10e93fe22080cb1bc0954d80d9d7464d.jpg",
    title: "Darjeeling, West Bengal",
    desc: "Tea gardens, toy train, and mountain views. Visit from March to May or Sept to Nov."
  },
  {
    img: "https://i.pinimg.com/736x/ac/4c/02/ac4c0277f904830937c3047f45e6d80a.jpg",
    title: "Goa, India",
    desc: "Beaches, nightlife, and Portuguese charm. Peak season is November to February."
  },
  {
    img: "https://i.pinimg.com/736x/f2/8d/ee/f28deed5516d14e10cc243cf65784a07.jpg",
    title: "Munnar, Kerala",
    desc: "Lush green hills and tea estates. Best time to visit is October to March."
  }
];

let currentIndex = 0;

function renderCards() {
  const container = document.getElementById('recommendation-cards');
  container.classList.add('fade-out');

  setTimeout(() => {
    container.innerHTML = '';

    const visible = [
      destinations[currentIndex],
      destinations[(currentIndex + 1) % destinations.length]
    ];

    visible.forEach(dest => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="card-image-wrapper">
          <img src="${dest.img}" alt="${dest.title}">
          <button class="create-itinerary-btn" onclick="createCardItinerary('${dest.title}')">Create Itinerary</button>
        </div>
        <div class="card-content">
          <h4>${dest.title}</h4>
          <p>${dest.desc}</p>
        </div>
      `;
      container.appendChild(card);
    });

    currentIndex = (currentIndex + 2) % destinations.length;
    container.classList.remove('fade-out');
  }, 400);
}


renderCards();
setInterval(renderCards, 5000);


// form 




  const scriptURL = 'https://script.google.com/macros/s/AKfycbwdRGSTxpYheR106cKH-W9RqK2nMMqDN15qMkxsHYQpGJPN3gcIY92IQXV3hHb9cI1d3A/exec'; 
  const form = document.getElementById('feedbackForm');
  const submitBtn = document.getElementById('submitBtn');
  const spinner = document.getElementById('spinner');
  const loadingOverlay = document.getElementById('loadingOverlay');
  const thankYouMsg = document.getElementById('thankYouMsg');

 let alreadySubmitted = false;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    //  Stop if already submitted
    if (alreadySubmitted) {
      thankYouMsg.style.display = 'block';
      thankYouMsg.innerHTML = '🛑You have already submitted!🛑';
      loadingOverlay.style.display = 'flex'; // Optional: show overlay again
      setTimeout(() => {
        loadingOverlay.style.display = 'none';
      }, 1500);
      return;
    }

    // 🔄 Show loading
    loadingOverlay.style.display = 'flex';
    spinner.style.display = 'block';
    thankYouMsg.style.display = 'none';


    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      await fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      form.reset();
      alreadySubmitted = true;

      // ✅ Show thank you
      spinner.style.display = 'none';
      thankYouMsg.innerHTML = '🎉 Thank you for your feedback!';
      thankYouMsg.style.display = 'block';

      setTimeout(() => {
        loadingOverlay.style.display = 'none';
      }, 1500);
    } catch (error) {
      console.error(error);
      spinner.style.display = 'none';
      thankYouMsg.innerHTML = '❌ Error submitting feedback. Try again later.';
      thankYouMsg.style.display = 'block';

      // Re-enable button on error
      alreadySubmitted = false;
      submitBtn.style.pointerEvents = 'auto';
      submitBtn.style.cursor = 'pointer';

      setTimeout(() => {
        loadingOverlay.style.display = 'none';
      }, 1500);
    }
  });


